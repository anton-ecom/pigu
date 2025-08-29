export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen max-w-screen-2xl">
      <main>{children}</main>
    </div>
  );
}
