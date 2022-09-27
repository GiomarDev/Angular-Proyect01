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
  errores: string[] = [];

  @Input()
  modelo: PeliculaDTO;

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<
    PeliculaCreacionDTO
  >();

  @Input()
  generosNoSeleccionados: MultilpleSelectorModel[];

  @Input()
  generosSeleccionados: MultilpleSelectorModel[] = [];

  @Input()
  cinesNoSeleccionados: MultilpleSelectorModel[];

  @Input()
  cinesSeleccionados: MultilpleSelectorModel[] = [];

  @Input()
  actoresSeleccionados: actorPeliculaDTO[] = [];

  imagenCambiada: boolean = false;

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
    console.log(this.generosSeleccionados);
    const generosID = this.generosSeleccionados.map(valor => valor.llave);
    this.form.get('generosIDs').setValue(generosID);

    const cinesID = this.cinesSeleccionados.map(valor => valor.llave);
    this.form.get('cinesIDs').setValue(cinesID);

    const actores = this.actoresSeleccionados.map(val => {
      return {id: val.id, personaje: val.personaje}
    });

    this.form.get('actores').setValue(actores);

    if(!this.imagenCambiada){
      this.form.patchValue({'poster': null});
    }

    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
    this.imagenCambiada = true;
  }

  cambioMarkDown(texto){
    this.form.get('resumen').setValue(texto);
  }
}
