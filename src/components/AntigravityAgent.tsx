import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Props para el componente del Agente Antigravity.
 */
interface AntigravityAgentProps {
  className?: string;
}

/**
 * Componente interno que renderiza el núcleo tecnológico 3D.
 * Incluye un núcleo central sólido y una armadura externa de wireframe.
 */
const AgentModel: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);

  // Animaciones secundarias constantes e independientes del cursor
  useFrame((state) => {
    const elapsedTime = state.clock.getElapsedTime();

    if (coreRef.current) {
      // Rotación suave del núcleo
      coreRef.current.rotation.y = elapsedTime * 0.15;
      coreRef.current.rotation.x = elapsedTime * 0.1;
    }

    if (outerRef.current) {
      // Rotación en sentido opuesto para la armadura externa
      outerRef.current.rotation.y = -elapsedTime * 0.25;
      outerRef.current.rotation.z = elapsedTime * 0.15;
    }
  });

  return (
    <group>
      {/* 1. NÚCLEO INTERNO: Geometría física de alta transmisión y brillo cyan */}
      <mesh ref={coreRef} castShadow receiveShadow>
        <icosahedronGeometry args={[1.2, 2]} />
        <meshPhysicalMaterial
          color="#00d4aa"
          roughness={0.1}
          metalness={0.8}
          clearcoat={1.0}
          clearcoatRoughness={0.1}
          transmission={0.6}
          thickness={1.5}
          ior={1.5}
          envMapIntensity={1.5}
        />
      </mesh>

      {/* 2. ESCUDO DE INGENIERÍA EXTERNO: Torus Knot holográfico en modo wireframe */}
      <mesh ref={outerRef}>
        <torusKnotGeometry args={[1.8, 0.12, 120, 16, 3, 4]} />
        <meshStandardMaterial
          color="#00d4aa"
          wireframe={true}
          transparent={true}
          opacity={0.4}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 3. EFECTO DE RESPLANDOR INTERNO: Un punto de luz que pulsa sutilmente */}
      <pointLight 
        color="#00d4aa" 
        intensity={2.5} 
        distance={8} 
        decay={2}
      />
    </group>
  );
};

/**
 * Componente principal del Agente Antigravity.
 * Integra la escena 3D, controles de cámara interactivos y efectos físicos.
 */
export const AntigravityAgent: React.FC<AntigravityAgentProps> = ({ className = "" }) => {
  return (
    <div className={`absolute inset-0 w-full h-full z-0 pointer-events-none ${className}`}>
      <Canvas
        className="pointer-events-auto w-full h-full"
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(new THREE.Color('#000000'), 0);
        }}
      >
        {/* Iluminación de Estudio */}
        <ambientLight intensity={0.4} />
        
        {/* Luz direccional frontal con coloración cyan */}
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.5} 
          color="#00d4aa"
        />
        
        {/* Luz de contra para contorno (Backlight) */}
        <directionalLight 
          position={[-5, -5, -5]} 
          intensity={0.8} 
          color="#0095ff"
        />

        {/* 
          PresentationControls: Permite al usuario interactuar y "empujar" 
          el modelo 3D con el ratón. Retorna elásticamente a su posición original.
        */}
        <PresentationControls
          global={true} // Funciona en toda la ventana
          cursor={true} // Cambia el puntero al hacer hover/drag
          snap={{ mass: 4, tension: 400 }} // Retorno elástico de alta gama
          speed={1.5}
          zoom={1.0}
          polar={[-Math.PI / 6, Math.PI / 6]} // Límites de rotación vertical (30 grados)
          azimuth={[-Math.PI / 4, Math.PI / 4]} // Límites de rotación horizontal (45 grados)
        >
          {/* 
            Float: Levita el modelo suavemente simulando gravedad cero.
          */}
          <Float
            speed={2.2} // Velocidad de la levitación
            rotationIntensity={0.8} // Intensidad de la rotación aleatoria
            floatIntensity={1.2} // Intensidad de la oscilación vertical
            floatingRange={[-0.2, 0.2]} // Rango de movimiento vertical
          >
            <AgentModel />
          </Float>
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default AntigravityAgent;
