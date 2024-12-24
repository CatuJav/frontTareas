import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { DatoSelect } from "./dato-select"
import MultipleSelector from "./ui/multiple-selector"
import apiDB from "@/api/apiDB"
import { EstadoMS, UsuarioMS } from "@/interfaces/tareasInterfaces"
import { Spinner } from "./ui/spinner"
import { useForm, SubmitHandler, Controller } from "react-hook-form"





export function CreateTaskForm() {
  const [titulo, setTitulo] = useState("")
  const [descripccion, setDescripccion] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const [listaEstados, setListaEstados] = useState<EstadoMS[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<UsuarioMS[]>([]);
  const [us, setUs] = useState< { value: string; label: string }[]>([]);
  

  type Inputs = {
    titulo: string
    descripcion: string,
    archivo?: string,
    estado: string,
    asignadoA: string
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data)

  useEffect(() => {
    loadEstado();
  }, []);
  
  useEffect(() => {
    const usuarios = listaUsuarios.map(element => ({
      value: element.id.toString(),
      label: element.usuarioAD
    }));
    setUs(usuarios);
  }, [listaUsuarios]);
  
  const loadEstado = async () => {
    const respEstadoMS = await apiDB.get<EstadoMS[]>("/EstadoTarea");
    const respUsuarioMS = await apiDB.get<UsuarioMS[]>("/Usuario");
  
    setListaEstados([...respEstadoMS.data]);
    setListaUsuarios([...respUsuarioMS.data]);
  };




  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 containers px-0">
      <div className="text-left">
        <Label htmlFor="description" className="text-lg">Título</Label>
        <Input
          id="description"
          placeholder="Ingrese título de la tarea"
          {...register("titulo", { required: true })}
        />
      </div>
      <div className="text-left">
        <Label htmlFor="description"  className="text-lg">Descripción de la tarea</Label>
        <Textarea
          id="description"
          {...register("descripcion", { required: true })}
          
          placeholder="Ingrese la descripción de la tarea"
          
        />
      </div>
      <div className="text-left">
      <Label htmlFor="archivo"  className="text-lg">Archivo</Label>
      
      <Controller
        name="archivo"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <Input
            id="archivo"
            type="file"
            {...field}
          />
        )}
      />
    
      </div>
      <div className="text-left">
        <Label htmlFor="assignedTo"  className="text-lg">Estado</Label>
        <Controller
        name="estado"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <DatoSelect
            value={field.value}
            onChange={field.onChange}
            datos={listaEstados}
          />
        )}
      />
      </div>

      <div className="text-left" >
        <Label htmlFor="assignedTo"  className="text-lg">Asignar a</Label> 
     
     { us.length > 0 ?
            <Controller
            name="asignadoA"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <MultipleSelector
              defaultOptions={us}
              placeholder="Selecccione los usuarios..."
              emptyIndicator={
                <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                  No encontrado.
                </p>
              }
              onChange={field.onChange}
            />
      
            )}
          />
      : <Spinner size={"small"} />}
    

    </div>
      <Button type="submit">Crear Tarea</Button>
    </form>
  )
}

