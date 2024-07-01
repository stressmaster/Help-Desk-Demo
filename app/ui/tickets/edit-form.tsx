'use client';

import { Ticket } from '@/app/lib/definitions';
import {
  CheckIcon,
  ClockIcon,
  ArrowRightCircleIcon,
  EnvelopeIcon,
  PencilSquareIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { Button } from '@/app/ui/button';
import { updateTicket } from '@/app/lib/actions';
import { useFormState } from 'react-dom';
import { Toaster, toast } from "react-hot-toast";
import { useUser } from '@/app/lib/UserProvider';
import { redirect } from 'next/navigation';
import { formatDateToLocal } from '@/app/lib/utils';

export default function EditTicketForm({
  ticket,
  isAdmin,
}: {
  ticket: Ticket;
  isAdmin: boolean;
}) {
  const initialState = { message: null, errors: {}};
  const updateTicketWithId = updateTicket.bind(null, ticket.id);
  const [state, formAction] = useFormState(updateTicketWithId, initialState);

  // fetch user from context
  const user = useUser();
  if (!user || (!user.isadmin && user.email != ticket.email)) {
    redirect('/tickets/');
  }
  const user_id = user.id;
  const user_name = user.name;


  const onSubmitFunction = async (formData : FormData) => {
    await formAction(formData);
    if (state.message === null) {
      toast.success('Your changes have been saved.');
    } else {
      toast.error('Error: failed to save update.');
    }
  }

  return (
    <form action={onSubmitFunction}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">

        <input type="hidden" name="user_id" value={ticket.user_id}/>

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
                placeholder="Enter a title"
                className="peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500"
                aria-describedby="title-error"
                defaultValue={ticket.title}
                required={!isAdmin}
                disabled={isAdmin}
              />
            </div>
            <input type="hidden" name="title" value={ticket.title} disabled={!isAdmin}/>
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
                defaultValue={ticket.user_name}
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
                defaultValue={ticket.email}
                required={!isAdmin}
                disabled={isAdmin}
              />
              <input type="hidden" name="email" value={ticket.email} disabled={!isAdmin}/>
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
                className={"peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500 flex items-start" + (isAdmin ? "" : " pl-10")}
                aria-describedby="description-error"
                required={!isAdmin}
                disabled={isAdmin}
                defaultValue={ticket.description}
              />
              <input type="hidden" name="description" value={ticket.description} disabled={!isAdmin}/>
              <PencilSquareIcon visibility={isAdmin ? 'hidden' : 'visible'} className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] translate-y-1/2 translate-x-1/2 text-gray-500 peer-focus:text-gray-900" />
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

        <div className="flex justify-start gap-14">
        {/* Create Time */}
        <div className="mb-4">
          <label htmlFor="create_date" className="mb-2 block text-sm font-medium">
            Create Date
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p
                id="create_date"
                className="peer block w-full rounded-md py-2 text-sm outline-2"
              >{formatDateToLocal(ticket.create_date.toString())}</p>
            </div>
          </div>
          <input type="hidden" name="create_date" value={ticket.create_date}/>
        </div>

        {/* Last Updated */}
        <div className="mb-4">
          <label htmlFor="last_updated" className="mb-2 block text-sm font-medium">
            Last Updated
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <p
                id="last_updated"
                className="peer block w-full rounded-md py-2 text-sm outline-2"
              >{formatDateToLocal(ticket.last_updated.toString())}</p>
              <input type="hidden" name="last_updated" value={ticket.last_updated}/>
            </div>
          </div>
        </div>
        </div>


        {/* Ticket Status */}
        <fieldset>
          <legend className="mb-2 block text-sm font-medium">
            {isAdmin ? "Set the ticket status" : "Current ticket status"}
          </legend>
          <div className="rounded-md border border-gray-200 bg-white px-[14px] py-3">
            <div className="flex gap-4">
              <div className="flex items-center">
                <input
                  id="new"
                  name="status"
                  type="radio"
                  value="New"
                  defaultChecked={ticket.status === 'New'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  required={isAdmin}
                  disabled={!isAdmin}
                />
                <label
                  htmlFor="new"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600"
                >
                  New <ClockIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="progress"
                  name="status"
                  type="radio"
                  value="In Progress"
                  defaultChecked={ticket.status === 'In Progress'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  required={isAdmin}
                  disabled={!isAdmin}
                />
                <label
                  htmlFor="progress"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-yellow-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  In Progress <ArrowRightCircleIcon className="h-4 w-4" />
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="resolved"
                  name="status"
                  type="radio"
                  value="Resolved"
                  defaultChecked={ticket.status === 'Resolved'}
                  className="h-4 w-4 cursor-pointer border-gray-300 bg-gray-100 text-gray-600 focus:ring-2"
                  aria-describedby="status-error"
                  required={isAdmin}
                  disabled={!isAdmin}
                />
                <label
                  htmlFor="resolved"
                  className="ml-2 flex cursor-pointer items-center gap-1.5 rounded-full bg-green-500 px-3 py-1.5 text-xs font-medium text-white"
                >
                  Resolved <CheckIcon className="h-4 w-4" />
                </label>
              </div>
            </div>
            <div id="status-error" aria-live="polite" aria-atomic="true">
              {state.errors?.status &&
              state.errors.status.map((error: string) => (
                <p className="mt-2 text-sm text-red-500" key={error}>
                  {error}
                </p>
              ))}
            </div>
            <input type="hidden" name="status" value={ticket.status} disabled={isAdmin}/>
          </div>
        </fieldset>

      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Link
          href="/tickets"
          className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200"
        >
          Cancel
        </Link>
        {/* <Button type="submit" style={isAdmin ? { display: "none" } : {} }>Edit Ticket</Button> */}
        <Button type="submit" >Edit Ticket</Button>
      </div>
      <Toaster position="bottom-center" />
    </form>

  );
}
