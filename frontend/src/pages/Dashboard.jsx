import MainLayout from "../layouts/MainLayout";
import DashboardStats from "../components/DashboardStats";
import BatchTable from "../components/BatchTable";
import AlertPanel from "../components/AlertPanel";
import SystemStatus from "../components/SystemStatus";
import TemperatureChart from "../components/TemperatureChart";

<p className="mt-4 text-gray-400 text-lg">
  Real-time monitoring of cold storage batches.
</p>

function Dashboard() {
  return (
    <MainLayout>

      <div className="min-h-screen bg-black text-white px-6 py-12">

        <div className="max-w-7xl mx-auto">

          <h1 className="text-5xl font-bold">
            Dashboard
          </h1>

          <p className="mt-4 text-gray-400 text-lg">
            Real-time monitoring of cold storage batches.
          </p>

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