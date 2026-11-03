/* ============================================================
   ORCHATA MEDIA HOUSE — MAIN JS
   ============================================================ */

/* ─── CATÁLOGO DE 6 PROMOS INFERIORES ROTATIVAS (20 SEGUNDOS) ─── */
const ORCHATA_ROTATING_PROMOS = [
  // 1. GYM 1: Mujer atleta en gym
  {
    badge: "Ecosistema DOOH · Gyms",
    eyebrow: "Exclusividad Querétaro",
    title: "¿Tienes un Gym y buscas más ingresos?",
    desc: "Convierte tus pantallas en un canal privado que vende suplementos con QR y monetiza publicidad pasiva sin rentas.",
    ctaText: "Conocer Marca Blanca Gyms →",
    ctaLink: "pages/marca-blanca.html",
    img: "assets/images/Anuncios%20Pop%20Up/17.png"
  },
  // 2. RÉCORDS 1: Concierto en vivo / Artista mujer
  {
    badge: "Sello Discográfico 360",
    eyebrow: "Artistas & Productores",
    title: "¿Haces música y buscas distribución real?",
    desc: "Pitch editorial en Spotify, protección ante INDAUTOR/IMPI y sincronización en cadenas de gimnasios y comerciales.",
    ctaText: "Postular mi Demo Musical →",
    ctaLink: "pages/records.html",
    img: "assets/images/Anuncios%20Pop%20Up/16.png"
  },
  // 3. PRODUCCIONES: Rodaje cinematográfico nocturno para negocios
  {
    badge: "Producción Audiovisual",
    eyebrow: "Cine & Comerciales",
    title: "¿Tu negocio necesita un Comercial de Alto Nivel?",
    desc: "Campañas visuales con cámaras de cine, iluminación profesional y narrativa pensada para ventas y alto impacto de marca.",
    ctaText: "Ver Producciones y Spots →",
    ctaLink: "pages/comerciales.html",
    img: "assets/images/Anuncios%20Pop%20Up/20.png"
  },
  // 4. GYM 2: Atleta con hoodie en gym
  {
    badge: "Retención & Monetización",
    eyebrow: "Red DOOH Querétaro",
    title: "Tus pantallas trabajando por tu gimnasio",
    desc: "Aumenta la retención de tus socios con rutinas guiadas e impulsa el ticket promedio en barra y venta de scoops.",
    ctaText: "Ver Paquetes para Gyms →",
    ctaLink: "pages/marca-blanca.html#paquetes",
    img: "assets/images/Anuncios%20Pop%20Up/18.png"
  },
  // 5. RÉCORDS 2: Concierto / Artista urbano en escenario
  {
    badge: "Distribución & Management",
    eyebrow: "Orchata Récords",
    title: "Lleva tu música a escenarios masivos",
    desc: "Acompañamiento A&R, lanzamientos a más de 200 plataformas, licencias de sincronización y radiodifusión en pantallas.",
    ctaText: "Unirme a Orchata Récords →",
    ctaLink: "pages/records.html",
    img: "assets/images/Anuncios%20Pop%20Up/19.png"
  },
  // 6. GYM 3: Coach / Entrenador analizando resultados en gym
  {
    badge: "Auditoría Técnica Gratuita",
    eyebrow: "Atención Inmediata",
    title: "Digitaliza tu centro deportivo con Orchata",
    desc: "Agendamos una visita técnica a tus instalaciones para diseñar el ecosistema de pantallas a la medida de tu espacio.",
    ctaText: "Agendar Visita por WhatsApp →",
    ctaLink: "https://wa.me/524424280465?text=Hola%20Orchata,%20quiero%20agendar%20una%20visita%20tecnica%20a%20mi%20gimnasio",
    img: "assets/images/Anuncios%20Pop%20Up/21.png"
  }
];

