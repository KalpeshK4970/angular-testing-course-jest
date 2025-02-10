import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-todos-footer',
  template: `<footer
  class="footer"
  data-testid="footer"
  [ngClass]="{ hidden: noTodosClass() }"
>
  <span class="todo-count" data-testid="todoCount">
    <strong>{{ activeCount() }}</strong>
    {{ itemsLeftText() }}
  </span>
  <ul class="filters">
    <li>
      <span
        [ngClass]="{ selected: filterSig() === filterEnum.all }"
        data-testid="filterLink"
        (click)="changeFilter(filterEnum.all)"
      >
        All
      </span>
    </li>
    <li>
      <span
        [ngClass]="{ selected: filterSig() === filterEnum.active }"
        data-testid="filterLink"
        (click)="changeFilter(filterEnum.active)"
      >
        Active
      </span>
    </li>
    <li>
      <span
        [ngClass]="{ selected: filterSig() === filterEnum.completed }"
        data-testid="filterLink"
        (click)="changeFilter(filterEnum.completed)"
      >
        Completed
      </span>
    </li>
  </ul>
</footer>
`,
  standalone: true,
  imports: [CommonModule],
})
export class FooterComponent {
  todosService = inject(TodosService);
  filterSig = this.todosService.filterSig;
  filterEnum = FilterEnum;
  activeCount = computed(() => {
    return this.todosService.todosSig().filter((todo) => !todo.isCompleted)
      .length;
  });
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);
  itemsLeftText = computed(
    () => `item${this.activeCount() !== 1 ? 's' : ''} left`
  );

  changeFilter(filterName: FilterEnum): void {
    this.todosService.changeFilter(filterName);
  }
}
