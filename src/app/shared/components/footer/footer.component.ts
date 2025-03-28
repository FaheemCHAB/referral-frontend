import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: `    .social-icon {
    @apply w-10 h-10 rounded-full bg-gray-100/10 flex items-center justify-center 
           text-xl text-gray-100 hover:bg-gray-100/20 transition-all 
           hover:scale-110;
}`
})
export class FooterComponent {

}
