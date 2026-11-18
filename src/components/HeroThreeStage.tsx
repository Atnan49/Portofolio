import { useEffect, useRef, type MutableRefObject } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createTimeline, spring, cubicBezier } from "animejs";

export type HeroStageStatus = "loading" | "ready" | "fallback";

interface HeroThreeStageProps {
  reducedMotion: boolean;
  scrollProgressRef?: MutableRefObject<number>;
  onStatusChange?: (status: HeroStageStatus) => void;
}

interface ManagedMaterial {
  material: THREE.MeshStandardMaterial;
  role:
    | "book-obsidian"
    | "book-paper"
    | "book-trim"
    | "logo-primary"
    | "logo-ring"
    | "logo-accent";
  group: "book" | "logo";
}

function classifyMaterial(name: string, objectName: string): ManagedMaterial["role"] {
  if (name.includes("BookPaper")) return "book-paper";
  if (name.includes("BookTrim")) return "book-trim";
  if (name.includes("BookObsidian")) return "book-obsidian";
  if (name.includes("LogoRing")) return "logo-ring";
  if (name.includes("LogoAccent")) return "logo-accent";
  if (name.includes("LogoSatin")) return "logo-primary";
  if (objectName.startsWith("Book")) return "book-obsidian";
  return "logo-primary";
}

function applyThemePalette(
  items: ManagedMaterial[],
  isDark: boolean,
  scene: THREE.Scene,
  keyLight: THREE.DirectionalLight,
  rimLight: THREE.DirectionalLight,
  fillLight: THREE.AmbientLight,
  renderer: THREE.WebGLRenderer
) {
  scene.environmentIntensity = isDark ? 0.85 : 0.7;
  keyLight.intensity = isDark ? 1.85 : 2.15;
  rimLight.intensity = isDark ? 1.35 : 0.95;
  fillLight.intensity = isDark ? 0.5 : 0.8;
  renderer.toneMappingExposure = isDark ? 1.15 : 1.05;

  for (const item of items) {
    const mat = item.material;
    switch (item.role) {
      case "book-obsidian":
        mat.color.setHex(isDark ? 0x161618 : 0x141416);
        mat.metalness = 0.14;
        mat.roughness = 0.44;
        break;
      case "book-paper":
        mat.color.setHex(isDark ? 0xebe9e3 : 0xf9f9f6);
        mat.metalness = 0.0;
        mat.roughness = 0.82;
        break;
      case "book-trim":
        mat.color.setHex(isDark ? 0xd4d4d0 : 0x454549);
        mat.metalness = 0.88;
        mat.roughness = 0.22;
        break;
      case "logo-primary":
        mat.color.setHex(isDark ? 0xe0e0dc : 0x262629);
        mat.metalness = isDark ? 0.85 : 0.72;
        mat.roughness = isDark ? 0.22 : 0.28;
        break;
      case "logo-ring":
        mat.color.setHex(isDark ? 0xa3a39e : 0x3b3b3f);
        mat.metalness = isDark ? 0.82 : 0.7;
        mat.roughness = isDark ? 0.24 : 0.3;
        break;
      case "logo-accent":
        mat.color.setHex(isDark ? 0x737370 : 0x525256);
        mat.metalness = 0.75;
        mat.roughness = 0.28;
        break;
    }
    mat.needsUpdate = true;
  }
}

