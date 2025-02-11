import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
  inject,
} from '@angular/core';
import { TodoInterface } from '../../types/todo.interface';
import { CommonModule } from '@angular/common';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-todos-todo',
  template: `
  <li
  data-testid="todo"
  [ngClass]="{ editing: isEditing, completed: todo.isCompleted }"
>
  <div class="view">
    <input
      class="toggle"
      data-testid="toggle"
      type="checkbox"
      [checked]="todo.isCompleted"
      (change)="toggleTodo()"
    />
    <label data-testid="label" (dblclick)="setTodoInEditMode()">{{
      todo.text
    }}</label>
    <button
      data-testid="destroy"
      class="destroy"
      (click)="removeTodo()"
    ></button>
  </div>
  <ng-container *ngIf="isEditing">
    <input
      data-testid="edit"
      class="edit"
      #textInput
      [value]="editingText"
      (keyup)="changeText($event)"
      (keyup.enter)="changeTodo()"
    />
  </ng-container>
</li>

  `,
  standalone: true,
  imports: [CommonModule],
})
export class TodoComponent implements OnInit, OnChanges {
  @Input({ required: true }) todo!: TodoInterface;
  @Input({ required: true }) isEditing!: boolean;
  @Output() setEditingId: EventEmitter<string | null> = new EventEmitter();

  @ViewChild('textInput') textInput?: ElementRef;

  todosService = inject(TodosService);
  editingText: string = '';

  ngOnInit(): void {
    this.editingText = this.todo.text;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isEditing'].currentValue) {
      setTimeout(() => {
        this.textInput?.nativeElement.focus();
      }, 1000);
    }
  }

  changeText(event: Event) {
    const value = (event.target as HTMLInputElement).value;
    this.editingText = value;
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todo.id, this.editingText);
    this.setEditingId.emit(null);
  }

  setTodoInEditMode(): void {
    this.setEditingId.emit(this.todo.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todo.id);
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todo.id);
  }
}
