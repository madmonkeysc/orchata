/**
 * Orchata Media House - Sistema de Control de Acceso & Seguridad para Contratos DOOH
 * Protege la visualización de contratos e instrumentos mercantiles.
 */

(function() {
  // Claves maestras autorizadas (case-insensitive)
  const AUTHORIZED_CODES = ["ORCHATA2026", "OMH2026", "ORCHATA", "VENTAS2026", "2026"];
  const AUTH_STORAGE_KEY = "orchata_legal_contract_auth";
  const AUTH_EXPIRY_MS = 24 * 60 * 60 * 1000; // 24 horas de sesión autorizada

  function isAuthorized() {
    try {
      // 1. Validar por URL si viene con token o bypass
      const urlParams = new URLSearchParams(window.location.search);
      const urlCode = (urlParams.get('auth') || urlParams.get('pin') || '').trim().toUpperCase();
      if (urlCode && AUTHORIZED_CODES.includes(urlCode)) {
        sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify({ ts: Date.now(), token: urlCode }));
        return true;
      }

      // 2. Validar sesión existente
      const raw = sessionStorage.getItem(AUTH_STORAGE_KEY) || localStorage.getItem(AUTH_STORAGE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      if (Date.now() - data.ts < AUTH_EXPIRY_MS && AUTHORIZED_CODES.includes(data.token)) {
        return true;
      }
    } catch (e) {
      console.warn('Auth check error:', e);
    }
    return false;
  }

  function setAuthorized(token) {
    const payload = JSON.stringify({ ts: Date.now(), token: token });
    sessionStorage.setItem(AUTH_STORAGE_KEY, payload);
    localStorage.setItem(AUTH_STORAGE_KEY, payload);
  }

  // Inyectar Modal Pop-Up de Seguridad en la página
  function injectSecurityGate() {
    if (document.getElementById('orchataSecurityModal')) return;

    // Estilos del modal
    const style = document.createElement('style');
    style.id = 'orchataSecurityStyles';
    style.innerHTML = `
      #orchataSecurityBackdrop {
        position: fixed;
        inset: 0;
        z-index: 999999;
        background: rgba(5, 5, 8, 0.88);
        backdrop-filter: blur(16px);
        -webkit-backdrop-filter: blur(16px);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        font-family: 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif;
      }
      #orchataSecurityBackdrop.active {
        opacity: 1;
        visibility: visible;
      }
      #orchataSecurityModal {
        background: #111115;
        border: 1px solid rgba(252, 242, 0, 0.35);
        border-radius: 18px;
        box-shadow: 0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px rgba(252, 242, 0, 0.12);
        max-width: 440px;
        width: 100%;
        overflow: hidden;
        transform: scale(0.94);
        transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
        color: #ffffff;
      }
      #orchataSecurityBackdrop.active #orchataSecurityModal {
        transform: scale(1);
      }
      .sec-modal-header {
        background: #09090b;
        padding: 22px 24px 16px;
        text-align: center;
        border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      }
      .sec-shield-icon {
        width: 54px;
        height: 54px;
        border-radius: 50%;
        background: rgba(252, 242, 0, 0.1);
        border: 1.5px solid rgba(252, 242, 0, 0.4);
        display: inline-flex;
        align-items: center;
        justify-content: center;
        font-size: 26px;
        margin-bottom: 12px;
      }
      .sec-modal-title {
        font-size: 17px;
        font-weight: 800;
        color: #ffffff;
        letter-spacing: -0.01em;
        margin-bottom: 4px;
      }
      .sec-modal-subtitle {
        font-size: 12px;
        color: #a1a1aa;
        line-height: 1.4;
      }
      .sec-modal-body {
        padding: 24px;
      }
      .sec-input-label {
        display: block;
        font-size: 11px;
        font-weight: 800;
        text-transform: uppercase;
        letter-spacing: 0.06em;
        color: #fcf200;
        margin-bottom: 8px;
      }
      .sec-input-wrap {
        position: relative;
        margin-bottom: 14px;
      }
      .sec-input {
        width: 100%;
        background: #09090b;
        border: 1.5px solid #27272a;
        border-radius: 10px;
        padding: 12px 14px 12px 40px;
        font-size: 15px;
        font-weight: 700;
        color: #ffffff;
        letter-spacing: 0.1em;
        outline: none;
        box-sizing: border-box;
        text-transform: uppercase;
        transition: all 0.2s;
        font-family: 'JetBrains Mono', monospace;
      }
      .sec-input:focus {
        border-color: #fcf200;
        box-shadow: 0 0 0 3px rgba(252, 242, 0, 0.18);
      }
      .sec-input-icon {
        position: absolute;
        left: 14px;
        top: 50%;
        transform: translateY(-50%);
        font-size: 16px;
        pointer-events: none;
        opacity: 0.7;
      }
      .sec-btn-submit {
        width: 100%;
        background: #fcf200;
        color: #09090b;
        border: none;
        border-radius: 10px;
        padding: 13px 20px;
        font-size: 13px;
        font-weight: 900;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        cursor: pointer;
        transition: all 0.2s;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .sec-btn-submit:hover {
        background: #fdf64d;
        transform: translateY(-1px);
        box-shadow: 0 8px 20px -6px rgba(252, 242, 0, 0.4);
      }
      .sec-btn-submit:active {
        transform: translateY(0);
      }
      
      /* Mensaje de error / Pregunta a atención a clientes */
      #secErrorMessage {
        display: none;
        margin-top: 16px;
        background: rgba(239, 68, 68, 0.12);
        border: 1px solid rgba(239, 68, 68, 0.35);
        border-left: 4px solid #ef4444;
        border-radius: 8px;
        padding: 12px 14px;
        color: #fca5a5;
        font-size: 12px;
        line-height: 1.45;
        animation: secShake 0.35s ease;
      }
      #secErrorMessage strong {
        color: #ffffff;
        display: block;
        font-size: 12.5px;
        margin-bottom: 3px;
      }
      .sec-whatsapp-help {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        margin-top: 8px;
        color: #fcf200;
        font-weight: 800;
        text-decoration: none;
        font-size: 11.5px;
      }
      .sec-whatsapp-help:hover {
        text-decoration: underline;
      }

      @keyframes secShake {
        0%, 100% { transform: translateX(0); }
        20%, 60% { transform: translateX(-6px); }
        40%, 80% { transform: translateX(6px); }
      }

      .sec-modal-footer {
        padding: 12px 24px 18px;
        text-align: center;
        border-top: 1px solid rgba(255, 255, 255, 0.05);
        font-size: 11px;
        color: #71717a;
      }
      .sec-btn-cancel {
        background: transparent;
        border: none;
        color: #a1a1aa;
        cursor: pointer;
        font-size: 11.5px;
        font-weight: 600;
        padding: 4px 8px;
        transition: color 0.2s;
      }
      .sec-btn-cancel:hover {
        color: #ffffff;
        text-decoration: underline;
      }
    `;
    document.head.appendChild(style);

    // Contenedor HTML del Modal
    const backdrop = document.createElement('div');
    backdrop.id = 'orchataSecurityBackdrop';
    backdrop.innerHTML = `
      <div id="orchataSecurityModal">
        <div class="sec-modal-header">
          <div class="sec-shield-icon">🔒</div>
          <h3 class="sec-modal-title">Control de Seguridad de Contratos</h3>
          <p class="sec-modal-subtitle">Instrumento legal de acceso restringido para asesores comerciales autorizados de Orchata Media House.</p>
        </div>
        <div class="sec-modal-body">
          <form id="secAuthForm" onsubmit="return false;">
            <label class="sec-input-label" for="secCodeInput">Ingresa el Código de Acceso:</label>
            <div class="sec-input-wrap">
              <span class="sec-input-icon">🔑</span>
              <input type="password" id="secCodeInput" class="sec-input" placeholder="••••••••" autocomplete="off" autofocus />
            </div>
            <button type="button" id="secSubmitBtn" class="sec-btn-submit">
              Verificar Código & Desbloquear
            </button>
            <div id="secErrorMessage">
              <strong>⚠️ Código de seguridad incorrecto</strong>
              <span>No tienes autorización para consultar este contrato. <strong>Pregunta a atención a clientes</strong> para solicitar la clave de acceso comercial autorizada.</span>
              <div>
                <a href="https://wa.me/524424280465?text=Hola,%20necesito%20el%20código%20de%20seguridad%20para%20visualizar%20el%20contrato%20en%20Orchata%20Media%20House" target="_blank" class="sec-whatsapp-help">
                  📲 Contactar a Atención a Clientes vía WhatsApp ➔
                </a>
              </div>
            </div>
          </form>
        </div>
        <div class="sec-modal-footer">
          <button type="button" id="secCancelBtn" class="sec-btn-cancel">
            ✕ Cancelar y regresar al menú
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(backdrop);

    // Eventos
    const form = document.getElementById('secAuthForm');
    const input = document.getElementById('secCodeInput');
    const submitBtn = document.getElementById('secSubmitBtn');
    const cancelBtn = document.getElementById('secCancelBtn');
    const errorBox = document.getElementById('secErrorMessage');

    function verify() {
      const entered = (input.value || '').trim().toUpperCase();
      if (AUTHORIZED_CODES.includes(entered)) {
        setAuthorized(entered);
        errorBox.style.display = 'none';
        backdrop.classList.remove('active');
        if (typeof window.__onSecurityPassed === 'function') {
          window.__onSecurityPassed();
        }
      } else {
        errorBox.style.display = 'block';
        input.value = '';
        input.focus();
      }
    }

    submitBtn.addEventListener('click', verify);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        e.preventDefault();
        verify();
      }
    });

    cancelBtn.addEventListener('click', () => {
      backdrop.classList.remove('active');
      if (typeof window.__onSecurityCancelled === 'function') {
        window.__onSecurityCancelled();
      }
    });
  }

  // API Global accesible desde cualquier botón o enlace
  window.OrchataSecurity = {
    checkAccess: function(targetUrl) {
      if (isAuthorized()) {
        if (targetUrl) {
          window.location.href = targetUrl;
        }
        return true;
      }

      injectSecurityGate();
      const backdrop = document.getElementById('orchataSecurityBackdrop');
      const input = document.getElementById('secCodeInput');
      const errorBox = document.getElementById('secErrorMessage');
      if (errorBox) errorBox.style.display = 'none';
      if (input) input.value = '';

      window.__onSecurityPassed = function() {
        if (targetUrl) {
          window.location.href = targetUrl;
        } else {
          // Si estamos en la página del contrato protegida, desocultarla
          const gate = document.getElementById('contractSecurityGuardGate');
          if (gate) gate.remove();
          document.body.style.overflow = '';
        }
      };

      window.__onSecurityCancelled = function() {
        if (!targetUrl && !isAuthorized()) {
          // Si estaba dentro de la página del contrato sin clave, regresar a /sell/
          window.location.href = '../index.html';
        }
      };

      backdrop.classList.add('active');
      setTimeout(() => { if (input) input.focus(); }, 100);
      return false;
    },

    // Para aplicar bloqueo inmediato al cargar una página de contrato si no está autenticado
    protectCurrentPage: function() {
      if (!isAuthorized()) {
        injectSecurityGate();
        document.body.style.overflow = 'hidden';
        
        // Capa de bloqueo sobre el contenido para que no sea visible debajo
        const guard = document.createElement('div');
        guard.id = 'contractSecurityGuardGate';
        guard.style.cssText = 'position:fixed;inset:0;background:#09090b;z-index:99999;display:flex;align-items:center;justify-content:center;';
        document.body.prepend(guard);

        window.OrchataSecurity.checkAccess();
      }
    }
  };

})();

