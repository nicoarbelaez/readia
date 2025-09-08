"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { type NavUserProps } from "@/components/nav-user";
import { updateProfile } from "@/app/actions";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const profileCompleteSchema = z.object({
  fullName: z.string().min(2, {
    message: "El nombre completo debe tener al menos 2 caracteres.",
  }),
  userName: z.string().min(2, {
    message: "El nombre de usuario debe tener al menos 2 caracteres.",
  }),
});

type BaseUser = NavUserProps["user"];

type ModalCompleteProfileProps = Partial<Omit<BaseUser, "avatarUrl">>;

type CompleteProfileType = z.infer<typeof profileCompleteSchema>;

export function ModalCompleteProfile({
  id,
  fullName,
  userName,
}: ModalCompleteProfileProps) {
  const isProfileIncomplete = fullName === "" || userName === "";
  const [open, setOpen] = useState(isProfileIncomplete);

  const form = useForm<CompleteProfileType>({
    resolver: zodResolver(profileCompleteSchema),
    defaultValues: {
      fullName,
      userName,
    },
  });

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = form;

  async function onSubmit(values: CompleteProfileType) {
    if (!id) {
      toast.error("ID de usuario inválido.");
      return;
    }

    const result = await updateProfile({ id, ...values });

    if (!result.success) {
      toast.error(result.message);
      return;
    }

    toast.success("Perfil actualizado correctamente");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="sm:max-w-md"
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        showCloseButton={false}
      >
        <DialogHeader>
          <DialogTitle>Completa tu perfil</DialogTitle>
          <DialogDescription>
            Es momento de completar tu perfil para continuar.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form
            className="grid gap-4"
            onSubmit={handleSubmit(onSubmit)}
            id="complete-profile-form"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre completo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej: Nicolás Arbelaez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="userName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input placeholder="@nicoarbelaez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>

        <DialogFooter>
          <Button
            type="submit"
            form="complete-profile-form"
            className="cursor-pointer"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Guardando..." : "Guardar cambios"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
