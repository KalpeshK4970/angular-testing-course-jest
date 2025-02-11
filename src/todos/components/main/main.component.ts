import { Component, OnInit, computed, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';
import { CommonModule } from '@angular/common';
import { FilterEnum } from '../../types/filter.enum';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-todos-main',
  template: `<section class="main" data-testid="main" [ngClass]="{ hidden: noTodosClass() }">
  <input
    id="toggle-all"
    class="toggle-all"
    type="checkbox"
    data-testid="toggleAll"
    [checked]="isAllTodosSelected()"
    (change)="toggleAllTodos($event)"
  />
  <label for="toggle-all">Mark all as completed</label>
  <ul class="todo-list">
    <app-todos-todo
      *ngFor="let todo of visibleTodos()"
      [todo]="todo"
      data-testid="todo"
      [isEditing]="editingId === todo.id"
      (setEditingId)="setEditingId($event)"
    ></app-todos-todo>
  </ul>
</section>`,
  standalone: true,
  imports: [CommonModule, TodoComponent],
})
export class MainComponent implements OnInit {
  todosService = inject(TodosService);
  editingId: string | null = null;

  visibleTodos = computed(() => {
    const todos = this.todosService.todosSig();
    const filter = this.todosService.filterSig();

    if (filter === FilterEnum.active) {
      return todos.filter((todo) => !todo.isCompleted);
    } else if (filter === FilterEnum.completed) {
      return todos.filter((todo) => todo.isCompleted);
    }
    return todos;
  });
  isAllTodosSelected = computed(() =>
    this.todosService.todosSig().every((todo) => todo.isCompleted)
  );
  noTodosClass = computed(() => this.todosService.todosSig().length === 0);

  ngOnInit(): void {
    this.todosService.getTodos();
  }

  setEditingId(editingId: string | null): void {
    this.editingId = editingId;
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.todosService.toggleAll(target.checked);
  }
}
