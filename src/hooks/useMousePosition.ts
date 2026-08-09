import { useEffect, useRef } from "react";

export function useMousePosition() {
  const mouse = useRef({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    normalizedX: 0,
    normalizedY: 0,
  });

  useEffect(() => {
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
      mouse.current.x = lerp(mouse.current.x, mouse.current.targetX, 0.1);
      mouse.current.y = lerp(mouse.current.y, mouse.current.targetY, 0.1);
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
