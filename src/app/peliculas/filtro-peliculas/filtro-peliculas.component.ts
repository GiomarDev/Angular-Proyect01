import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtro-peliculas',
  templateUrl: './filtro-peliculas.component.html',
  styleUrls: ['./filtro-peliculas.component.css']
})
export class FiltroPeliculasComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private location: Location, private activatedRoute: ActivatedRoute) { }

  form: FormGroup;
  
  generos = [
    {
      id: 1,
      nombre: 'Drama'
    },
    {
      id: 2,
      nombre: 'Terror'
    },
    {
      id: 3,
      nombre: 'Accion'
    }
  ]
  peliculas = [
    {
      titulo: 'Spiderman Far-From-Home',
      enCines: false,
      proximosEstrenos: true,
      generos :[1,2],
      poster: 'https://th.bing.com/th/id/R.0aec5708eaae4b078a5ae9ce89078ac2?rik=y6oORVYR1kHvmQ&pid=ImgRaw&r=0'
    },
    {
      titulo: 'La Sirenita',
      enCines: true,
      proximosEstrenos: true,
      generos :[3],
      poster: 'https://s1.dmcdn.net/v/SBmb81VtF-GuB-3-x/x720'
    },
    {
      titulo: 'Spiderman Lotus',
      enCines: true,
      proximosEstrenos: false,
      generos :[1,3],
      poster: 'https://media.fstatic.com/uBMh7iqbcO_ylQ1VQe4q1ysH3Hw=/290x478/smart/media/movies/covers/2021/08/E7wBo-EXEAIHQ-C.jpg'
    },
  ]
  peliculasOriginal = this.peliculas;
  formularioOriginal = {
    titulo: '',
    generoID: 0,
    proximosEstrenos: false,
    enCines: false
  };

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.formularioOriginal);
    this.leerValoresURL();
    this.buscarPeliculas(this.form.value);

    this.form.valueChanges.subscribe(valores => {
      console.log(valores);
      this.peliculas = this.peliculasOriginal;
      this.buscarPeliculas(valores);
      this.escribirParametrosSearchURL();
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
    if(valores.titulo){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.titulo.indexOf(valores.titulo) !== -1);
    }

    if(valores.generoID !== 0){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.generos.indexOf(valores.generoID) !== -1);
    }

    if(valores.proximosEstrenos){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.proximosEstrenos);
    }

    if(valores.enCines){
      this.peliculas = this.peliculas.filter(pelicula => pelicula.enCines);
    }
  }
}