function injectOrchataCornerPromo(promoData) {
  let promo = document.getElementById('orchata-corner-promo');
  if (!promo) {
    promo = document.createElement('div');
    promo.id = 'orchata-corner-promo';
    promo.className = 'orchata-corner-promo';
    promo.setAttribute('role', 'dialog');
    promo.setAttribute('aria-modal', 'false');
    document.body.appendChild(promo);
  }

  // Ajustar ruta relativa si estamos dentro de /pages/
  const isInsidePages = window.location.pathname.includes('/pages/');
  const resolvedImg = isInsidePages ? '../' + promoData.img : promoData.img;
  let resolvedLink = promoData.ctaLink;
  if (!resolvedLink.startsWith('http')) {
    resolvedLink = isInsidePages ? resolvedLink.replace('pages/', '') : resolvedLink;
  }

  promo.innerHTML = `
    <button class="orchata-promo-close" id="orchata-promo-close" aria-label="Cerrar notificación">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
      </svg>
    </button>
    <div class="orchata-promo-media">
      <span class="orchata-promo-badge">${promoData.badge}</span>
      <img src="${resolvedImg}" alt="${promoData.title}" />
    </div>
    <div class="orchata-promo-body">
      <div class="orchata-promo-eyebrow">${promoData.eyebrow}</div>
      <h4 class="orchata-promo-title" id="orchata-promo-title">${promoData.title}</h4>
      <p class="orchata-promo-desc">${promoData.desc}</p>
      <a href="${resolvedLink}" ${resolvedLink.startsWith('http') ? 'target="_blank" rel="noopener"' : ''} class="orchata-promo-btn" id="orchata-promo-cta">
        <span>${promoData.ctaText}</span>
      </a>
    </div>
  `;

  const closeBtn = promo.querySelector('#orchata-promo-close');
  const ctaBtn = promo.querySelector('#orchata-promo-cta');
  if (closeBtn) closeBtn.addEventListener('click', closeOrchataPromo);
  if (ctaBtn) ctaBtn.addEventListener('click', closeOrchataPromo);
}

