import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createTimeline } from "animejs";

export type HeroStageStatus = "loading" | "ready" | "fallback";

interface HeroThreeStageProps {
  reducedMotion: boolean;
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

export function HeroThreeStage({ reducedMotion, onStatusChange }: HeroThreeStageProps) {
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

    const mountStartTime = performance.now();
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
    camera.position.set(0, 0.25, 6.2);
    camera.lookAt(0, 0.08, 0);

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
      camera.position.z = aspect < 1.15 ? 6.2 / Math.max(aspect * 1.05, 0.56) : 6.2;
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
      bookScale: 0.55,
      bookPosX: -0.575,
      bookPosY: -0.82,
      bookPosZ: 0.25,
      bookRotX: 0.2,
      bookRotY: -0.34,
      bookCoverAngle: 0,
      logoScale: 0.01,
      logoPosY: -0.36,
      logoPosZ: -0.15,
      logoRotY: -0.52,
      stageFade: 1,
    };

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

        applyThemePalette(
          managedMaterials,
          isDarkNow(),
          scene,
          keyLight,
          rimLight,
          fillLight,
          activeRenderer
        );

        container.dataset.heroThreeStage = "ready";
        statusCbRef.current?.("ready");

        if (reducedMotion) {
          bookRoot.visible = false;
          animState.bookScale = 0;
          animState.logoScale = 0.94;
          animState.logoPosY = 0.1;
          animState.logoPosZ = -0.35;
          animState.logoRotY = 0;
          animState.stageFade = 0;
        } else {
          const tl = createTimeline();
          activeTimeline = tl;

          // 1. Closed book drops flat onto desk surface and tilts toward viewer
          tl.add(
            animState,
            {
              bookScale: [0.55, 1.0],
              bookPosY: [-0.82, -0.38],
              bookPosZ: [0.28, 0],
              bookRotY: [-0.34, 0],
              duration: 680,
              ease: "outExpo",
            },
            0
          )
            .add(
              animState,
              {
                bookRotX: [0.2, 0.56],
                duration: 720,
                ease: "inOutQuad",
              },
              240
            )
            // 2. Book cover pivots open and spine centers on X while pages part
            .add(
              animState,
              {
                bookCoverAngle: [0, Math.PI * 0.87],
                bookPosX: [-0.575, 0],
                duration: 960,
                ease: "inOutCubic",
              },
              760
            )
            // 3. Sculpted 3D Logo expands solidly out from inside the open book
            .add(
              animState,
              {
                logoScale: [0.02, 1.06],
                logoPosY: [-0.36, 0.16],
                logoPosZ: [-0.15, 0.34],
                logoRotY: [-0.52, 0],
                duration: 1200,
                ease: "outExpo",
              },
              1360
            )
            // 4. Book shrinks smoothly behind Logo and vanishes cleanly
            .add(
              animState,
              {
                bookScale: [1.0, 0.02],
                bookPosY: [-0.38, 0.08],
                bookPosZ: [0, -1.4],
                duration: 820,
                ease: "inOutCubic",
              },
              2450
            )
            // 5. Stage softens into calm solid depth behind Hero cards via container opacity
            .add(
              animState,
              {
                logoScale: [1.06, 0.94],
                logoPosY: [0.16, 0.1],
                logoPosZ: [0.34, -0.35],
                stageFade: [1, 0],
                duration: 860,
                ease: "inOutQuad",
              },
              2580
            );

          const elapsed = performance.now() - mountStartTime;
          if (elapsed > 8 && elapsed < 3600) {
            tl.seek(elapsed);
          }
        }

        let lastTime = performance.now();
        const renderFrame = (now: number) => {
          if (disposed) return;
          const delta = Math.min((now - lastTime) / 1000, 0.05);
          lastTime = now;

          if (bookRoot && bookFrontPivot && logoRoot) {
            bookAnchor.visible = animState.bookScale > 0.04;
            bookAnchor.position.set(0, animState.bookPosY, animState.bookPosZ);
            bookAnchor.rotation.set(animState.bookRotX, animState.bookRotY, 0);
            bookAnchor.scale.setScalar(animState.bookScale);
            bookRoot.position.x = animState.bookPosX;
            bookFrontPivot.rotation.z = animState.bookCoverAngle;

            logoAnchor.visible = animState.logoScale > 0.03;
            logoAnchor.position.set(0, animState.logoPosY, animState.logoPosZ);
            logoAnchor.rotation.set(0, animState.logoRotY, 0);
            logoAnchor.scale.setScalar(animState.logoScale);

            const settledOpacity = isDarkNow() ? 0.36 : 0.3;
            const targetOpacity = settledOpacity + (1 - settledOpacity) * animState.stageFade;
            container.style.opacity = targetOpacity.toFixed(3);

            if (!reducedMotion && logoAnchor.visible) {
              if (logoOuterRing) logoOuterRing.rotation.z += delta * 0.11;
              if (logoOrbit0) logoOrbit0.rotation.z -= delta * 0.085;
              if (logoOrbit1) logoOrbit1.rotation.z += delta * 0.065;
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
