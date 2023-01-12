import { Component, Input } from '@angular/core';
import { Repo } from 'src/interfaces/repo';

@Component({
  selector: 'app-user-repo',
  template: `
    <div class="container-fluid">
      <div class="row row-cols-1 row-cols-md-2 mb-5">
        <div
          class="col border g-3"
          *ngFor="
            let repo of repos
              | slice : (page - 1) * pageSize : (page - 1) * pageSize + pageSize
          "
        >
          <div class="p-3">
            <a
              class="text-decoration-none"
              href="{{ repo.html_url }}"
              target="_blank"
              rel="noopener noreferrer"
              ><h5>{{ repo.name }}</h5></a
            >
            <p class="d-inline-block text-truncate" style="max-width: 300px;">
              {{ repo.description }}
            </p>

            <div class="d-flex">
              <p
                *ngFor="let t of repo.topics"
                class="p-1 bg-info-subtle"
                style="margin-right: 10px;"
              >
                {{ t }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <ngb-pagination
        *ngIf="repos.length > 0"
        [collectionSize]="repos.length"
        [(page)]="page"
        [boundaryLinks]="true"
      ></ngb-pagination>

      <br />
    </div>
  `,
  styles: [],
})
export class UserRepoComponent {
  @Input() repos: Repo[];
  @Input() pageSize: number;
  @Input() page: number;
}
