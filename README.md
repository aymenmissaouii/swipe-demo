# Generic Onboarding Component

A reusable, fully configurable onboarding component for Ionic/Angular applications. Built with Swiper, it features a modern design, customizable slides, and smooth animations.

## Features

-   **Generic & Reusable**: Fully configuable via Inputs. Pass any content you want.
-   **Swiper Integration**: Built on top of the powerful Swiper.js library for smooth touch interactions.
-   **Dynamic Slides**: Renders as many slides as provided in the configuration array.
-   **Navigation Controls**:
    -   "Next" button for sequential navigation.
    -   "Back" button (appears from 2nd slide onwards) for previous slide navigation.
    -   "Skip" button to bypass onboarding.
    -   "Get Started" button on the final slide.
-   **Modern Typography**: Uses the **Inter** font family for a clean, premium look.
-   **Responsive Design**: Mobile-first layout that adapts to various screen sizes.
-   **Event Driven**: Emits `finish` and `skip` events for parent components to handle navigation logic.

## Installation

1.  **Install Dependencies**:
    Ensure you have the required Ionic and Swiper packages installed.
    ```bash
    npm install
    ```

2.  **Run the Application**:
    Start the local development server.
    ```bash
    ionic serve
    ```

## Usage

### 1. Import the Component

In your parent component's module or standalone imports, import `OnboardingPage`.

### 2. Define Slides Data

In your parent component (e.g., `home.page.ts`), define the slides using the `OnboardingSlide` interface.

```typescript
import { Component } from '@angular/core';
import { OnboardingPage, OnboardingSlide } from './path/to/onboarding/onboarding.page'; // Adjust path

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [OnboardingPage],
})
export class HomePage {

  mySlides: OnboardingSlide[] = [
    {
      title: 'Welcome',
      subtitle: 'This is a subtitle',
      description: 'Here is a description of the feature.',
      image: 'assets/images/slide1.svg',
      icon: 'home'
    },
    {
      title: 'Features',
      subtitle: 'Another subtitle',
      description: 'Explain more features here.',
      image: 'assets/images/slide2.svg',
      icon: 'star'
    }
  ];

  onFinish() {
    console.log('Onboarding Finished');
    // Navigate to dashboard or main app
  }

  onSkip() {
    console.log('Onboarding Skipped');
    // Navigate to dashboard
  }
}
```

### 3. Use in Template

Use the component selector `<app-onboarding>` in your HTML and bind the properties.

```html
<app-onboarding
  [slides]="mySlides"
  (finish)="onFinish()"
  (skip)="onSkip()">
</app-onboarding>
```
