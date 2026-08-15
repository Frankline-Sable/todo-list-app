import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {HttpClient, HttpHeaders} from '@angular/common/http';

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

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
  };

  ngOnInit(): void {
    this.formTodo = this.formBuilder.group({
      titleField: ['', [
        Validators.required,
        Validators.maxLength(10)
      ]],
      descField: ['', [
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
          {titleField: '', descField: '',}
        );
      },
      error: error => {
        console.log("Could not save todo", error);
        alert('Could not save todo');
      }
    })
  }
}

