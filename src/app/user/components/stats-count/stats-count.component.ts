import { Component, ElementRef, HostListener, Input, NgZone } from '@angular/core';

@Component({
  selector: 'app-stats-count',
  standalone: true,
  imports: [],
  template: `
    <div class="text-center py-3 transition-transform duration-300">
      <div class="flex items-center justify-center">
        <span class="text-gray-500 text-3xl">{{ prefix }}</span>
        <span class="text-5xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent">{{ formattedValue }}</span>
        <span class="text-gray-500 text-3xl ml-1">{{ suffix }}</span>
        <span *ngIf="showStars" class="ml-2 text-yellow-400 flex">
          <svg *ngFor="let star of fullStars" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg *ngIf="hasHalfStar" xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
            <defs>
              <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="50%" stop-color="currentColor" />
                <stop offset="50%" stop-color="#e5e7eb" />
              </linearGradient>
            </defs>
            <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.799-2.034c-.784-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </span>
      </div>
    </div>

  `,
  
})
export class StatsCountComponent {

  @Input() targetValue: number = 0;
  @Input() prefix: string = '';
  @Input() suffix: string = '';
  @Input() duration: number = 2000; // Duration in milliseconds
  @Input() decimalPlaces: number = 0;
  @Input() showStars: boolean = false;
  
  currentValue: number = 0;
  isCounterStarted: boolean = false;
  animationFrameId: number | null = null;
  
  get fullStars(): number[] {
    return Array(Math.floor(this.currentValue)).fill(0);
  }
  
  get hasHalfStar(): boolean {
    return this.currentValue % 1 >= 0.3 && this.currentValue % 1 <= 0.7;
  }
  
  constructor(private el: ElementRef, private ngZone: NgZone) {}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.checkScroll();
    }, 100);
  }

  ngOnDestroy(): void {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
  
  @HostListener('window:scroll', ['$event'])
  checkScroll() {
    const elementPosition = this.el.nativeElement.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    // Reset counter if element is out of view
    if (elementPosition > windowHeight || elementPosition < -this.el.nativeElement.offsetHeight) {
      this.isCounterStarted = false;
      this.currentValue = 0;
      if (this.animationFrameId !== null) {
        cancelAnimationFrame(this.animationFrameId);
        this.animationFrameId = null;
      }
    }
    // Start the counter when the element is in view
    else if (!this.isCounterStarted) {
      this.isCounterStarted = true;
      this.startCounter();
    }
  }
  
  startCounter(): void {
    this.ngZone.runOutsideAngular(() => {
      const startTime = performance.now();
      const startValue = 0;
      
      const updateCounter = (currentTime: number) => {
        const elapsedTime = currentTime - startTime;
        
        if (elapsedTime < this.duration) {
          const progress = elapsedTime / this.duration;
          // Easing function for smoother animation
          const easeOutQuart = 1 - Math.pow(1 - progress, 4);
          this.currentValue = startValue + (this.targetValue - startValue) * easeOutQuart;
          
          this.ngZone.run(() => {});  // Trigger change detection
          this.animationFrameId = requestAnimationFrame(updateCounter);
        } else {
          this.currentValue = this.targetValue;
          this.ngZone.run(() => {});  // Trigger change detection
          this.animationFrameId = null;
        }
      };
      
      this.animationFrameId = requestAnimationFrame(updateCounter);
    });
  }
  
  get formattedValue(): string {
    return this.currentValue.toFixed(this.decimalPlaces);
  }
}
