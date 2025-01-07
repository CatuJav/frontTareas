import React from 'react'
import {
    Dialog,
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

interface DialogoEditarProps {
    color: string;
    titulo: string;
    descripcion: string;
    onGuardar: () => void;
    }
export const DialogoEditar = (props:DialogoEditarProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button  className={props.color} >Progreso</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{props.titulo}</DialogTitle>
          <DialogDescription>
           {props.descripcion}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avance" className="text-right">
              Comentario
            </Label>
            <Input type='text' id="avance" className="col-span-3"/>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="avance" className="text-right">
              Avance
            </Label>
            <Input type='number' id="avance" defaultValue={0} className="col-span-1" min={0} max={100} />%
          </div>
          <div>
            <table className='table-auto w-full'>
                <th>Fecha</th>
                <th>Comentario</th>
                <th>Usuario</th>
                <tr>
                    <td>2021-10-10</td>
                    <td>Comentario</td>
                    <td>Usuario</td>

                </tr>
                <tr>
                    <td>2021-10-10</td>
                    <td>Comentario</td>
                    <td>Usuario</td>
                    
                </tr>
                <tr>
                    <td>2021-10-10</td>
                    <td>Comentario</td>
                    <td>Usuario</td>
                    
                </tr>
                <tr>
                    <td>2021-10-10</td>
                    <td>Comentario</td>
                    <td>Usuario</td>
                    
                </tr>
                <tr>
                    <td>2021-10-10</td>
                    <td>Comentario</td>
                    <td>Usuario</td>
                    
                </tr>
                
            </table>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Guardar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
