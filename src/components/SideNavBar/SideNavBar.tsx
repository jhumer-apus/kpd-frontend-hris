// components/SideNavBar/SideNavBar.tsx
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { IconType } from 'react-icons';
// import "./SideNavBar.module.scss";
import styles from './SideNavBar.module.scss';
import { HiOutlineFingerPrint as BiometricsData } from "react-icons/hi";
import {
    FcAcceptDatabase as Dashboard,
    FcReadingEbook as Employee,
    FcReading as User201,
    FcKindle as Appraisal,
    FcDataSheet as DTR,
    FcCalendar as Scheduler,
    FcClock as TimeKeeping,
    FcTodoList as DTRSummary,
    FcLandscape as Leaves,
    FcNightPortrait as OT,
    FcButtingIn as OBT,
    FcOvertime as UA,
    FcBusinesswoman as Maternity,
    FcFile as Reports,
    FcDiploma2 as Forms,
    FcDiploma1 as COE,
    FcCurrencyExchange as Payroll,
    FcDebt as PayrollRegister,
    FcPrint as PrintPayslip,
    FcInvite as Bonus,
    FcMoneyTransfer as Month13,
    FcPaid as Compensation,
    FcNegativeDynamic as AdjustmentOthers,
    FcLibrary as TaxRefund,
    FcDepartment as GovernmentDeductions,
    FcLowPriority as OtherDeductions,
    FcHome as SSSLoan,
    FcStatistics as PayrollSummary,
    FcParallelTasks as NetPayBankSummary,
    FcElectricalThreshold as AllowanceSummary,
    FcSelfServiceKiosk as AlphaList,
    FcCollaboration as PostAnnouncement,
    FcGlobe as Announcements,
    FcCustomerSupport as Help,
  } from "react-icons/fc";


interface AccordionItem {
  id: number;
  label: string;
  direction: string;
  icon: IconType;
  hasSubItems: boolean;
  subItems?: Array<AccordionItem>;

}

