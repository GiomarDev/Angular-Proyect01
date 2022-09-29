import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { LandingPageDTO, PeliculaCreacionDTO, PeliculaDTO, PeliculaPutGet, PeliculasPostGet } from './pelicula';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiUrl + "peliculas";

  public postGet(): Observable<PeliculasPostGet>{
    return this.http.get<PeliculasPostGet>(`${this.apiURL}/postget`);
  }

  public borrar(id: number){
    return this.http.delete(`${this.apiURL}/${id}`);
  }

  public filtrar(valores: any):Observable<any>{
    const params = new HttpParams({fromObject: valores});
    return this.http.get<PeliculaDTO[]>(`${this.apiURL}/filtrar`, {params, observe: 'response'});
  }

  public editar(id:number, pelicula: PeliculaCreacionDTO){
    const formData = this.construirFormData(pelicula);
    return this.http.put(`${this.apiURL}/${id}`, formData);
  }

  public obtenerLandingPage(): Observable<LandingPageDTO>{
    return this.http.get<LandingPageDTO>(this.apiURL);
  }

  public putGet(id: number):Observable<PeliculaPutGet>{
    return this.http.get<PeliculaPutGet>(`${this.apiURL}/putget/${id}`);
  }

  public crear(pelicula: PeliculaCreacionDTO): Observable<number>{
    const formData = this.construirFormData(pelicula);
    return this.http.post<number>(this.apiURL, formData);
  }

  public obtenerPorID(id: number):Observable<PeliculaDTO>{
    return this.http.get<PeliculaDTO>(`${this.apiURL}/${id}`);
  }

  private construirFormData(pelicula: PeliculaCreacionDTO): FormData{
    const formData = new FormData();

    formData.append('titulo', pelicula.titulo);
    formData.append('resumen', pelicula.resumen);
    formData.append('trailer', pelicula.trailer);
    formData.append('enCines', String(pelicula.enCines));
    if(pelicula.fechaLanzamiento){
      formData.append('fechaLanzamiento', formatearFecha(pelicula.fechaLanzamiento));
    }

    if(pelicula.poster){
      formData.append('poster', pelicula.poster);
    }

    formData.append('generosIDs', JSON.stringify(pelicula.generosIDs));
    formData.append('cinesIDs', JSON.stringify(pelicula.cinesIDs));
    formData.append('actores', JSON.stringify(pelicula.actores));

    return formData;
  }
}