/* ─── 1. GYM LEAD POPUP (CENTRAL - DESPUÉS DE LA ANIMACIÓN) ─── */
function openGymPopup() {
  const popup = document.getElementById('gym-popup-overlay');
  if (!popup) return;
  
  popup.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGymPopup() {
  const popup = document.getElementById('gym-popup-overlay');
  if (!popup) return;
  popup.classList.remove('active');
  document.body.style.overflow = '';
}

/* ─── 2. CORNER PROMO POPUP (ESQUINA INFERIOR - 20 SEGUNDOS) ──── */
function openOrchataPromo() {
  const promo = document.getElementById('orchata-corner-promo');
  if (!promo) return;

  promo.classList.add('active');
}

function closeOrchataPromo() {
  const promo = document.getElementById('orchata-corner-promo');
  if (!promo) return;
  promo.classList.remove('active');
}

// Disparador global del popup central de gym
let gymTriggered = false;
window.triggerGymPopupAfterIntro = () => {
  if (gymTriggered) return;
  gymTriggered = true;
  setTimeout(() => {
    openGymPopup();
  }, 400);
};

document.addEventListener('DOMContentLoaded', () => {

  const introTrack = document.getElementById('intro-track');
  const introSticky = document.getElementById('intro-screen');
  const introIsoWrap = document.getElementById('intro-iso-wrap');
  const introBg = document.getElementById('intro-bg');
  const introText = document.getElementById('intro-text');
  const introSkipBtn = document.getElementById('intro-skip-btn');
  const navbar = document.querySelector('.navbar');

  // Detectar si fue recarga manual (F5 / botón recargar navegador)
  let isManualReload = false;
  try {
    const navEntries = performance.getEntriesByType && performance.getEntriesByType('navigation');
    if (navEntries && navEntries.length > 0) {
      isManualReload = (navEntries[0].type === 'reload');
    } else if (performance.navigation) {
      isManualReload = (performance.navigation.type === 1); // 1 = TYPE_RELOAD
    }
  } catch(e) {
    isManualReload = false;
  }

  // Si fue recarga manual, limpiamos la bandera para que la animación vuelva a vivirse
  if (isManualReload) {
    sessionStorage.removeItem('orchata_intro_passed');
    gymTriggered = false;
  }

  // Si ya pasó o saltó la intro en esta sesión y NO es recarga manual, ocultarla completamente
  if (sessionStorage.getItem('orchata_intro_passed') === 'true' && introTrack) {
    introTrack.style.display = 'none';
    if (navbar) navbar.classList.remove('navbar-intro-hidden');
  } else if (introTrack && introSticky && introIsoWrap) {
    let introTicking = false;

    const onIntroScroll = () => {
      const rect = introTrack.getBoundingClientRect();
      const trackHeight = introTrack.offsetHeight;
      const viewportHeight = window.innerHeight;
      const maxScroll = trackHeight - viewportHeight;

      if (maxScroll <= 0) return;

      const scrollOffset = -rect.top;
      const progress = Math.min(Math.max(scrollOffset / maxScroll, 0), 1);

      if (progress <= 0) {
        introSticky.style.opacity = '1';
        introSticky.style.visibility = 'visible';
        introSticky.style.pointerEvents = 'auto';
        introIsoWrap.style.transform = 'translate(-50%, -50%) rotate(0deg) scale(1)';
        if (introBg) {
          introBg.style.transform = 'scale(1)';
          introBg.style.opacity = '1';
        }
        if (introText) {
          introText.style.opacity = '1';
          introText.style.transform = 'translateX(-50%) translateY(0px)';
        }
        if (introSkipBtn) introSkipBtn.style.opacity = '1';
        if (navbar) navbar.classList.add('navbar-intro-hidden');
        return;
      }

      if (progress >= 1) {
        introSticky.style.opacity = '0';
        introSticky.style.visibility = 'hidden';
        introSticky.style.pointerEvents = 'none';
        if (navbar) navbar.classList.remove('navbar-intro-hidden');
        sessionStorage.setItem('orchata_intro_passed', 'true');
        if (window.triggerGymPopupAfterIntro) window.triggerGymPopupAfterIntro();
        return;
      }

      // Progress between 0 and 1
      introSticky.style.visibility = 'visible';

      // Control navbar reveal
      if (navbar) {
        if (progress >= 0.86) {
          navbar.classList.remove('navbar-intro-hidden');
        } else {
          navbar.classList.add('navbar-intro-hidden');
        }
      }

      // Text & skip button fade out quickly as user starts scrolling
      if (introText) {
        const textOpacity = Math.max(0, 1 - progress / 0.22);
        introText.style.opacity = textOpacity.toFixed(2);
        introText.style.transform = `translateX(-50%) translateY(${progress * 40}px)`;
      }
      if (introSkipBtn) {
        const skipOpacity = Math.max(0, 1 - progress / 0.65);
        introSkipBtn.style.opacity = skipOpacity.toFixed(2);
      }

      // Rotation: 0 to 720 degrees
      const rotation = progress * 720;

      // Scale:
      // 0 to 0.5: gentle scale (1.0 to 1.25)
      // 0.5 to 0.95: dramatic zoom into the center (1.25 to 50+)
      let scale = 1;
      if (progress < 0.5) {
        const p1 = progress / 0.5;
        scale = 1 + (Math.sin(p1 * Math.PI / 2) * 0.25);
      } else {
        const p2 = (progress - 0.5) / 0.45;
        const clampedP2 = Math.min(Math.max(p2, 0), 1);
        scale = 1.25 + Math.pow(clampedP2, 3.4) * 48;
      }

      introIsoWrap.style.transform = `translate(-50%, -50%) rotate(${rotation.toFixed(1)}deg) scale(${scale.toFixed(2)})`;

      // Wall Orange background subtle scale
      if (introBg) {
        const bgScale = 1 + progress * 0.22;
        introBg.style.transform = `scale(${bgScale.toFixed(3)})`;
      }

      // Reveal main site by fading the sticky screen towards the end (0.72 -> 0.98)
      if (progress > 0.72) {
        const fadeP = (progress - 0.72) / 0.26;
        const screenOpacity = Math.max(0, 1 - Math.pow(fadeP, 1.8));
        introSticky.style.opacity = screenOpacity.toFixed(3);
        introSticky.style.pointerEvents = screenOpacity < 0.05 ? 'none' : 'auto';
      } else {
        introSticky.style.opacity = '1';
        introSticky.style.pointerEvents = 'auto';
      }
    };

    const requestIntroTick = () => {
      if (!introTicking) {
        requestAnimationFrame(() => {
          onIntroScroll();
          introTicking = false;
        });
        introTicking = true;
      }
    };

    window.addEventListener('scroll', requestIntroTick, { passive: true });
    window.addEventListener('resize', requestIntroTick, { passive: true });
    // Run on init
    onIntroScroll();

    // Skip intro when clicking skip button or the isotipo
    const skipIntroAction = () => {
      const targetPos = introTrack.offsetTop + introTrack.offsetHeight;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
      sessionStorage.setItem('orchata_intro_passed', 'true');
      if (window.triggerGymPopupAfterIntro) window.triggerGymPopupAfterIntro();
    };

    if (introSkipBtn) introSkipBtn.addEventListener('click', skipIntroAction);
    introIsoWrap.addEventListener('click', skipIntroAction);
  }

  /* ─── NAVBAR SCROLL EFFECT ─────────────────────────────── */
  if (navbar) {
    const onScroll = () => {
      navbar.classList.toggle('scrolled', window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ─── HAMBURGER MENU ───────────────────────────────────── */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.querySelector('.nav-mobile');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* ─── SCROLL REVEAL ────────────────────────────────────── */
  const revealEls = document.querySelectorAll('.reveal');
  if (revealEls.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => observer.observe(el));
  }

  /* ─── HERO PARALLAX ─────────────────────────────────────── */
  const heroBgs = document.querySelectorAll('.hero-bg');
  if (heroBgs.length) {
    const parallaxHero = () => {
      const scrollY = window.scrollY;
      heroBgs.forEach(bg => {
        const hero = bg.closest('.hero');
        if (!hero) return;
        const rect = hero.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = -rect.top / window.innerHeight;
          bg.style.transform = `scale(1.08) translateY(${progress * 30}px)`;
        }
      });
    };
    window.addEventListener('scroll', parallaxHero, { passive: true });
  }

  /* ─── CAROUSELS ─────────────────────────────────────────── */
  document.querySelectorAll('[data-carousel]').forEach(wrap => {
    const track = wrap.querySelector('.carousel-track-wrap');
    const prevBtn = wrap.querySelector('[data-prev]');
    const nextBtn = wrap.querySelector('[data-next]');
    if (!track) return;

    // Drag to scroll
    let isDown = false, startX, scrollLeft;
    track.addEventListener('mousedown', e => {
      isDown = true;
      track.classList.add('dragging');
      startX = e.pageX - track.offsetLeft;
      scrollLeft = track.scrollLeft;
    });
    ['mouseleave','mouseup'].forEach(ev => {
      track.addEventListener(ev, () => {
        isDown = false;
        track.classList.remove('dragging');
      });
    });
    track.addEventListener('mousemove', e => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - track.offsetLeft;
      const walk = (x - startX) * 1.5;
      track.scrollLeft = scrollLeft - walk;
    });

    // Arrow buttons
    const slideAmount = 340;
    if (prevBtn) prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -slideAmount, behavior: 'smooth' });
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: slideAmount, behavior: 'smooth' });
    });

    // Auto-play (optional slow drift)
    let autoPlay = setInterval(() => {
      if (!isDown) {
        const maxScroll = track.scrollWidth - track.clientWidth;
        if (track.scrollLeft >= maxScroll - 2) {
          track.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          track.scrollBy({ left: 1, behavior: 'instant' });
        }
      }
    }, 30);

    track.addEventListener('mouseenter', () => clearInterval(autoPlay));
    track.addEventListener('mouseleave', () => {
      autoPlay = setInterval(() => {
        if (!isDown) {
          const maxScroll = track.scrollWidth - track.clientWidth;
          if (track.scrollLeft >= maxScroll - 2) {
            track.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            track.scrollBy({ left: 1, behavior: 'instant' });
          }
        }
      }, 30);
    });
  });

  /* ─── WAVEFORM ANIMATION ────────────────────────────────── */
  document.querySelectorAll('.waveform-bar').forEach((bar, i) => {
    bar.style.animationDelay = `${i * 0.08}s`;
    const heights = [20, 35, 50, 70, 90, 70, 100, 80, 60, 45, 70, 55, 85, 65, 40, 60, 80, 50, 70, 30];
    bar.style.height = `${heights[i % heights.length]}%`;
  });

  /* ─── PROFILE SELECTOR (CONTACT PAGE) ──────────────────── */
  document.querySelectorAll('.profile-option').forEach(option => {
    option.addEventListener('click', () => {
      option.closest('.profile-selector').querySelectorAll('.profile-option').forEach(o => o.classList.remove('selected'));
      option.classList.add('selected');
    });
  });

  /* ─── COUNTER ANIMATION ─────────────────────────────────── */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const start = performance.now();
        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(target * ease) + suffix;
          if (progress < 1) requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
        counterObs.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObs.observe(c));
  }

  /* ─── SMOOTH PAGE TRANSITIONS ───────────────────────────── */
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && !href.startsWith('#') && !href.startsWith('http') && !href.startsWith('mailto') && !href.startsWith('tel')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 380);
      });
    }
  });

  /* ─── HERO IN-VIEW CLASS ────────────────────────────────── */
  const heroes = document.querySelectorAll('.hero');
  if (heroes.length) {
    const heroObs = new IntersectionObserver(entries => {
      entries.forEach(e => e.target.classList.toggle('in-view', e.isIntersecting));
    }, { threshold: 0.2 });
    heroes.forEach(h => heroObs.observe(h));
    // First hero always in view
    if (heroes[0]) heroes[0].classList.add('in-view');
  }

  /* ─── HERO CINEMATIC VIDEO & SEAMLESS TRIMMER ────────────── */
  const videoConfig = [
    { id: 'hero-video-f1',     startTime: 0.0, endTime: 4.95 },
    { id: 'hero-video-rocket', startTime: 0.0, endTime: 4.95 }
  ];

  videoConfig.forEach(({ id, startTime, endTime }) => {
    const video = document.getElementById(id);
    if (!video) return;

    // Loop cutting off ending watermark/screens
    video.addEventListener('timeupdate', () => {
      if (video.currentTime >= endTime) {
        video.currentTime = startTime;
        video.play().catch(() => {});
      }
    });

    video.addEventListener('ended', () => {
      video.currentTime = startTime;
      video.play().catch(() => {});
    });

    // Ensure initial playback starts safely
    video.play().catch(() => {
      document.addEventListener('click', () => video.play().catch(() => {}), { once: true });
    });
  });

  // Hero Video Switcher Buttons (Rocket vs F1)
  const switcherBtns = document.querySelectorAll('.hero-switcher-btn');
  const heroVideos = document.querySelectorAll('.hero-video');

  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      if (!targetId) return;

      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      heroVideos.forEach(v => {
        if (v.id === targetId) {
          v.classList.add('active');
          v.play().catch(() => {});
        } else {
          v.classList.remove('active');
        }
      });
    });
  });

});

