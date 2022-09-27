import { Component, OnInit } from '@angular/core';
import { MultilpleSelectorModel } from 'src/app/utilidades/selector-multiple/multiple-selector';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { PeliculaCreacionDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-crear-peliculas',
  templateUrl: './crear-peliculas.component.html',
  styleUrls: ['./crear-peliculas.component.css']
})
export class CrearPeliculasComponent implements OnInit {

  constructor(private peliculasService: PeliculasService) { }
  generosNoSeleccionado: MultilpleSelectorModel[];
  cinesNoSeleccionado: MultilpleSelectorModel[];
  errores: string[] = [];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(resultado => {
      
      this.generosNoSeleccionado = resultado.generos.map(genero => {
        return <MultilpleSelectorModel>{llave: genero.id, valor: genero.nombre}
      });

      this.cinesNoSeleccionado = resultado.cines.map(cines => {
        return <MultilpleSelectorModel>{llave: cines.id, valor: cines.name}
      });

    }, error => console.error(error));
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.crear(pelicula).subscribe(() => console.log('exitoso'), 
    error => this.errores = parsearErroresAPI(error));
  }
}
