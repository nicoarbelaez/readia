import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModalCompleteProfile } from "@/components/modal-complete-profile";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import loadUser from "@/lib/load-session";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    id,
    email,
    full_name: fullName,
    user_name: userName,
    avatar_url: avatarUrl,
    businesses,
  } = await loadUser();
  const user = {
    email: email ?? "",
    fullName: fullName ?? "",
    userName: userName ?? "",
    avatarUrl: avatarUrl ?? "",
    businesses: businesses.map((b) => ({
      companyName: b.company_name,
      description: b.description,
      sector: b.sector ?? "",
      employeeCount: b.employee_count ?? 0,
    })),
  };

  return (
    <>
      <ModalCompleteProfile
        id={id}
        fullName={user.fullName}
        userName={user.userName}
      />
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1 cursor-pointer" />
              <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