const navItems: AccordionItem[] = [
  // Add your accordion items here.
  // Let's Create an accordion item according to this data 
// ├─ Dashboard
// ├─ Employee/
// │   ├─ 201
// │   └─ Appraisal
// ├─ DTR/
// │   ├─ Scheduler
// │   ├─ Timekeeping
// │   ├─ Biometrics Data
// │   ├─ DTR Summary
// │   ├─ Leaves
// │   ├─ Overtime
// │   ├─ Official Business Trip
// │   ├─ Unaccounted Attendance
// │   └─ Maternity
// ├─ Reports
// ├─ Forms/
// │   └─ Certificate of Employment
// ├─ Payroll/
// │   ├─ Payroll Register
// │   ├─ Print Payslip
// │   ├─ Bonus
// │   ├─ 13th Month
// │   ├─ Compensation 
// │   ├─ Adjustment Others
// │   ├─ Tax Refund
// │   ├─ Government Deduction
// │   ├─ Other Deduction
// │   ├─ SSS Loan
// │   ├─ Payroll Summary
// │   ├─ Net Pay Bank Summary 
// │   ├─ Allowance Summary 
// │   └─ Alpha List
// ├─ Announcements/
// │   └─ Post Announcements
// └─ Help
    {
    id: 1,
    label: "Dashboard",
    direction: "",
    icon: Dashboard,
    hasSubItems: false,
    },
    {
    id: 2,
    label: "Employee",
    direction: "",
    icon: Employee,
    hasSubItems: true,
    subItems: [
        {
        id: 201,
        label: "201",
        direction: "employee/201",
        icon: User201,
        hasSubItems: false,
        },
        {
        id: 202,
        label: "Appraisal",
        direction: "employee/appraisal",
        icon: Appraisal,
        hasSubItems: false,
        },
    ],
    },
    {
    id: 3,
    label: "DTR",
    direction: "dtr",
    icon: DTR,
    hasSubItems: true,
    subItems: [
        {
        id: 301,
        label: "Scheduler",
        direction: "dtr/scheduler",
        icon: Scheduler,
        hasSubItems: false,
        },
        {
        id: 302,
        label: "Timekeeping",
        direction: "dtr/timekeeping",
        icon: TimeKeeping,
        hasSubItems: false,
        },
        {
        id: 303,
        label: "Biometrics Data",
        direction: "dtr/biometrics-data",
        icon: BiometricsData,
        hasSubItems: false,
        },
        {
        id: 304,
        label: "DTR Summary",
        direction: "dtr/dtr-summary",
        icon: DTRSummary,
        hasSubItems: false,
        },
        {
        id: 305,
        label: "Leaves",
        direction: "dtr/leaves",
        icon: Leaves,
        hasSubItems: false,
        },
        {
        id: 306,
        label: "Overtime",
        direction: "dtr/overtime",
        icon: OT,
        hasSubItems: false,
        },
        {
        id: 307,
        label: "Official Business Trip",
        direction: "dtr/official-business-trip",
        icon: OBT,
        hasSubItems: false,
        },
        {
        id: 308,
        label: "Unaccounted Attendance",
        direction: "dtr/unaccounted-attendance",
        icon: UA,
        hasSubItems: false,
        },
        {
        id: 309,
        label: "Maternity",
        direction: "dtr/maternity",
        icon: Maternity,
        hasSubItems: false,
        },
    ],
    },
    {
    id: 4,
    label: "Reports",
    direction: "reports",
    icon: Reports,
    hasSubItems: false,
    },
    {
    id: 5,
    label: "Forms",
    direction: "forms",
    icon: Forms,
    hasSubItems: true,
    subItems: [
        {
        id: 501,
        label: "Certificate of Employment",
        direction: "forms/certificate-of-employment",
        icon: COE,
        hasSubItems: false,
        },
    ],
    },
    {
    id: 6,
    label: "Payroll",
    direction: "payroll",
    icon: Payroll,
    hasSubItems: true,
    subItems: [
        {
        id: 601,
        label: "Payroll Register",
        direction: "payroll/payroll-register",
        icon: PayrollRegister,
        hasSubItems: false,
        },
        {
        id: 602,
        label: "Print Payslip",
        direction: "payroll/print-payslip",
        icon: PrintPayslip,
        hasSubItems: false,
        },
        {
        id: 603,
        label: "Bonus",
        direction: "payroll/bonus",
        icon: Bonus,
        hasSubItems: false,
        },
        {
        id: 604,
        label: "13th Month",
        direction: "payroll/13th-month",
        icon: Month13,
        hasSubItems: false,
        },
        {
        id: 605,
        label: "Compensation",
        direction: "payroll/compensation",
        icon: Compensation,
        hasSubItems: false,
        },
        {
        id: 606,
        label: "Adjustment Others",
        direction: "payroll/adjustment-others",
        icon: AdjustmentOthers,
        hasSubItems: false,
        },
        {
        id: 607,
        label: "Tax Refund",
        direction: "payroll/tax-refund",
        icon: TaxRefund,
        hasSubItems: false,
        },
        {
        id: 608,
        label: "Government Deduction",
        direction: "payroll/government-deduction",
        icon: GovernmentDeductions,
        hasSubItems: false,
        },
        {
        id: 609,
        label: "Other Deduction",
        direction: "payroll/other-deduction",
        icon: OtherDeductions,
        hasSubItems: false,
        },
        {
        id: 610,
        label: "SSS Loan",
        direction: "payroll/sss-loan",
        icon: SSSLoan,
        hasSubItems: false,
        },
        {
        id: 611,
        label: "Payroll Summary",
        direction: "payroll/payroll-summary",
        icon: PayrollSummary,
        hasSubItems: false,
        },
        {
        id: 612,
        label: "Net Pay Bank Summary",
        direction: "payroll/net-pay-bank-summary",
        icon: NetPayBankSummary,
        hasSubItems: false,
        },
        {
        id: 613,
        label: "Allowance Summary",
        direction: "payroll/allowance-summary",
        icon: AllowanceSummary,
        hasSubItems: false,
        },
        {
        id: 614,
        label: "Alpha List",
        direction: "payroll/alpha-list",
        icon: AlphaList,
        hasSubItems: false,
        },
    ],
    },
    {
    id: 7,
    label: "Announcements",
    direction: "announcements",
    icon: Announcements,
    hasSubItems: true,
    subItems: [
        {
        id: 701,
        label: "Post Announcements",
        direction: "announcements/post-announcements",
        icon: PostAnnouncement,
        hasSubItems: false,
        },
    ],
    },
    {
    id: 8,
    label: "Help",
    direction: "help",
    icon: Help,
    hasSubItems: false,
    },

];

