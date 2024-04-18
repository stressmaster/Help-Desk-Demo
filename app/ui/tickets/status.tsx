import { CheckIcon, ClockIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function TicketStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-xs',
        {
          'bg-yellow-500 text-white': status === 'In Progress',
          'bg-green-500 text-white': status === 'Resolved',
          'bg-gray-100 text-gray-500': status === 'New'
        },
      )}
    >
      {status === 'New' ? (
        <>
          New
          <ClockIcon className="ml-1 w-4 text-gray-500" />
        </>
      ) : null}
      {status === 'In Progress' ? (
        <>
          In Progress
          <ClockIcon className="ml-1 w-4 text-black" />
        </>
      ) : null}
      {status === 'Resolved' ? (
        <>
          Resolved
          <CheckIcon className="ml-1 w-4 text-white" />
        </>
      ) : null}
    </span>
  );
}
