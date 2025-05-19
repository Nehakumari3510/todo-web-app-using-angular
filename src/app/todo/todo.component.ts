import { Component } from '@angular/core';

interface Todo {
  id: number;
  task: string;
  date: string;
}

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent {
  todos: Todo[] = [];
  task: string = '';
  date: string = '';
  isEditMode = false;
  currentEditId: number | null = null;

  constructor() {
    const saved = localStorage.getItem('todos');
    if (saved) this.todos = JSON.parse(saved);
  }

  addTask() {
    if (!this.task || !this.date) return;

    if (this.isEditMode && this.currentEditId !== null) {
      const index = this.todos.findIndex(t => t.id === this.currentEditId);
      this.todos[index] = { id: this.currentEditId, task: this.task, date: this.date };
      this.isEditMode = false;
      this.currentEditId = null;
    } else {
      const newTask: Todo = {
        id: new Date().getTime(),
        task: this.task,
        date: this.date
      };
      this.todos.push(newTask);
    }

    this.saveTasks();
    this.task = '';
    this.date = '';
  }

  deleteTask(id: number) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.saveTasks();
  }

  editTask(todo: Todo) {
    this.task = todo.task;
    this.date = todo.date;
    this.currentEditId = todo.id;
    this.isEditMode = true;
  }

  saveTasks() {
    localStorage.setItem('todos', JSON.stringify(this.todos));
  }
}
