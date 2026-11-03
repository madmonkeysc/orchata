import Foundation
import AVFoundation
import AppKit

let url = URL(fileURLWithPath: "assets/images/F1.mp4")
let asset = AVURLAsset(url: url)
let generator = AVAssetImageGenerator(asset: asset)
generator.appliesPreferredTrackTransform = true
generator.requestedTimeToleranceBefore = .zero
generator.requestedTimeToleranceAfter = .zero

let times: [Double] = [3.5, 4.0, 4.2, 4.5, 4.8, 5.0, 5.2, 5.5, 6.0]
for t in times {
    let time = CMTime(seconds: t, preferredTimescale: 600)
    if let imageRef = try? generator.copyCGImage(at: time, actualTime: nil) {
        let rep = NSBitmapImageRep(cgImage: imageRef)
        if let data = rep.representation(using: .jpeg, properties: [:]) {
            let outPath = "/tmp/f1_frame_\(String(format: "%.1f", t)).jpg"
            try? data.write(to: URL(fileURLWithPath: outPath))
            print("Saved frame at \(t)s to \(outPath), size: \(data.count) bytes")
        }
    }
}
