
import React, { useEffect, useRef } from 'react';

interface FlowingBackgroundProps {
  className?: string;
  particleCount?: number;
  speed?: number;
  particleSize?: number;
  particleColor?: string;
  lineColor?: string;
}

export const FlowingBackground: React.FC<FlowingBackgroundProps> = ({ 
  className, 
  particleCount = 50, 
  speed = 0.5,
  particleSize = 15,
  particleColor = "rgba(243, 240, 255, 0.3)",
  lineColor = "rgba(220, 215, 240, 0.4)"
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Initial resize
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create particles
    const particlesArray: Particle[] = [];

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      opacity: number;
      hue: number;
      pulse: number;
      pulseSpeed: number;

      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * particleSize + 1;
        this.speedX = Math.random() * speed - speed/2;
        this.speedY = Math.random() * speed - speed/2;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.hue = Math.random() * 60 - 30; // For color variation
        this.pulse = 0;
        this.pulseSpeed = 0.02 + Math.random() * 0.03;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Add a subtle pulse effect
        this.pulse += this.pulseSpeed;
        if (this.pulse > Math.PI * 2) this.pulse = 0;
        
        // Add a slight size oscillation
        const sizeOscillation = Math.sin(this.pulse) * 0.5;
        
        if (this.size > 0.2) this.size -= 0.01;
        
        // Reset particles when they get too small or leave the screen
        if (this.size <= 0.2 || 
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height) {
          this.x = Math.random() * canvas.width;
          this.y = Math.random() * canvas.height;
          this.size = Math.random() * particleSize + 1;
          this.speedX = Math.random() * speed - speed/2;
          this.speedY = Math.random() * speed - speed/2;
          this.opacity = Math.random() * 0.5 + 0.1;
        }
      }

      draw() {
        // Extract base color from particleColor, with safe parsing
        const baseColorMatch = particleColor.match(/rgba?\(([^)]+)\)/);
        const baseColor = baseColorMatch 
          ? baseColorMatch[1].split(',').map(val => val.trim()) 
          : ['243', '240', '255'];
        
        // Safely parse and convert color values
        const r = Math.min(255, Math.max(0, parseInt(baseColor[0]) + this.hue));
        const g = Math.min(255, Math.max(0, parseInt(baseColor[1]) + this.hue));
        const b = Math.min(255, Math.max(0, parseInt(baseColor[2]) + this.hue));
        
        // Pulse effect on opacity
        const pulseOpacity = this.opacity * (0.8 + 0.2 * Math.sin(this.pulse));
        
        // Convert opacity to string
        const particleOpacity = String(pulseOpacity);
        
        // Calculate line opacity
        const lineOpacityValue = String(pulseOpacity * 0.5);
        
        // Set fill style with particle color
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${particleOpacity})`;
        
        // Set stroke style with line color - safely replace opacity
        let strokeStyleColor = lineColor;
        if (lineColor.includes("rgba")) {
          const lineColorParts = lineColor.match(/rgba?\(([^)]+)\)/);
          if (lineColorParts && lineColorParts[1]) {
            const parts = lineColorParts[1].split(',');
            if (parts.length >= 3) {
              strokeStyleColor = `rgba(${parts[0]}, ${parts[1]}, ${parts[2]}, ${lineOpacityValue})`;
            }
          }
        }
        
        ctx.strokeStyle = strokeStyleColor;
        ctx.lineWidth = 1;

        // Apply glow effect
        ctx.shadowBlur = 5 + 3 * Math.sin(this.pulse);
        ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
        
        // Draw the particle
        ctx.beginPath();
        // Add a slight wobble to the particle shape for organic feel
        const sizeWithPulse = this.size + Math.sin(this.pulse) * 0.5;
        ctx.arc(this.x, this.y, sizeWithPulse, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        
        // Reset shadow for next drawing
        ctx.shadowBlur = 0;
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particlesArray.push(new Particle());
    }

    // Animation loop
    const animate = () => {
      // Create a semi-transparent layer for trail effect
      ctx.fillStyle = 'rgba(10, 10, 25, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Apply a slight blur for a glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = particleColor;
      
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      
      // Connect nearby particles with lines
      connectParticles();
      
      // Reset shadow for next frame
      ctx.shadowBlur = 0;
      
      requestAnimationFrame(animate);
    };

    // Draw lines between particles that are close to each other
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let i = 0; i < particlesArray.length; i++) {
        for (let j = i; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            // Calculate opacity based on distance
            const opacity = 1 - (distance / maxDistance);
            
            // Extract base color from lineColor
            let r = 220, g = 215, b = 240; // Default color
            const baseColorMatch = lineColor.match(/rgba?\(([^)]+)\)/);
            if (baseColorMatch && baseColorMatch[1]) {
              const parts = baseColorMatch[1].split(',');
              if (parts.length >= 3) {
                r = parseInt(parts[0].trim());
                g = parseInt(parts[1].trim());
                b = parseInt(parts[2].trim());
              }
            }
            
            // Convert to string for stroke style
            const lineOpacityStr = String(opacity * 0.8);
            
            ctx.beginPath();
            ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineOpacityStr})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [particleCount, speed, particleSize, particleColor, lineColor]);

  return (
    <canvas 
      ref={canvasRef} 
      className={`fixed top-0 left-0 w-full h-full -z-10 ${className || ''}`}
    />
  );
};
