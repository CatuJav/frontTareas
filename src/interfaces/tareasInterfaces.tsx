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
    progreso:    number;
}

export interface TareaME {
    id:          number;
    titulo:      string ;
    descripcion: string;
    fecha:       Date;
    hora:        Date;
    idEstado:    number;
    propgreso:   number;
    idUsuarios:  number[];
}


export interface TareaResumenMS {
    idTarea:           number;
    titulo:            string;
    descripcion:       string;
    fecha:             Date;
    hora:              Date;
    idEstado:          number;
    nombreEstado:      NombreEstado;
    nombreArchivo:     null | string;
    tipo:              Tipo | string;
    progreso:          number;
    usuariosAsignados: UsuariosAsignado[] | null;
}

export enum NombreEstado {
    Progreso = "EN PROGRESO",
    Fin = "FINALIZADO",
    Nuevo = "NUEVO",
}

export enum NombreRol {
    Administrador = "Administradores",
    Usuario = "Usuarios",
}

export enum TipoArchivo {
    ApplicationPDF = "application/pdf",
    TextXML = "text/xml",
}

export interface UsuariosAsignado {
    id:             number;
    usuarioAD:      UsuarioAD;
    idRol:          number;
    idDepartamento: number;
    idTarea:        number;
}

export enum UsuarioAD {
    Darwinuc = "darwinuc",
    Test = "test",
}




export enum Tipo {
    ApplicationPDF = "application/pdf",
}

export interface EstadoTareaMS {
    id:     number;
    estado: NombreEstado;
}

export interface ComentarioMS {
    id:          number;
    comentario:  string;
    idUsuario:   number;
    usuarioAD:   string;
    idTarea:     number;
    titulo:      string;
    descripcion: string;
    fecha:       Date;
}

export interface ComentarioME {
    comentario: string;
    idUsuario:  number;
    idTarea:    number;
}
export interface TareaUsuarioMS {
    idTarea:   number;
    idUsuario: number;
}





