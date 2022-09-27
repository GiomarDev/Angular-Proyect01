export interface actorDTO{
    id: number;
    biografia: string;
    nombre: string;
    fechaNacimiento: Date;
    foto: string;
}

export interface actorCreacionDTO{
    nombre: string;
    fechaNacimiento: Date;
    foto: File;
    biografia: string;
}

export interface actorPeliculaDTO{
    id: number;
    nombre: string;
    personaje: string;
    foto: string;
}