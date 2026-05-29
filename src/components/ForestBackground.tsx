'use client';

import React, { useEffect, useState } from 'react';

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  spinSpeed: number;
  leafType: number;
}

interface Firefly {
  id: number;
  left: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
}

export default function ForestBackground() {
  const [mounted, setMounted] = useState(false);
  const [leaves, setLeaves] = useState<Leaf[]>([]);
  const [fireflies, setFireflies] = useState<Firefly[]>([]);

  useEffect(() => {
    setMounted(true);

    // Generate random leaves
    const newLeaves: Leaf[] = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100, // percentage
      delay: Math.random() * 15, // seconds delay
      duration: 12 + Math.random() * 15, // seconds to fall
      size: 12 + Math.random() * 16, // pixels
      spinSpeed: 5 + Math.random() * 8, // seconds spin
      leafType: Math.floor(Math.random() * 3),
    }));
    setLeaves(newLeaves);

    // Generate random fireflies
    const newFireflies: Firefly[] = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: 10 + Math.random() * 80,
      size: 2.5 + Math.random() * 3.5,
      duration: 7 + Math.random() * 9,
      delay: Math.random() * 10,
    }));
    setFireflies(newFireflies);
  }, []);

  if (!mounted) return null;

  return (
    <div className="forest-bg-container" aria-hidden="true">
      {/* Sunbeams */}
      <div className="sunbeams">
        <div className="sunbeam sunbeam-1" />
        <div className="sunbeam sunbeam-2" />
        <div className="sunbeam sunbeam-3" />
      </div>

      {/* Fireflies */}
      <div className="fireflies">
        {fireflies.map((ff) => (
          <div
            key={ff.id}
            className="firefly"
            style={{
              left: `${ff.left}%`,
              top: `${ff.top}%`,
              width: `${ff.size}px`,
              height: `${ff.size}px`,
              animationDuration: `${ff.duration}s`,
              animationDelay: `${ff.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Falling Leaves */}
      <div className="falling-leaves">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="leaf-wrapper"
            style={{
              left: `${leaf.left}%`,
              animationDuration: `${leaf.duration}s`,
              animationDelay: `${leaf.delay}s`,
            }}
          >
            <svg
              className="leaf"
              width={leaf.size}
              height={leaf.size}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              style={{
                animationDuration: `${leaf.spinSpeed}s`,
                color:
                  leaf.leafType === 0
                    ? 'var(--accent)'
                    : leaf.leafType === 1
                    ? 'color-mix(in srgb, var(--accent) 70%, var(--text))'
                    : 'color-mix(in srgb, var(--accent) 45%, #d97706)', // gold/orange
              }}
            >
              <path
                d="M2 22C2 22 8 20 12 16C16 12 22 10 22 2C22 2 14 2 10 6C6 10 2 16 2 22Z"
                fill="currentColor"
                fillOpacity="0.18"
              />
              <path d="M2 22L12 12" />
              <path d="M7 15C9 14 10 13 10 13" />
              <path d="M12 10C14 9 15 8 15 8" />
            </svg>
          </div>
        ))}
      </div>
    </div>
  );
}
