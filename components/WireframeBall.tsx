"use client";

import { useEffect, useRef } from "react";
import "@/css/wireframe-ball.css";

type Vec3 = [number, number, number];

type Label = {
  name: string;
  color: string;
  day: string;
  size: number;
};

const labels: Label[] = [
  { name: "反问题", color: "#fb7185", day: "#e11d48", size: 22 },
  { name: "深度学习", color: "#7dd3fc", day: "#0369a1", size: 18 },
  { name: "扩散模型", color: "#d8b4fe", day: "#7e22ce", size: 16 },
  { name: "Python", color: "#fde047", day: "#a16207", size: 20 },
  { name: "PyTorch", color: "#fdba74", day: "#c2410c", size: 15 },
  { name: "世界模型", color: "#6ee7b7", day: "#047857", size: 19 },
  { name: "多模态", color: "#a5b4fc", day: "#4338ca", size: 23 },
  { name: "高性能计算", color: "#f9a8d4", day: "#be185d", size: 13 },
  { name: "图谱理论", color: "#bef264", day: "#4d7c0f", size: 17 },
  { name: "全栈开发", color: "#5eead4", day: "#0f766e", size: 14 },
  { name: "PDE", color: "#e879f9", day: "#a21caf", size: 20 },
];

function mesh() {
  const verts: Vec3[] = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let index = 0; index < labels.length; index += 1) {
    const y = 1 - (index / (labels.length - 1)) * 2;
    const radius = Math.sqrt(1 - y * y);
    const theta = golden * index;
    verts.push([Math.cos(theta) * radius, y, Math.sin(theta) * radius]);
  }

  const edges: [number, number][] = [];
  const seen = new Set<string>();
  for (let index = 0; index < verts.length; index += 1) {
    const nearest = verts
      .map((vert, other) => {
        const dx = vert[0] - verts[index][0];
        const dy = vert[1] - verts[index][1];
        const dz = vert[2] - verts[index][2];
        return { other, distance: dx * dx + dy * dy + dz * dz };
      })
      .filter((item) => item.other !== index)
      .sort((left, right) => left.distance - right.distance)
      .slice(0, 3);
    for (const item of nearest) {
      const key = index < item.other ? `${index}-${item.other}` : `${item.other}-${index}`;
      if (seen.has(key)) continue;
      seen.add(key);
      edges.push([index, item.other]);
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

    const { verts, edges } = mesh();
    let yaw = 0.5;
    let pitch = 0.25;
    let velocityYaw = 0.003;
    let velocityPitch = 0.001;
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
      velocityYaw = dx * 0.01;
      velocityPitch = dy * 0.01;
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
        yaw += 0.003 + velocityYaw;
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
      const day = document.documentElement.dataset.theme === "day";
      const fontFamily = getComputedStyle(canvas).fontFamily;

      const points = verts.map(([x, y, z]) => {
        const x1 = x * cosYaw - z * sinYaw;
        const z1 = x * sinYaw + z * cosYaw;
        const y2 = y * cosPitch - z1 * sinPitch;
        const z2 = y * sinPitch + z1 * cosPitch;
        const depth = (z2 + 2.2) / 4.4;
        return {
          x: width / 2 + x1 * scale,
          y: height / 2 + y2 * scale,
          depth,
        };
      });

      const placed = points.map((point, index) => {
        const label = labels[index];
        const size = label.size * (0.82 + point.depth * 0.32);
        context.font = `600 ${size}px ${fontFamily}`;
        return {
          ...point,
          label,
          size,
          textWidth: context.measureText(label.name).width,
        };
      });
      const ordered = [...placed].sort((left, right) => left.depth - right.depth);

      for (let step = 0; step < 24; step += 1) {
        for (let i = 0; i < ordered.length; i += 1) {
          for (let j = i + 1; j < ordered.length; j += 1) {
            const left = ordered[i];
            const right = ordered[j];
            const dx = right.x - left.x;
            const dy = right.y - left.y;
            const overlapX = (left.textWidth + right.textWidth) / 2 + 8 - Math.abs(dx);
            const overlapY = (left.size + right.size) / 2 + 6 - Math.abs(dy);
            if (overlapX <= 0 || overlapY <= 0) continue;
            if (overlapX < overlapY) {
              const sign = dx === 0 ? (i < j ? -1 : 1) : Math.sign(dx);
              const push = overlapX / 2;
              left.x -= sign * push;
              right.x += sign * push;
            } else {
              const sign = dy === 0 ? (i < j ? -1 : 1) : Math.sign(dy);
              const push = overlapY / 2;
              left.y -= sign * push;
              right.y += sign * push;
            }
          }
        }
      }

      const contain = (point: (typeof ordered)[number]) => {
        const half = point.textWidth / 2 + 2;
        point.x = Math.min(width - half, Math.max(half, point.x));
        point.y = Math.min(height - point.size / 2 - 2, Math.max(point.size / 2 + 2, point.y));
      };
      for (const point of ordered) contain(point);

      const ink = getComputedStyle(canvas).color.match(/[\d.]+/g) ?? ["244", "244", "245"];
      const [red, green, blue] = ink;
      context.lineCap = "round";
      context.shadowBlur = 0;
      context.globalAlpha = 1;
      for (const [start, end] of edges) {
        const depth = (placed[start].depth + placed[end].depth) / 2;
        context.strokeStyle = `rgba(${red}, ${green}, ${blue}, ${0.22 + depth * 0.38})`;
        context.lineWidth = 1;
        context.beginPath();
        context.moveTo(placed[start].x, placed[start].y);
        context.lineTo(placed[end].x, placed[end].y);
        context.stroke();
      }

      context.textAlign = "center";
      context.textBaseline = "middle";
      for (const point of ordered) {
        context.font = `600 ${point.size}px ${fontFamily}`;
        context.shadowColor = day ? "rgba(250, 249, 247, 0.95)" : "rgba(0, 0, 0, 0.88)";
        context.shadowBlur = 8;
        context.fillStyle = day ? point.label.day : point.label.color;
        context.globalAlpha = 0.72 + point.depth * 0.28;
        context.fillText(point.label.name, point.x, point.y);
      }

      context.globalAlpha = 1;
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

  return (
    <canvas
      ref={canvasRef}
      className="wireframe-ball"
      aria-label={labels.map((label) => label.name).join("、")}
    />
  );
}
