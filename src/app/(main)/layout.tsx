import Navigation from "@/components/layout/Navigation";

type MainLayoutProps = {
    children: React.ReactNode;
};

const MainLayout = ({
    children,
}: MainLayoutProps) => {
    return (
        <div>
            <Navigation />
            <main className='mt-[20px] py-10 xl:py-20'>
                {children}
            </main>
        </div>
    );
};

export default MainLayout;
