import { Component, OnInit } from '@angular/core';
import { cineCreacionDTO, cineDTO } from '../cines';

@Component({
  selector: 'app-editar-cine',
  templateUrl: './editar-cine.component.html',
  styleUrls: ['./editar-cine.component.css']
})
export class EditarCineComponent implements OnInit {

  constructor() { }

  modelo: cineDTO = {nombre: 'Giomar', latitud:-12.011955100275483 ,longitud: -437.0815479757338 };

  ngOnInit(): void {
  }

  guardarCambios(cine: cineCreacionDTO){
    console.log(cine);
  }
}
