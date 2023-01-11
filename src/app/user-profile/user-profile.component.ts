import { Component, Input } from '@angular/core';
import { Profile } from 'src/interfaces/profile';

@Component({
  selector: 'app-user-profile',
  template: `
    <div *ngIf="profile && !{}" class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src={{profile.avatar_url}} class="img-fluid rounded-start" alt={{profile.name}}>
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">{{profile.name}}&nbsp;({{profile.login}})</h5>
        <a href="#" class="card-link" target="_blank">{{profile.html_url}}</a>
        <p class="card-text" *ngIf="profile.bio">{{profile.bio}}</p>
        <p class="card-text" *ngIf="profile.location"><i class="bi bi-geo-alt-fill"></i>&nbsp;{{profile.location}}</p>
        <p class="card-text" *ngIf="profile.twitter_username">Twitter:&nbsp;{{profile.twitter_username}}</p>
        <div class="card-footer bg-transparent border-success">
        <button type="button" class="btn btn-outline-primary">Show Repos</button>
        </div>
      </div>
    </div>
  </div>
</div>
    `,
  styles: [
  ]
})
export class UserProfileComponent {
 @Input() profile: Profile
}
