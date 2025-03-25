import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="min-h-screen relative overflow-hidden font-sans text-gray-100">
      <!-- Animated background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 animate-gradient-xy -z-10">
        <div class="absolute inset-0 opacity-20 mix-blend-overlay">
          <div class="absolute w-96 h-96 bg-radial-gradient(from-emerald-400/40 via-transparent to-transparent animate-float-1"></div>
          <div class="absolute w-80 h-80 bg-radial-gradient(from-teal-300/30 via-transparent to-transparent animate-float-2"></div>
        </div>
      </div>
      
      <!-- Navbar -->
      <nav class="flex justify-between items-center px-8 py-4 bg-black/20 backdrop-blur-md z-10 relative border-b border-white/10">
        <div class="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          ReferNrich
        </div>
        <button class="group relative border-2 border-emerald-400/50 text-emerald-400 px-6 py-2 rounded-full transition-all duration-300 
          hover:border-emerald-400 hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-400/20" routerLink="/auth/login">
          <span class="relative z-10">Login</span>
          <div class="absolute inset-0 bg-emerald-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        </button>
      </nav>
      
      <!-- Hero Section -->
      <main class="text-center px-8 py-24 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="relative inline-block mb-8">
            <div class="absolute -inset-4 bg-emerald-400/30 blur-2xl rounded-full animate-pulse-slow"></div>
            <span class="relative z-10 text-lg font-semibold bg-emerald-400/10 text-emerald-400 px-6 py-3 rounded-full">
              🎉 Earn 1 Bonus Point = ₹10 on every successful referral!
            </span>
          </div>
          <h1 class="text-6xl font-bold mb-6 text-white leading-tight">
            Transform Referrals into <span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Wealth</span>
          </h1>
          <p class="text-xl mb-10 text-gray-300/90 max-w-2xl mx-auto leading-relaxed">
            Leverage our intelligent referral ecosystem to maximize your network value. 
            <span class="font-semibold text-emerald-400">Every connection converts to real rewards!</span>
          </p>
          <div class="flex justify-center gap-4">
            <button class="group relative bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 px-8 py-4 text-xl rounded-full 
              transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/40 font-semibold">
              <span class="relative z-10">Start Earning Now</span>
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-400/0 rounded-full opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </main>
      
      <!-- Features Section -->
      <section class="grid grid-cols-1 md:grid-cols-3 gap-8 px-8 py-16 relative z-10 max-w-7xl mx-auto">
        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-8 rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">✨</div>
          <h3 class="text-2xl font-semibold mb-4 text-white">Instant Rewards</h3>
          <p class="text-gray-300/90 leading-relaxed">
            Earn ₹10 equivalent points instantly for every referral. Watch your balance grow in real-time!
          </p>
        </div>

        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-8 rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">🚀</div>
          <h3 class="text-2xl font-semibold mb-4 text-white">Smart Tracking</h3>
          <p class="text-gray-300/90 leading-relaxed">
            Real-time analytics dashboard to monitor your referrals and earnings progression
          </p>
        </div>

        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-8 rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-5xl mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">💸</div>
          <h3 class="text-2xl font-semibold mb-4 text-white">Flexible Redemption</h3>
          <p class="text-gray-300/90 leading-relaxed">
            Convert points to rewards
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .animate-gradient-xy {
      background-size: 300% 300%;
      animation: gradient-animation 12s ease infinite;
    }
    @keyframes gradient-animation {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animate-float-1 {
      animation: float-1 8s ease-in-out infinite;
    }
    .animate-float-2 {
      animation: float-2 10s ease-in-out infinite;
    }
    @keyframes float-1 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(50px, -50px) rotate(5deg); }
    }
    @keyframes float-2 {
      0%, 100% { transform: translate(0, 0) rotate(0deg); }
      50% { transform: translate(-30px, 40px) rotate(-5deg); }
    }
    .animate-pulse-slow {
      animation: pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.3; }
    }
  `]
})
export class LandingPageComponent {}