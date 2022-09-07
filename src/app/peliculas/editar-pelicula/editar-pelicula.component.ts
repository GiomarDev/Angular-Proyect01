import { Component, OnInit } from '@angular/core';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor() { }

  modelo: PeliculaDTO = {titulo: 'Spiderman', trailer: 'abc',enCines: true, fechaLanzamiento : new Date(), resumen: 'sss',poster: 'https://www.cinepremiere.com.mx/wp-content/uploads/2020/06/tobey_maguire_spider-verse-1024x559.jpg'};

  ngOnInit(): void {
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    console.log(pelicula);
  }
}