const SideNavBar: React.FC = () => {
  const location = useLocation();
  const [activeAccordionItemId, setActiveAccordionItemId] = useState<number | null>(parseInt(localStorage.getItem("activeAccordionItem") || "", 10) || null);

  useEffect(() => {
    const setActiveItemBasedOnUrl = () => {
      navItems.forEach((item) => {
        if (item.hasSubItems && item.subItems) {
          item.subItems.forEach((subItem) => {
            if (location.pathname.includes(subItem.direction.toLowerCase())) {
              setActiveAccordionItemId(item.id);
            }
          });
        }
      });
    };

    setActiveItemBasedOnUrl();
  }, [location]);

  // const handleAccordionItemClick = (itemId: number, hasSubItems: boolean) => {
  //   if (hasSubItems) {
  //       setActiveAccordionItemId((prevActiveItemId) => {
  //         const newActiveItemId = prevActiveItemId === itemId ? null : itemId;
  //         localStorage.setItem("activeAccordionItem", newActiveItemId?.toString() || "");
  //         return newActiveItemId;
  //       });
  //     } else {
  //       setActiveAccordionItemId(null);
  //       localStorage.removeItem("activeAccordionItem");
  //     }
  // };


  const handleAccordionItemClick = (itemId: number, hasSubItems: boolean) => {
    if (hasSubItems) {
      setActiveAccordionItemId((prevActiveItemId) => {
        const newActiveItemId = prevActiveItemId === itemId ? null : itemId;
        localStorage.setItem("activeAccordionItem", newActiveItemId?.toString() || "");
        return newActiveItemId;
      });
    } else {
      setActiveAccordionItemId((prevActiveItemId) => {
        const currentItem = navItems.find((item) => item.id === prevActiveItemId);
        if (currentItem && currentItem.subItems && currentItem.subItems.some((subItem) => subItem.direction === itemId)) {
          return prevActiveItemId;
        }
        localStorage.removeItem("activeAccordionItem");
        return null;
      });
    }
  };
  
  const renderAccordionItems = (items: AccordionItem[], isSubItems = false) => {
    return (
        <ul>
            {items.map((item) => {
                // console.log(item, "meowww");
                return(
                <li key={item.id}>
                <div
                    className={`${styles.accordionItem} ${
                    isSubItems && location.pathname.includes(item.direction.toLowerCase()) ? styles.active : ""
                    }`}
                    onClick={() => handleAccordionItemClick(item.id, item.hasSubItems)}
                >
                    <Link to={`/dashboard/${item.direction.toLowerCase().replace(" ", "_")}`}>
                    {item.icon ? <item.icon className={styles.navItemIcon} /> : null}
                    {item.label}
                    </Link>
                </div>
                {item.hasSubItems && item.subItems && activeAccordionItemId === item.id
                    ? renderAccordionItems(item.subItems, true)
                    : null}
                </li>
            )}
            
            )}
        </ul>
    );
  };

  return <nav className={styles.sideNavBarWrap}>{renderAccordionItems(navItems)}</nav>;
};

export default SideNavBar;