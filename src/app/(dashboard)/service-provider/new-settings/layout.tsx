export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="mt-[5.5rem] px-1 sm:px-5">
      {/* <SettingsHeader /> */}
      <section className="my-3 flex items-stretch gap-2">
        {children}
        {/* <ProfilePercentage /> */}
      </section>
    </div>
  );
}
