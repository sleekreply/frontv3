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
import { Bot, MessageCircleCode } from "lucide-react"
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
        <ThemeSwitch>
        </ThemeSwitch>
        </div>
        <SidebarFooter />
        </Sidebar>
    )
}
