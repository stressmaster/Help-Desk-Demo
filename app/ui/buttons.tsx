import { ArrowUturnLeftIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteComment, deleteTicket, updateComment } from '@/app/lib/actions';
import { Dispatch, SetStateAction } from 'react';
import { Button } from './button';


export function CreateTicket() {
  return (
    <Link
      href="/tickets/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Ticket</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateTicket({ id, isAdmin }: { id: string, isAdmin: boolean }) {
  return (
    <Link
      href={`/tickets/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon visibility={isAdmin ? 'hidden' : 'visible'} className="w-5" />
      <ArrowUturnLeftIcon visibility={isAdmin ? 'visible' : 'hidden'} className="w-5" />
    </Link>
  );
}

export function DeleteTicket({ id }: { id: string }) {
  const deleteTicketWithId = deleteTicket.bind(null, id);
  return (
    <form action={deleteTicketWithId}>
      <button className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}

export function DeleteComment({ comment_id, ticket_id, onSubmit}: { comment_id: string, ticket_id: string,
  onSubmit: Dispatch<SetStateAction<boolean>>
 }) {
  const deleteCommentWithId = deleteComment.bind(null, comment_id, ticket_id);
  const onSubmitFunction = async () => {
    await deleteCommentWithId();
    onSubmit(false);
  }
  return (
    <form action={onSubmitFunction}>
      <button className="rounded-md border p-2 hover:bg-red-200 bg-red-400">
        <span >Delete</span>
      </button>
    </form>
  );
}

export function UpdateComment({comment_id, ticket_id, comment_description, hasChanged, onSubmit, textReset}: {comment_id: string,
  ticket_id: string, comment_description: HTMLTextAreaElement | null, hasChanged: boolean, onSubmit: Dispatch<SetStateAction<boolean>>
  textReset: Dispatch<SetStateAction<boolean>>}) {
  const updateCommentWithId = updateComment.bind(null, comment_id);
  const deleteCommentWithId = deleteComment.bind(null, comment_id, ticket_id);

  const onSubmitFunction = async (formData : FormData) => {
    if (!comment_description || comment_description.value == '') {
      await deleteCommentWithId();
    } else {
      await updateCommentWithId(formData);
    }
    onSubmit(false);
    textReset(false);
  }
  
  return (
    <form action={onSubmitFunction}>
      <input type="hidden" name="description" value={comment_description ? comment_description.value : ''}/>
      <Button className="rounded-md border p-2 hover:bg-blue-300 bg-blue-600 text-white" aria-disabled={!hasChanged}>
        <span>Update</span>
      </Button>
    </form>
  );
}