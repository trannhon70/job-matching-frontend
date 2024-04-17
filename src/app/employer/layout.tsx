import { Header, Sidebar, SubHeader } from "@/components/common/employer";

const EmployerLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex h-[calc(100vh-5rem)] w-full">
        <Sidebar />
        <div className="flex h-full w-full flex-col overflow-hidden p-4">
          <SubHeader />
          <div className="flex h-full w-full flex-1 flex-col overflow-y-auto">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployerLayout;
