// Bagong simula
import { useSelector } from "react-redux";
import { RootState } from "../store/configureStore";

// dashboard routes
import { routesAdmin } from "./routes_admin";
import { routesEmployee } from "./routes_employee";
import { routesQuickAccess } from "./routes_quick_accesses";
import { routesPendingChecklist } from "./routes_pending_checklist";
import { routesProcedurals } from "./routes_procedurals";
import { routesForms } from "./routes_forms";
import { routesDTR } from "./routes_dtr";
import { routesReports } from "./routes_reports";

import { INTERNAL_USER_ROLE } from "../types/types-store";
import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "../pages/auth";
import JSXRouteWrapper from "../routes";
import { IRoute } from "../types";

const icon = { className: "w-5 h-5 text-inherit" };

const Routesss = () => {
  const state: any = useSelector((state: RootState) => state.auth.employee_detail);
  
  let sideNavRoutes: any = [];

  // All sidenav routes
  const allRoutes = [routesAdmin, routesEmployee, routesQuickAccess, routesPendingChecklist, routesProcedurals, routesForms, routesDTR, routesReports];

  allRoutes.map((route) => { 
    let demo = route(state.user.role);
    if (Object.keys(demo).length !== 0) {
      `${sideNavRoutes.push(demo)}`;
    }
  });

  const routes: Array<IRoute> = [ 
    {
      id: 10000,
      layout: 'home',
      pages: state.user.role !== INTERNAL_USER_ROLE.Employee && state.user.role !== INTERNAL_USER_ROLE.Manager ? sideNavRoutes : [],
    }, 
    {
      id: 9000,
      layout: "auth",
      pages: [
        {
          id: 9100,
          icon: <ArrowRightOnRectangleIcon {...icon} />,
          name: "sign in",
          path: "/sign-in",
          element: <SignIn />,
          hasSubItems: false,
        },
        {
          id: 9200,
          icon: <UserPlusIcon {...icon} />,
          name: "sign up",
          path: "/sign-up",
          element: <SignUp />,
          hasSubItems: false,
        },
      ],
    }
  ];

  return routes;
}

export default Routesss;
