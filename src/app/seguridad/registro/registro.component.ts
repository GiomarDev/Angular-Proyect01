import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { parsearErroresAPI } from 'src/app/utilidades/utilidades';
import { credencialesUsuario } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  errores: string[] = [];

  constructor(private seguridadServices: SeguridadService, private router: Router) { }

  ngOnInit(): void {
  }

  registrar(credenciales: credencialesUsuario){
    this.seguridadServices.registrar(credenciales).subscribe(response => {
      this.seguridadServices.guardarToken(response);
      this.router.navigate(['']);
    }, errores => this.errores = parsearErroresAPI(errores));
  }
}
