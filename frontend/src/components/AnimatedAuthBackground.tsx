'use client';

import { useEffect, useRef } from 'react';

interface FloatingElement {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
  color: string;
  type: 'circle' | 'square' | 'triangle';
}

const AnimatedAuthBackground = ({ isDark = false }: { isDark?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const elementsRef = useRef<FloatingElement[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const createElement = (id: number): FloatingElement => ({
      id,
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 8 + 4,
      speedX: (Math.random() - 0.5) * 0.5,
      speedY: (Math.random() - 0.5) * 0.5,
      opacity: Math.random() * 0.6 + 0.2,
      color: isDark 
        ? ['#3b82f6', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'][Math.floor(Math.random() * 5)]
        : ['#e0e7ff', '#ddd6fe', '#cffafe', '#dcfce7', '#fef3c7'][Math.floor(Math.random() * 5)],
      type: ['circle', 'square', 'triangle'][Math.floor(Math.random() * 3)] as 'circle' | 'square' | 'triangle'
    });

    const initElements = () => {
      elementsRef.current = Array.from({ length: isDark ? 30 : 20 }, (_, i) => createElement(i));
    };

    const updateElements = () => {
      elementsRef.current.forEach(element => {
        element.x += element.speedX;
        element.y += element.speedY;

        // Wrap around screen
        if (element.x < 0) element.x = canvas.width;
        if (element.x > canvas.width) element.x = 0;
        if (element.y < 0) element.y = canvas.height;
        if (element.y > canvas.height) element.y = 0;
      });
    };

    const drawElements = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      elementsRef.current.forEach(element => {
        ctx.save();
        ctx.globalAlpha = element.opacity;
        ctx.fillStyle = element.color;
        
        if (element.type === 'circle') {
          ctx.beginPath();
          ctx.arc(element.x, element.y, element.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (element.type === 'square') {
          ctx.fillRect(element.x - element.size/2, element.y - element.size/2, element.size, element.size);
        } else if (element.type === 'triangle') {
          ctx.beginPath();
          ctx.moveTo(element.x, element.y - element.size);
          ctx.lineTo(element.x - element.size, element.y + element.size);
          ctx.lineTo(element.x + element.size, element.y + element.size);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });

      // Draw connections for dark mode
      if (isDark) {
        elementsRef.current.forEach((element, i) => {
          elementsRef.current.slice(i + 1).forEach(otherElement => {
            const dx = element.x - otherElement.x;
            const dy = element.y - otherElement.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 120) {
              ctx.beginPath();
              ctx.moveTo(element.x, element.y);
              ctx.lineTo(otherElement.x, otherElement.y);
              ctx.strokeStyle = element.color;
              ctx.globalAlpha = (120 - distance) / 120 * 0.3;
              ctx.lineWidth = 1;
              ctx.stroke();
            }
          });
        });
      }

      ctx.globalAlpha = 1;
    };

    const animate = () => {
      updateElements();
      drawElements();
      animationRef.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initElements();
    animate();

    window.addEventListener('resize', resizeCanvas);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isDark]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ background: 'transparent' }}
      />
      
      {/* Additional decorative elements */}
      {!isDark && (
        <>
          {/* Light mode decorative elements */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full blur-3xl opacity-30 animate-pulse" />
          <div className="absolute top-1/3 right-1/4 w-24 h-24 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full blur-2xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-1/3 left-1/3 w-28 h-28 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-1/4 right-1/3 w-20 h-20 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full blur-2xl opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
        </>
      )}
    </div>
  );
};

export default AnimatedAuthBackground;
