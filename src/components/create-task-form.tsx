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



type CreateTaskFormProps = {
  onAddTask: (description: string, assignedTo: string) => void
  users: { value: string; label: string }[]
}

export function CreateTaskForm({ onAddTask, users }: CreateTaskFormProps) {
  const [description, setDescription] = useState("")
  const [assignedTo, setAssignedTo] = useState("")

  const [listaEstados, setListaEstados] = useState<EstadoMS[]>([]);
  const [listaUsuarios, setListaUsuarios] = useState<UsuarioMS[]>([]);
  const [us, setUs] = useState< { value: string; label: string }[]>([]);
    

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


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (description && assignedTo) {
      onAddTask(description, assignedTo)
      setDescription("")
      setAssignedTo("")
    }
  }

  console.log(us,'us');

  return (
    <form onSubmit={handleSubmit} className="space-y-4 containers px-0">
      <div className="text-left">
        <Label htmlFor="description" className="text-lg">Título</Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese título de la tarea"
          required
        />
      </div>
      <div className="text-left">
        <Label htmlFor="description"  className="text-lg">Descripción de la tarea</Label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ingrese la descripción de la tarea"
          required
        />
      </div>
      <div className="text-left">
      <Label htmlFor="picture"  className="text-lg">Archivo</Label>
      <Input id="picture" type="file" />
      </div>
      <div className="text-left">
        <Label htmlFor="assignedTo"  className="text-lg">Estado</Label>
        <DatoSelect onSelect={setAssignedTo} datos={listaEstados} />
      </div>

      <div className="text-left" >
        <Label htmlFor="assignedTo"  className="text-lg">Asignar a</Label> 
     
     { us.length > 0 ?
      <MultipleSelector
        defaultOptions={us}
        placeholder="Selecccione los usuarios..."
        emptyIndicator={
          <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
            No encontrado.
          </p>
        }
        onChange={(selected) => console.log(selected)}
      />: <Spinner size={"small"} />}
    

    </div>
      <Button type="submit">Crear Tarea</Button>
    </form>
  )
}

