
type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="lg:bg-gradient-to-b from-[#F8E9FE] via-white to-[#FBEAFF] bg-white">{children}</main>
    );
};

export default MainLayout;
