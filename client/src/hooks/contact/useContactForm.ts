import { useTransition } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { contactSchema, type ContactSchema } from "@/schemas/contactSchema";

export const useContactForm = (
  onSubmitFn: (data: ContactSchema) => Promise<void>,
  defaultValues?: Partial<ContactSchema>
) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
    defaultValues,
  });

  const handleSubmitForm = form.handleSubmit((values) => {
    startTransition(async () => {
      await onSubmitFn(values);
    });
  });

  return {
    ...form,
    isPending,
    handleSubmitForm,
  };
};
