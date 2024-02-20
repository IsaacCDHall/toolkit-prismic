"use client";

import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Float, Environment } from "@react-three/drei";
import { Suspense, useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function Shapes() {
  return (
    <div className="row-span-1 row-start-1 -mt-9 aspect-square  md:col-span-1 md:col-start-2 md:mt-0">
      <Canvas
        className="z-50"
        shadows
        gl={{ antialias: false }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 25], fov: 30, near: 1, far: 40 }}
      >
        <Suspense fallback={null}>
          <Geometries />
          <ContactShadows
            position={[0, -3.5, 0]}
            opacity={0.65}
            scale={40}
            blur={1}
            far={9}
          />
          <Environment preset="studio" />
        </Suspense>
      </Canvas>
    </div>
  );
}

function Geometries() {
  const geometries = [
    {
      position: [2.0, 1.6, -4],
      r: 0.45,
      geometry: new THREE.IcosahedronGeometry(1.5), // Jewel
    },
    {
      position: [-1.2, -0.75, 5],
      r: 0.65,
      geometry: new THREE.TorusGeometry(0.6, 0.25, 16, 32), // Circle
    },
    {
      position: [0,0,0],
      r: 0.3,
      geometry: new THREE.OctahedronGeometry(3), // Octahedron
    },
  ];

  const soundEffects = [
    new Audio("/sounds/jingles1.ogg"),
    new Audio("/sounds/jingles2.ogg"),
    new Audio("/sounds/jingles3.ogg"),
    new Audio("/sounds/impact1.ogg"),
    new Audio("/sounds/impact2.ogg"),
    new Audio("/sounds/impact3.ogg"),
    new Audio("/sounds/impact4.ogg"),
    new Audio("/sounds/impact5.ogg"),
    new Audio("/sounds/impact6.ogg"),
    new Audio("/sounds/impact7.ogg"),
  ];

  const materials = [
    new THREE.MeshNormalMaterial(),
    new THREE.MeshStandardMaterial({ color: 0x3F3A60, roughness: 0 }),
    new THREE.MeshStandardMaterial({ color: 0x34C5D1, roughness: 0.4 }),
    new THREE.MeshStandardMaterial({ color: 0x007DA5, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0x655DC6, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({ color: 0xCE009F, roughness: 0.1 }),
    new THREE.MeshStandardMaterial({
      roughness: 0,
      metalness: 0.5,
      color: 0x2980b9,
    }),
    new THREE.MeshStandardMaterial({
      color: 0x2c3e50,
      roughness: 0.1,
      metalness: 0.5,
    }),
  ];

  return geometries.map(({ position, r, geometry }) => (
    <Geometry
      key={JSON.stringify(position)} // Unique key
      position={position.map((p) => p * 2)}
      geometry={geometry}
      soundEffects={soundEffects}
      materials={materials}
      r={r}
    />
  ));
}

function Geometry({ r, position, geometry, soundEffects, materials }) {
  const meshRef = useRef();
  const [visible, setVisible] = useState(false);

  const startingMaterial = getRandomMaterial();

  function getRandomMaterial() {
    return gsap.utils.random(materials);
  }
  function handleClick(e) {
    const mesh = e.object;
    const selectedSoundEffect = gsap.utils.random(soundEffects);
    selectedSoundEffect.play();

    if (selectedSoundEffect.src.includes("jingles")) {
      console.log("Yippeee");

      // Enhanced Animation for jingles
      gsap.timeline()
        .to(mesh.scale, {
          x: 2, // Enlarge for emphasis
          y: 2,
          z: 2,
          duration: 0.5,
          ease: "back.out(1.7)"
        })
        .to(mesh.scale, {
          x: 1, // Return to original scale
          y: 1,
          z: 1,
          duration: 0.5,
          ease: "back.in(1.7)"
        })
        .to(mesh.rotation, {
          x: "+=2*Math.PI", // Full rotation around x
          y: "+=2*Math.PI", // Full rotation around y
          duration: 1,
          ease: "power2.out"
        });

    } else {
      // Standard animation for other clicks
      console.log(`Playing sound effect ${selectedSoundEffect.src}`);
      gsap.to(mesh.rotation, {
        x: `+=${gsap.utils.random(0, 2)}`,
        y: `+=${gsap.utils.random(0, 2)}`,
        z: `+=${gsap.utils.random(0, 2)}`,
        duration: 1.3,
        ease: "elastic.out(1,0.3)",
        yoyo: true,
      });
    }

    // Always change material on click
    mesh.material = getRandomMaterial();
}


  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      setVisible(true);
      gsap.from(meshRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: gsap.utils.random(0.8, 1.2),
        ease: "elastic.out(1,0.3)",
        delay: gsap.utils.random(0, 0.5),
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <group position={position} ref={meshRef}>
      <Float speed={5 * r} rotationIntensity={6 * r} floatIntensity={5 * r}>
        <mesh
          geometry={geometry}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
          visible={visible}
          material={startingMaterial}
        ></mesh>
      </Float>
    </group>
  );
}
export default Shapes;