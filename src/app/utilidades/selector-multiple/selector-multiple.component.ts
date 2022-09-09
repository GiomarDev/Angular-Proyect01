import { Component, Input, OnInit } from '@angular/core';
import { MultilpleSelectorModel } from './multiple-selector';

@Component({
  selector: 'app-selector-multiple',
  templateUrl: './selector-multiple.component.html',
  styleUrls: ['./selector-multiple.component.css']
})
export class SelectorMultipleComponent implements OnInit {

  constructor() { }

  @Input()
  Seleccionado: MultilpleSelectorModel[] = [];

  @Input()
  noSeleccionado: MultilpleSelectorModel[] = [];

  ngOnInit(): void {
  }

  seleccionar(item: MultilpleSelectorModel, index: number){
    this.Seleccionado.push(item);
    this.noSeleccionado.splice(index, 1);
  }

  desSeleccionar(item: MultilpleSelectorModel, index: number){
    this.noSeleccionado.push(item);
    this.noSeleccionado.splice(index, 1);
  }

  seleccionarTodo(){
    this.Seleccionado.push(...this.noSeleccionado);
    this.noSeleccionado = [];
  }

  deseleccionarTodo(){
    this.noSeleccionado.push(...this.Seleccionado);
    this.Seleccionado = [];
  }
}
