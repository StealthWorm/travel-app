import { Component } from '@angular/core';
import { Profile } from './profile.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  profile: Profile | undefined;

  constructor(private router: Router) { }

  redirect() {
    this.router.navigate(['/pages/gallery']);
  }

  googleLogin() {
    this.router.navigate(['/pages/gallery']);
  }

  isLoggedIn() {
    return this.profile !== undefined;
  }

}
