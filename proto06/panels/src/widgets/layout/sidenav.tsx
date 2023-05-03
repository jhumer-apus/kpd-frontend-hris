import { Fragment, useState } from "react";
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

export function Sidenav({ brandImg, brandName, routes }: SideNavProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>({});
  // console.log(expandedItems, "maaaw")
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
        {routes.map(({ layout, title, pages }, key) => 
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
                >
                  {title}
                </Typography>
              </li>
            )}
            {pages.map(({ id, icon, name, path, hasSubItems, subItems }) => 
            { if(hasSubItems){
              return(
                <Fragment>
                  <NavLink to={`/${layout}${path}`}>
                  {({ isActive }) => (
                    <li key={name}>
                      <CollapsibleSection
                        header={
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
                        }
                    >
                          {
                          subItems?.map(({ icon, name, path }) => (
                            <NavLink to={`/${layout}${path}`} className={styles.toggleableItem}>
                            {({ isActive }) => (
                              <li key={name} className="ml-4">
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
                                    className="font-medium capitalize text-start"
                                  >
                                    {name}
                                    </Typography>
                              </Button>
                            </li>
                          )}
                          </NavLink>
                        ))
                      }
                      </CollapsibleSection>
                  </li>
                )}
                </NavLink>
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
  brandName: "Silicon Valley Corp",
};

Sidenav.propTypes = {
  brandImg: PropTypes.string,
  brandName: PropTypes.string,
  routes: PropTypes.arrayOf(PropTypes.object).isRequired,
};

Sidenav.displayName = "/src/widgets/layout/sidnave.tsx";

export default Sidenav;
