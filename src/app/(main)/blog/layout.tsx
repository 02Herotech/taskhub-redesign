
type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
    return (
        <main className="bg-gradient-to-b from-[#F8E9FE] via-white to-[#FBEAFF]">{children}</main>
    );
};

export default MainLayout;
