import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-todo-create',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './todo-create.html',
  styleUrl: './todo-create.css',
})
export class TodoCreate implements OnInit {
  formTodo!: FormGroup;
  apiUrl = "http://localhost:5274/api/todos";

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
  };

  ngOnInit(): void {
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

  onSaveTo() {
    if (this.formTodo.invalid) return;

    const headers = {
      'Content-Type': 'application/json',
      "from": "sable"
    };

    this.http.post(this.apiUrl+"/create", this.formTodo.value, {headers: headers}).subscribe({
      next: data => {
        alert("Todo saved successfully");
        this.formTodo.reset(
          {title: '', description: '',}
        );
        this.router.navigate(['/todos/list']);
      },
      error: error => {
        console.log("Could not save todo", error);
        alert('Could not save todo');
      }
    })
  }
}

