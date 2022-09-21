import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Coordenada } from 'src/app/utilidades/mapa/coordenada';
import { cineCreacionDTO } from '../cines';

@Component({
  selector: 'app-formulario-cines',
  templateUrl: './formulario-cines.component.html',
  styleUrls: ['./formulario-cines.component.css']
})
export class FormularioCinesComponent implements OnInit {

  constructor(private formBuilder: FormBuilder) { }

  form: FormGroup;
  @Input()
  errores: string[] = [];
  @Input()
  modelo: cineCreacionDTO;
  @Output()
  guardarCambios: EventEmitter<cineCreacionDTO> = new EventEmitter<cineCreacionDTO>();

  coordenadaInicial: Coordenada[] = [];

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: ['', {
        validators: [Validators.required]
      }],
      latitud: ['', {
        validators: [Validators.required]
      }],
      longitud: ['', {
        validators: [Validators.required]
      }]
    });

    if(this.modelo !== undefined){
      this.form.patchValue(this.modelo);
      this.coordenadaInicial.push({latitud: this.modelo.latitud, longitud: this.modelo.longitud})
    }
  }

  OnSubmit(){
    this.guardarCambios.emit(this.form.value);
  }

  coordenadaSeleccionada(coordenada: Coordenada){
    this.form.patchValue(coordenada);
  }

}
