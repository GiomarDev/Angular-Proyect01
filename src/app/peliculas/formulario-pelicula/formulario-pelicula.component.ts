import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  @Output()
  OnSubmit: EventEmitter<PeliculaCreacionDTO> = new EventEmitter<PeliculaCreacionDTO>();

  generosNoSeleccionado: MultilpleSelectorModel[] = [{llave: 1, valor: "Drama"},{llave: 2, valor: "Terror"},{llave: 3, valor: "Accion"}];
  generosSeleccionado: MultilpleSelectorModel[] = [];
  cinesNoSeleccionado: MultilpleSelectorModel[] = [{llave: 1, valor: 'Cineplanet'},{llave: 2, valor: 'Agora'}];
  cinesSeleccionado: MultilpleSelectorModel[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      titulo: ['', {validators: [Validators.required]}],
      resumen: '',
      enCines: false,
      trailer: '',
      fechaLanzamiento: '',
      poster: '',
      generosID: '',
      cinesID: ''
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
    }
  }

  guardarCambios(){
    console.log(this.generosSeleccionado);
    const generosID = this.generosSeleccionado.map(valor => valor.llave);
    this.form.get('generosID').setValue(generosID);

    const cinesID = this.cinesSeleccionado.map(valor => valor.llave);
    this.form.get('cinesID').setValue(cinesID);
    this.OnSubmit.emit(this.form.value);
  }

  archivoSeleccionado(archivo: File){
    this.form.get('poster').setValue(archivo);
  }

  cambioMarkDown(texto){
    this.form.get('resumen').setValue(texto);
  }
}
