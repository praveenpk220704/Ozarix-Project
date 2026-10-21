import React, { useEffect, useRef } from 'react';

const SpaceCanvas = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let stars = [];
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    // Star constructor
    class Star {
      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 1.5;
        this.twinkleSpeed = 0.01 + Math.random() * 0.02;
        this.alpha = Math.random();
        this.direction = Math.random() > 0.5 ? 1 : -1;
        this.speedX = (Math.random() - 0.5) * 0.05;
        this.speedY = (Math.random() - 0.5) * 0.05;
      }

      draw() {
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }

      update() {
        // Subtle twinking alpha
        this.alpha += this.twinkleSpeed * this.direction;
        if (this.alpha >= 1 || this.alpha <= 0.1) {
          this.direction *= -1;
        }

        // Parallax drift with mouse positions
        const offsetX = (mouseRef.current.x - width / 2) * (this.size * 0.012);
        const offsetY = (mouseRef.current.y - height / 2) * (this.size * 0.012);

        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around bounds
        if (this.x < 0) this.x = width;
        if (this.x > width) this.x = 0;
        if (this.y < 0) this.y = height;
        if (this.y > height) this.y = 0;

        // Temporary visual draw with offset
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha * 0.75})`;
        ctx.beginPath();
        ctx.arc(this.x + offsetX, this.y + offsetY, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Initialize stars list
    const initStars = () => {
      stars = [];
      const density = Math.floor((width * height) / 9000);
      const starCount = Math.max(density, 80);
      for (let i = 0; i < starCount; i++) {
        stars.push(new Star());
      }
    };

    initStars();

    // Mouse listener coordinates tracker
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = e.clientX - rect.left;
      mouseRef.current.targetY = e.clientY - rect.top;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Resize coordinate grids
    const handleResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initStars();
    };

    // Resize observer to handle container changes
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(canvas.parentElement || canvas);

    // Nebula glow circles coordinates
    let nebulaAngle = 0;

    // Loop renderer
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Smooth mouse interpolation (spring physics for camera)
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // Draw interactive deep nebula backdrops
      nebulaAngle += 0.0008;
      const nebulaX1 = width / 2 + Math.cos(nebulaAngle) * (width * 0.15);
      const nebulaY1 = height / 2 + Math.sin(nebulaAngle * 1.5) * (height * 0.1);
      
      const nebulaX2 = width / 2 + Math.sin(-nebulaAngle * 1.2) * (width * 0.12);
      const nebulaY2 = height / 2 + Math.cos(nebulaAngle * 0.8) * (height * 0.12);

      // Draw Purple Nebula Glow
      const gradPurple = ctx.createRadialGradient(
        nebulaX1 + (mouseRef.current.x - width / 2) * 0.05, 
        nebulaY1 + (mouseRef.current.y - height / 2) * 0.05, 
        0, 
        nebulaX1, 
        nebulaY1, 
        Math.max(width * 0.35, 250)
      );
      gradPurple.addColorStop(0, 'rgba(168, 85, 247, 0.07)');
      gradPurple.addColorStop(0.5, 'rgba(217, 70, 239, 0.02)');
      gradPurple.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradPurple;
      ctx.fillRect(0, 0, width, height);

      // Draw Orange Nebula Glow
      const gradOrange = ctx.createRadialGradient(
        nebulaX2 + (mouseRef.current.x - width / 2) * -0.04, 
        nebulaY2 + (mouseRef.current.y - height / 2) * -0.04, 
        0, 
        nebulaX2, 
        nebulaY2, 
        Math.max(width * 0.3, 200)
      );
      gradOrange.addColorStop(0, 'rgba(255, 122, 0, 0.06)');
      gradOrange.addColorStop(0.5, 'rgba(168, 85, 247, 0.02)');
      gradOrange.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradOrange;
      ctx.fillRect(0, 0, width, height);

      // Update and draw stars
      stars.forEach((star) => star.update());

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-0 block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SpaceCanvas;
