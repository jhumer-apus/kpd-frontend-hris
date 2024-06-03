import React from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  Button,
  IconButton,
  Switch,
  Typography,
  Chip,
} from "@material-tailwind/react";
import {
  useMaterialTailwindController,
  setOpenConfigurator,
  setSidenavColor,
  setSidenavType,
  setFixedNavbar,
} from "@/context";

export function Configurator() {
  const [controller, dispatch] = useMaterialTailwindController();
  const { openConfigurator, sidenavColor, sidenavType, fixedNavbar } =
    controller;
  const [stars, setStars] = React.useState(1);

  const sidenavColors: Record<string, string> = {
    blue: "from-blue-400 to-blue-600",
    "blue-gray": "from-blue-gray-800 to-blue-gray-900",
    green: "from-green-400 to-green-600",
    orange: "from-orange-400 to-orange-600",
    red: "from-red-400 to-red-600",
    pink: "from-pink-400 to-pink-600",
  };
  
  return (
    <aside
      className={`fixed top-0 right-0 z-50 h-screen w-96 bg-white px-2.5 shadow-lg transition-transform duration-300 ${
        openConfigurator ? "translate-x-0" : "translate-x-96"
      }`}
      style={{display: 'none'}}
    >
      <div className="flex items-start justify-between px-6 pt-8 pb-6">
        <div>
          <Typography variant="h5" color="blue-gray">
            Dashboard Configurator
          </Typography>
          <Typography className="font-normal text-blue-gray-600">
            See our dashboard options.
          </Typography>
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          onClick={() => setOpenConfigurator(dispatch, false)}
        >
          <XMarkIcon strokeWidth={2.5} className="h-5 w-5" />
        </IconButton>
      </div>
      <div className="py-4 px-6">
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Colors
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            {Object.keys(sidenavColors).map((color) => (
              <span
                key={color}
                className={`h-6 w-6 cursor-pointer rounded-full border bg-gradient-to-br transition-transform hover:scale-105 ${
                  sidenavColors[color]
                } ${
                  sidenavColor === color ? "border-black" : "border-transparent"
                }`}
                onClick={() => setSidenavColor(dispatch, color)}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <Typography variant="h6" color="blue-gray">
            Sidenav Types
          </Typography>
          <Typography variant="small" color="gray">
            Choose between 3 different sidenav types.
          </Typography>
          <div className="mt-3 flex items-center gap-2">
            <Button
              variant={sidenavType === "dark" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "dark")}
            >
              Dark
            </Button>
            <Button
              variant={sidenavType === "transparent" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "transparent")}
            >
              Transparent
            </Button>
            <Button
              variant={sidenavType === "white" ? "gradient" : "outlined"}
              onClick={() => setSidenavType(dispatch, "white")}
            >
              White
            </Button>
          </div>
        </div>
        <div className="mb-12">
          <hr />
          <div className="flex items-center justify-between py-5">
            <Typography variant="h6" color="blue-gray">
              Navbar Fixed
            </Typography>
            <Switch
              id="navbar-fixed"
              value={fixedNavbar}
              onChange={() => setFixedNavbar(dispatch, !fixedNavbar)}
            />
          </div>
          <hr />
          <div className="my-8 flex flex-col gap-4">
            <a
              href="https://site.bitverseph.com/contact-us"
              target="_black"
            >
              <Button variant="gradient" fullWidth>
                Contact Us
              </Button>
            </a>
          </div>
        </div>
        <div className="text-center">
          <Typography variant="h6" color="blue-gray">
            Follow us on Github
          </Typography>
          <div className="mt-4 flex justify-center gap-6 flex-wrap">
            <a
              className="mx-auto flex items-center justify-center gap-2"
              href="https://github.com/mattttyyyy/"
              target="_blank"
              rel="noreferrer"
            >
            <Button
              variant="outlined"
              color="blue-gray"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-github text-black" />
              Frontend
            </Button>
            </a>
            <a
              className="mx-auto flex items-center justify-center gap-2"
              href="https://github.com/mercovsk/"
              target="_blank"
              rel="noreferrer"
            >
            <Button
              variant="gradient"
              color="blue-gray"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-github text-white" />
              Backend
            </Button>
            </a>
            <a
              className="mx-auto flex items-center justify-center gap-2"
              href="https://github.com/ProfTonio/"
              target="_blank"
              rel="noreferrer"
            >
            <Button
              variant="text"
              color="blue-gray"
              className="flex items-center gap-2"
            >
              <i className="fa-brands fa-github text-gray" />
              Proj Manager
            </Button>
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}

Configurator.displayName = "/src/widgets/layout/configurator.tsx";

export default Configurator;
