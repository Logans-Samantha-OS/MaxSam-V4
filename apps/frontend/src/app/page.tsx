export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      {/* Graphene Texture Overlay */}
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_50%_50%,rgba(76,29,149,0.1),transparent_50%)]" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8">
        
        {/* Glass Card Container */}
        <div className="max-w-4xl w-full backdrop-blur-xl bg-white/[0.02] border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl shadow-purple-500/10">
          
          {/* Logo/Title */}
          <div className="text-center mb-8">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-gradient">
              MaxSam V4
            </h1>
            <p className="text-xl sm:text-2xl text-gray-300 font-light tracking-wide">
              AI-Powered Real Estate Operations Platform
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            <span className="px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-sm font-medium backdrop-blur-sm">
              🤖 Sam
            </span>
            <span className="px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-sm font-medium backdrop-blur-sm">
              ✨ Eleanor
            </span>
            <span className="px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-sm font-medium backdrop-blur-sm">
              🎯 Alex
            </span>
            <span className="px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-300 text-sm font-medium backdrop-blur-sm">
              🍌 NanoBanana
            </span>
          </div>

          {/* Description */}
          <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            Automate your wholesale real estate operations with AI agents that handle lead prioritization, 
            SMS outreach, call scheduling, and contract management—all while you sleep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg shadow-lg shadow-purple-500/50 hover:shadow-purple-500/70 transition-all duration-300 hover:scale-105">
              Get Started
            </button>
            <button className="px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-lg backdrop-blur-sm hover:bg-white/10 transition-all duration-300">
              View Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-8 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
                24/7
              </div>
              <div className="text-gray-500 text-sm mt-1">AI Automation</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-cyan-400">
                4
              </div>
              <div className="text-gray-500 text-sm mt-1">AI Agents</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                100%
              </div>
              <div className="text-gray-500 text-sm mt-1">Automated</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600 text-sm">
          <p>⚡ Powered by Next.js, Supabase, and n8n</p>
        </div>
      </div>

      {/* Floating Orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse delay-700" />
    </div>
  );
}