"use client";

import { useEffect, useRef } from "react";
import "@/css/wireframe-ball.css";

const PHI = (1 + Math.sqrt(5)) / 2;

type Vec3 = [number, number, number];

function icosahedron() {
  const verts: Vec3[] = [];
  for (const y of [-1, 1]) {
    for (const z of [-PHI, PHI]) verts.push([0, y, z]);
  }
  for (const x of [-1, 1]) {
    for (const y of [-PHI, PHI]) verts.push([x, y, 0]);
  }
  for (const z of [-1, 1]) {
    for (const x of [-PHI, PHI]) verts.push([x, 0, z]);
  }

  const edges: [number, number][] = [];
  for (let i = 0; i < verts.length; i += 1) {
    for (let j = i + 1; j < verts.length; j += 1) {
      const dx = verts[i][0] - verts[j][0];
      const dy = verts[i][1] - verts[j][1];
      const dz = verts[i][2] - verts[j][2];
      const distance = dx * dx + dy * dy + dz * dz;
      if (distance > 3.5 && distance < 4.5) edges.push([i, j]);
    }
  }

  return { verts, edges };
}

export default function WireframeBall() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const { verts, edges } = icosahedron();
    let yaw = 0.5;
    let pitch = 0.25;
    let velocityYaw = 0.004;
    let velocityPitch = 0.0015;
    let pointerX = 0;
    let pointerY = 0;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    const onPointerDown = (event: PointerEvent) => {
      dragging = true;
      lastX = event.clientX;
      lastY = event.clientY;
      canvas.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width - 0.5;
      pointerY = (event.clientY - rect.top) / rect.height - 0.5;
      if (!dragging) return;
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
      lastX = event.clientX;
      lastY = event.clientY;
      velocityYaw = dx * 0.012;
      velocityPitch = dy * 0.012;
      yaw += velocityYaw;
      pitch += velocityPitch;
    };

    const endDrag = () => {
      dragging = false;
    };

    const onPointerLeave = () => {
      if (!dragging) {
        pointerX = 0;
        pointerY = 0;
      }
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerup", endDrag);
    canvas.addEventListener("pointercancel", endDrag);
    canvas.addEventListener("pointerleave", onPointerLeave);

    let frame = 0;
    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      context.clearRect(0, 0, width, height);

      if (!dragging) {
        yaw += 0.005 + velocityYaw;
        pitch += velocityPitch;
        velocityYaw *= 0.94;
        velocityPitch *= 0.94;
      }

      const turnedYaw = yaw + pointerX * 0.7;
      const turnedPitch = pitch + pointerY * 0.5;
      const cosYaw = Math.cos(turnedYaw);
      const sinYaw = Math.sin(turnedYaw);
      const cosPitch = Math.cos(turnedPitch);
      const sinPitch = Math.sin(turnedPitch);
      const scale = Math.min(width, height) * 0.26;

      const points = verts.map(([x, y, z]) => {
        const stretchedY = y * 1.12;
        const x1 = x * cosYaw - z * sinYaw;
        const z1 = x * sinYaw + z * cosYaw;
        const y2 = stretchedY * cosPitch - z1 * sinPitch;
        const z2 = stretchedY * sinPitch + z1 * cosPitch;
        const depth = (z2 + 2.6) / 5.2;
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          depth,
        };
      });

      const strokes = edges
        .map(([start, end]) => ({
          start: points[start],
          end: points[end],
          depth: (points[start].depth + points[end].depth) / 2,
        }))
        .sort((left, right) => left.depth - right.depth);

      context.lineCap = "round";
      for (const stroke of strokes) {
        context.strokeStyle = `rgba(244, 244, 245, ${0.28 + stroke.depth * 0.72})`;
        context.lineWidth = 0.8 + stroke.depth * 1.4;
        context.shadowColor = `rgba(122, 162, 255, ${0.2 + stroke.depth * 0.7})`;
        context.shadowBlur = 6 + stroke.depth * 10;
        context.beginPath();
        context.moveTo(stroke.start.x, stroke.start.y);
        context.lineTo(stroke.end.x, stroke.end.y);
        context.stroke();
      }

      for (const point of points) {
        context.fillStyle = `rgba(250, 250, 250, ${0.45 + point.depth * 0.55})`;
        context.shadowColor = "rgba(122, 162, 255, 0.85)";
        context.shadowBlur = 12;
        context.beginPath();
        context.arc(point.x, point.y, 1.4 + point.depth * 2.4, 0, Math.PI * 2);
        context.fill();
      }

      context.shadowBlur = 0;
      frame = requestAnimationFrame(draw);
    };

    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerup", endDrag);
      canvas.removeEventListener("pointercancel", endDrag);
      canvas.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className="wireframe-ball" aria-label="Wireframe ball" />;
}
