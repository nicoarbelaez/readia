"use client";

import { useState } from "react";
import { CompanyProfileDialog } from "@/components/forms/company-profile/organisms//company-profile-dialog";
import { Plus } from "lucide-react";

export function SidebarMenuCompany() {
  const [open, setOpen] = useState(false);

  const openModal = () => {
    console.log("Open modal");
    setOpen(true);
  };
  return (
    <>
      <ButtonOpenDialogForm onClick={openModal} />
      <CompanyProfileDialog isOpen={open} onOpenChange={setOpen} />
    </>
  );
}

function ButtonOpenDialogForm({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className="hover:bg-accent flex cursor-pointer items-center gap-2"
    >
      <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
        <Plus className="size-4" />
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Crear empresa</span>
        <span className="truncate text-xs">
          Crea para empezar el diagnóstico
        </span>
      </div>
    </div>
  );
}
