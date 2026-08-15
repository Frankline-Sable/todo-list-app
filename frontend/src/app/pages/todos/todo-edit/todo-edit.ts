import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Todo} from '../todo-list/todo-list';

@Component({
  selector: 'app-todo-edit',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-edit.html',
  styleUrl: './todo-edit.css',
})
export class TodoEdit implements OnInit {
  todoId!: string;
  todo!: Todo;
  formTodo!: FormGroup;
  apiUrl = "http://localhost:5274/api/todos";


  constructor(private activatedRoute: ActivatedRoute, private router: Router,
              private http: HttpClient,
              private formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (!id) {
      console.log("No id found");
      return;
    }
    this.todoId = id;
    this.loadTodo();


    this.formTodo = this.formBuilder.group({
      title: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      description: ['', [
        Validators.required
      ]],
    })
  }

  loadTodo() {
    this.http.get<Todo>(this.apiUrl + `/${this.todoId}`).subscribe({
      next: data => {

        this.todo = data;
        this.formTodo.patchValue({
          title: data.title,
          description: data.description,
        });
        console.log("Todo loaded",data);
      },
      error: err => {
        console.log("Error loading todo.", err);
        alert("Error loading todo.");
      }
    })
  }

  onSaveTo() {
    if (this.formTodo.invalid) return;


    this.http.put(this.apiUrl + `/${this.todoId}`, this.formTodo.value).subscribe({
      next: data => {
        alert("Todo updated successfully");
        this.formTodo.reset(
          {title: '', description: '',}
        );
        this.router.navigate(['/todos/list']);
      },
      error: error => {
        console.log("Could not update todo", error);
        alert('Could not update todo');
      }
    })
  }


}
