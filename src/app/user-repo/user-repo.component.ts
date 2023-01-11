import { Component, Input } from '@angular/core';
import { Repo } from 'src/interfaces/repo';
import { GithubService } from '../github.service';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-user-repo',
  template: `
    <div *ngFor="let repo of repos | async">
    {{repo | json}}
    </div>
  `,
  styles: [
  ]
})
export class UserRepoComponent {
  @Input() repos: Observable<Repo[]>

}
