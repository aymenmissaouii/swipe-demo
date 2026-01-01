import { Component, OnInit, ViewChild, NgZone, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter } from '@angular/core';
import { IonIcon, IonContent } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, wallet, documentText, arrowBack } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';

export interface OnboardingSlide {
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: string; // for fallback
}

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.page.html',
  styleUrls: ['./onboarding.page.scss'],
  standalone: true,
  imports: [IonIcon, IonContent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class OnboardingPage implements OnInit {

  @ViewChild('swiper') swiper: any;
  isLastSlide: boolean = false;

  @Input() slides: OnboardingSlide[] = [
    {
      title: 'Welcome to Swiper Demo',
      subtitle: 'Your Smart Companion',
      description: 'A comprehensive app giving you full control over your projects. Manage easily and professionally.',
      image: 'assets/images/onboarding-1.svg',
      icon: 'home'
    },
    {
      title: 'Track Your Sales',
      subtitle: 'Financial Precision',
      description: 'Record every sale and purchase with extreme accuracy. Monitor daily expenses and know where every penny goes.',
      image: 'assets/images/onboarding-2.svg',
      icon: 'wallet'
    },
    {
      title: 'Detailed Reports',
      subtitle: 'Clear Vision',
      description: 'Get detailed financial reports with a click. Analyze performance to make informed decisions.',
      image: 'assets/images/onboarding-3.svg',
      icon: 'document-text'
    }
  ];

  @Output() finish = new EventEmitter<void>();
  @Output() skip = new EventEmitter<void>();

  constructor(private ngZone: NgZone) {
    addIcons({ home, wallet, documentText, arrowBack });
    register();
  }

  async ngOnInit() {
  }

  ngAfterViewInit() {
    // Small delay to ensure swiper is fully initialized
    setTimeout(() => {
      this.checkIfLastSlide();

      // Listen for slide changes
      if (this.swiper && this.swiper.nativeElement) {
        this.swiper.nativeElement.addEventListener('swiperslidechange', () => {
          this.ngZone.run(() => {
            this.checkIfLastSlide();
          });
        });
      }
    }, 100);
  }

  checkIfLastSlide() {
    if (this.swiper && this.swiper.nativeElement && this.swiper.nativeElement.swiper) {
      const swiperInstance = this.swiper.nativeElement.swiper;
      this.isLastSlide = swiperInstance.isEnd;
    }
  }

  next() {
    if (this.swiper && this.swiper.nativeElement && this.swiper.nativeElement.swiper) {
      this.swiper.nativeElement.swiper.slideNext();
    }
  }

  onSkip() {
    this.skip.emit();
  }

  onStart() {
    this.finish.emit();
  }

}