/* ─── DOCUMENTARY MODAL & SLATE DATA ────────────────────────── */
const DOCS_DATA = {
  // COLECCIÓN 1: LEGIÓN AZTECA (Mexicanos Ejemplares)
  1: {
    title: "Canelo Álvarez · La Caída del Último Guerrero Azteca",
    quote: "La pelea más dura ocurre cuando se apagan las luces.",
    tag: "Legión Azteca · Deporte",
    collection: "legion-azteca",
    img: "1.png",
    desc: "Una inmersión cinematográfica en la faceta más íntima, solitaria y exigente del tetracampeón mundial Saúl 'Canelo' Álvarez. Cuando el ring se vacía y las luces se apagan, comienza la verdadera batalla de un hombre forjado en la gloria y la controversia."
  },
  2: {
    title: "Hugo Sánchez · Macho",
    quote: "El más grande de la historia que México decidió ignorar. Rendirse nunca fue opción.",
    tag: "Legión Azteca · Fútbol",
    collection: "legion-azteca",
    img: "2.png",
    desc: "El relato épico del pentapichichi que conquistó Europa con el Real Madrid desafiando prejuicios, la crítica nacional y sus propios límites. La reivindicación histórica del mayor deportista mexicano de todos los tiempos."
  },
  3: {
    title: "Frida Kahlo · La Fractura",
    quote: "El dolor que el mundo convirtió en moda.",
    tag: "Legión Azteca · Arte",
    collection: "legion-azteca",
    img: "3.png",
    desc: "Más allá del merchandising y la mitificación comercial contemporánea, esta pieza documental desentraña la herida física, la pasión artística visceral y la soledad descarnada de Frida Kahlo en su máxima dimensión humana."
  },
  4: {
    title: "Tin Tan · Siempre Pachuco",
    quote: "El rebelde que desafió el sistema.",
    tag: "Legión Azteca · Época de Oro",
    collection: "legion-azteca",
    img: "4.png",
    desc: "Germán Valdés revolucionó el lenguaje, el baile, el humor y la moda en una época donde México buscaba su identidad moderna. Un homenaje cinematográfico al rey de la improvisación y pionero de la contracultura urbana."
  },
  5: {
    title: "Eugenio vs Derbez",
    quote: "El precio de hacer reír a un país que no perdona el éxito.",
    tag: "Legión Azteca · Comedia",
    collection: "legion-azteca",
    img: "5.png",
    desc: "Una mirada honesta y sin censura a la psique, la disciplina obsesiva y el costo personal de reinventarse desde los foros de comedia mexicana hasta los escenarios más exclusivos de Hollywood."
  },
  6: {
    title: "Checo Pérez · Viejo Sabroso",
    quote: "El intruso en el club de la élite mundial. El sacrificio que pocos aguantan, la gloria que todos quieren.",
    tag: "Legión Azteca · F1",
    collection: "legion-azteca",
    img: "6.png",
    desc: "La travesía del piloto tapatío que rompió la hegemonía europea en el Gran Circo de la F1. Batallas rueda a rueda, intrigas de equipo y la lealtad inquebrantable de una afición mundial."
  },
  7: {
    title: "Julio César Chávez · César del Pueblo",
    quote: "El campeón invicto que paralizaba México. La gloria deportiva y la lucha contra sí mismo.",
    tag: "Legión Azteca · Boxeo",
    collection: "legion-azteca",
    img: "7.png",
    desc: "107 combates de pura garra azteca. El ídolo que detenía al país entero con cada gancho al hígado, analizando la cumbre deportiva, las tentaciones del poder y la redención personal de un guerrero invicto."
  },
  8: {
    title: "Pedro Infante · Si Me Muero Quién Te Besa",
    quote: "El vuelo sin retorno del hombre que cantaba su propia despedida.",
    tag: "Legión Azteca · Mito",
    collection: "legion-azteca",
    img: "8.png",
    desc: "El ídolo indiscutible del pueblo mexicano cuya prematura muerte en los cielos de Mérida lo convirtió en deidad popular. Una reconstrucción poética y documental de los últimos días del charro cantor."
  },
  9: {
    title: "Gloria Trevi · La Trevi: El Precio de la Libertad",
    quote: "La voz más rebelde del pop latinoamericano frente al juicio de la historia.",
    tag: "Legión Azteca · Música",
    collection: "legion-azteca",
    img: "9.png",
    desc: "De fenómeno irreverente de masas a los laberintos mediáticos y judiciales más escandalosos de Latinoamérica, culminando en una resurrección artística que redefine el concepto de reinvención y libertad."
  },

  // COLECCIÓN 2: EXPEDIENTES NEGROS (True Crime & Asesinos Seriales)
  101: {
    title: "El Monstruo de Ecatepec · Cacería en la Niebla",
    quote: "La sombra que operaba a plena luz del día en la periferia impune.",
    tag: "Expedientes Negros · True Crime",
    collection: "true-crime",
    img: "Orange Prox.png",
    desc: "Una crónica forense, psicológica y social que analiza uno de los casos criminales más oscuros y estremecedores de México. Investigación en campo, peritajes psiquiátricos y testimonios de quienes lograron desentrañar el horror detrás de la normalidad cotidiana."
  },
  102: {
    title: "La Mataviejitas · Juana Barraza y el Circo Mediático",
    quote: "Doble vida entre el cuadrilátero de lucha libre y el terror silencioso.",
    tag: "Expedientes Negros · Crónica Criminal",
    collection: "true-crime",
    img: "Orange Prox.png",
    desc: "La reconstrucción periodística del caso que desconcertó a la policía capitalina por años: una asesina en serie que desafió todos los perfiles criminales tradicionales. Psicología del trauma, misoginia invertida y el frenesí de la nota roja mexicana."
  },
  103: {
    title: "El Caníbal de la Guerrero · Los Manuscritos del Poeta Caníbal",
    quote: "Cuando el delirio literario se convirtió en un matadero clandestino.",
    tag: "Expedientes Negros · Perfil Psiquiátrico",
    collection: "true-crime",
    img: "Orange Prox.png",
    desc: "José Luis Calva Zepeda se presentaba como dramaturgo y poeta bohemio. Este documental examina la mente de un narcisista patológico, los archivos desclasificados de la fiscalía y los límites entre la fascinación morbosa y la tragedia humana."
  },

  // COLECCIÓN 3: PANTALLA DE CULTO (Cine, Maestros & Backstage)
  201: {
    title: "Macario · La Muerte en Blanco y Negro",
    quote: "El pacto de Roberto Gavaldón con el destino cinematográfico.",
    tag: "Pantalla de Culto · Historia del Cine",
    collection: "cine",
    img: "Orange Prox.png",
    desc: "Retrospectiva profunda sobre la primera película mexicana nominada al Oscar. La alquimia visual de Gabriel Figueroa, el guion de B. Traven y el misticismo mexicano filmado en las grutas de Cacahuamilpa como testamento inmortal del séptimo arte."
  },
  202: {
    title: "Cine de Oro Desclasificado · Luces, Censura y Traición",
    quote: "Lo que nunca se reveló frente a las cámaras de los estudios Churubusco.",
    tag: "Pantalla de Culto · Backstage Histórico",
    collection: "cine",
    img: "Orange Prox.png",
    desc: "Secretos de producción, pactos políticos presidenciales, luchas sindicales fratricidas y escándalos de alcoba que sostuvieron y derribaron el imperio cinematográfico más influyente de habla hispana durante mediados del siglo XX."
  },
  203: {
    title: "El Nuevo Hollywood Latino · Directores sin Fronteras",
    quote: "De los foros de la UNAM a conquistar la noche de la Academia.",
    tag: "Pantalla de Culto · Cineastas de Élite",
    collection: "cine",
    img: "Orange Prox.png",
    desc: "Cómo una generación de realizadores y fotógrafos mexicanos redefinió el lenguaje visual del cine contemporáneo mundial: plano secuencia, realismo mágico visceral y una disciplina técnica inflexible que obligó a Hollywood a rendirse a sus pies."
  },

  // COLECCIÓN 4: VISIONARIOS (Historias Únicas de Éxito & Fenómenos Trending)
  301: {
    title: "El Imperio Unicornio · Cómo Nació el Negocio Trending",
    quote: "El algoritmo del hype: construir millones desde un smartphone.",
    tag: "Visionarios · Business & Tech",
    collection: "visionarios",
    img: "Orange Prox.png",
    desc: "La radiografía sin censura de los nuevos magnates de la era digital y creadores que transformaron comunidades virales en monopolios de consumo. Negociaciones a puerta cerrada, rondas de inversión salvajes y el desgaste mental del éxito instantáneo."
  },
  302: {
    title: "Oskava · La Resurrección Callejera",
    quote: "De los callejones del barrio al estudio más avanzado de Orchata.",
    tag: "Visionarios · Cultura Trending",
    collection: "visionarios",
    img: "Oskava 2.0.jpeg",
    desc: "La crónica cruda y visceral del ascenso de Oskava en el panorama del rap urbano. Un relato de supervivencia, lealtad barrial y la transformación de la rabia en música que conecta con millones de escuchas de nueva generación."
  },
  303: {
    title: "Maestros del Caos · Los Creadores que Hackearon la Atención",
    quote: "En la economía moderna, quien domina la atención domina el mercado.",
    tag: "Visionarios · Fenómeno Cultural",
    collection: "visionarios",
    img: "Orange Prox.png",
    desc: "Un estudio antropológico y audiovisual de los personajes más virales de la última década. Qué hilos psicológicos mueven las masas, cómo monetizar la polémica y cuál es el precio real de permanecer relevante en la pantalla."
  }
};

