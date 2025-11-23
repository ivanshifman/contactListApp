import { apiClient } from "../api/axios-client";

export interface ICreateContact {
  name: string;
  lastname: string;
  email: string;
  address: string;
  phone: string;
}

export const getAllContacts = async () => await apiClient.get("/contact");

export const createContact = async (body: ICreateContact) =>
  await apiClient.post("/contact", body);

export const updateContact = async (id: number, body: ICreateContact) =>
  await apiClient.put(`/contact/${id}`, body);

export const deleteContact = async (id: number) =>
  await apiClient.delete(`/contact/${id}`);
