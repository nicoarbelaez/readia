import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  SidebarMenuButtonItem,
  SidebarMenuSubButtonItem,
} from "@/components/sidebar/nav-items";
import { NavItem } from "@/types/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type NavConfigurationProps = { items: NavItem[] };

export function NavConfiguration({ items }: NavConfigurationProps) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Configuración</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(
          ({ title, isActive, url, icon: Icon, items: subItems, disabled }) => {
            const hasItems = !!subItems?.length;

            const buttonContent = (
              <SidebarMenuButtonItem
                hasItems={hasItems}
                title={title}
                url={url}
                icon={Icon}
                disabled={disabled}
              />
            );

            const collapsibleContent = (
              <Collapsible
                key={title}
                asChild
                defaultOpen={isActive}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    {buttonContent}
                  </CollapsibleTrigger>

                  {hasItems && (
                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {subItems!.map((sub) => (
                          <SidebarMenuSubItem key={sub.title}>
                            <SidebarMenuSubButtonItem
                              title={sub.title}
                              url={sub.url}
                            />
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  )}
                </SidebarMenuItem>
              </Collapsible>
            );

            // Renderizado condicional con Tooltip
            return disabled ? (
              <Tooltip>
                <TooltipTrigger asChild>{collapsibleContent}</TooltipTrigger>
                <TooltipContent>
                  <p>No se ha creado ninguna empresa de su propiedad.</p>
                </TooltipContent>
              </Tooltip>
            ) : (
              collapsibleContent
            );
          },
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}
