import AcmeLogo from '@/app/ui/acme-logo';
import { lusitana } from '@/app/ui/fonts';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function Page() {
  return (
    <main className="flex min-h-screen  p-6">
      <div className="mt-4 flex grow justify-center md:flex-row">
        <div className="flex flex-col justify-center items-center gap-6 rounded-lg bg-gray-50">
          <div className="bg-blue-400 text-white px-10 py-4 rounded-lg">
            <AcmeLogo />
          </div>
          <p className={`${lusitana.className} text-xl text-gray-800 md:text-3xl md:leading-normal justify-center`}>
            A quick demo of a
            Help Desk system
          </p>
          <Link
            href="/login"
            className="flex items-center justify-center gap-5 rounded-lg bg-blue-500 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-blue-400 md:text-base"
          >
            <span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </div>
      </div>
    </main>
  );
}
