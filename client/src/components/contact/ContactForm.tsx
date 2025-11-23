import { useContactForm } from "../../hooks/contact/useContactForm";
import type { ContactSchema } from "../../schemas/contactSchema";

interface Props {
  defaultValues?: Partial<ContactSchema>;
  onSubmit: (data: ContactSchema) => Promise<void>;
  onClose?: () => void;
}

export default function ContactForm({
  defaultValues,
  onSubmit,
}: Props) {
  const {
    register,
    handleSubmitForm,
    formState: { errors },
    isPending,
  } = useContactForm(onSubmit, defaultValues);

  return (
    <form
      onSubmit={async (e) => {
        await handleSubmitForm(e);
      }}
      className="p-4 flex flex-col gap-2 justify-center items-center border-gray-200 border rounded-md w-[450px]"
    >
      <h2 className="text-2xl font-semibold text-neutral-800 text-center">
        {defaultValues ? "Edit Contact" : "Create Contact"}
      </h2>

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Name:
      </label>
      <input
        {...register("name")}
        type="text"
        defaultValue={defaultValues?.name}
        className="w-[90%] p-2 border border-gray-300 text-sm rounded-md outline-none focus:border-2 focus:border-sky-500"
      />
      {errors.name && (
        <p className="w-[90%] text-xs text-red-500">{errors.name.message}</p>
      )}

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Lastname:
      </label>
      <input
        {...register("lastname")}
        type="text"
        defaultValue={defaultValues?.lastname}
        className="w-[90%] p-2 border border-gray-300 text-sm rounded-md outline-none focus:border-2 focus:border-sky-500"
      />
      {errors.lastname && (
        <p className="w-[90%] text-xs text-red-500">
          {errors.lastname.message}
        </p>
      )}

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Email:
      </label>
      <input
        {...register("email")}
        type="email"
        defaultValue={defaultValues?.email}
        className="w-[90%] p-2 border border-gray-300 text-sm rounded-md outline-none focus:border-2 focus:border-sky-500"
      />
      {errors.email && (
        <p className="w-[90%] text-xs text-red-500">{errors.email.message}</p>
      )}

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Phone:
      </label>
      <input
        {...register("phone")}
        type="text"
        defaultValue={defaultValues?.phone}
        className="w-[90%] p-2 border border-gray-300 text-sm rounded-md outline-none focus:border-2 focus:border-sky-500"
      />
      {errors.phone && (
        <p className="w-[90%] text-xs text-red-500">{errors.phone.message}</p>
      )}

      <label className="w-[90%] text-left text-sm font-semibold text-neutral-700">
        Address:
      </label>
      <input
        {...register("address")}
        type="text"
        defaultValue={defaultValues?.address}
        className="w-[90%] p-2 border border-gray-300 text-sm rounded-md outline-none focus:border-2 focus:border-sky-500"
      />
      {errors.address && (
        <p className="w-[90%] text-xs text-red-500">{errors.address.message}</p>
      )}

      <button
        disabled={isPending}
        className="w-[90%] cursor-pointer p-2 mt-2 text-sm font-semibold text-white bg-sky-500 rounded-md hover:bg-sky-600 transition-all"
      >
        {defaultValues ? "Save Changes" : "Create Contact"}
      </button>
    </form>
  );
}
