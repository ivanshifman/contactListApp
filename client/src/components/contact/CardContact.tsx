import { useState } from "react";
import type { IContactEntity } from "../../hooks/contact/useContact";
import ContactForm from "./ContactForm";
import { type ICreateContact } from "../../services/contact-service";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../../components/ui/alert-dialog";
import { getEasyDate } from "easy-datetime-ya";

type Props = {
  contact: IContactEntity;
  save: (isEditing: boolean, id: number, body: ICreateContact) => void;
  deleteContact: (id: number) => void;
};
export default function CardContact({ contact, save, deleteContact }: Props) {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  return (
    <div className="flex flex-col w-[350px] p-2 gap-2 border border-gray-200 rounded-md">
      <h3 className="text-sm font-semibold text-neutral-800 p-2 border-b border-gray-200">
        {contact.name} {contact.lastname}
      </h3>
      <p className="text-xs font-semibold text-gray-500">
        {contact.email} - {contact.phone}
      </p>
      <p className="text-xs font-semibold text-gray-500">{contact.address}</p>
      <p className="text-xs font-semibold text-gray-500">
        This contact was created {getEasyDate(new Date(contact.createdAt))}
      </p>
      <div className="flex w-full justify-end items-center gap-2">
        <Dialog
          open={openEditModal} onOpenChange={setOpenEditModal}
        >
          <DialogTrigger className="text-xs font-semibold bg-amber-200 p-2 rounded-md cursor-pointer hover:opacity-75">
            Edit
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Contact</DialogTitle>
              <DialogDescription>
                Make your changes here. Click save when you're done.🚀
              </DialogDescription>
            </DialogHeader>
            <ContactForm
              defaultValues={contact}
              onSubmit={async (data) => {
                await save(true, contact.id, data);
                setOpenEditModal(false);
              }}
              onClose={() => setOpenEditModal(false)}
            />
          </DialogContent>
        </Dialog>
        <AlertDialog>
          <AlertDialogTrigger className="text-xs font-semibold bg-red-200 p-2 rounded-md cursor-pointer hover:opacity-75">
            Delete
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you sure you want to delete this contact?
              </AlertDialogTitle>
              <AlertDialogDescription>
                If you delete this contact, you will not be able to undo this
                action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => deleteContact(contact.id)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}
