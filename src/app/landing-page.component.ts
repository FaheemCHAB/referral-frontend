import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="min-h-screen relative overflow-hidden font-sans text-gray-100 p-2 xs:p-4 sm:p-0">
      <!-- Animated background -->
      <div class="absolute inset-0 bg-gradient-to-br from-purple-900 via-indigo-800 to-blue-900 animate-gradient-xy -z-10">
        <div class="absolute inset-0 opacity-20 mix-blend-overlay">
          <div class="hidden xs:block absolute w-48 h-48 xs:w-64 xs:h-64 md:w-96 md:h-96 bg-radial-gradient(from-emerald-400/40 via-transparent to-transparent animate-float-1"></div>
          <div class="hidden xs:block absolute w-40 h-40 xs:w-56 xs:h-56 md:w-80 md:h-80 bg-radial-gradient(from-teal-300/30 via-transparent to-transparent animate-float-2"></div>
        </div>
      </div>
      
      <!-- Navbar -->
      <nav class="flex justify-between items-center px-3 xs:px-4 sm:px-6 md:px-8 py-3 xs:py-4 bg-black/20 backdrop-blur-md z-10 relative border-b border-white/10">
        <div class="text-base xs:text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          ReferNrich
        </div>
        <button class="group relative border-2 border-emerald-400/50 text-emerald-400 px-2 xs:px-3 sm:px-4 md:px-6 py-1 xs:py-1.5 sm:py-2 rounded-full text-xs sm:text-sm md:text-base 
          transition-all duration-300 hover:border-emerald-400 hover:bg-emerald-400/10 hover:shadow-lg hover:shadow-emerald-400/20" 
          routerLink="/auth/login">
          <span class="relative z-10">Login</span>
          <div class="absolute inset-0 bg-emerald-400/10 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
        </button>
      </nav>
      
      <!-- Hero Section -->
      <main class="text-center px-2 xs:px-4 sm:px-6 md:px-8 py-8 xs:py-10 sm:py-16 md:py-24 relative z-10">
        <div class="max-w-4xl mx-auto">
          <div class="relative inline-block mb-3 xs:mb-4 sm:mb-6 md:mb-8">
            <div class="absolute -inset-2 xs:-inset-3 sm:-inset-4 bg-emerald-400/30 blur-2xl rounded-full animate-pulse-slow"></div>
            <span class="relative z-10 text-xs sm:text-sm md:text-lg font-semibold bg-emerald-400/10 text-emerald-400 px-2 xs:px-3 sm:px-4 md:px-6 py-1 xs:py-1.5 sm:py-2 md:py-3 rounded-full">
              🎉 Earn 1 Bonus Point = ₹10 on every successful referral!
            </span>
          </div>
          <h1 class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 xs:mb-3 sm:mb-4 md:mb-6 text-white leading-tight sm:leading-tight">
            Transform Referrals into <span class="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">Wealth</span>
          </h1>
          <p class="text-sm xs:text-base sm:text-lg md:text-xl mb-3 xs:mb-4 sm:mb-8 md:mb-10 text-gray-300/90 max-w-2xl mx-auto leading-relaxed px-1 xs:px-2 sm:px-4 md:px-0">
            Leverage our intelligent referral ecosystem to maximize your network value. 
            <span class="font-semibold text-emerald-400">Every connection converts to real rewards!</span>
          </p>
          <div class="flex justify-center gap-2 xs:gap-3 sm:gap-4">
            <button class="group relative bg-gradient-to-r from-emerald-500 to-teal-400 text-gray-900 
              px-3 xs:px-4 sm:px-6 md:px-8 py-1.5 xs:py-2 sm:py-3 md:py-4 text-xs xs:text-sm sm:text-base md:text-xl rounded-full 
              transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-500/40 font-semibold"
              routerLink="/auth/login">
              <span class="relative z-10">Start Earning Now</span>
              <div class="absolute inset-0 bg-gradient-to-r from-emerald-500/0 to-teal-400/0 rounded-full opacity-0 
                group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </main>
      
      <!-- Features Section -->
      <section class="grid grid-cols-1 sm:grid-cols-3 gap-2 xs:gap-3 sm:gap-4 md:gap-6 px-2 xs:px-4 sm:px-6 md:px-8 py-6 xs:py-8 sm:py-12 md:py-16 relative z-10 max-w-7xl mx-auto">
        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-xl sm:rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-2 xs:mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">✨</div>
          <h3 class="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold mb-1 xs:mb-2 sm:mb-3 md:mb-4 text-white">Instant Rewards</h3>
          <p class="text-xs xs:text-sm sm:text-base text-gray-300/90 leading-relaxed">
            Earn ₹10 equivalent points instantly for every referral. Watch your balance grow in real-time!
          </p>
        </div>

        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-xl sm:rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-2 xs:mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">🚀</div>
          <h3 class="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold mb-1 xs:mb-2 sm:mb-3 md:mb-4 text-white">Smart Tracking</h3>
          <p class="text-xs xs:text-sm sm:text-base text-gray-300/90 leading-relaxed">
            Real-time analytics dashboard to monitor your referrals and earnings progression
          </p>
        </div>

        <div class="relative bg-gradient-to-b from-black/40 to-black/20 backdrop-blur-xl p-3 xs:p-4 sm:p-5 md:p-6 lg:p-8 rounded-xl sm:rounded-2xl 
          border border-white/10 hover:border-emerald-400/30 transition-all duration-300 group">
          <div class="absolute -inset-px bg-gradient-to-br from-emerald-400/20 to-teal-300/10 rounded-xl sm:rounded-2xl opacity-0 
            group-hover:opacity-100 transition-opacity duration-300"></div>
          <div class="text-2xl xs:text-3xl sm:text-4xl md:text-5xl mb-2 xs:mb-3 sm:mb-4 md:mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent w-fit mx-auto">💸</div>
          <h3 class="text-base xs:text-lg sm:text-xl md:text-2xl font-semibold mb-1 xs:mb-2 sm:mb-3 md:mb-4 text-white">Flexible Redemption</h3>
          <p class="text-xs xs:text-sm sm:text-base text-gray-300/90 leading-relaxed">
            Convert points to rewards instantly through multiple redemption channels
          </p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    /* Existing animations remain the same */
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