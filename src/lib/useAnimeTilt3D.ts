import { useEffect, type RefObject } from "react";
import { createAnimatable, type AnimatableObject } from "animejs";

interface UseAnimeTilt3DOptions {
  stageRef: RefObject<HTMLElement | null>;
  planeRef: RefObject<HTMLElement | null>;
  backdropRef?: RefObject<HTMLElement | null>;
  enabled?: boolean;
  maxTilt?: number;
  backdropShift?: number;
}

export function useAnimeTilt3D({
  stageRef,
  planeRef,
  backdropRef,
  enabled = true,
  maxTilt = 6,
  backdropShift = 12,
}: UseAnimeTilt3DOptions) {
  useEffect(() => {
    if (!enabled) return;
    if (typeof window === "undefined") return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const finePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;

    if (reduceMotion || !finePointer) return;

    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane) return;

    const planeAnim: AnimatableObject = createAnimatable(plane, {
      rotateX: { duration: 420, unit: "deg" },
      rotateY: { duration: 420, unit: "deg" },
      ease: "outExpo",
    });

    const backdrop = backdropRef?.current ?? null;
    const backdropAnim: AnimatableObject | null = backdrop
      ? createAnimatable(backdrop, {
          x: { duration: 460, unit: "px" },
          y: { duration: 460, unit: "px" },
          ease: "outExpo",
        })
      : null;

    const handlePointerMove = (event: PointerEvent) => {
      const rect = stage.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      const nx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((event.clientY - rect.top) / rect.height) * 2 - 1;
      const clampedX = Math.max(-1, Math.min(1, nx));
      const clampedY = Math.max(-1, Math.min(1, ny));

      planeAnim.rotateX(-clampedY * maxTilt);
      planeAnim.rotateY(clampedX * maxTilt);

      if (backdropAnim) {
        backdropAnim.x(-clampedX * backdropShift);
        backdropAnim.y(-clampedY * backdropShift);
      }
    };

    const handlePointerLeave = () => {
      planeAnim.rotateX(0);
      planeAnim.rotateY(0);
      if (backdropAnim) {
        backdropAnim.x(0);
        backdropAnim.y(0);
      }
    };

    stage.addEventListener("pointermove", handlePointerMove);
    stage.addEventListener("pointerleave", handlePointerLeave);

    return () => {
      stage.removeEventListener("pointermove", handlePointerMove);
      stage.removeEventListener("pointerleave", handlePointerLeave);
      planeAnim.revert();
      backdropAnim?.revert();
    };
  }, [stageRef, planeRef, backdropRef, enabled, maxTilt, backdropShift]);
}
