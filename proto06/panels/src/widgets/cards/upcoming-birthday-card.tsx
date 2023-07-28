import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { CakeIcon } from "@heroicons/react/24/solid";
import Pagination from "@mui/material/Pagination";
import { CelebrantsDataProps } from "@/types/types-widgets";
import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";

interface BirthdayCardProps {
  celebrants: CelebrantsDataProps[];
}

const BirthdayCard: React.FC<BirthdayCardProps> = ({ celebrants }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  const pageCount = Math.ceil(celebrants.length / itemsPerPage);

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  const paginatedCelebrants = celebrants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <Card className="justify-between">
      <UnderDevelopmentMsg/>
      <CardHeader color="blue" className="text-white" floated={false}>
        <Typography variant="h6" className="p-4">Upcoming Birthdays</Typography>
      </CardHeader>
      <CardBody >
        {paginatedCelebrants.map((celebrant) => (
          <div
            key={celebrant.id}
            className="flex items-center mb-4 space-x-4"
          >
            <CakeIcon className="w-6 h-6 text-blue-500" />
            <Avatar
              className="bg-gradient-to-r from-blue-500 to-indigo-500"
              size="sm"
              src={celebrant.profilePic}
            >
            </Avatar>
            <div>
              <Typography variant="body2" className="font-semibold">
                {celebrant.name}
              </Typography>
              <Typography variant="small" className="text-gray-500">
                In {celebrant.daysToBirthday} days - Dept: {celebrant.department}
              </Typography>
            </div>
          </div>
        ))}
      </CardBody>
      <div className="px-4 py-3">
        <Pagination
          count={pageCount}
          page={currentPage}
          onChange={handleChangePage}
          color="primary"
        />
      </div>
    </Card>
  );
};

export default BirthdayCard;