import MainLayout from "../layouts/MainLayout";
import DashboardStats from "../components/DashboardStats";
import BatchTable from "../components/BatchTable";
import AlertPanel from "../components/AlertPanel";
import SystemStatus from "../components/SystemStatus";
import TemperatureChart from "../components/TemperatureChart";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  // 1. Hooks must be declared inside the component function
  const { user } = useAuth();

  return (
    <MainLayout>
      <div className="
        min-h-screen
        bg-gray-100
        text-gray-900
        dark:bg-black
        dark:text-white
        transition-colors
      ">
        <div className="max-w-7xl mx-auto p-6">
          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Real-time monitoring of cold storage batches.
          </p>

          {/* 2. Moved the floating 'Operational Access Level' card safely inside the layout */}
          {user && (
            <div className="
              mt-6
              bg-white
              dark:bg-gray-900
              border
              border-gray-200
              dark:border-gray-800
              rounded-2xl
              p-6
            ">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Operational Access Level
              </h2>
              <p className="mt-3 text-gray-600 dark:text-gray-400">
                {user.role === "Admin" &&
                  "Full system visibility and operational control enabled."}
                {user.role === "Manager" &&
                  "Operational monitoring and alert management enabled."}
                {user.role === "Farmer" &&
                  "Crop monitoring and environmental insights enabled."}
              </p>
            </div>
          )}

          <div className="mt-10">
            <SystemStatus />
          </div>

          <div className="mt-12">
            <DashboardStats />
            <TemperatureChart />
          </div>

          <BatchTable />
          <AlertPanel />
        </div>
      </div>
    </MainLayout>
  );
}

export default Dashboard;