function openDocModal(id) {
  const data = DOCS_DATA[id];
  if (!data) return;

  const modal = document.getElementById('doc-modal');
  if (!modal) return;

  const basePath = window.location.pathname.includes('/pages/') ? '../assets/images/' : 'assets/images/';
  
  const imgEl = document.getElementById('modal-img');
  const tagEl = document.getElementById('modal-tag');
  const titleEl = document.getElementById('modal-title');
  const quoteEl = document.getElementById('modal-quote');
  const descEl = document.getElementById('modal-desc');

  const imgFileName = data.img ? data.img : `${id}.png`;
  if (imgEl) imgEl.src = `${basePath}${imgFileName}`;
  if (tagEl) tagEl.textContent = `ORCHATA ORIGINALS · ${data.tag}`;
  if (titleEl) titleEl.textContent = data.title;
  if (quoteEl) quoteEl.textContent = `"${data.quote}"`;
  if (descEl) descEl.textContent = data.desc;

  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function filterCollection(category, btnElement) {
  const cards = document.querySelectorAll('.doc-item-filterable');
  const buttons = document.querySelectorAll('.col-filter-pill');
  
  buttons.forEach(btn => btn.classList.remove('active'));
  if (btnElement) btnElement.classList.add('active');

  cards.forEach(card => {
    const cardCat = card.getAttribute('data-collection');
    if (category === 'all' || cardCat === category) {
      card.style.display = '';
      setTimeout(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, 50);
    } else {
      card.style.opacity = '0';
      card.style.transform = 'translateY(15px)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 250);
    }
  });
}

function closeDocModal() {
  const modal = document.getElementById('doc-modal');
  if (modal) {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }
}

// Close modal on click outside or escape key
document.addEventListener('click', (e) => {
  const modal = document.getElementById('doc-modal');
  if (modal && e.target === modal) {
    closeDocModal();
  }
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeDocModal();
    closeGymPopup();
    closeOrchataPromo();
  }
});

