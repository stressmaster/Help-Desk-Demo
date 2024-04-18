import Pagination from '@/app/ui/pagination';
import Search from '@/app/ui/search';
import Table from '@/app/ui/tickets/table';
import { CreateTicket } from '@/app/ui/buttons';
import { lusitana } from '@/app/ui/fonts';
import { TicketsTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { fetchTicketsPages } from '@/app/lib/data';
import { getUserFromSession, getUser } from '@/auth';

 
export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {

  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;
  
  const totalPages = await fetchTicketsPages(query, (await getUserFromSession()).id, (await getUserFromSession()).isadmin);
  const isAdmin = (await getUserFromSession()).isadmin;

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Ticket Log</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search tickets..." />
        {!isAdmin && <CreateTicket />}
      </div>
       <Suspense key={query + currentPage} fallback={<TicketsTableSkeleton />}>
        <Table query={query} currentPage={currentPage} isAdmin={isAdmin} user_id={(await getUserFromSession()).id } />
      </Suspense>
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </div>
  );
}