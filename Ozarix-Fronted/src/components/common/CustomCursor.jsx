import React, { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const canvasRef = useRef(null);

  // Motion values for actual cursor coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Springs configuration to create the trailing/drag lag effect
  const springConfig = { damping: 30, stiffness: 220, mass: 0.8 };
  
  // Outer circle trailing with spring physics
  const trailingX = useSpring(mouseX, springConfig);
  const trailingY = useSpring(mouseY, springConfig);

  // Inner dot trailing with less damping (follows more closely)
  const dotX = useSpring(mouseX, { damping: 20, stiffness: 350 });
  const dotY = useSpring(mouseY, { damping: 20, stiffness: 350 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles = [];
    let lastMousePos = { x: -100, y: -100 };
    let isMouseDownLocal = false;
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const brandColors = [
      { rgb: '255, 122, 0', hex: '#FF7A00' },   // Orange
      { rgb: '168, 85, 247', hex: '#A855F7' },  // Purple
      { rgb: '217, 70, 239', hex: '#D946EF' }   // Pink
    ];

    class Particle {
      constructor(x, y, isDragActive = false) {
        this.x = x;
        this.y = y;
        const angle = Math.random() * Math.PI * 2;
        const speedMultiplier = isDragActive ? 1.8 : 1.0;
        const speed = (Math.random() * 1.5 + 0.3) * speedMultiplier;
        this.vx = Math.cos(angle) * speed * 0.4;
        this.vy = Math.sin(angle) * speed * 0.4 - (isDragActive ? 0.3 : 0.15); // drift upward more when dragging
        this.size = (Math.random() * 3.5 + 1.5) * (isDragActive ? 1.4 : 1.0);
        const colorObj = brandColors[Math.floor(Math.random() * brandColors.length)];
        this.colorRGB = colorObj.rgb;
        this.glowHex = colorObj.hex;
        this.alpha = 1.0;
        this.decay = (0.012 + Math.random() * 0.015) * (isDragActive ? 0.8 : 1.0); // particles last longer when dragging
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= this.decay;
        if (this.size > 0.05) {
          this.size -= 0.05;
        }
      }

      draw() {
        ctx.save();
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(0.1, this.size), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.colorRGB}, ${this.alpha})`;
        ctx.shadowBlur = this.size * 2.5;
        ctx.shadowColor = this.glowHex;
        ctx.fill();
        ctx.restore();
      }
    }

    const handleMouseDown = () => {
      isMouseDownLocal = true;
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      isMouseDownLocal = false;
      setIsDragging(false);
    };

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;
      mouseX.set(x);
      mouseY.set(y);
      
      if (!isVisible) {
        setIsVisible(true);
      }

      // Only spawn particles if the cursor is moving at a reasonable speed
      const dist = Math.hypot(x - lastMousePos.x, y - lastMousePos.y);
      if (dist > 6) {
        const threshold = isMouseDownLocal ? 4 : 6;
        const maxCount = isMouseDownLocal ? 5 : 3;
        const count = Math.min(maxCount, Math.floor(dist / threshold));
        for (let i = 0; i < count; i++) {
          const jitterX = (Math.random() - 0.5) * (isMouseDownLocal ? 6 : 4);
          const jitterY = (Math.random() - 0.5) * (isMouseDownLocal ? 6 : 4);
          particles.push(new Particle(x + jitterX, y + jitterY, isMouseDownLocal));
        }
        lastMousePos = { x, y };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      handleMouseUp();
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Listen to hovered elements to expand cursor on buttons/links
    const handleMouseOver = (e) => {
      const target = e.target;
      const isInteractive = 
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('a') || 
        target.closest('button') ||
        target.closest('.glow-hover') ||
        target.classList.contains('cursor-pointer');
      
      setIsHovered(!!isInteractive);
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        if (p.alpha <= 0 || p.size <= 0.1) {
          particles.splice(i, 1);
        } else {
          p.draw();
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('dragstart', handleMouseDown);
    window.addEventListener('dragend', handleMouseUp);
    render();

    // Hide original cursor inside application
    if (window.matchMedia('(pointer: fine)').matches) {
      document.body.style.cursor = 'none';
      
      // Inject cursor style for interactive items to keep them none
      const style = document.createElement('style');
      style.innerHTML = `
        a, button, [role="button"], select, input, textarea, .cursor-pointer {
          cursor: none !important;
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('dragstart', handleMouseDown);
      window.removeEventListener('dragend', handleMouseUp);
      cancelAnimationFrame(animationFrameId);
      document.body.style.cursor = 'unset';
    };
  }, [isVisible, mouseX, mouseY]);

  // Disable on mobile/touch screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(!window.matchMedia('(pointer: fine)').matches);
  }, []);

  if (isMobile || !isVisible) return null;

  return (
    <>
      {/* Particle Trail Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-[9999] mix-blend-screen"
      />

      {/* 1. Trailing Outer Ring (Drag Lag Effect) */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-brand-orange pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: isDragging
            ? '0 0 22px rgba(217, 70, 239, 0.7)'
            : isHovered
              ? '0 0 15px rgba(255, 122, 0, 0.4)'
              : 'none',
          borderColor: isDragging
            ? '#D946EF'
            : isHovered
              ? '#A855F7'
              : '#FF7A00',
          borderWidth: isDragging ? '3px' : '1px',
        }}
        animate={{
          scale: isDragging ? 0.75 : (isHovered ? 1.5 : 1),
          backgroundColor: isDragging
            ? 'rgba(217, 70, 239, 0.15)'
            : isHovered
              ? 'rgba(168, 85, 247, 0.1)'
              : 'rgba(0, 0, 0, 0)',
          borderRadius: isDragging ? '35%' : '50%',
          rotate: isDragging ? 45 : 0,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      />

      {/* 2. Inner Glowing Core Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-brand-purple rounded-full pointer-events-none z-[10000] mix-blend-screen"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: isDragging
            ? '0 0 16px rgba(255, 122, 0, 0.9)'
            : '0 0 8px rgba(168, 85, 247, 0.8)',
        }}
        animate={{
          scale: isDragging ? 1.6 : (isHovered ? 0.6 : 1),
          backgroundColor: isDragging
            ? '#FF7A00'
            : isHovered
              ? '#FF7A00'
              : '#A855F7',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      />
    </>
  );
};

export default CustomCursor;
