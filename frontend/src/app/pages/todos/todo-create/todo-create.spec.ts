import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCreate } from './todo-create';

describe('TodoCreate', () => {
  let component: TodoCreate;
  let fixture: ComponentFixture<TodoCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(TodoCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
