# 📇 Contact List App — Full Stack Project

A fully featured **Full Stack Contact Management Application** built with a modern and scalable stack:  
**NestJS**, **React + Vite**, **PostgreSQL**, **Prisma**, **Tailwind CSS**, and **shadcn/ui**.  
This project implements secure authentication, a complete contacts flow on the frontend, reusable UI components, strict form validation with Zod + React Hook Form, and clean architecture on both backend and frontend.

---

## 🚀 Tech Stack

### **Backend (API)**
- **NestJS** — Modular and scalable Node.js framework  
- **TypeScript** — End-to-end typing  
- **PostgreSQL** — Reliable relational database  
- **Prisma ORM** — Type-safe database access  
- **JWT Authentication** — Access + refresh tokens  
- **Cookie-based auth** — Secure cookies (`httpOnly`, `secure`, `sameSite`)  
- **Swagger** — Complete API documentation  
- **Helmet + Throttler** — Security headers + rate limiting  

### **Frontend**
- **React 19 + Vite** — Fast development and builds  
- **TypeScript**  
- **Tailwind CSS 4** — Utility-first styling  
- **shadcn/ui** — Production-ready headless UI components  
- **React Hook Form + Zod** — Powerful and strict form validation  
- **Axios** — Fully configured request/response interceptors  
- **Zustand** — Lightweight global store  
- **React Router** — Protected and public routes  
- **React Hot Toast** — Clean toast notifications  

---

## 🔑 Main Features

### **Authentication**
- Register, login, logout  
- Access + refresh token flow  
- Secure cookies (`httpOnly`, `secure`, `sameSite`)  
- Protected and public routes in frontend  

### **Contacts**
- Full **contacts flow implemented on the frontend**  
- Create, update, delete, and list contacts  
- Controlled dialogs for create/edit/delete actions  
- Shared `ContactForm` with schema validation  
- Automatic modal closing on success  
- Unified error handling with Axios interceptors  

### **Frontend Architecture**
- Axios client with interceptors  
- Reusable hooks:  
  - `useLogin`, `useRegister`, `useLogout`  
  - `useContact`, `useContactForm`  
- Zustand + Context for session state  
- Zod schemas for auth & contact forms  
- Modular UI components with shadcn/ui  

### **Backend Architecture**
- Clean modular NestJS structure  
- DTO validation with Class Validator  
- Global exception filter  
- JWT + LocalAuth strategies  
- Prisma schema for User & Contact  
- Swagger auto documentation  

---

## 👤 Author

**Ivan Ezequiel Shifman**  
[LinkedIn Profile](https://ar.linkedin.com/in/iv%C3%A1n-ezequiel-shifman-042b0726a)

