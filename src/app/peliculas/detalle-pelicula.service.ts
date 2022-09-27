import { Injectable } from '@angular/core';
import { PeliculasService } from './peliculas.service';

@Injectable({
  providedIn: 'root'
})
export class DetallePeliculaService {

  constructor(private peliculasServices: PeliculasService) { }

  ngOnInit(): void{
    
  }
}
