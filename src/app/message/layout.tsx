import Navigation from "@/components/layout/Navigation";

type AuthLayoutProps = {
  children: React.ReactNode;
};

const MessageLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Navigation />
      <main className="min-h-[calc(100vh-4rem)] pt-24">
        {children}
      </main>
    </div>
  );
};

export default MessageLayout;
