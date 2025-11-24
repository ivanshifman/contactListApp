import { useMemo, useState } from "react";
import { useContact } from "../../hooks/contact/useContact";
import type { ICreateContact } from "../../services/contact-service";
import CardContact from "./CardContact";
import ContactForm from "./ContactForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";

export default function ContactContainer() {
  const [filter, setFilter] = useState<string>("");
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const { contacts, generateContact, modifyContact, removeContact } =
    useContact();

  const filterContacts = useMemo(() => {
    if (filter.trim())
      return contacts.filter(
        (el) =>
          el.name.toLowerCase().includes(filter.toLowerCase()) ||
          el.lastname.toLowerCase().includes(filter.toLowerCase())
      );

    return contacts;
  }, [filter, contacts]);

  const handleSaveData = async (
    isEditing: boolean,
    id: number,
    body: ICreateContact
  ) => {
    if (!isEditing) return await generateContact(body);
    return await modifyContact(id, body);
  };

  return (
    <section className="w-full flex flex-col gap-2 justify-center items-center mt-4">
      <div className="w-[90%] flex flex-row justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="p-2 text-sm outline-none border rounded-full border-gray-200 w-[80%] focus:border-2 focus:border-sky-500 transition-all"
          value={filter}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setFilter(e.target.value)
          }
        />
        <Dialog open={openCreateModal} onOpenChange={setOpenCreateModal}>
          <DialogTrigger className="font-semibold text-sky-600 uppercase underline text-sm cursor-pointer">
            {" "}
            New contact
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Contact</DialogTitle>
              <DialogDescription>
                Generate your contacts quickly and easily.🚀
              </DialogDescription>
            </DialogHeader>
            <ContactForm
              onSubmit={async (data) => {
                await handleSaveData(false, 0, data);
                setOpenCreateModal(false);
              }}
            />
          </DialogContent>
        </Dialog>
      </div>

      <div className="w-[90%] flex flex-row flex-wrap gap-3">
        {filterContacts.length > 0 ? (
          filterContacts.map((el, index) => (
            <CardContact
              key={index}
              contact={el}
              save={handleSaveData}
              deleteContact={removeContact}
            />
          ))
        ) : (
          <p className="text-center w-full text-gray-500 text-sm">
            There are no saved contacts.
          </p>
        )}
      </div>
    </section>
  );
}
