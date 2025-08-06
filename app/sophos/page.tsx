import ModelViewer from '@/component/ui/model-viewer'

export default function SophosPage() {
  return (
    <main className="min-h-screen">
      <ModelViewer 
        modelUrl="/models/Sophos Logo.glb"
        className="w-full h-screen"
        scale={20}
        position={[0, 0, 0]}
        enableControls={false}
        enableMouseTilt={true}
        enableOrbitingSphere={true}
      />
    </main>
  )
} 