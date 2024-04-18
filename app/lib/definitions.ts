// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.
export type User = {
  id: string;
  name: string;
  email: string;
  emailVerified: Date;
  password: string;
  role: string;
  isadmin: boolean;
};

export type Ticket = {
  id: string;
  user_id: string;
  email: string;
  title: string;
  description: string;
  create_date: string;
  last_updated: string;
  status: 'New' | 'In Progress' | 'Resolved';
}

export type Comment = {
  id: string;
  ticket_id: string;
  user_id: string;
  user_name: string;
  create_date: string;
  last_updated: string;
  description: string;
}

export type TicketsTable = {
  id: string;
  user_id: string;
  user_name: string;
  name: string;
  email: string;
  title: string;
  description: string;
  create_date: string;
  last_updated: string;
  status: 'New' | 'In Progress' | 'Resolved';
};