// BIND DE POP-UPS EN DOMCONTENTLOADED
document.addEventListener('DOMContentLoaded', () => {
  // 1. Popup central de Gyms (index.html)
  const gymPopup = document.getElementById('gym-popup-overlay');
  if (gymPopup) {
    const gymClose = document.getElementById('gym-popup-close');
    const gymDismiss = document.getElementById('gym-popup-dismiss');
    const gymCta = document.getElementById('gym-popup-cta');

    if (gymClose) gymClose.addEventListener('click', closeGymPopup);
    if (gymDismiss) gymDismiss.addEventListener('click', closeGymPopup);
    if (gymCta) gymCta.addEventListener('click', closeGymPopup);
    gymPopup.addEventListener('click', (e) => {
      if (e.target === gymPopup) closeGymPopup();
    });
  }

  // 2. Sistema de Pop-ups Rotativos Inferiores (Cada página muestra uno diferente tras 20s)
  try {
    let promoIndex = parseInt(sessionStorage.getItem('orchata_promo_index') || '0', 10);
    if (isNaN(promoIndex) || promoIndex >= ORCHATA_ROTATING_PROMOS.length) {
      promoIndex = 0;
    }

    const currentPromoData = ORCHATA_ROTATING_PROMOS[promoIndex];
    injectOrchataCornerPromo(currentPromoData);

    // Avanzar el índice para la siguiente página que visite el usuario
    sessionStorage.setItem('orchata_promo_index', (promoIndex + 1) % ORCHATA_ROTATING_PROMOS.length);

    // Disparar a los 20 segundos
    setTimeout(() => {
      openOrchataPromo();
    }, 20000);
  } catch (err) {
    console.error('Error inicializando promo rotativa:', err);
  }
});






