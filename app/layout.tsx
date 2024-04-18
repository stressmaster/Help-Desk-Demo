import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { auth } from '@/auth';
import { getUser } from './lib/data';
import { UserProvider } from './lib/UserProvider';

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  var user;
  if (session?.user?.email) {
    user = await getUser(session?.user?.email);
  }

  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <UserProvider user={user}>
          {children}
        </UserProvider></body>
    </html>
  );
}
