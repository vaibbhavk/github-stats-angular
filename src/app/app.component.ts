import { Component } from '@angular/core';
import { Repo } from 'src/interfaces/repo';
import { GithubService } from './github.service';
import { Profile } from 'src/interfaces/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(private githubService: GithubService) {}

  title = 'my-app';

  username: string = '';

  isLoading: boolean = false;
  error: string = '';

  profile: Profile;

  repos: Repo[];

  searchForUser(event: { preventDefault: () => void }) {
    event.preventDefault();

    this.getProfile(this.username);
  }

  getProfile(username: string): void {
    this.isLoading = true;
    this.repos = [];

    this.githubService.getProfile(username).subscribe({
      complete: () => {},
      error: (error) => {
        this.error = error.error.detail;
        this.isLoading = false;
      },
      next: (profile) => {
        console.log(profile);
        this.error = '';
        this.profile = profile;
        this.isLoading = false;
      },
    });
  }
}
