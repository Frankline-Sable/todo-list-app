import {Routes} from '@angular/router';
import {TodoCreate} from './pages/todos/todo-create/todo-create';
import {TodoEdit} from './pages/todos/todo-edit/todo-edit';
import {TodoDetail} from './pages/todos/todo-detail/todo-detail';
import {NotFound} from './pages/not-found/not-found';
import {TodoList} from './pages/todos/todo-list/todo-list';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos/create',
    component: TodoCreate
  },
  {
    path: 'todos/list',
    component: TodoList
  },
  {
    path: 'todos/:id/edit',
    component: TodoEdit
  },
  {
    path: 'todos/:id/detail',
    component: TodoDetail
  },
  {
    path: "**",
    component: NotFound
  }
];
