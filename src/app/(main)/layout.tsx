import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { ModalCompleteProfile } from "@/components/modal-complete-profile";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import loadUser from "@/lib/load-session";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default async function MainLayout({ children }: MainLayoutProps) {
  const {
    id,
    email,
    full_name: fullName,
    user_name: userName,
    avatar_url: avatarUrl,
  } = await loadUser();
  const user = {
    email: email ?? "",
    fullName: fullName ?? "",
    userName: userName ?? "",
    avatarUrl: avatarUrl ?? "",
  };

  return (
    <>
      <ModalCompleteProfile
        id={id}
        fullName={user.fullName}
        userName={user.userName}
      />
      <SidebarProvider className="relative">
        <span className="absolute top-0 left-0 h-full w-full overflow-hidden">
          <span className="absolute top-[-30%] left-[50%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,var(--primary-soft),rgba(255,255,255,0))] md:top-[10%] md:left-[-20%]" />
          <span className="absolute right-[-30%] bottom-[-30%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_farthest-side,var(--primary-soft),rgba(255,255,255,0))]" />
        </span>

        <AppSidebar user={user} />

        <SidebarInset className="bg-surface-900/50">
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="fixed flex items-center gap-2 px-4">
              <SidebarTrigger className="z-10 -ml-1 cursor-pointer" />
              <Separator
                orientation="vertical"
                className="z-10 mr-2 data-[orientation=vertical]:h-4"
              />
            </div>
          </header>
          <div className="container mx-auto h-full px-4 lg:px-8">
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}
