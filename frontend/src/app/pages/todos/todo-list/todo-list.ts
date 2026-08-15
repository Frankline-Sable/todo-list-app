import {Component, OnInit, signal} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {JsonPipe} from '@angular/common';

@Component({
  selector: 'app-todo-list',
  imports: [
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './todo-list.html',
  styleUrl: './todo-list.css',
})
export class TodoList implements OnInit {

  todos = signal<Todo[]>([]);
  apiUrl = "http://localhost:5274/api/todos";

  ngOnInit(): void {
    this.loadTodos();
  }

  constructor(private http: HttpClient) {

  }

  loadTodos() {
    this.http.get<Todo[]>(this.apiUrl).subscribe({
      next: data => {
        console.log('BEFORE:', this.todos.length);

        this.todos.set(data);

        console.log('AFTER:', this.todos.length);
      },
      error: err => {
        console.log("Error loading todos.", err);
        alert("Error loading todos.");
      }
    })
  }

  onDelete(todo: Todo) {
    this.http.delete(this.apiUrl + `/${todo.id}`).subscribe({
      next: data => {
        //this.loadTodos();
        this.todos.update(todos=>todos.filter(t=>t.id!==todo.id));
        alert("Delete successfully.");
      },
      error: err => {
        console.log("Error deleting todos.", err);
        alert("Error deleting todos.");
      }
    })
  }
}

export class Todo {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;


  constructor(id: string, title: string, description: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

  }
}
