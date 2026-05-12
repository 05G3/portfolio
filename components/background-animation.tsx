"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let app: any = null

    // Check if device is mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || 
                   (window.innerWidth <= 768)

    // Don't load animation on mobile devices to prevent performance issues
    if (isMobile) {
      console.log('Mobile device detected - skipping background animation for better performance')
      return
    }

    const loadAnimation = async () => {
      try {
        // Dynamically load Three.js and the tubes cursor
        const script = document.createElement('script')
        script.type = 'module'
        script.textContent = `
          import TubesCursor from "https://cdn.jsdelivr.net/npm/threejs-components@0.0.19/build/cursors/tubes1.min.js";
          
          window.initTubesCursor = (canvas) => {
            const app = TubesCursor(canvas, {
              tubes: {
                colors: ["#f967fb", "#53bc28", "#6958d5"],
                lights: {
                  intensity: 200,
                  colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
                }
              }
            });
            
            document.body.addEventListener("click", () => {
              const colors = randomColors(3);
              const lightsColors = randomColors(4);
              app.tubes.setColors(colors);
              app.tubes.setLightsColors(lightsColors);
            });

            function randomColors(count) {
              return new Array(count)
                .fill(0)
                .map(
                  () =>
                    "#" +
                    Math.floor(Math.random() * 16777215)
                      .toString(16)
                      .padStart(6, "0")
                );
            }
            
            return app;
          };
        `
        document.head.appendChild(script)
        
        script.onload = () => {
          if ((window as any).initTubesCursor) {
            app = (window as any).initTubesCursor(canvas)
          }
        }
      } catch (error) {
        console.error('Failed to load animation:', error)
      }
    }

    loadAnimation()

    return () => {
      // Cleanup
      if (app && app.dispose) {
        app.dispose()
      }
    }
  }, [])

  return (
    <>
      {/* Mobile fallback gradient background */}
      <div 
        className="absolute inset-0 w-full h-full"
        style={{
          zIndex: 1,
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #6958d5 75%, #53bc28 100%)',
          display: (typeof window !== 'undefined' && window.innerWidth <= 768) ? 'block' : 'none'
        }}
      />
      
      {/* Desktop tube animation */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 1,
          // Hide canvas on mobile devices
          display: (typeof window !== 'undefined' && window.innerWidth <= 768) ? 'none' : 'block'
        }}
      />
    </>
  )
}
