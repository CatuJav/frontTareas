export interface EstadoMS{
    id: number
    estado: string
}

export interface UsuarioMS{
    id: number
    usuarioAD: string
    idRol: string
}

export interface TareaMS {
    id:          number;
    titulo:      string ;
    descripcion: string;
    fecha:       Date;
    hora:        Date;
    idEstado:    number;
}

export interface TareaME {
    id:          number;
    titulo:      string ;
    descripcion: string;
    fecha:       Date;
    hora:        Date;
    idEstado:    number;
    idUsuarios:  number[];
}
export interface TareaResumenMS {
    idTarea:       number;
    titulo:        string;
    descripcion:   string;
    fecha:         Date;
    hora:          Date;
    idEstado:      number;
    nombreEstado:  NombreEstado;
    nombreArchivo: null | string;
    tipo:          Tipo | null;
    progreso:      number;
}

export enum NombreEstado {
    Fin = "FINALIZADO",
    Progreso = "EN PROGRESO",
    Nuevo = "NUEVO",
}

export enum Tipo {
    ApplicationPDF = "application/pdf",
}

export interface EstadoTareaMS {
    id:     number;
    estado: NombreEstado;
}




