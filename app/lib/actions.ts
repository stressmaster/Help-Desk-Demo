'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';

const CommentSchema = z.object({
    id: z.string(),
    ticket_id: z.string(),
    description: z.string(),
    user_id: z.string(),
    user_name: z.string(),
  });

const TicketFormSchema = z.object({
    id: z.string(),
    user_name: z.string({
      invalid_type_error: 'Please enter a name.',
    }),
    user_id: z.string({
      invalid_type_error: 'Please enter a name.',
    }),
    email: z.string({
        invalid_type_error: 'Please enter an email.',
      }),
    description: z.string({
        invalid_type_error: 'Please enter a description.',
      }),
    title: z.string({
        invalid_type_error: 'Please enter a title.',
      }),
    create_date: z.string({
        invalid_type_error: 'Please enter a creation date.',
      }),
    last_updated: z.string({
        invalid_type_error: 'Please enter an update time.',
      }),
    status: z.enum(['New', 'In Progress', 'Resolved'], {
        invalid_type_error: 'Please select a ticket status.',
      }),
    });

export type TicketState = {
    errors?: {
        email?: string[];
        description?: string[];
        title?: string[];
        status?: string[];
        user_name?: string[];
        user_id?: string[];
    }
    message?: string | null;
}

export type CommentState = {
    errors?: {
        ticket_id?: string[];
        description?: string[];
    }
    message?: string | null;
}

const CreateTicket = TicketFormSchema.omit({ id : true, create_date: true, last_updated: true, status: true});

export async function createTicket(prevState: TicketState, formData: FormData) {
    // Validate form using Zod
    const validatedFields = CreateTicket.safeParse({
      user_id: formData.get('user_id'),
      user_name: formData.get('user_name'),
      email: formData.get('email'),
      description: formData.get('description'),
      title: formData.get('title')
    });
   
    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Ticket.',
      };
    }
   
    // Prepare data for insertion into the database
    const { user_id, user_name, email, description, title} = validatedFields.data;
    const status = 'New';
   
    // Insert data into the database
    try {
      await sql`
        INSERT INTO tickets (user_id, user_name, email, title, description, create_date, last_updated, status)
        VALUES (${user_id}, ${user_name}, ${email}, ${title}, ${description}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP, ${status})
      `;
    } catch (error) {
      // If a database error occurs, return a more specific error.
      return {
        message: 'Database Error: Failed to Create Ticket.',
      };
    }
   
    // Revalidate the cache for the tickets page and redirect the user.
    revalidatePath('/tickets');
    redirect('/tickets');
}

const UpdateTicket = TicketFormSchema.omit({ id: true });

export async function updateTicket(
    id: string,
    prevState: TicketState,
    formData: FormData,
  ) {
    
    const validatedFields = UpdateTicket.safeParse({
      user_id: formData.get('user_id'),
      user_name: formData.get('user_name'),
      email: formData.get('email'),
      description: formData.get('description'),
      title: formData.get('title'),
      status: formData.get('status'),
      create_date: formData.get('create_date'),
      last_updated: formData.get('last_updated'),
    });

   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Ticket.',
      };
    }
   
    const { user_id, user_name, email, description, title, status, create_date, last_updated } = validatedFields.data;

    
    try {
        await sql`
        UPDATE tickets
        SET user_id = ${user_id}, user_name = ${user_name}, email = ${email}, status = ${status}, description = ${description},
        title = ${title}, last_updated = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Update Ticket.' };
    }

    revalidatePath('/tickets');
    revalidatePath('/tickets/' + id + '/edit');
    return Promise.resolve({
      errors: {},
      message: null
    }); 
  }

const UpdateComment = CommentSchema.omit({ id: true, ticket_id: true, user_id: true, user_name: true });

export async function updateComment(
    id: string,
    formData: FormData,
  ) {
    
    const validatedFields = UpdateComment.safeParse({
      description: formData.get('description'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Update Comment.'
      };
    }
   
    const { description } = validatedFields.data;

    try {
        await sql`
        UPDATE comments
        SET description = ${description}, LAST_UPDATED = CURRENT_TIMESTAMP
        WHERE id = ${id}
      `;
    } catch (error) {
      return { errors:null, message: 'Database Error: Failed to Update Comment.' };
    }

    revalidatePath('/tickets/' + id + '/edit');
   
    return Promise.resolve({
      errors: {},
      message: null
    });
}

const CreateComment = CommentSchema.omit({ id: true });

export async function createComment(
    prevState: CommentState,
    formData: FormData,
  ) {
    
    const validatedFields = CreateComment.safeParse({
      ticket_id: formData.get('ticket_id'),
      description: formData.get('description'),
      user_id: formData.get('user_id'),
      user_name: formData.get('user_name'),
    });
   
    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Create Comment.',
      };
    }
   
    const { ticket_id, description, user_id, user_name} = validatedFields.data;
    
    try {
      await sql`
        INSERT INTO comments (ticket_id, description, user_id, user_name, create_date, last_updated)
        VALUES (${ticket_id}, ${description}, ${user_id}, ${user_name}, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
      `;
    } catch (error) {
      return { message: 'Database Error: Failed to Create Comment.' };
    }

    revalidatePath('/tickets');
    revalidatePath('/tickets/' + ticket_id + '/edit');
    return Promise.resolve({
      errors: {},
      message: null
    });
   
}

export async function deleteTicket(id: string) {
    try {
        await sql`DELETE FROM comments WHERE ticket_id = ${id}`;
        await sql`DELETE FROM tickets WHERE id = ${id}`;
        revalidatePath('/tickets');
        return { message: 'Deleted Ticket.' };
    } catch (error) {
        return { message: 'Database Error: Failed to Delete Ticket.' };
    }
}

export async function deleteComment(id: string, ticket_id: string) {
  try {
      await sql`DELETE FROM comments WHERE id = ${id}`;
      revalidatePath('/tickets/'+ticket_id+'/edit');
      return Promise.resolve({ message: 'Deleted Comment.' });
  } catch (error) {
      return { message: 'Database Error: Failed to Delete Comment.' };
  }
}

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
  ) {
    try {
      await signIn('credentials', formData);
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Invalid credentials.';
          default:
            return 'Something went wrong.';
        }
      }
      throw error;
    }
  }