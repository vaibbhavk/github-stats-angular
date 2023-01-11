import { Component } from '@angular/core';
import { Repo } from 'src/interfaces/repo';
import {Observable, of} from 'rxjs';
import { GithubService } from './github.service';
import { Profile } from 'src/interfaces/profile';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private githubService: GithubService){}

  title = 'my-app';

  username: string = ""
  isLoading: boolean = false

  profile: Profile
  repos: Observable<Repo[]>

  searchForUser(event: { preventDefault: () => void; }){
    event.preventDefault();

    this.getProfile()
  }

  getProfile(): void {
   this.isLoading = true
   this.githubService.getProfile().subscribe(profile => {
    this.profile = profile
   this.isLoading = false
  })
  }

  getRepos(): void {
   this.repos = this.githubService.getRepos();
  }
}

