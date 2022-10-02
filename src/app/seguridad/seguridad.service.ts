import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.apiUrl + "cuentas";
  private readonly llaveToken = "token";
  private readonly llaveExpiracion = "token-expiracion";

  estaLogeado(): boolean{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return false;
    }

    const expiracion = localStorage.getItem(this.llaveExpiracion);
    const expiracionFecha = new Date(expiracion);

    if(expiracionFecha <= new Date()){
      this.logout();
      return true;
    }

    return true;
  }

  logout(){
    localStorage.removeItem(this.llaveToken);
    localStorage.removeItem(this.llaveExpiracion);
  }

  obtenerRol(): string{
    return '';
  }

  obtenerCampoJWT(campo: string): string{
    const token = localStorage.getItem(this.llaveToken);
    if(!token){
      return '';
    }

    var dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[campo];
  }

  registrar(credencialesUsuario: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiUrl + '/crear', credencialesUsuario);
  }

  login(credencialesUsuario: credencialesUsuario): Observable<respuestaAutenticacion>{
    return this.httpClient.post<respuestaAutenticacion>(this.apiUrl + '/login', credencialesUsuario);
  }

  guardarToken(respuestaAutenticacion: respuestaAutenticacion){
    localStorage.setItem(this.llaveToken, respuestaAutenticacion.token);
    localStorage.setItem(this.llaveExpiracion, respuestaAutenticacion.expiracion.toString());
  }
}
