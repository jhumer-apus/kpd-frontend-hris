import React from "react";
import { Typography } from "@material-tailwind/react";
import { EasyAccessCard } from "@/widgets/cards";
import { statisticsCardsData } from "@/data";
import BirthdayCard from "@/widgets/cards/upcoming-birthday-card";
import { celebrantsData, anniversaryData } from "@/data/widgets-data";
import UpcomingAnniversary from "@/widgets/cards/upcoming-anniversary-card";
import ProjectsCard from "./local-components/projects-card";
import OrdersOverviewData from "./local-components/orders-overview-card";

export function HRISDashboard() {
  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, link, footer, ...rest }) => (
          <EasyAccessCard
            key={title}
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

        ))}

      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ProjectsCard/>
        <OrdersOverviewData/>
        <BirthdayCard celebrants={celebrantsData} />
        <UpcomingAnniversary celebrants={anniversaryData}/>
      </div>
    </div>
  );
}

export default HRISDashboard;
