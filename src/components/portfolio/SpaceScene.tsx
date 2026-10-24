import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Stars } from "@react-three/drei";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

function Core({ reducedMotion }: { reducedMotion: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rings = useRef<THREE.Group>(null);
  const scroll = useRef(0);
  useEffect(() => {
    const update = () => {
      scroll.current = Math.min(window.scrollY / window.innerHeight, 1);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  const colors = useMemo(() => {
    const css = getComputedStyle(document.documentElement);
    return {
      core: css.getPropertyValue("--core-color").trim(),
      ring: css.getPropertyValue("--core-ring").trim(),
      light: css.getPropertyValue("--core-light").trim(),
    };
  }, []);
  useFrame((state, delta) => {
    if (!group.current || !rings.current || reducedMotion) return;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      state.pointer.x * 0.22,
      0.025,
    );
    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -state.pointer.y * 0.15,
      0.025,
    );
    rings.current.rotation.y += delta * (0.09 + scroll.current * 0.1);
    rings.current.rotation.z += delta * 0.035;
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.07;
    state.camera.position.z = THREE.MathUtils.lerp(
      state.camera.position.z,
      6.8 - scroll.current * 0.5,
      0.02,
    );
  });
  return (
    <group ref={group} position={[1.45, 0, 0]}>
      <Float speed={reducedMotion ? 0 : 1} rotationIntensity={0.08} floatIntensity={0.15}>
        <mesh>
          <sphereGeometry args={[1.02, 64, 64]} />
          <meshPhysicalMaterial
            color={colors.core}
            metalness={0.55}
            roughness={0.19}
            clearcoat={1}
            clearcoatRoughness={0.12}
          />
        </mesh>
        <mesh scale={1.008}>
          <icosahedronGeometry args={[1.02, 3]} />
          <meshBasicMaterial color={colors.light} wireframe transparent opacity={0.09} />
        </mesh>
        <group ref={rings} rotation={[0.5, 0.2, -0.45]}>
          {[1.38, 1.56, 1.9].map((radius, i) => (
            <mesh key={radius} rotation={[i * 0.65, i * 0.38, 0]}>
              <torusGeometry args={[radius, i === 0 ? 0.035 : 0.009, 12, 180]} />
              <meshStandardMaterial
                color={colors.ring}
                metalness={0.8}
                roughness={0.2}
                transparent
                opacity={i === 0 ? 0.9 : 0.5}
              />
            </mesh>
          ))}
          <mesh position={[1.56, 0, 0]}>
            <sphereGeometry args={[0.065, 20, 20]} />
            <meshStandardMaterial
              color={colors.light}
              emissive={colors.ring}
              emissiveIntensity={1}
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function SpaceScene({ reducedMotion = false }: { reducedMotion?: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.8], fov: 42 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true }}
      frameloop={reducedMotion ? "demand" : "always"}
    >
      <ambientLight intensity={1.6} />
      <directionalLight position={[-3, 4, 5]} intensity={3} />
      <pointLight position={[3, -2, 2]} intensity={25} />
      <Core reducedMotion={reducedMotion} />
      <Stars
        radius={35}
        depth={20}
        count={700}
        factor={1.2}
        saturation={0}
        fade
        speed={reducedMotion ? 0 : 0.15}
      />
    </Canvas>
  );
}
