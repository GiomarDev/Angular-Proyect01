import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { observable, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { credencialesUsuario, respuestaAutenticacion, usuarioDTO } from './seguridad';

@Injectable({
  providedIn: 'root'
})
export class SeguridadService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = environment.apiUrl + "cuentas";
  private readonly llaveToken = "token";
  private readonly llaveExpiracion = "token-expiracion";
  private readonly campoRol = "role";

  obtenerUsuarios(pagina: number, recordsPorPagina:number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('recordsPorPagina', recordsPorPagina.toString());
    return this.httpClient.get<usuarioDTO[]>(`${this.apiUrl}/listadoUsuarios`, {
      observe: 'response',
      params
    })
  }

  hacerAdmin(userID: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiUrl}/hacerAdmin`, JSON.stringify(userID), {
      headers
    })
  }

  removerAdmin(userID: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.httpClient.post(`${this.apiUrl}/removerAdmin`, JSON.stringify(userID), {
      headers
    })
  }

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
    return this.obtenerCampoJWT(this.campoRol);
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

  obtenerToken(){
    return localStorage.getItem(this.llaveToken);
  }
}
