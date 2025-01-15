import React from 'react'
import { Button } from "@/components/ui/button"
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

interface DialogoAprobarProps {
    color: string;

    }
export const DialogoAprobar = (props:DialogoAprobarProps) => {

    const [archivo, setArchivo] = React.useState("");
    const [firma, setFirma] = React.useState("");
    const onChangeArchivo = ({ target }:any) => setArchivo(target.value)
    const onChangeFirma = ({ target }:any) => setFirma(target.value)

  return (
    <Dialog>
    <DialogTrigger asChild>
      <Button variant="outline" className={props.color}>Aprobar</Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Firma digital</DialogTitle>
        <DialogDescription>
         Ingrese su firma digital para aprobar la tarea
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="archivo" className="text-right">
            Archivo
          </Label>
          <Input type="file" name='archivo' accept=".pfx" onChange={onChangeArchivo}  />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="clave" className="text-right">
            Clave
          </Label>
          <Input
            id="clave"
            onChange={onChangeFirma}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Save changes</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  )
}
