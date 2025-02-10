import { Component, inject } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-header',
  template: `<header class="header">
  <h1>todos</h1>
  <input
    class="new-todo"
    placeholder="What needs to be done?"
    autoFocus
    [value]="text"
    data-testid="newTodoInput"
    (keyup)="changeText($event)"
    (keyup.enter)="addTodo()"
  />
</header>
`,
  standalone: true,
})
export class HeaderComponent {
  todosService = inject(TodosService);
  text: string = '';

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.text = target.value;
  }

  addTodo(): void {
    this.todosService.addTodo(this.text);
    this.text = '';
  }
}
