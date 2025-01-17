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
import { useForm,SubmitHandler, set  } from 'react-hook-form'
import { LoaderCircle }from "lucide-react"
import apiDB from '@/api/apiDB'
import { EstadoTareaMS, NombreEstado, TareaME, TareaMS, TipoArchivo } from '@/interfaces/tareasInterfaces'

interface DialogoAprobarProps {
    color: string;
    idTarea: number;
    tipo: string;
    nombreArchivo: string;

    }
export const DialogoAprobar = (props:DialogoAprobarProps) => {

    const [archivo, setArchivo] = React.useState("");
    const [firma, setFirma] = React.useState("");
    const [isLoading , setLoading] = React.useState(false);
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
      
      const finalizarTarea = async (idTarea: number) => {
        const tarea = await apiDB.get<TareaMS>(`/Tarea/${idTarea}`)
        const estado = await apiDB.get<EstadoTareaMS[]>(`/EstadoTarea`)
        if (tarea) {
          const nuevaTarea:TareaME = { ...tarea.data, idEstado: estado.data.find((e) => e.estado === NombreEstado.Fin)!.id, idUsuarios: [], propgreso: 100 }
          const response = await apiDB.put(`/Tarea`, nuevaTarea)
         
      }}

      
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
      setLoading(true);
      const formData = new FormData();
      formData.append('pfxFile', data.archivo[0]);
      //formData.append('clave', data.contasena);
      const pathFirma = await apiDB.post('/Tarea/subirFirma', formData);
      console.log(pathFirma);
      if(props.tipo == TipoArchivo.ApplicationPDF){

        const archivoFirmado = await apiDB.post('/Tarea/firmarPDF', {rutaFirma: pathFirma.data, contrasenaFirma: data.contasena, idArchivo: props.idTarea});
      }else if(props.tipo == TipoArchivo.TextXML){
        const archivoFirmado = await apiDB.post('/Tarea/firmarXML', {rutaFirma: pathFirma.data, contrasenaFirma: data.contasena, idArchivo: props.idTarea});
      }

      await finalizarTarea(props.idTarea);



      setLoading(false);
      window.location.reload();
    }
return (
    isLoading ?  ( <LoaderCircle className="h-6 w-6 animate-spin" /> ):
   (
    
    
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
        <div className="">
          <Label htmlFor="archivo" className="text-right">
            Archivo
          </Label>
          <Input type="file"  accept=".pfx" {...register("archivo",{required:true})}  />
        </div>
        <div className="">
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
        <Button type="submit">Firmar</Button>
        </DialogClose>
      </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
)
)    
}
