import { Calendar, Home, List, Search, Settings, ClipboardCheck} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { useAuth } from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar";

// Menu items.
const items = [
  {
    title: "Crear Tarea",
    url: "crear",
    icon: ClipboardCheck,
  },
  {
    title: "Listar",
    url: "listar",
    icon: List,
  }
]

export function AppSidebar() {
  const { logout, user } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Sidebar>
      <SidebarHeader>
      <SidebarMenuButton    size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
      <Avatar className="h-8 w-8 rounded-lg">
                <AvatarFallback className="bg-slate-600 text-white p-2 rounded-lg">
                  {user!.givenName.charAt(0) + user!.surname.charAt(0)}
                </AvatarFallback>
        </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user!.displayName}</span>
                <span className="truncate text-xs">{user!.emailAddress}</span>
              </div>
      </SidebarMenuButton>
      <Button onClick={handleLogout}>Logout</Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
