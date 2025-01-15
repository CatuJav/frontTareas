import React from 'react'
import { Button } from "@/components/ui/button"
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
import { useForm,SubmitHandler  } from 'react-hook-form'
import apiDB from '@/api/apiDB'

interface DialogoAprobarProps {
    color: string;
    idTarea: number;

    }
export const DialogoAprobar = (props:DialogoAprobarProps) => {

    const [archivo, setArchivo] = React.useState("");
    const [firma, setFirma] = React.useState("");
    const onChangeArchivo = ({ target }:any) => setArchivo(target.value)
    const onChangeFirma = ({ target }:any) => setFirma(target.value)


    type Inputs = {
      contasena: string
      archivo: FileList,   
    }

      const {
        register,
        handleSubmit,
        watch,
        control,
        reset,
        formState: { errors },
      } = useForm<Inputs>();
      
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      console.log("first")
      const formData = new FormData();
      formData.append('pfxFile', data.archivo[0]);
      //formData.append('clave', data.contasena);
      const pathFirma = await apiDB.post('/Tarea/subirFirma', formData);
      console.log(pathFirma);
      const archivoFirmado = await apiDB.post('/Tarea/firmarPDF', {rutaFirma: pathFirma.data, contrasenaFirma: data.contasena, idArchivo: props.idTarea});

      console.log(archivoFirmado);
    }

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
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 containers px-5">
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="archivo" className="text-right">
            Archivo
          </Label>
          <Input type="file"  accept=".pfx" {...register("archivo",{required:true})}  />
        </div>
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="clave" className="text-right">
            Clave
          </Label>
          <Input
            id="clave"
            {...register("contasena",{required:true})}
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
      <DialogClose asChild>
        <Button type="submit">Save changes</Button>
        </DialogClose>
      </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
  )
}
