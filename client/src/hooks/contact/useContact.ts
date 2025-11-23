import { useCallback, useEffect, useState } from "react";
import {
  createContact,
  deleteContact,
  getAllContacts,
  updateContact,
  type ICreateContact,
} from "../../services/contact-service";
import { handleApiError } from "../../api/errorHandler";
import { showError, showSuccess } from "../../utils/toast.utils";

export interface IContactEntity {
  id: number;
  name: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
  userId: number;
  createdAt: Date;
}

export const useContact = () => {
  const [contacts, setContacts] = useState<IContactEntity[]>([]);

  const getContacts = useCallback(async () => {
    try {
      const { data } = await getAllContacts();
      setContacts(data);
    } catch (error) {
      showError(handleApiError(error).message);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchContacts = async () => {
      if (!isMounted) return;
      await getContacts();
    };

    void fetchContacts();

    return () => {
      isMounted = false;
    };
  }, [getContacts]);

  const generateContact = async (body: ICreateContact) => {
    try {
      await createContact(body);
      showSuccess("Created contact successfully.");
      await getContacts();
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  const modifyContact = async (id: number, body: ICreateContact) => {
    try {
      await updateContact(id, body);
      showSuccess("Updated contact successfully.");
      await getContacts();
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  const removeContact = async (id: number) => {
    try {
      await deleteContact(id);
      showSuccess("Deleted contact successfully.");
      await getContacts();
    } catch (error) {
      const apiError = handleApiError(error);
      showError(apiError.message);
    }
  };

  return { contacts, generateContact, modifyContact, removeContact };
};
