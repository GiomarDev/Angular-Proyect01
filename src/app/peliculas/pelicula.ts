import { actorPeliculaDTO } from "../actores/actor";
import { cineDTO } from "../cines/cines";
import { generoDTO } from "../generos/genero";

export interface PeliculaCreacionDTO{
    titulo: string;
    resumen: string;
    enCines: boolean;
    fechaLanzamiento: Date;
    trailer: string;
    poster: File;
    generosIDs: number[];
    actores: actorPeliculaDTO[];
    cinesIDs: number[];
}

export interface PeliculaDTO{
    titulo: string;
    resumen: string;
    enCines: boolean;
    fechaLanzamiento: Date;
    trailer: string;
    poster: string;
    generos: generoDTO[];
    cines: cineDTO[];
    actores: actorPeliculaDTO[];
}

export interface PeliculasPostGet{
    generos: generoDTO[];
    cines: cineDTO[];
}