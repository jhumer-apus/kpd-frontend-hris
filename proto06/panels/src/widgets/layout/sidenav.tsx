import { Fragment, useEffect, useState, useCallback } from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Avatar,
  Button,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { useMaterialTailwindController, setOpenSidenav } from "@/context";
import { SideNavProps } from "@/types/index";
import styles from './custom-styles/sideNav.module.scss';
import CollapsibleSection from "./custom-effects/CollapsibleSection";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/configureStore";
import { UAViewFilterApproverAction, LEAVEViewFilterApproverAction, OVERTIMEViewFilterApproverAction, OBTViewFilterApproverAction } from "@/store/actions/procedurals";
import { LEAVEViewInterface, OBTViewInterface, OVERTIMEViewInterface, UAViewInterface } from "@/types/types-pages";
import JSXRouteWrapper from "@/routes";
import { KPICOREViewAction, OFFBOARDINGSTATUSViewAction, ONBOARDINGSTATUSViewAction } from "@/store/actions/employee-and-applicants";
import { INTERNAL_USER_ROLE } from "@/types/types-store";

export function Sidenav({ brandImg, brandName, routes }: SideNavProps) {
  const dispatchRedux = useDispatch();
  const currUserState = useSelector((state: RootState)=> state.auth.employee_detail);
  const proceduralState = useSelector((state: RootState)=> state.procedurals);
  const EAState = useSelector((state:RootState) => state.employeeAndApplicants)
  const { UAViewFilterApprover, LEAVEViewFilterApprover, OVERTIMEViewFilterApprover, OBTViewFilterApprover } = proceduralState;
  const currUserEmpNo = currUserState?.emp_no as number;
  const PendingKPICore = EAState.KPICOREView.data.length > 0 ? EAState?.KPICOREView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_no_approver === currUserEmpNo) : [];
  const PendingOffboarding = EAState.OFFBOARDINGSTATUSView.data.length > 0 ? EAState?.OFFBOARDINGSTATUSView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_offboard_reqs?.some((item) => item.offboarding_facilitator === currUserEmpNo)) : [];
  const PendingOnboarding = EAState.ONBOARDINGSTATUSView.data.length > 0 ? EAState?.ONBOARDINGSTATUSView?.data?.filter((item)=> item?.status ==='Pending' && item?.emp_onboard_reqs?.some((item) => item.onboarding_facilitator === currUserEmpNo)) : [];

  const proceduralActions = [
    UAViewFilterApproverAction,
    LEAVEViewFilterApproverAction,
    OVERTIMEViewFilterApproverAction,
    OBTViewFilterApproverAction,
  ];
  const employeeAndApplicantsActions = [
    OFFBOARDINGSTATUSViewAction,
    ONBOARDINGSTATUSViewAction,
    KPICOREViewAction,
  ]

  const dispatchActions = useCallback(() => {
    proceduralActions.forEach((action) => {
      const stringifiedAction = `${action}`
      const formattedString = stringifiedAction.replace(/Action$/, '')
      if (!proceduralState[formattedString]?.data) {
        dispatchRedux(action({ emp_no: currUserEmpNo }));
      }
    });
    employeeAndApplicantsActions.forEach((action) => {
      const stringifiedAction = `${action}`
      const formattedString = stringifiedAction.replace(/Action$/, '')
      if (!proceduralState[formattedString]?.data) {
        dispatchRedux(action());
      }
    });
  }, [currUserEmpNo]);

  useEffect(() => {
    // role === 1 is Employee only
    if(currUserState?.user?.role === INTERNAL_USER_ROLE.Employee || !currUserState){
      return
    }else {
      dispatchActions();
    }
  }, [dispatchActions]);
  
  const approvalNames = ['OBT Approvals', 'OT Approvals', 'LEAVE Approvals', 'UA Approvals', 'KPI Confirmations', 'Onboarding CF', 'Offboarding CF'];

  const arrayLengthChecker = (key: string) => {
    type objectChecker = {
      [key: string]: number;
    }
    const keyProcessor: objectChecker = {
      'OBT Approvals': (OBTViewFilterApprover?.data as OBTViewInterface[])?.length,
      'OT Approvals': (OVERTIMEViewFilterApprover?.data as OVERTIMEViewInterface[])?.length,
      'LEAVE Approvals': (LEAVEViewFilterApprover?.data as LEAVEViewInterface[])?.length,
      'UA Approvals': (UAViewFilterApprover?.data as UAViewInterface[])?.length,
      'KPI Confirmations': PendingKPICore.length,
      'Onboarding CF': PendingOnboarding.length,
      'Offboarding CF': PendingOffboarding.length,
      'Pending Checklists': ((OBTViewFilterApprover?.data as OBTViewInterface[])?.length + (OVERTIMEViewFilterApprover?.data as OVERTIMEViewInterface[])?.length + (LEAVEViewFilterApprover?.data as LEAVEViewInterface[])?.length + (UAViewFilterApprover?.data as UAViewInterface[])?.length + PendingKPICore.length + PendingOnboarding.length + PendingOffboarding.length),
      'default': 0
    };
    return keyProcessor[key] || keyProcessor['default']
  };

  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  const toggleExpandedItem = (itemId: number) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));
  };
  
  const [controller, dispatch] = useMaterialTailwindController();
  const { sidenavColor, sidenavType, openSidenav } = controller;
  const sidenavTypes: Record<string, string> = {
    dark: "bg-gradient-to-br from-blue-gray-800 to-blue-gray-900",
    white: "bg-white shadow-lg",
    transparent: "bg-transparent",
  };

  return (
    <aside
      className={`${sidenavTypes[sidenavType]} ${
        openSidenav ? "translate-x-0" : "-translate-x-80"
      } fixed inset-0 z-50 my-4 ml-4 h-[calc(100vh-32px)] w-72 rounded-xl transition-transform duration-300 xl:translate-x-0 overflow-y-scroll`}
    >
      <div
        className={`relative border-b ${
          sidenavType === "dark" ? "border-white/20" : "border-blue-gray-50"
        }`}
      >
        <Link to="/" className="flex items-center gap-4 py-6 px-8">
          <Avatar src={brandImg} size="sm" />
          <Typography
            variant="h6"
            color={sidenavType === "dark" ? "white" : "blue-gray"}
          >
            {brandName}
          </Typography>
        </Link>
        <IconButton
          variant="text"
          color="white"
          size="sm"
          ripple={false}
          className="absolute right-0 top-0 grid rounded-br-none rounded-tl-none xl:hidden"
          onClick={() => setOpenSidenav(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5 text-white" />
        </IconButton>
      </div>
      <div className={styles.sideNavItemsWrap} style={{margin: '1rem'}}data-name="list">
        {JSXRouteWrapper().routes.map(({ layout, title, pages }, key) => 
        {
          if (layout === "auth") return null;
          return(
          <ul key={key} className="mb-4 flex flex-col gap-1">
            {title && (
              <li className="mx-3.5 mt-4 mb-2">
                <Typography
                  variant="small"
                  color={sidenavType === "dark" ? "white" : "blue-gray"}
                  className="font-black uppercase opacity-75"
                  key={`${key}_li_sidenav`}
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ id, icon, name, path, hasSubItems, subItems }) => 
            { if(hasSubItems){
              return(
                <Fragment>
                    <li key={name}>
                        <CollapsibleSection
                          header={
                            <Button
                              variant={ "gradient" }
                              color={
                                // isActive
                                //   ? 
                                //   sidenavColor
                                //   : 
                                  sidenavType === "dark"
                                  ? "indigo"
                                  : "blue-gray"
                              }
                              className="flex items-center gap-4 px-4 capitalize"
                              fullWidth
                            >
                              {icon}
                              <Typography
                                color="inherit"
                                className="font-medium capitalize flex justify-between w-full"
                              >
                                <p className="flex justify-center items-center">{name}</p>
                                {name === 'Pending Checklists' && ( arrayLengthChecker(name) > 0 ) && <p 
                                  className="flex justify-center items-center" 
                                  style={{
                                    fontSize: '12px',
                                    height: '30px', 
                                    width: '30px', 
                                    // background: '#4E62B8',
                                    background: 'rgb(98 0 255)',
                                    // mixBlendMode: 'difference', 
                                    borderRadius: '30px', 
                                    textAlign: 'center',
                                    }}
                                >
                                  {arrayLengthChecker(name)}
                                </p>}
                              </Typography>
                            </Button>
                          }
                        >
                            {
                            subItems?.map(({ icon, name, path, badgeAccessor }) => 
                            (
                              <NavLink to={`/${layout}${path}`} className={styles.toggleableItem} data-link={path}>
                              {({ isActive }) => (
                                <li key={name} >
                                  <Button
                                    variant={isActive ? "gradient" : "text"}
                                    color={
                                      isActive
                                        ? sidenavColor
                                        : sidenavType === "dark"
                                        ? "white"
                                        : "blue-gray"
                                    }
                                    className="flex items-center gap-4 px-4 capitalize"
                                    fullWidth
                                    button-toggle="toggleable"
                                  >
                                    {icon}
                                    <Typography
                                      color="inherit"
                                      className="font-medium capitalize text-start flex justify-between"
                                      style={{width: '100%'}}
                                    >
                                      <p className="flex justify-center items-center">{name}</p> 
                                      {approvalNames.includes(name) && arrayLengthChecker(name) !== 0 && 
                                      <p 
                                        className="flex justify-center items-center" 
                                        style={{
                                          fontSize: '12px',
                                          height: '30px', 
                                          width: '30px', 
                                          // background: '#4E62B8',
                                          background: '#7509eb',
                                          mixBlendMode: 'difference', 
                                          borderRadius: '30px', 
                                          textAlign: 'center',
                                          }}
                                      >
                                        {
                                        arrayLengthChecker(name) 
                                        }
                                        {/* #7509eb green and purple*/}
                                      </p>
                                      }
                                    </Typography>
                                </Button>
                              </li>
                            )}
                            </NavLink>
                          ))
                        }
                        </CollapsibleSection>
                    </li>
                  {/* )}
                  </NavLink> */}
              </Fragment>
              )
          } else {
            return(
              <li key={name}>
                <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <>
                      <Button
                        variant={isActive ? "gradient" : "text"}
                        color={
                          isActive
                            ? sidenavColor
                            : sidenavType === "dark"
                            ? "white"
                            : "blue-gray"
                        }
                        className="flex items-center gap-4 px-4 capitalize"
                        fullWidth
                      >
                        {icon}
                        <Typography
                          color="inherit"
                          className="font-medium capitalize"
                        >
                          {name}
                        </Typography>
                      </Button>
                    </>
                  )}
                </NavLink>
              </li>
              )
          }
        }
            )}
          </ul>
          )
        }
        )}
      </div>
    </aside>
  );
}

Sidenav.defaultProps = {
  brandImg: "/img/logo-ct.png",
  brandName: "Bit HR",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.tsx";

export default Sidenav;
