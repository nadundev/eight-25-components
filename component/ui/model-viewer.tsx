'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { Suspense, useRef, useState } from 'react'
import * as THREE from 'three'

interface ModelProps {
  url: string
  scale?: number
  position?: [number, number, number]
  mousePosition: { x: number; y: number }
  enableMouseTilt?: boolean
  enableOrbitingSphere?: boolean
}

function Model({ url, scale = 1, position = [0, 0, 0], mousePosition, enableMouseTilt = true, enableOrbitingSphere = false }: ModelProps) {
  const { scene } = useGLTF(url)
    const meshRef = useRef<THREE.Group>(null)
  const sphereRef = useRef<THREE.Mesh>(null)
  const trailRef = useRef<THREE.Line>(null)
  const orbitRadius = 3

  useFrame((state) => {
    // Continuous bouncing animation (up and down)
    const bounceHeight = Math.sin(state.clock.elapsedTime * 2) * 0.3
    
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + bounceHeight

      // Continuous rotation animation (left and right)
      const rotationAmplitude = Math.sin(state.clock.elapsedTime * 1.5) * 0.2
      
      if (enableMouseTilt) {
        // Convert mouse position to rotation values
        const targetRotationX = mousePosition.y * 0.05
        const targetRotationY = mousePosition.x * 0.05 + rotationAmplitude

        // Smooth interpolation for natural movement
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.05)
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY, 0.05)
      } else {
        // Just the loop animations without mouse tilt
        meshRef.current.rotation.y = rotationAmplitude
      }
    }

    // Orbiting sphere animation
    if (sphereRef.current && enableOrbitingSphere) {
      const orbitSpeed = state.clock.elapsedTime * 0.8
      const newX = position[0] + Math.cos(orbitSpeed) * orbitRadius
      const newZ = position[2] + Math.sin(orbitSpeed) * orbitRadius
      const newY = position[1] + bounceHeight + Math.sin(orbitSpeed * 2) * 0.5
      
      sphereRef.current.position.set(newX, newY, newZ)
      
      // Create complete orbital trail (full circle) with tube geometry
      if (trailRef.current) {
        const numPoints = 100
        const points = []
        
        for (let i = 0; i <= numPoints; i++) {
          const angle = (i / numPoints) * Math.PI * 2
          const x = position[0] + Math.cos(angle) * orbitRadius
          const z = position[2] + Math.sin(angle) * orbitRadius
          const y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.3 + Math.sin(angle * 2) * 0.5
          
          points.push(new THREE.Vector3(x, y, z))
        }
        
        const curve = new THREE.CatmullRomCurve3(points, true)
        const newGeometry = new THREE.TubeGeometry(curve, 200, 0.02, 16, true)
        
        trailRef.current.geometry.dispose()
        trailRef.current.geometry = newGeometry
      }
    }
  })

  return (
    <group>
      <primitive ref={meshRef} object={scene} scale={scale} position={position} />
      
      {enableOrbitingSphere && (
        <>
          {/* Dynamic trail line that follows from sphere center */}
          <mesh ref={trailRef}>
            <tubeGeometry args={[
              new THREE.CatmullRomCurve3([
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(1, 0, 0),
                new THREE.Vector3(0, 0, 1),
                new THREE.Vector3(-1, 0, 0),
                new THREE.Vector3(0, 0, -1)
              ], true), 
              200, 
              0.02, 
              16, 
              true
            ]} />
            <meshStandardMaterial color="#000000" transparent opacity={0.8} />
          </mesh>
          
          {/* Orbiting sphere */}
          <mesh ref={sphereRef}>
            <sphereGeometry args={[0.12, 32, 32]} />
            <meshStandardMaterial 
              color="#000000" 
              roughness={0.3} 
              metalness={0.7}
            />
          </mesh>
        </>
      )}
    </group>
  )
}

interface ModelViewerProps {
  modelUrl: string
  className?: string
  scale?: number
  position?: [number, number, number]
  enableControls?: boolean
  enablePan?: boolean
  enableZoom?: boolean
  enableRotate?: boolean
  autoRotate?: boolean
  enableMouseTilt?: boolean
  enableOrbitingSphere?: boolean
}

export default function ModelViewer({ 
  modelUrl, 
  className = "w-full h-96", 
  scale = 1, 
  position = [0, 0, 0],
  enableControls = true,
  enablePan = true,
  enableZoom = true,
  enableRotate = true,
  autoRotate = false,
  enableMouseTilt = true,
  enableOrbitingSphere = false
}: ModelViewerProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!enableMouseTilt) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1 // Normalize to -1 to 1
    const y = -((event.clientY - rect.top) / rect.height) * 2 + 1 // Normalize to -1 to 1 (inverted)
    
    setMousePosition({ x, y })
  }

  return (
    <div 
      className={className}
      onMouseMove={handleMouseMove}
    >
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.2} />
        <directionalLight position={[-10, -10, -5]} intensity={0.8} />
        <directionalLight position={[0, 10, 0]} intensity={0.6} />
        <pointLight position={[0, 0, 10]} intensity={0.5} />
        
        <Suspense fallback={null}>
          <Model 
            url={modelUrl} 
            scale={scale} 
            position={position} 
            mousePosition={mousePosition}
            enableMouseTilt={enableMouseTilt}
            enableOrbitingSphere={enableOrbitingSphere}
          />
        </Suspense>
        
        {enableControls && (
          <OrbitControls
            enablePan={enablePan}
            enableZoom={enableZoom}
            enableRotate={enableRotate}
            autoRotate={autoRotate}
          />
        )}
      </Canvas>
    </div>
  )
} 