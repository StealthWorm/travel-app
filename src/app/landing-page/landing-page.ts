import { Component } from '@angular/core';
import { Profile } from './profile.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthGoogleService } from '../auth-google.service';

@Component({
  selector: 'app-landing-page',
  standalone: false,
  templateUrl: './landing-page.html',
  styleUrl: './landing-page.scss'
})
export class LandingPage {
  profile: Profile | undefined;

  constructor(private router: Router, private authGoogleService: AuthGoogleService) { }

  redirect() {
    this.router.navigate(['/pages/gallery']);
  }

  googleLogin() {
    this.authGoogleService.login();
  }

  googleLogout() {
    this.authGoogleService.logout();
  }

  get isLoggedIn() {
    this.profile = this.authGoogleService.getUserProfile();
    return this.authGoogleService.isLoggedIn$;
  }
}
