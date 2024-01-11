import React from "react";
import { Typography } from "@material-tailwind/react";
import { EasyAccessCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";
import BirthdayCard from "@/widgets/cards/upcoming-birthday-card";
import { celebrantsData, anniversaryData } from "@/data/widgets-data";
import UpcomingAnniversary from "@/widgets/cards/upcoming-anniversary-card";
import ProjectsCard from "./local-components/projects-card";
import OrdersOverviewData from "./local-components/orders-overview-card";
import { DivAnimate } from "../admin-portal/adminPortal";

export function HRISDashboard() {
  const [isVisible, setIsVisible] = React.useState<DivAnimate>({});

  const handleOnClick = (key: string) => {
    const thisKey = key;
    setIsVisible((prevState)=>{
      return{
        ...prevState,
        [thisKey]: true
      }
    });
  };

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, link, value, footer, ...rest }, index) => (
          <div style={{
            transition: 'transform 0.5s ease, opacity 0.5s ease',
            transform: !isVisible[`${value}${index}`] ? 'translateY(0)' : 'translateY(-100%)',
            opacity: !isVisible[`${value}${index}`] ? 1 : 0,
          }} data-type={index}>
          <EasyAccessCard
            onClickHandler={handleOnClick}
            onClickDetails={`${value}${index}`}
            key={title}
            value={value}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
            link={link}
          />
          </div>
        ))}

      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* <ProjectsCard/> */}
        {/* <OrdersOverviewData/> */}
        {/* <BirthdayCard celebrants={celebrantsData} /> */}
        {/* <UpcomingAnniversary celebrants={anniversaryData}/> */}
      </div>
    </div>
  );
}

export default HRISDashboard;
