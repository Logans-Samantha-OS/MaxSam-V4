/**
 * Home Page
 * 
 * Main landing page for MaxSam V4
 */

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">MaxSam V4</h1>
        <p className="text-xl text-gray-600">
          AI-Powered Real Estate Operations Platform
        </p>
        <div className="mt-8 space-y-2">
          <p className="text-sm text-gray-500">🤖 Sam • Eleanor • Alex • NanoBanana</p>
          <p className="text-sm text-gray-500">⚡️ Powered by Next.js, Supabase, and n8n</p>
        </div>
      </div>
    </main>
  );
}
