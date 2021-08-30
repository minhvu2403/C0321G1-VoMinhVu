import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Todo} from '../model/todo';
import {TodoService} from '../service/todo.service';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {
  formTodo: FormGroup;
  todoList: Todo[] = [];

  constructor(private  todoService: TodoService) {
    this.formTodo = new FormGroup({
      content: new FormControl('')
    });
  }

  ngOnInit(): void {
  }

  getAll() {
    this.todoService.getAll().subscribe(todo => {
      this.todoList = todo;
    });
  }

  submit() {
    const todo = this.formTodo.value;
    this.todoService.saveTodo(todo).subscribe(() => {
      this.formTodo.reset();
      alert('Successfully created : ' + todo.content);
      this.getAll();
    }, error => {
      alert('Failed!') ;
    });
  }

  delete(id: number) {
    this.todoService.delete(id).subscribe(() => {
      alert('Successfully deleted!') ;
      this.getAll();
    }, error => {
      alert('Failed!') ;
    });
  }
}
