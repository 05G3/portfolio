"use client"

import { useEffect, useRef } from "react"

export function BackgroundAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    let app: any = null

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
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 1 }}
    />
  )
}
