import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultilpleSelectorModel } from 'src/app/utilidades/selector-multiple/multiple-selector';
import {  PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-editar-pelicula',
  templateUrl: './editar-pelicula.component.html',
  styleUrls: ['./editar-pelicula.component.css']
})
export class EditarPeliculaComponent implements OnInit {

  constructor(private peliculasService: PeliculasService,
    private activatedRoute: ActivatedRoute,
    private router: Router) { }

  modelo: PeliculaDTO;
  generosSeleccionados: MultilpleSelectorModel[];
  generosNoSeleccionados: MultilpleSelectorModel[];
  cinesSeleccionados: MultilpleSelectorModel[];
  cinesNoSeleccionados: MultilpleSelectorModel[];
  actoresSeleccionados: actorPeliculaDTO[];

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.peliculasService.putGet(params.id)
      .subscribe(peliculaPutGet => {
        this.modelo = peliculaPutGet.peliculaDTO;

        this.generosNoSeleccionados = peliculaPutGet.generosNoSeleccionados.map(genero => {
          return <MultilpleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });

        this.generosSeleccionados = peliculaPutGet.generosSeleccionados.map(genero => {
          return <MultilpleSelectorModel>{llave: genero.id, valor: genero.nombre}
        });
  
        this.cinesSeleccionados = peliculaPutGet.cineSeleccionados.map(cines => {
          return <MultilpleSelectorModel>{llave: cines.id, valor: cines.name}
        });

        this.cinesNoSeleccionados = peliculaPutGet.cineNoSeleccionado.map(cines => {
          return <MultilpleSelectorModel>{llave: cines.id, valor: cines.name}
        });

        this.actoresSeleccionados = peliculaPutGet.actores;
      });
    })
  }

  guardarCambios(pelicula: PeliculaCreacionDTO){
    this.peliculasService.editar(this.modelo.id, pelicula).subscribe(() => this.router.navigate(['/peliculas/' + this.modelo.id]));
  }
}