export function HeroThreeStage({
  reducedMotion,
  scrollProgressRef,
  onStatusChange,
}: HeroThreeStageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const statusCbRef = useRef(onStatusChange);
  statusCbRef.current = onStatusChange;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let disposed = false;
    let rafId = 0;
    let pointerX = 0;
    let pointerY = 0;
    let smoothPointerX = 0;
    let smoothPointerY = 0;
    let activeTimeline: ReturnType<typeof createTimeline> | null = null;
    let envTarget: THREE.WebGLRenderTarget | null = null;
    let renderer: THREE.WebGLRenderer | null = null;

    const isDarkNow = () => document.documentElement.classList.contains("dark");

    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      statusCbRef.current?.("fallback");
      return;
    }

    const activeRenderer = renderer;
    activeRenderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    activeRenderer.outputColorSpace = THREE.SRGBColorSpace;
    activeRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    activeRenderer.domElement.className = "block h-full w-full pointer-events-none";
    activeRenderer.domElement.setAttribute("aria-hidden", "true");
    container.appendChild(activeRenderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 40);
    camera.position.set(0, 0.28, 6.4);
    camera.lookAt(0, 0.05, 0);

    const pmrem = new THREE.PMREMGenerator(activeRenderer);
    const roomEnv = new RoomEnvironment();
    envTarget = pmrem.fromScene(roomEnv, 0.04);
    scene.environment = envTarget.texture;
    roomEnv.dispose();
    pmrem.dispose();

    const fillLight = new THREE.AmbientLight(0xffffff, 0.55);
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.9);
    keyLight.position.set(3.8, 5.2, 5.5);
    const rimLight = new THREE.DirectionalLight(0xf2f2ef, 1.25);
    rimLight.position.set(-4.5, 2.4, -3.5);
    scene.add(fillLight, keyLight, rimLight);

    const stageRoot = new THREE.Group();
    const bookAnchor = new THREE.Group();
    const logoAnchor = new THREE.Group();
    stageRoot.add(bookAnchor, logoAnchor);
    scene.add(stageRoot);

    const managedMaterials: ManagedMaterial[] = [];

    const syncViewport = () => {
      if (!container) return;
      const w = Math.max(container.clientWidth, 1);
      const h = Math.max(container.clientHeight, 1);
      const aspect = w / h;
      activeRenderer.setSize(w, h, false);
      camera.aspect = aspect;
      camera.position.z = aspect < 1.15 ? 6.4 / Math.max(aspect * 1.05, 0.56) : 6.4;
      camera.updateProjectionMatrix();
    };
    syncViewport();

    const resizeObserver = new ResizeObserver(syncViewport);
    resizeObserver.observe(container);

    const themeObserver = new MutationObserver(() => {
      applyThemePalette(
        managedMaterials,
        isDarkNow(),
        scene,
        keyLight,
        rimLight,
        fillLight,
        activeRenderer
      );
    });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    const heroSection = container.closest("#hero");
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const onPointerMove = (event: PointerEvent) => {
      if (!heroSection || reducedMotion) return;
      const rect = heroSection.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      pointerX = THREE.MathUtils.clamp(((event.clientX - rect.left) / rect.width - 0.5) * 2, -1, 1);
      pointerY = THREE.MathUtils.clamp(((event.clientY - rect.top) / rect.height - 0.5) * 2, -1, 1);
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    if (finePointer && heroSection instanceof HTMLElement) {
      heroSection.addEventListener("pointermove", onPointerMove, { passive: true });
      heroSection.addEventListener("pointerleave", onPointerLeave, { passive: true });
    }

    const loader = new GLTFLoader();
    const modelUrl = "/models/atnan-hero-stage.glb";
    container.dataset.heroThreeStage = "loading";

    let bookRoot: THREE.Object3D | null = null;
    let bookFrontPivot: THREE.Object3D | null = null;
    let logoRoot: THREE.Object3D | null = null;
    let logoOuterRing: THREE.Object3D | null = null;
    let logoOrbit0: THREE.Object3D | null = null;
    let logoOrbit1: THREE.Object3D | null = null;

    const animState = {
      bookScale: 0.44,
      bookPosX: -0.575,
      bookPosY: -1.24,
      bookPosZ: 0.18,
      bookRotX: 0.15,
      bookRotY: -0.45,
      bookRotZ: 0,
      bookCoverAngle: 0,
      logoScale: 0.001,
      logoPosY: 0.16,
      logoPosZ: 0.68,
      logoRotY: -1.15,
      orbitSpread: 0,
    };

    const easeSmoothOut = cubicBezier(0.16, 1, 0.3, 1);
    const easeBookOpen = cubicBezier(0.38, 0.04, 0.16, 1);
    const easeLogoGlide = cubicBezier(0.36, 0, 0.16, 1);
    const easeGentleBlend = cubicBezier(0.42, 0, 0.22, 1);

    loader
      .loadAsync(modelUrl)
      .then((gltf) => {
        if (disposed) return;

        bookRoot = gltf.scene.getObjectByName("BookRoot") ?? null;
        bookFrontPivot = gltf.scene.getObjectByName("BookFrontPivot") ?? null;
        logoRoot = gltf.scene.getObjectByName("LogoRoot") ?? null;
        logoOuterRing = gltf.scene.getObjectByName("LogoOuterRing") ?? null;
        logoOrbit0 = gltf.scene.getObjectByName("LogoOrbitEllipse_0") ?? null;
        logoOrbit1 = gltf.scene.getObjectByName("LogoOrbitEllipse_1") ?? null;

        if (!bookRoot || !bookFrontPivot || !logoRoot) {
          container.dataset.heroThreeStage = "fallback";
          statusCbRef.current?.("fallback");
          return;
        }

        const ellipse0BaseX = logoOrbit0 ? logoOrbit0.rotation.x : 0;
        const ellipse0BaseY = logoOrbit0 ? logoOrbit0.rotation.y : 0;
        const ellipse1BaseX = logoOrbit1 ? logoOrbit1.rotation.x : 0;
        const ellipse1BaseY = logoOrbit1 ? logoOrbit1.rotation.y : 0;

        // Clone per-mesh materials so BookRoot and LogoRoot fade independently
        gltf.scene.traverse((child) => {
          if (!(child instanceof THREE.Mesh)) return;
          const group: "book" | "logo" = child.name.startsWith("Book") ? "book" : "logo";
          const sourceMat = Array.isArray(child.material) ? child.material[0] : child.material;
          const cloned =
            sourceMat instanceof THREE.MeshStandardMaterial
              ? sourceMat.clone()
              : new THREE.MeshStandardMaterial({ color: 0xd4d4d0, metalness: 0.8, roughness: 0.25 });
          child.material = cloned;
          managedMaterials.push({
            material: cloned,
            role: classifyMaterial(sourceMat?.name ?? "", child.name),
            group,
          });
        });

        bookRoot.position.set(0, 0, 0);
        bookRoot.rotation.set(0, 0, 0);
        bookRoot.scale.setScalar(1);
        logoRoot.position.set(0, 0, 0);
        logoRoot.rotation.set(0, 0, 0);
        logoRoot.scale.setScalar(1);

        bookAnchor.add(bookRoot);
        logoAnchor.add(logoRoot);

        // Axial layers expand along Z on scroll tilt, modeled after animejs.com's exploded diagram
        const explodedLayers = [
          { obj: gltf.scene.getObjectByName("LogoAInnerL"), offsetZ: -0.34 },
          { obj: gltf.scene.getObjectByName("LogoAInnerR"), offsetZ: -0.34 },
          { obj: gltf.scene.getObjectByName("LogoOrbitEllipse_1"), offsetZ: -0.22 },
          { obj: gltf.scene.getObjectByName("LogoOuterRing"), offsetZ: 0.08 },
          { obj: gltf.scene.getObjectByName("LogoALeftLeg"), offsetZ: 0.24 },
          { obj: gltf.scene.getObjectByName("LogoARightLeg"), offsetZ: 0.24 },
          { obj: gltf.scene.getObjectByName("LogoACrossbar"), offsetZ: 0.24 },
          { obj: gltf.scene.getObjectByName("LogoOrbitEllipse_0"), offsetZ: 0.44 },
          { obj: gltf.scene.getObjectByName("LogoOrbNode"), offsetZ: 0.62 },
        ]
          .filter((entry): entry is { obj: THREE.Object3D; offsetZ: number } => Boolean(entry.obj))
          .map((entry) => ({ ...entry, baseZ: entry.obj.position.z }));

        applyThemePalette(
          managedMaterials,
          isDarkNow(),
          scene,
          keyLight,
          rimLight,
          fillLight,
          activeRenderer
        );

        // Pre-compile WebGL shaders before launching frame 0 so the intro never stutters
        activeRenderer.compile(scene, camera);

        container.dataset.heroThreeStage = "ready";
        statusCbRef.current?.("ready");

        if (reducedMotion) {
          bookRoot.visible = false;
          animState.bookScale = 0;
          animState.logoScale = 0.94;
          animState.logoPosY = 0.1;
          animState.logoPosZ = 0.14;
          animState.logoRotY = 0;
          animState.orbitSpread = 1;
        } else {
          const tl = createTimeline();
          activeTimeline = tl;

          // 1. Weighted book lands onto the desk rule with a soft damped spring cushion
          tl.add(
            animState,
            {
              bookPosY: -0.82,
              ease: spring({ bounce: 0.22, duration: 760 }),
            },
            0
          )
            .add(
              animState,
              {
                bookScale: [0.44, 0.76],
                bookPosZ: [0.18, 0.0],
                bookRotY: [-0.45, 0.05],
                duration: 740,
                ease: easeSmoothOut,
              },
              0
            )
            .add(
              animState,
              {
                bookRotX: [0.15, 0.45],
                duration: 840,
                ease: easeGentleBlend,
              },
              140
            )
            // 2. Hardcover swings open smoothly while spine and body shift subtly with the weight
            .add(
              animState,
              {
                bookCoverAngle: [0, Math.PI * 0.87],
                bookPosX: [-0.575, 0],
                duration: 920,
                ease: easeBookOpen,
              },
              440
            )
            .add(
              animState,
              {
                bookRotY: [0.05, -0.05, 0],
                bookRotZ: [0, -0.045, 0],
                duration: 960,
                ease: easeGentleBlend,
              },
              460
            )
            // 3. Collectible Logo levitates smoothly UP above pages while spinning and unfurling rings
            .add(
              animState,
              {
                logoScale: [0.001, 0.34],
                logoPosY: [0.16, 0.78],
                duration: 820,
                ease: easeSmoothOut,
              },
              1080
            )
            .add(
              animState,
              {
                logoRotY: [-1.15, 0],
                orbitSpread: [0, 1],
                duration: 1620,
                ease: easeSmoothOut,
              },
              1080
            )
            // 4. Book gently dips downward out of sight beneath the desk BEFORE Logo swoops down
            .add(
              animState,
              {
                bookScale: [0.76, 0.005],
                bookPosY: [-0.82, -1.36],
                bookPosZ: [0.0, -1.15],
                bookRotX: [0.45, 0.8],
                duration: 540,
                ease: cubicBezier(0.55, 0, 0.9, 0.6),
              },
              1720
            )
            // 5. Continuous S-curve sweep from apex hover into full gleaming center showcase
            .add(
              animState,
              {
                logoScale: [0.34, 0.98],
                logoPosY: [0.78, 0.08],
                logoPosZ: [0.68, 0.14],
                duration: 920,
                ease: easeLogoGlide,
              },
              1940
            );
        }

        const idleStart = performance.now();
        let lastTime = idleStart;
        const renderFrame = (now: number) => {
          if (disposed) return;
          const delta = Math.min((now - lastTime) / 1000, 0.05);
          lastTime = now;

          if (bookRoot && bookFrontPivot && logoRoot) {
            bookAnchor.visible = animState.bookScale > 0.04;
            bookAnchor.position.set(0, animState.bookPosY, animState.bookPosZ);
            bookAnchor.rotation.set(animState.bookRotX, animState.bookRotY, animState.bookRotZ);
            bookAnchor.scale.setScalar(animState.bookScale);
            bookRoot.position.x = animState.bookPosX;
            bookFrontPivot.rotation.z = animState.bookCoverAngle;

            const rawScroll = scrollProgressRef?.current ?? 0;
            const scrollEase = reducedMotion
              ? 1
              : THREE.MathUtils.smoothstep(THREE.MathUtils.clamp(rawScroll, 0, 1), 0, 1);

            const elapsedSec = (now - idleStart) / 1000;
            const breathY = reducedMotion ? 0 : Math.sin(elapsedSec * 1.15) * 0.022;
            const effectiveScale = animState.logoScale * (1 - 0.05 * scrollEase);
            const effectiveZ = animState.logoPosZ - 0.38 * scrollEase;

            logoAnchor.visible = animState.logoScale > 0.03;
            logoAnchor.position.set(0, animState.logoPosY + breathY, effectiveZ);
            logoAnchor.rotation.set(
              reducedMotion ? 0 : 0.22 * scrollEase,
              animState.logoRotY - (reducedMotion ? 0 : 0.36 * scrollEase),
              0
            );
            logoAnchor.scale.setScalar(effectiveScale);

            const explodeFactor = reducedMotion ? 0 : scrollEase;
            for (const layer of explodedLayers) {
              layer.obj.position.z = layer.baseZ + layer.offsetZ * explodeFactor;
            }

            const spread = animState.orbitSpread;
            const orbitSway = reducedMotion ? 0 : Math.sin(elapsedSec * 0.75) * 0.14 * spread;
            if (logoOrbit0) {
              logoOrbit0.rotation.x = ellipse0BaseX * (0.15 + 0.85 * spread) + orbitSway;
              logoOrbit0.rotation.y = ellipse0BaseY * (0.15 + 0.85 * spread) + orbitSway * 0.8;
            }
            if (logoOrbit1) {
              logoOrbit1.rotation.x = ellipse1BaseX * (0.15 + 0.85 * spread) - orbitSway * 0.9;
              logoOrbit1.rotation.y = ellipse1BaseY * (0.15 + 0.85 * spread) + orbitSway;
            }

            const settledOpacity = isDarkNow() ? 0.34 : 0.28;
            const targetOpacity = 1 - (1 - settledOpacity) * scrollEase;
            container.style.opacity = targetOpacity.toFixed(3);

            if (!reducedMotion && logoAnchor.visible) {
              const ringPace = 1 - 0.22 * scrollEase;
              if (logoOuterRing) logoOuterRing.rotation.z += delta * 0.56 * ringPace;
              if (logoOrbit0) logoOrbit0.rotation.z -= delta * 0.96 * ringPace;
              if (logoOrbit1) logoOrbit1.rotation.z += delta * 0.74 * ringPace;
            }
          }

          smoothPointerX += (pointerX - smoothPointerX) * Math.min(delta * 5.5, 1);
          smoothPointerY += (pointerY - smoothPointerY) * Math.min(delta * 5.5, 1);
          stageRoot.rotation.y = smoothPointerX * 0.1;
          stageRoot.rotation.x = smoothPointerY * 0.06;

          activeRenderer.render(scene, camera);
          rafId = requestAnimationFrame(renderFrame);
        };

        rafId = requestAnimationFrame(renderFrame);
      })
      .catch(() => {
        if (!disposed) {
          container.dataset.heroThreeStage = "fallback";
          statusCbRef.current?.("fallback");
        }
      });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      activeTimeline?.revert();
      resizeObserver.disconnect();
      themeObserver.disconnect();
      if (finePointer && heroSection instanceof HTMLElement) {
        heroSection.removeEventListener("pointermove", onPointerMove);
        heroSection.removeEventListener("pointerleave", onPointerLeave);
      }
      for (const item of managedMaterials) {
        item.material.dispose();
      }
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.geometry?.dispose();
        }
      });
      envTarget?.dispose();
      activeRenderer.dispose();
      activeRenderer.domElement.remove();
    };
  }, [reducedMotion]);

  return <div ref={containerRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />;
}
