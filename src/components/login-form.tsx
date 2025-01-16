import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useForm, SubmitHandler } from "react-hook-form"
import { useAuth } from "@/hooks/useAuth"
import apiDB from "@/api/apiDB"
import { RespAD } from "@/interfaces/adinterface"
import { AlertCircle } from "lucide-react"
 
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {


    const { login } = useAuth();



    type Inputs = {
        usuario: string
        contrasena: string
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
        
       try{
        
       
        const loginData = await apiDB.post<RespAD>("/Login", data)
 
        if (loginData.data.principal.status === 200) {
          // Replace with actual authentication logic
          await login(loginData.data);
        } else if(loginData.data.principal.status === 201){
          alert("Usuario sin certificado");
          await login(loginData.data);
        }else
        if (loginData.data.principal.status == 401)
        {
          alert("Usuario o contraseña incorrectos");
          
          
        }else{
          alert("Error en el servidor");
        }
      }catch(e){
        console.log(e);
      }
      }

    



  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Tareas</CardTitle>
          <CardDescription>
            Ingrese su usuario y contraseña del Active Directory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="usuario"
                  {...register("usuario", { required: true })}
                />
                 {errors.usuario && <p style={{ color: "red" }}>{errors.usuario.message}</p>}
              </div>
              <div className="grid gap-2">
               
                <Input id="password" type="password" placeholder="contraseña"
                {...register("contrasena", { required: true })}
                />
                {errors.contrasena && <p style={{ color: "red" }}>{errors.contrasena.message}</p>}
              </div>
              <Button type="submit"  className="w-full">
                Login
              </Button>
              
            </div>
          
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
