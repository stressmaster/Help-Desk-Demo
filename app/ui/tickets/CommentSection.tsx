'use client'

import { Comment, Ticket } from "@/app/lib/definitions";
import PreviousComment from "./previousComment";
import NewComment from "./NewComment";
import React from "react";

export default function CommentSection({
    ticket,
    comments,
  }: {
    ticket: Ticket;
    comments: Comment[];
  }) {

    function compare(a : Comment, b: Comment) {
      if (a.create_date < b.create_date)
         return -1;
      if (a.create_date > b.create_date)
        return 1;
      return 0;
    }
  
    return (
        <div>
          {/* Comments History */}
          <div className="mb-4">
            {comments.length!=0 && <label htmlFor="comment" className="mb-2 block text-sm font-medium">
              Comments
            </label>}
            <div id="comments">
              {comments &&
              comments.sort(compare).map((comment) => (
              <PreviousComment key={comment.id} comment={comment}/>
              ))}
            </div>
          </div>
          {/* Comment */}
          <div id="comment">
            <NewComment ticket={ticket}/>
          </div>
        </div>
    );
}
  