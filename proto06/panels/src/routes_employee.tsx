import { useSelector } from "react-redux";
import { RootState } from "./store/configureStore";
import { INTERNAL_USER_ROLE } from "@/types/types-store";
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import { EmployeeProvider } from "./context/employee/EmployeeContext";
import DataTable from "./pages/employee/201-files/Employee201";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import EmploymentHistoryPage from "./pages/employee/employment-history/employment-history";
import Diversity3OutlinedIcon from '@mui/icons-material/Diversity3Outlined';
import EMPSEMINARSPageV2 from "./pages/employee/emp-training-seminars-v2/emp-training-seminars";
import EmploymentHistoryPageEmpView from "./pages/employee/employment-history-emp-view/employment-history-emp-view";
import EMPSEMINARSPageV2EmpView from "./pages/employee/emp-training-seminars-v2-emp-view/emp-training-seminars-emp-view";

const icon = { className: "w-5 h-5 text-inherit" };

export const routesEmployee = () => {
  const state = useSelector((state: RootState) => state.auth.employee_detail);

  return {
    id: 12000,
    icon: null,
    name: "Employees",
    path: "/employees",
    element: <strong style={{fontSize: '24px', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center'}} className="text-orange-500 py-1 px-3 bg-transparent hover:bg-violet-600 transition-all duration-200">EMPLOYEE ELEMENTS UNDER DEVELOPMENT</strong>,
    hasSubItems: true,
    subItems: [
      // instead na magamit ternary gets kuna kay sigi la iya utro pag check why not himo.on nala na bagat attribute
      // para ma sabtan if it user kay admin sugad.
      // observer ha iba na component if same kay didto an admil portal mayda bangin asya gin tutukoy ni sir na repetative na asya gusto niya himo.on nala na property pero tat gusto kay ig arrange nala tas sulod tanan ha usa na routes

      ...(state?.user?.role !== INTERNAL_USER_ROLE.Employee && state?.user?.role !== INTERNAL_USER_ROLE.Manager ) ?
      [
        {
          id: 12100,
          icon: <PersonOutlineOutlinedIcon {...icon} />,
          name: "201 Files",
          path: "/employees/201-files",
          element: <EmployeeProvider>
                    <DataTable/>
                  </EmployeeProvider>, 
          hasSubItems: true,
          subItems: [
            {
              id: 121000,
              icon: <UserCircleIcon {...icon} />,
              name: "201 Files",
              path: "/employees/201-files/extra",
              element: <h1>testing</h1>, 
              hasSubItems: false,
            },
          ]
        },
        {
          id: 12400,
          icon: <AutoStoriesOutlinedIcon {...icon} />,
          name: "Employment History",
          path: "/employees/Employment-History",
          element:<EmploymentHistoryPage/>,
          hasSubItems: false,
        },
        {
          id: 12500,
          icon: <Diversity3OutlinedIcon {...icon} />,
          name: "Training & Seminars",
          path: "/employees/Training-and-Seminars",
          element:<EMPSEMINARSPageV2/>,
          hasSubItems: false,
        },
      ] : [],
        ...(state?.user?.role === INTERNAL_USER_ROLE.Employee || state?.user?.role === INTERNAL_USER_ROLE.Manager ) ? [
        {
          id: 12400,
          icon: <AutoStoriesOutlinedIcon {...icon} />,
          name: "Employment History",
          path: "/employees/Employment-History-E1",
          element:<EmploymentHistoryPageEmpView/>,
          hasSubItems: false,
        },
        {
          id: 12500,
          icon: <Diversity3OutlinedIcon {...icon} />,
          name: "Training & Seminars",
          path: "/employees/Training-and-Seminars-E1",
          element:<EMPSEMINARSPageV2EmpView/>,
          hasSubItems: false,
        },
      ] : [],
    ]
  }
  // add la didi ubos if mayda ig dudugang
}
