import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { LoginButtons } from "@/components/login/login-buttons";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid h-96 p-0 md:grid-cols-2">
          {/* Contenedor rojo */}
          <form className="flex h-full w-full items-center justify-center p-6 md:p-8">
            {/* Contenedor azul centrado vertical y horizontalmente */}
            <div className="flex w-full max-w-sm flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <h1 className="text-2xl font-bold">Bienvenido de nuevo</h1>
                <p className="text-muted-foreground text-balance">
                  Inicia sesión en tu cuenta de Read IA
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <LoginButtons />
              </div>
            </div>
          </form>

          {/* Imagen lateral */}
          <div className="bg-muted relative hidden md:block">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/img/login-picture.avif"
              alt="Imagen"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        Al hacer clic en continuar, aceptas nuestros{" "}
        <a href="#">Términos de servicio</a> y{" "}
        <a href="#">Política de privacidad</a>.
      </div>
    </div>
  );
}
