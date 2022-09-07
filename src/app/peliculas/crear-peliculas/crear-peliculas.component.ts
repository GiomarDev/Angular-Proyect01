import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO } from '../pelicula';

@Component({
  selector: 'app-crear-peliculas',
  templateUrl: './crear-peliculas.component.html',
  styleUrls: ['./crear-peliculas.component.css']
})
export class CrearPeliculasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log(pelicula);
  }
}
