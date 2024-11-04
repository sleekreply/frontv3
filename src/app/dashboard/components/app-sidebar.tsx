import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuItem,
    SidebarMenuButton,
    SidebarGroupContent
  } from "@/components/ui/sidebar"
import { Bot, MessageCircleCode, LogOut } from "lucide-react"
import ThemeSwitch from "./theme-switch"

const items = [
    {
      title: "Bots",
      url: "#",
      icon: Bot,
    },
    {
        title: "Messages",
        url: "#",
        icon: MessageCircleCode,
    },
]

export function AppSidebar() {
    return (
        <Sidebar>
        <SidebarHeader />
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
        <div className='items-center'>
        </div>
        <SidebarGroup>
            <SidebarGroupLabel>Settings</SidebarGroupLabel>
            <SidebarGroupContent>
                <SidebarMenu>
                    <SidebarMenuItem key='logout'>
                        <SidebarMenuButton asChild>
                            <a href='logout'>
                                <LogOut/>
                                <span>Logout</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarGroupContent>
        </SidebarGroup>
        <ThemeSwitch>
        </ThemeSwitch>

        <SidebarFooter />
        </Sidebar>
    )
}
