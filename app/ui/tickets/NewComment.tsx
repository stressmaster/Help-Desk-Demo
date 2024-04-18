'use client'

import { ArrowRightIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { Button } from "../button";
import { useState } from "react";
import { createComment } from "@/app/lib/actions";
import { useFormState } from "react-dom";
import React from "react";
import { useUser } from "@/app/lib/UserProvider";
import { Ticket } from "@/app/lib/definitions";

export default function NewComment({
    ticket,
  }: {
    ticket: Ticket;
  }) {
    const [hasContent, setHasContent] = useState(false);
    const initialState = { message: null, errors: {}};
    const [state, formAction] = useFormState(createComment, initialState);
    const textInput = React.useRef<HTMLTextAreaElement>(null);
    const user = useUser();
    let user_id : string;
    let user_name : string;
    if (user) {
      user_id = user.id;
      user_name = user.name;
    } else {
      throw new Error('failed to retrieve user');
    }

    const onSubmitFunction = async (formData : FormData) => {
      await formAction(formData);
      if (textInput.current) {
        const date = new Date();
        const am_pm = date.getHours() < 12 ? 'AM' : 'PM';
        const hours = date.getHours() % 12 || 12;
        if (user_name !== ticket.user_id) {
          console.log('Would normally send email here with body:\n' + ticket.user_id
            + ', there was activity on your ticket "' + ticket.title + '" by support staff.\n'
          + user_name + ' left a new comment: "' + textInput.current.value.substring(0,20)
          + (textInput.current.value.length > 20 ?  '...' : '') + '" at ' + hours + ':'
          + date.getMinutes() + ' ' + am_pm + ' on ' + date.toLocaleString('en-us', {  weekday: 'long' }));
        }
        textInput.current.value = '';
      }
    }

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setHasContent(event.target.value.trim() !== '');
    };

    return (
      <form action={onSubmitFunction}>
        <div className="mb-4">
            <label htmlFor="description" className="mb-2 block text-sm font-medium">
                Add Comment
            </label>
            <div className="relative mt-2 rounded-md">
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    ref={textInput}
                    placeholder="Provide an update on this ticket"
                    className="peer block w-full h-52 rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500 flex items-start"
                    onChange={handleTextareaChange}
                    />
                    <PencilSquareIcon className="pointer-events-none absolute left-0 top-0 h-[18px] w-[18px] translate-y-1/2 translate-x-1/2 text-gray-500 peer-focus:text-gray-900" />
                    <input type="hidden" name="ticket_id" value={ticket.id}/>
                    <input type="hidden" name="user_id" value={user_id}/>
                    <input type="hidden" name="user_name" value={user_name}/>
                </div>
                <Button className="mt-4 w-full" type='submit' aria-disabled={!hasContent}>
                  Add Comment <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
                </Button>
            </div>
        </div>
    </form>
)};