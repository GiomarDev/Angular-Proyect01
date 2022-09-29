import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private peliculasService: PeliculasService, private router: Router) { }
  generosNoSeleccionados: MultilpleSelectorModel[];
  cinesNoSeleccionados: MultilpleSelectorModel[];
  errores: string[] = [];

  ngOnInit(): void {
    this.peliculasService.postGet().subscribe(resultado => {
      
      this.generosNoSeleccionados = resultado.generos.map(genero => {
        return <MultilpleSelectorModel>{llave: genero.id, valor: genero.nombre}
      });

      this.cinesNoSeleccionados = resultado.cines.map(cines => {
        return <MultilpleSelectorModel>{llave: cines.id, valor: cines.name}
      });

    }, error => console.error(error));
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.crear(pelicula).subscribe((id: number) => this.router.navigate(['/peliculas/' + id]), 
    error => this.errores = parsearErroresAPI(error));
  }
}
