"use client";

import Topography from "@/components/Topography";

export function PageBackground() {
  return (
    <div className="page-background" aria-hidden>
      <Topography
        lightMode={false}
        lowColor="#27272a"
        midColor="#71717a"
        highColor="#e4e4e7"
        colorMode="elevation"
        mouseInteraction
        speed={0.35}
        morphAmount={0.4}
        bands={12}
        thickness={1.2}
        glow={0.3}
        contrast={1.2}
        brightness={1.1}
        opacity={1}
        grain={false}
      />
    </div>
  );
}
