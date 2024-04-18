import Form from '@/app/ui/tickets/edit-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { fetchTicketById, fetchCommentsByTicketId } from '@/app/lib/data';
import { notFound, redirect } from 'next/navigation';
import { getUserFromSession } from '@/auth';
import CommentSection from '@/app/ui/tickets/CommentSection';

export default async function Page({ params }: { params: { id: string } }) {
  
  const id = params.id;
  const [ticket] = await Promise.all([
    fetchTicketById(id),
  ]);
  if (!ticket) {
    notFound();
  }

  const user = await getUserFromSession();
  if (!user.isadmin && ticket.user_id !== user.id) {
    redirect('/tickets/');
  }

  const [comments] = await Promise.all([fetchCommentsByTicketId(ticket.id)]);
  
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/tickets' },
          {
            label: 'Edit Ticket (Ticket ID: ' + id + ')',
            href: `/tickets/${id}/edit`,
            active: true,
          },
        ]}
      />
      <Form ticket={ticket} isAdmin={(await getUserFromSession()).isadmin}/>
      <CommentSection ticket={ticket} comments={comments} />
    </main>
  );
}