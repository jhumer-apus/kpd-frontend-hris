import { Routes, Route } from "react-router-dom";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import {
  Sidenav,
  DashboardNavbar,
  Configurator,
  Footer,
} from "@/widgets/layout";
import { useMaterialTailwindController, setOpenConfigurator } from "@/context";
import { Profile } from "@/pages/dashboard";
import JSXRouteWrapper from "@/routes";
import UseDashboardRoute from "./dashboard-route";

export function Dashboard() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavType } = controller;
  const { FirstInnerRoutePath, SecondInnerRoutePath, ThirdInnerRoutePath, UndeclaredRouteReplace } = UseDashboardRoute();

  return (
    <div className="min-h-screen bg-blue-gray-50/50">
      <Sidenav
        routes={JSXRouteWrapper().routes}
        brandImg={
          sidenavType === "dark" ? "/img/logo-ct.png" : "/img/logo-ct-dark.png"
        }
      />
      <div className="p-4 xl:ml-80">
        <DashboardNavbar />
        <Configurator />
        <IconButton
          size="lg"
          color="white"
          className="fixed bottom-8 right-8 z-40 rounded-full shadow-blue-gray-900/10"
          ripple={false}
          onClick={() => setOpenConfigurator(dispatch, true)}
        >
          <Cog6ToothIcon className="h-5 w-5" />
        </IconButton>
        <Routes>
          {FirstInnerRoutePath}
          {SecondInnerRoutePath}
          {ThirdInnerRoutePath}
          {UndeclaredRouteReplace}
          <Route path="/profile/*" element={<Profile/>}/>
        </Routes>
        <div className="text-blue-gray-600">
          <Footer />
        </div>
      </div>
    </div>
  );
}

Dashboard.displayName = "/src/layout/dashboard.tsx";

export default Dashboard;