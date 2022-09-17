import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatTable } from '@angular/material/table';

@Component({
  selector: 'app-autocomplete-actores',
  templateUrl: './autocomplete-actores.component.html',
  styleUrls: ['./autocomplete-actores.component.css']
})
export class AutocompleteActoresComponent implements OnInit {

  constructor() { }

  control: FormControl = new FormControl();

  columnasAMostrar = ['imagen','nombre','personaje','acciones'];

  actores = [{nombre: 'Tom Holland',personaje:'', foto: 'https://th.bing.com/th/id/OIP.G6A2pcJkofN-1Uq2TgB_AQHaE7?pid=ImgDet&rs=1'}, 
             {nombre: 'Tom Hanks',personaje:'', foto: 'https://th.bing.com/th/id/OIP.KUFkDJKn1OUpGmOhDzySkQAAAA?pid=ImgDet&rs=1'}];
  
  acotoresOriginal = this.actores;
  
  actoresSeleccionados = [];

  @ViewChild(MatTable) table: MatTable<any>;

  ngOnInit(): void {
    this.control.valueChanges.subscribe(valor => {
      this.actores = this.acotoresOriginal;
      this.actores = this.actores.filter(actor => actor.nombre.indexOf(valor) !== -1)
    });
  }

  optionSelected(event: MatAutocompleteSelectedEvent){
    console.log(event.option.value);
    this.actoresSeleccionados.push(event.option.value);
    this.control.patchValue('');
    if(this.table !== undefined){
      this.table.renderRows();
    }
  }

  eliminar(actor){
    const indice = this.actoresSeleccionados.findIndex(a => a.nombre == actor.nombre);
    this.actoresSeleccionados.splice(indice, 1);
    this.table.renderRows();
  }

  finalizaArrastre(event: CdkDragDrop<any[]>){
    const indicePrevio = this.actoresSeleccionados.findIndex(
      actor => actor === event.item.data
    )
    moveItemInArray(this.actoresSeleccionados, indicePrevio, event.currentIndex);
    this.table.renderRows();
  }
}
