import { useEffect, useRef } from "react";

export interface MouseState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  normalizedX: number;
  normalizedY: number;
  vx: number;
  vy: number;
  speed: number;
  angle: number;
  trail: Array<{ x: number; y: number }>;
}

export function useMousePosition() {
  const mouse = useRef<MouseState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    normalizedX: 0,
    normalizedY: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    angle: 0,
    trail: [],
  });

  useEffect(() => {
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouse.current.targetX = e.clientX;
      mouse.current.targetY = e.clientY;
      mouse.current.normalizedX = (e.clientX / innerWidth) * 2 - 1;
      mouse.current.normalizedY = -(e.clientY / innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    let animationFrameId: number;
    const lerp = (start: number, end: number, factor: number) => start + (end - start) * factor;

    const update = () => {
      const currentX = lerp(mouse.current.x, mouse.current.targetX, 0.15);
      const currentY = lerp(mouse.current.y, mouse.current.targetY, 0.15);

      // Velocity calculation
      const vx = currentX - lastX;
      const vy = currentY - lastY;
      const speed = Math.sqrt(vx * vx + vy * vy);
      const angle = Math.atan2(vy, vx);

      mouse.current.x = currentX;
      mouse.current.y = currentY;
      mouse.current.vx = vx;
      mouse.current.vy = vy;
      mouse.current.speed = speed;
      mouse.current.angle = angle;

      // Update trail points
      const trail = mouse.current.trail;
      trail.unshift({ x: currentX, y: currentY });
      if (trail.length > 5) trail.pop();

      lastX = currentX;
      lastY = currentY;

      animationFrameId = requestAnimationFrame(update);
    };

    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return mouse;
}
