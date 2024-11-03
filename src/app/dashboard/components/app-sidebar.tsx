import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarHeader,
  } from "@/components/ui/sidebar"
import ThemeSwitch from "./theme-switch"

  export function AppSidebar() {
    return (
      <Sidebar>
        <SidebarHeader />
        <SidebarContent>
          <SidebarGroup />
          <SidebarGroup />
        </SidebarContent>
        <ThemeSwitch>
        </ThemeSwitch>
        <SidebarFooter />
      </Sidebar>
    )
  }
