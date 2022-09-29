import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import { PeliculaDTO } from '../pelicula';
import { PeliculasService } from '../peliculas.service';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute, private generoServices: GenerosService,
              private peliculaServices: PeliculasService) { }

  form: FormGroup;
  generos: generoDTO[] = [];
  paginaActual = 1;
  cantidadElementosAMostrar = 10;
  cantidadElementos;
  peliculas: PeliculaDTO[] = [];
  
  formularioOriginal = {
    titulo: '',
    generoID: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {

    this.generoServices.obtenerTodos().subscribe(generos => {
      this.generos = generos;

      this.form = this.formBuilder.group(this.formularioOriginal);
      this.leerValoresURL();
      this.buscarPeliculas(this.form.value);
  
      this.form.valueChanges.subscribe(valores => {
        this.buscarPeliculas(valores);
        this.escribirParametrosSearchURL();
      });
    });

  }

  private leerValoresURL(){
    this.activatedRoute.queryParams.subscribe((params) => {
      var object: any = {};

      if(params.titulo){
        object.titulo = params.titulo;
      }

      if(params.generoID){
        object.generoID = Number(params.generoID);
      }

      if(params.proximosEstrenos){
        object.proximosEstrenos = params.proximosEstrenos;
      }

      if(params.enCines){
        object.enCines = params.enCines;
      }
      
      this.form.patchValue(object);
    })
  }

  private escribirParametrosSearchURL(){
    var queryStrings = [];
    var valoresFormulario = this.form.value;

    if(valoresFormulario.titulo){
      queryStrings.push(`titulo=${valoresFormulario.titulo}`);
    }
    if(valoresFormulario.generoID !== 0){
      queryStrings.push(`generoID=${valoresFormulario.generoID}`);
    }
    if(valoresFormulario.proximosEstrenos){
      queryStrings.push(`proximosEstrenos=${valoresFormulario.proximosEstrenos}`);
    }
    if(valoresFormulario.enCines){
      queryStrings.push(`enCines=${valoresFormulario.enCines}`);
    }

    //Permite reescribir la url a antojo
    this.location.replaceState('peliculas/buscar',queryStrings.join('&'));
  }

  clear(){
    this.form.patchValue(this.formularioOriginal);
  }

  buscarPeliculas(valores: any){
    valores.pagina = this.paginaActual;
    valores.recordsPorPagina = this.cantidadElementosAMostrar;
    this.peliculaServices.filtrar(valores).subscribe(response => {
      this.peliculas = response.body;
      this.escribirParametrosSearchURL();
      this.cantidadElementos = response.headers.get('cantidadTotalRegistros');
    });
  }

  paginatorUpdate(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadElementosAMostrar = datos.pageSize;
    this.buscarPeliculas(this.form.value);
  }
}
