import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { borrar, editar, toggle } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})

export class TodoItemComponent implements OnInit {

  @Input() todo:any;
  @ViewChild('inputFisico') txtInputFisico: ElementRef<HTMLInputElement> = {} as ElementRef;

  chkCompletado:FormControl = new FormControl;
  txtInput:FormControl  = new FormControl;


  editando:boolean  = false;

  constructor(private store:Store<AppState>){}

  ngOnInit(): void {
    this.chkCompletado = new FormControl(this.todo.completado)
    this.txtInput = new FormControl(this.todo.texto, Validators.required);

    this.chkCompletado.valueChanges.subscribe(valor=>{
      console.log(valor);
      this.store.dispatch(toggle({id:this.todo.id}));
    })
  }

  editar(event:any){
    this.editando = true;

    this.txtInput.setValue( this.todo.texto );
    
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  terminarEdicion(){
    this.editando = false;

    if (this.txtInput.invalid) return;
    if (this.txtInput.value === this.todo.texto) return;

    this.store.dispatch(editar({
      id:this.todo.id,
      texto:this.txtInput.value
    }))
  }

  borrar(){
    this.store.dispatch(borrar({id:this.todo.id}))
  }

}
