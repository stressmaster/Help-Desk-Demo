import { sql } from '@vercel/postgres';
import {
  User,
  Ticket,
  TicketsTable,
  Comment,
} from './definitions';
import { unstable_noStore as noStore } from 'next/cache';

const ITEMS_PER_PAGE = 6;

export async function getUser(email: string) {
  noStore();
  try {
    const user = await sql`SELECT * FROM users WHERE email=${email}`;
    return user.rows[0] as User;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function fetchFilteredTickets(
  query: string,
  currentPage: number,
  user_id: string,
  isAdmin: boolean,
) {
  noStore();
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    const tickets = 
    isAdmin ? 
    (await sql<TicketsTable>`
      SELECT
        tickets.id,
        tickets.user_id,
        tickets.user_name,
        tickets.email,
        tickets.title,
        tickets.description,
        tickets.create_date,
        tickets.last_updated,
        tickets.status
      FROM tickets
      WHERE
        (tickets.user_name ILIKE ${`%${query}%`} OR
        tickets.title ILIKE ${`%${query}%`} OR
        tickets.email ILIKE ${`%${query}%`} OR
        tickets.create_date::text ILIKE ${`%${query}%`} OR
        tickets.last_updated::text ILIKE ${`%${query}%`} OR
        tickets.status ILIKE ${`%${query}%`})
      ORDER BY tickets.create_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `)
    :
    (await sql<TicketsTable>`
      SELECT
        tickets.id,
        tickets.user_id,
        tickets.user_name,
        tickets.email,
        tickets.title,
        tickets.description,
        tickets.create_date,
        tickets.last_updated,
        tickets.status
      FROM tickets
      WHERE
        tickets.user_id = ${user_id} AND
        (tickets.user_name ILIKE ${`%${query}%`} OR
        tickets.title ILIKE ${`%${query}%`} OR
        tickets.email ILIKE ${`%${query}%`} OR
        tickets.create_date::text ILIKE ${`%${query}%`} OR
        tickets.last_updated::text ILIKE ${`%${query}%`} OR
        tickets.status ILIKE ${`%${query}%`})
      ORDER BY tickets.create_date DESC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `);

    return tickets.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch tickets.');
  }
}

export async function fetchTicketsPages(query: string, user_id: string, isadmin: boolean) {
  noStore();
  try {
    const count = isadmin ? await sql`SELECT COUNT(*)
    FROM tickets
    WHERE
      (tickets.user_name ILIKE ${`%${query}%`} OR
      tickets.email ILIKE ${`%${query}%`} OR
      tickets.title ILIKE ${`%${query}%`} OR
      tickets.email ILIKE ${`%${query}%`} OR
      tickets.create_date::text ILIKE ${`%${query}%`} OR
      tickets.last_updated::text ILIKE ${`%${query}%`} OR
      tickets.status ILIKE ${`%${query}%`})
  ` : await sql`SELECT COUNT(*)
    FROM tickets
    WHERE
      tickets.user_id = ${user_id} AND
      (tickets.user_name ILIKE ${`%${query}%`} OR
      tickets.email ILIKE ${`%${query}%`} OR
      tickets.title ILIKE ${`%${query}%`} OR
      tickets.email ILIKE ${`%${query}%`} OR
      tickets.create_date::text ILIKE ${`%${query}%`} OR
      tickets.last_updated::text ILIKE ${`%${query}%`} OR
      tickets.status ILIKE ${`%${query}%`})
  `;

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch total number of tickets.');
  }
}

export async function fetchTicketById(id: string) {
  noStore();
  try {
    const data = await sql<Ticket>`
      SELECT
        tickets.id,
        tickets.user_id,
        tickets.user_name,
        tickets.email,
        tickets.title,
        tickets.description,
        tickets.create_date,
        tickets.last_updated,
        tickets.status
      FROM tickets
      WHERE tickets.id = ${id};
    `;

    const ticket = data.rows.map((ticket) => ({
      ...ticket,
    }));

    return ticket[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch ticket.');
  }
}

export async function fetchCommentsByTicketId(ticket_id: string) {
  noStore();
  try {
    const data = await sql<Comment>`
      SELECT
        comments.id,
        comments.ticket_id,
        comments.user_id,
        comments.user_name,
        comments.create_date,
        comments.last_updated,
        comments.description
      FROM comments
      WHERE comments.ticket_id = ${ticket_id};
    `;
    console.log(data);

    const comment = data.rows.map((comment) => ({
      ...comment,
    }));

    return comment;
  } catch (error) {
    console.error('Database Error:', error);
    console.log(error);
    throw new Error('Failed to fetch comment.');
  }
}