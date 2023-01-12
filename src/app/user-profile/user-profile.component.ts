import { Component, Input } from '@angular/core';
import { Profile } from 'src/interfaces/profile';
import { Repo } from 'src/interfaces/repo';
import { GithubService } from '../github.service';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="profile">
      <div class="d-flex">
        <img
          src="{{ profile.avatar_url }}"
          alt="{{ profile.name }}"
          width="250"
          height="250"
        />
        <div class="p-3 d-flex flex-column" style="max-width: 400px;">
          <h5 class="mb-2" *ngIf="profile.name">
            {{ profile.name }}&nbsp;({{ profile.login }})
          </h5>
          <h5 class="mb-2" *ngIf="!profile.name">{{ profile.login }}</h5>
          <span class="d-inline-block text-truncate" *ngIf="profile.bio">
            {{ profile.bio }}
          </span>
          <div class="d-flex">
            <h5><i class="bi bi-link"></i></h5>
            &nbsp;
            <a
              href="{{ profile.html_url }}"
              target="_blank"
              rel="noopener noreferrer"
              >{{ profile.html_url }}</a
            >
          </div>

          <p class="card-text" *ngIf="profile.location">
            <i class="bi bi-geo-alt-fill"></i>&nbsp;{{ profile.location }}
          </p>
          <span
            class="d-inline-block text-truncate"
            *ngIf="profile.twitter_username"
          >
            Twitter:&nbsp;{{ profile.twitter_username }}
          </span>

          <p class="flex-grow-1"></p>

          <button
            type="button"
            class="btn btn-outline-primary w-20"
            (click)="getRepos(profile.login)"
          >
            Show Repos
          </button>
        </div>
      </div>

      <br />

      <div *ngIf="isLoading" class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>

      <app-user-repo
        *ngIf="error.length == 0"
        [repos]="repos"
        [page]="page"
        [pageSize]="pageSize"
      ></app-user-repo>

      <div
        class="alert alert-danger mt-3"
        *ngIf="error.length > 0"
        role="alert"
      >
        {{ error }}
      </div>
    </div>
  `,
  styles: [],
})
export class UserProfileComponent {
  @Input() profile: Profile;
  @Input() repos: Repo[];

  constructor(private githubService: GithubService) {}

  title = 'my-app';

  isLoading: boolean = false;
  error: string = '';

  pageSize = 10;

  page = 1;

  getRepos(username: string): void {
    this.isLoading = true;
    this.githubService.getRepos(username).subscribe({
      complete: () => {},
      error: (error) => {
        this.error = error.error.detail;
        this.isLoading = false;
      },
      next: (repos) => {
        this.error = '';
        this.repos = repos as Repo[];
        this.isLoading = false;
      },
    });
  }
}
