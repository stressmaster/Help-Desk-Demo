'use client'

import { Comment } from "@/app/lib/definitions";
import { DeleteComment, UpdateComment } from "../buttons";
import { useState } from "react";
import { PencilIcon } from "@heroicons/react/24/outline";
import React from "react";
import { useUser } from "@/app/lib/UserProvider";
import { formatDateToLocal } from "@/app/lib/utils";

export default function PreviousComment({
    comment,
  }: {
    comment: Comment;
  }) {
    const [isEditable, setIsEditable] = useState(false);
    const textInput = React.useRef<HTMLTextAreaElement>(null);
    const user = useUser();
    const [textChanged, setTextChanged] = useState(false);

    const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextChanged(event.target.value !== comment.description);
    };

    return (
        <div className="rounded-md bg-gray-50">
            <div className="mb-4">
                <div className="relative mt-2 rounded-md">
                    <div className="flex justify-between items-center text-sm">
                        <p>From {comment.user_name} on {formatDateToLocal(comment.create_date.toString())
                            + (comment.last_updated.toString() == comment.create_date.toString() ? "" : (" (Edited " + formatDateToLocal(comment.create_date.toString()) + ")") )}</p>
                    </div>
                    <div className="relative">
                        <textarea
                            id="description"
                            name="description"
                            ref={textInput}
                            placeholder="Please give a detailed description of your problem"
                            className={"peer block w-full rounded-md border border-gray-200 py-2 text-sm outline-2 placeholder:text-gray-500 flex items-start"}
                            required
                            disabled={!isEditable}
                            defaultValue={comment.description}
                            onChange={handleTextareaChange}
                        />
                    </div>
                    <div className="mt-6 flex justify-end">
                        {!isEditable && user && user.id == comment.user_id && <button className="absolute bottom-1/2 right-0 rounded-md p-2 hover:bg-gray-100" onClick={()=>setIsEditable(true)}>
                            <span className="sr-only">Edit</span>
                            <PencilIcon className="w-5" />
                        </button>}
                        <button className="rounded-md border p-2 hover:bg-gray-100" hidden={!isEditable} onClick={()=>setIsEditable(false)}>
                            <span>Cancel</span>
                        </button>
                        {isEditable && <UpdateComment comment_id={comment.id} ticket_id={comment.ticket_id} comment_description={textInput.current} hasChanged={textChanged} onSubmit={setIsEditable}
                        textReset={setTextChanged}/>}
                        {isEditable && <DeleteComment comment_id={comment.id} ticket_id={comment.ticket_id} onSubmit={setIsEditable}/>}
                    </div>
                </div>
            </div>
        </div>
    )};