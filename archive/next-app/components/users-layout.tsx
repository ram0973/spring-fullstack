export default function UsersLayout({ children, }: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html lang="en">
    <body>
    {children}
    </body>
    </html>
  );
}
