import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { cineCreacionDTO, cineDTO } from './cines';

@Injectable({
  providedIn: 'root'
})
export class CinesService {

  constructor(private http: HttpClient) { }
  private apiUrl = environment.apiUrl + "cines";

  public crear(cine: cineCreacionDTO){
    return this.http.post(this.apiUrl, cine);
  }

  public obtenerTodos(pagina: number, cantidadRegistrosAMostrar: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('pagina', pagina.toString());
    params = params.append('RecordsPagina', cantidadRegistrosAMostrar.toString());
    return this.http.get<cineDTO[]>(this.apiUrl, {observe: 'response', params});
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public obtenerPorId(id: number): Observable<cineDTO>{
    return this.http.get<cineDTO>(`${this.apiUrl}/${id}`);
  }

  public editar(id: number,cine: cineCreacionDTO){
    return this.http.put(`${this.apiUrl}/${id}`, cine);
  }
}
