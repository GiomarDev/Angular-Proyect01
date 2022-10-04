import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { generoDTO } from 'src/app/generos/genero';
import { GenerosService } from 'src/app/generos/generos.service';
import Swal from 'sweetalert2';
import { usuarioDTO } from '../seguridad';
import { SeguridadService } from '../seguridad.service';

@Component({
  selector: 'app-indice-usuarios',
  templateUrl: './indice-usuarios.component.html',
  styleUrls: ['./indice-usuarios.component.css']
})
export class IndiceUsuariosComponent implements OnInit {

  constructor(private seguridadServices: SeguridadService) { }

  usuarios: usuarioDTO[];
  columnasAMostrar = ['nombre', 'acciones'];
  cantidadTotalRegistros;
  paginaActual = 1;
  cantidadRegistrosAMostrar = 10;

  ngOnInit(): void {
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  cargarRegistros(pagina: number, cantidadElementosAMostrar){
    this.seguridadServices.obtenerUsuarios(pagina, cantidadElementosAMostrar)
    .subscribe((respuesta: HttpResponse<usuarioDTO[]>) =>{
        this.usuarios = respuesta.body;
        this.cantidadTotalRegistros = respuesta.headers.get("cantidadTotalRegistros");
    }, error => console.error(error));
  }

  actualizarPaginacion(datos: PageEvent){
    this.paginaActual = datos.pageIndex + 1;
    this.cantidadRegistrosAMostrar = datos.pageSize;
    this.cargarRegistros(this.paginaActual, this.cantidadRegistrosAMostrar);
  }

  hacerAdmin(userID: string){
    this.seguridadServices.hacerAdmin(userID).subscribe(() => {
      Swal.fire('Exitoso','La operacion se ha realizado', 'success');
    });
  }

  removerAdmin(userID: string){
    this.seguridadServices.removerAdmin(userID).subscribe(() => {
      Swal.fire('Exitoso','La operacion se ha realizado', 'success');
    });
  }
}
