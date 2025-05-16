import ProfilePercentage from "./ProfilePercentage";
import SettingsHeader from "./SettingsHeader";

export default function SettingsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="px-1 sm:px-5 mt-[5.5rem]">
      <SettingsHeader />
      <section className="my-3 flex items-stretch gap-2">
        {children}
        <ProfilePercentage />
      </section>
    </div>
  );
}
