import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  template: `
    <div class="landing-container">
      <div class="animated-background"></div>
      <nav class="navbar">
        <div class="logo">ReferFuture</div>
        <button class="login-btn" routerLink="/auth/login">Login</button>
      </nav>
      
      <main class="hero">
        <h1 class="title">Welcome to the Future of Referrals</h1>
        <p class="subtitle">Revolutionize your network with our cutting-edge referral system</p>
        <div class="cta-container">
          <button class="cta-btn">Get Started</button>
        </div>
      </main>
      
      <section class="features">
        <div class="feature">
          <div class="icon">🚀</div>
          <h2>Boost Your Network</h2>
          <p>Expand your connections exponentially</p>
        </div>
        <div class="feature">
          <div class="icon">💎</div>
          <h2>Earn Rewards</h2>
          <p>Get rewarded for every successful referral</p>
        </div>
        <div class="feature">
          <div class="icon">🔮</div>
          <h2>Predict Success</h2>
          <p>AI-powered referral matching</p>
        </div>
      </section>
    </div>
  `,
  styles: [`
    .landing-container {
      font-family: 'Arial', sans-serif;
      color: #e0e0e0;
      min-height: 100vh;
      overflow: hidden;
      position: relative;
    }

    .animated-background {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, #000033, #000066, #000099, #000033);
      background-size: 400% 400%;
      animation: gradientBG 15s ease infinite;
      z-index: -1;
    }

    @keyframes gradientBG {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: rgba(0, 0, 51, 0.5);
      backdrop-filter: blur(10px);
      position: relative;
      z-index: 10;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      background: linear-gradient(45deg, #4169E1, #00BFFF);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }

    .login-btn {
      background: transparent;
      border: 2px solid #4169E1;
      color: #4169E1;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .login-btn:hover {
      background: #4169E1;
      color: #000033;
    }

    .hero {
      text-align: center;
      padding: 4rem 2rem;
      position: relative;
      z-index: 10;
    }

    .title {
      font-size: 3rem;
      margin-bottom: 1rem;
      animation: glow 2s ease-in-out infinite alternate;
    }

    @keyframes glow {
      from {
        text-shadow: 0 0 5px #4169E1, 0 0 10px #4169E1, 0 0 15px #4169E1;
      }
      to {
        text-shadow: 0 0 10px #4169E1, 0 0 20px #4169E1, 0 0 30px #4169E1;
      }
    }

    .subtitle {
      font-size: 1.2rem;
      margin-bottom: 2rem;
      color: #B0C4DE;
    }

    .cta-btn {
      background: linear-gradient(45deg, #4169E1, #00BFFF);
      border: none;
      color: #000033;
      padding: 1rem 2rem;
      font-size: 1.2rem;
      border-radius: 50px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .cta-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 0 20px rgba(65, 105, 225, 0.5);
    }

    .features {
      display: flex;
      justify-content: space-around;
      padding: 4rem 2rem;
      position: relative;
      z-index: 10;
    }

    .feature {
      text-align: center;
      max-width: 300px;
      background: rgba(0, 0, 51, 0.5);
      backdrop-filter: blur(10px);
      padding: 2rem;
      border-radius: 15px;
      transition: all 0.3s ease;
    }

    .feature:hover {
      transform: translateY(-10px);
      box-shadow: 0 10px 20px rgba(65, 105, 225, 0.2);
    }

    .icon {
      font-size: 3rem;
      margin-bottom: 1rem;
    }

    .feature h2 {
      font-size: 1.5rem;
      margin-bottom: 0.5rem;
      color: #B0C4DE;
    }

    .feature p {
      font-size: 1rem;
      color: #8090A0;
    }
  `]

})
export class LandingPageComponent {
  constructor(private router: Router) {}

  // navigateTo(role: string) {
  //   this.router.navigate([`/${role}/login`]);
  // }
}