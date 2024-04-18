import { UpdateTicket, DeleteTicket } from '@/app/ui/buttons';
import TicketStatus from '@/app/ui/tickets/status';
import { formatDateToLocal } from '@/app/lib/utils';
import { fetchFilteredTickets } from '@/app/lib/data';

export default async function TicketsTable({
  query,
  currentPage,
  isAdmin,
  user_id,
}: {
  query: string;
  currentPage: number;
  isAdmin: boolean;
  user_id: string;
}) {

  const tickets = await fetchFilteredTickets(query, currentPage, user_id, isAdmin);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {tickets?.map((ticket) => (
              <div
                key={ticket.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <p>{ticket.name}</p>
                    </div>
                    <p className="text-sm text-gray-500">{ticket.email}</p>
                  </div>
                  <TicketStatus status={ticket.status} />
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div>
                    <p className="text-xl font-medium">
                      {ticket.title}
                    </p>
                    <p>{formatDateToLocal(ticket.create_date)}</p>
                  </div>
                  <div className="flex justify-end gap-2">
                    {(isAdmin || ticket.user_id === user_id) && <UpdateTicket id={ticket.id} isAdmin={isAdmin} />}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Title
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Requester
                </th>
                {/* <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th> */}
                <th scope="col" className="px-3 py-5 font-medium">
                  Creation Date
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Updated
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Status
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {tickets?.map((ticket) => (
                <tr
                  key={ticket.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap px-3 py-3">
                    {ticket.title}
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{ticket.user_name}</p>
                    </div>
                  </td>
                  {/* <td className="whitespace-nowrap px-3 py-3">
                    {ticket.email}
                  </td> */}
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(ticket.create_date)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    {formatDateToLocal(ticket.last_updated)}
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <TicketStatus status={ticket.status} />
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      {(isAdmin || ticket.user_id === user_id) && <UpdateTicket id={ticket.id} isAdmin={isAdmin} />}
                      {(!isAdmin && ticket.user_id == user_id) && <DeleteTicket id={ticket.id}/>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
