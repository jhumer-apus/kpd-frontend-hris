import AllApproval from "@/pages/payroll/all-approval";
import PayrollPendingApproval from "@/pages/payroll/pending-approval";
import ProcessPayroll from "@/pages/payroll/process-payroll";
import ViewPayroll from "@/pages/payroll/view-all-payroll/view-all-payroll";
import ViewSpecificPayroll from "@/pages/payroll/view-specific-payroll/view-specific-payroll";
import { DocumentIcon } from "@heroicons/react/24/solid";

export const routesPayroll = () => {
    const icon = { className: "w-5 h-5 text-inherit" };
    return {
            id: 19000,
            icon: null,
            name: "Payroll",
            path: "/payroll",
            element: null,
            hasSubItems: true,
            subItems: [
            {
                id: 19100,
                icon: <DocumentIcon {...icon} />,
                name: "View All Payroll",
                path: "/payroll/view-all-payroll",
                element: <ViewPayroll/>,
                hasSubItems: false,
            },
            {
                id: 19200,
                icon: <DocumentIcon {...icon} />,
                name: "Process Payroll",
                path: "/payroll/process-payroll",
                element: <ProcessPayroll/>,
                hasSubItems: false,
            },
            // {
            //     id: 19300,
            //     icon: <DocumentIcon {...icon} />,
            //     name: "Payslip Sample",
            //     path: "/payroll/payslip-sample",
            //     element: <TestView/>,
            //     hasSubItems: false,
            // },

            {
                id: 19300,
                icon: <DocumentIcon {...icon} />,
                name: "View Specific Payroll",
                path: "/payroll/view-specific-payroll",
                element: <ViewSpecificPayroll/>,
                hasSubItems: false,
            },

            {
                id: 19400,
                icon: <DocumentIcon {...icon} />,
                name: "Pending Approval",
                path: "/payroll/pending-approval",
                element: <PayrollPendingApproval/>,
                hasSubItems: false,
            },
            {
                id: 19400,
                icon: <DocumentIcon {...icon} />,
                name: "All Approvals",
                path: "/payroll/all-approval",
                element: <AllApproval />,
                hasSubItems: false,
            },
        ]
    }
}

