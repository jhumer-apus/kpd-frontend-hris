// Bagong simula
import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import { routesAdmin } from "./routes_admin";
import { routesEmployee } from "./routes_employee";
import { INTERNAL_USER_ROLE } from "./types/types-store";
import { UserPlusIcon, ArrowRightOnRectangleIcon } from "@heroicons/react/24/solid";
import { SignIn, SignUp } from "./pages/auth";
import JSXRouteWrapper from "./routes";

const icon = { className: "w-5 h-5 text-inherit" };

const Routesss = () => {
  const state = useSelector((state: RootState) => state.auth.employee_detail);
  const isAdmin = state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager

  console.log('routes admin', routesAdmin());
  console.log('routes employee', routesEmployee());
  console.log('jsx routewrapper', JSXRouteWrapper().routes);

  const routes_adminPortal = routesAdmin();

  // keep in mind pag butang hin property na if naka login ba or biling iba na approach na maupay

  const routes = [{
    id: 10000,
    layout: 'home',
    pages: [
      ...(isAdmin) ? [routes_adminPortal] : []
    ]
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
  }];

  return routes;
}

export default Routesss;
