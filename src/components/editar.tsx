import React, { useEffect, useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
  import { Input } from "@/components/ui/input"
  import { Label } from "@/components/ui/label"
import { Button } from './ui/button'
import apiDB from '@/api/apiDB'
import { ComentarioME, ComentarioMS, TareaMS, TareaResumenMS, UsuarioMS } from '@/interfaces/tareasInterfaces'
import { set } from 'react-hook-form'
import { useAuth } from '@/hooks/useAuth'


interface DialogoEditarProps {
    tarea : TareaResumenMS
    color: string;

    }
export const DialogoEditar = (props:DialogoEditarProps) => {
  const { user } = useAuth();

  const [comentarios, setComentarios] = useState<ComentarioMS[]>([])
  const [usuarioEdita, setUsuarioEdita] = useState<UsuarioMS>()
  const [ingresoComentario, setIngresoComentario] = React.useState("");
  const [ingresoAvance, setIngresoAvance] = React.useState(props.tarea.progreso);
  const onChangeComentario = ({ target }:any) => setIngresoComentario(target.value)
  const onChangeAvance = ({ target }:any) => setIngresoAvance(target.value)
  


  useEffect(() => {
    loadInformacion()
  }, [])

  useEffect(() => {
    loadInformacion();
  }, [props.tarea.progreso]);

  const loadInformacion = async ()  =>{ 
    
    const resp = await apiDB.get<ComentarioMS[]>(`Comentario/comentarioTarea?idTarea=${props.tarea.idTarea}`)
    const respProgreso = await apiDB.get<TareaMS>(`Tarea/${props.tarea.idTarea}`)
    const respUsuarioNombre = await apiDB.get<UsuarioMS>(`Usuario/nombre/${user?.principal.samAccountName}`)
    setUsuarioEdita(respUsuarioNombre.data)
    setComentarios(resp.data);
    setIngresoAvance(respProgreso.data.progreso)

  }

  const guardar = async () => {
   const comentario:ComentarioME = {
    idUsuario: usuarioEdita!.id,
    comentario: ingresoComentario, 
    idTarea: props.tarea.idTarea}
    const resp = await apiDB.post<string>(`/Comentario`, comentario)

    actualizarProgreso();

    if (resp.status === 200) {
      loadInformacion()
      setIngresoComentario("")
 
    }
   console.log(ingresoComentario)
    console.log(ingresoAvance)
  }

  const actualizarProgreso = async () => {
    const resp = await apiDB.put<string>(`Tarea/progreso`,{idTarea: props.tarea.idTarea, progreso: ingresoAvance})
    if (resp.status === 200) {
      loadInformacion()
      setIngresoAvance(0)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className={props.color} >Progreso</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.tarea.titulo}</DialogTitle>
          <DialogDescription>
           {props.tarea.descripcion}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avance" className="text-right">
              Comentario
            </Label>
            <Input type='text' id="avance" className="col-span-3" value={ingresoComentario}
               onChange={onChangeComentario}/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avance" className="text-right">
              Avance
            </Label>
            <Input type='number' id="avance"
            value={ingresoAvance}
            onChange={onChangeAvance}
            className="col-span-1" min={0} max={100} />%
          </div>
          <div className='overflow-scroll h-[200px]'>
         
          <Table>
      <TableCaption>Listado de comentarios</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Fecha</TableHead>
          <TableHead>Comentario</TableHead>
          <TableHead>Usuario</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>

        {comentarios.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.fecha ? new Date(c.fecha).toDateString() : "N/A"}</TableCell>
            <TableCell> {c.comentario} </TableCell>
            <TableCell>{c.usuarioAD}</TableCell>
          </TableRow>
        ))}
       
      </TableBody>
    
    </Table>

          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
          <Button type="submit" onClick={guardar}>Guardar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
