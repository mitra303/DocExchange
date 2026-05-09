import type { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: ReactNode;
  role: number;
  user: {
    name: string;
    role: number;
  };
};

const DashboardLayout = ({
  children,
  role,
  user,
}: Props) => {
  return (
    <div className="bg-gray-100 min-h-screen">
      <Header user={user} />

      <div className="flex">
        <Sidebar role={role} />

        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;