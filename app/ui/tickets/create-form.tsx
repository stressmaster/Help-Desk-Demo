'use client';

import Link from 'next/link';
import {
  EnvelopeIcon,
  UserCircleIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import { Button } from '@/app/ui/button';
import { createTicket, TicketState } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { useUser } from '@/app/lib/UserProvider';


export default function Form() {
  const initialState: TicketState = { message: null, errors: {} };
  const [state, formAction] = useFormState(createTicket, initialState);
  const user = useUser();
  let user_id : string, user_email : string, user_name : string;
  if (user) {
    user_id = user.id;
    user_email = user.email;
    user_name = user.name;
  } else {
    throw new Error('failed to retrieve user');
  }

  return (
    <form action={formAction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        <input type="hidden" name="user_id" value={user_id}/>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            Title
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="title"
                name="title"
                type="text"
                step="0.01"
                maxLength={35}
                placeholder="Enter a title for your ticket"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                required
              />
              <PencilSquareIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="title-error" aria-live="polite" aria-atomic="true">
            {state.errors?.title &&
            state.errors.title.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* User Name */}
        <div className="mb-4">
          <label htmlFor="user_name" className="mb-2 block text-sm font-medium">
            Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="user_name"
                name="user_name"
                type="text"
                step="0.01"
                placeholder="Enter a name"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="user-name-error"
                defaultValue={user_name}
                required
              />
              <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="user-name-error" aria-live="polite" aria-atomic="true">
            {state.errors?.user_name &&
            state.errors.user_name.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>


        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Email
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="email"
                name="email"
                type="email"
                step="0.01"
                placeholder="Enter an email"
                className="peer block w-full rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="email-error"
                defaultValue={user_email}
                required
              />
              <EnvelopeIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="email-error" aria-live="polite" aria-atomic="true">
            {state.errors?.email &&
            state.errors.email.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="mb-2 block text-sm font-medium">
            Description
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <textarea
                id="description"
                name="description"
                placeholder="Please give a detailed description of your problem"
                className="peer block w-full h-52 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 flex items-start"
                aria-describedby="description-error"
                required
              />
              <PencilSquareIcon className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] translate-y-1/2 translate-x-1/2 text-gray-500 peer-focus:text-gray-900" />
            </div>
          </div>
          <div id="description-error" aria-live="polite" aria-atomic="true">
            {state.errors?.description &&
            state.errors.description.map((error: string) => (
              <p className="mt-2 text-sm text-red-500" key={error}>
                {error}
              </p>
            ))}
          </div>
        </div>
        
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tickets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        <Button type="submit">Create Ticket</Button>
      </div>
    </form>
  );
}
