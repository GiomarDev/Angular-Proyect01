import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { actorPeliculaDTO } from 'src/app/actores/actor';
import { MultilpleSelectorModel } from 'src/app/utilidades/selector-multiple/multiple-selector';
import { PeliculaCreacionDTO, PeliculaDTO } from '../pelicula';

@Component({
  selector: 'app-formulario-pelicula',
  templateUrl: './formulario-pelicula.component.html',
  styleUrls: ['./formulario-pelicula.component.css']
})
export class FormularioPeliculaComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  @Input()
  modelo: PeliculaDTO;

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  @Input()
  errores: string[] = [];

  @Input()
  generosNoSeleccionado: MultilpleSelectorModel[];
  
  generosSeleccionado: MultilpleSelectorModel[] = [];
  
  @Input()
  cinesNoSeleccionado: MultilpleSelectorModel[];

  cinesSeleccionado: MultilpleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', {validators: [Validators.required]}],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosIDs: '',
      cinesIDs: '',
      actores: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    console.log(this.generosSeleccionado);
    const generosID = this.generosSeleccionado.map(valor => valor.llave);
    this.form.get('generosIDs').setValue(generosID);

    const cinesID = this.cinesSeleccionado.map(valor => valor.llave);
    this.form.get('cinesIDs').setValue(cinesID);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });

    this.form.get('actores').setValue(actores);

    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }

  cambioMarkDown(texto){
    this.form.get('resumen').setValue(texto);
  }
}
