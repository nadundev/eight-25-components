import Card from "@/component/ui/card";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Eight25 Components
        </h1>
        
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <Card />
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3D Models
            </h2>
            <p className="text-gray-600 mb-4">
              Explore interactive 3D models and visualizations
            </p>
            <Link 
              href="/sophos"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              View Sophos 3D Model
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
