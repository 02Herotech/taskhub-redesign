import SessionTimeout from "@/components/global/Popup/SessionTimeout";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div>
      <Navigation />
      <SessionTimeout />
      <main className="mt-[20px]">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
