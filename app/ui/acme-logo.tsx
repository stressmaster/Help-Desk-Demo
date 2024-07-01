import { HandRaisedIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-blue`}
    >
      <HandRaisedIcon className="h-12 w-12" />
      <p className="text-[44px]">HelpNow!</p>
    </div>
  );
}
