import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { generoCreacionDTO } from '../genero';

@Component({
  selector: 'app-editar-genero',
  templateUrl: './editar-genero.component.html',
  styleUrls: ['./editar-genero.component.css']
})
export class EditarGeneroComponent implements OnInit {

  constructor(private router: Router) { }

  modelo: generoCreacionDTO = {nombre: 'Giomar'}
  ngOnInit(): void {
  }
  
  guardarCambios(genero: generoCreacionDTO){
    //Save Cambios
    console.log(genero);
    this.router.navigate(['/generos']);
  }
}
