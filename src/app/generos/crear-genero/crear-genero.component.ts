import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { primeraLetraMayuscula } from 'src/app/utilidades/validadores/primeraLetraMayus';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-crear-genero',
  templateUrl: './crear-genero.component.html',
  styleUrls: ['./crear-genero.component.css']
})
export class CrearGeneroComponent{
  constructor(private router: Router) { }
  
  guardarCambios(genero: generoCreacionDTO){
    //Save Cambios
    console.log(genero);
    this.router.navigate(['/generos']);
  }

}
