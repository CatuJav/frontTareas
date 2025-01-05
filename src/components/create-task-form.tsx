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
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);

  const [listaEstados, setListaEstados] = useState<EstadoMS[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<UsuarioMS[]>([]);
  const [us, setUs] = useState< { value: string; label: string }[]>([]);
  

  type asignadoA = {
    value: string;
    label: string;
  }
  type Inputs = {
    titulo: string
    descripcion: string,
    archivo?: FileList,
    estado: string,
    asignadoA: Array<asignadoA>
  }

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<Inputs>()

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    //crear tarea
    const tarea = {
      titulo: data.titulo,
      descripcion: data.descripcion,
      idEstado: parseInt(data.estado),
      idUsuarios: data.asignadoA.map((e) => parseInt(e.value)),
      fecha: new Date().toISOString(),
      //set tiemzone Guayaquil to ISOString

      hora : new Date().toLocaleString('sv', {timeZone: 'America/Guayaquil'}).replace(' ','T'),
    }

    console.log(tarea);


      const response = await apiDB.post('/Tarea', tarea);
      
      if (response.status === 200) {
        console.log(response.data);
        setUploadMessage("Tarea creada correctamente.");
        if(data.archivo?.length==0){
          reset();
        }
      } else {
        console.log("Error al crear la tarea.");
      }
    

    if(data.archivo && data.archivo?.length!=0){
    formData.append('pdfFile', data.archivo[0]);
    formData.append('idTarea', response.data);
    
    try {
      const response = await apiDB.post('/Tarea/subir', formData);
      
      if (response.status === 200) {
        setUploadMessage("Archivo subido correctamente.");
        console.log(response.data);
        reset();
      } else {
        setUploadMessage("Error al subir el archivo.");
      }
    }catch (error) {
      console.error('Error de red:', error);
      setUploadMessage("Error de red al subir el archivo.");
      }
  
    }
  }

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
    <>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 containers px-0">
      <div className="text-left">
        <Label htmlFor="description" className="text-lg">Título</Label>
        <Input
          id="description"
          placeholder="Ingrese título de la tarea"
          {...register("titulo", { required: true })}
        />
        {errors.titulo && <p style={{ color: "red" }}>{errors.titulo.message}</p>}
      </div>
      <div className="text-left">
        <Label htmlFor="description"  className="text-lg">Descripción de la tarea</Label>
        <Textarea
          id="description"
          {...register("descripcion", { required: true })}
          
          placeholder="Ingrese la descripción de la tarea"
          
        />
        {errors.descripcion && <p style={{ color: "red" }}>{errors.descripcion.message}</p>}
      </div>
      <div className="text-left">
      <Label htmlFor="archivo"  className="text-lg">Archivo</Label>
      
      <Input type="file" accept=".pdf" {...register("archivo")} />
      {errors.archivo && <p style={{ color: "red" }}>{errors.archivo.message}</p>}
    
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
            defaultValue={[]}
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
     {uploadMessage && <p>{uploadMessage}</p>}
    </>
  )
}

