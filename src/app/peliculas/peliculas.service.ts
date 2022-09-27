import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { formatearFecha } from '../utilidades/utilidades';
import { PeliculaCreacionDTO, PeliculaDTO, PeliculasPostGet } from './pelicula';


@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  constructor(private http: HttpClient) { }
  private apiURL = environment.apiUrl + "peliculas";

  public postGet(): Observable<PeliculasPostGet>{
    return this.http.get<PeliculasPostGet>(`${this.apiURL}/postget`);
  }

  public crear(pelicula: PeliculaCreacionDTO){
    const formData = this.construirFormData(pelicula);
    return this.http.post(this.apiURL, formData);
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
