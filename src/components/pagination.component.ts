import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../services/utils.service';



@Component({
  selector: 'mc-pagination',
  template: `<ul class="pagination">
  <li
    *ngFor="let page of pages"
    class="page-item"
    data-testid="page-container"
    [ngClass]="{ active: currentPage === page }"
    (click)="selectPage(page)"
  >
    <span class="page-link">
      {{ page }}
    </span>
  </li>
</ul>
`,
  standalone: true,
  imports: [RouterLink, CommonModule],
})
export class PaginationComponent implements OnInit {
  @Input() total: number = 0;
  @Input() limit: number = 20;
  @Input() currentPage: number = 1;

  @Output('pageChange')
  pageChangeEvent = new EventEmitter<number>();

  pagesCount: number = 1;
  pages: number[] = [];

  constructor(@Inject(UtilsService) private utilsService: UtilsService) {}

  ngOnInit(): void {
    this.pagesCount = Math.ceil(this.total / this.limit);
    this.pages =
      this.pagesCount > 0
        ? this.utilsService.range(1, this.pagesCount + 1)
        : [];
  }

  selectPage(page: number): void {
    this.pageChangeEvent.emit(page);
  }
}
