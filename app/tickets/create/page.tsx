import Form from '@/app/ui/tickets/create-form';
import Breadcrumbs from '@/app/ui/breadcrumbs';
import { redirect } from 'next/navigation';
import { isAdmin } from '@/auth';
 
export default async function Page() {
  if (await isAdmin()) {
    redirect('/tickets');
  }
   
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Tickets', href: '/tickets' },
          {
            label: 'Create Ticket',
            href: '/tickets/create',
            active: true,
          },
        ]}
      />
      <Form/>
    </main>
  );
}