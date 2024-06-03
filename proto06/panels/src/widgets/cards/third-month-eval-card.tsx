import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
} from "@material-tailwind/react";
import { GiftIcon } from "@heroicons/react/24/solid";
import Pagination from "@mui/material/Pagination";
import { AnniversaryDataProps } from "@/types/types-widgets";

interface AnniversaryCardProps {
  celebrants: AnniversaryDataProps[];
}

const UpcomingAnniversary: React.FC<AnniversaryCardProps> = ({ celebrants }) => {
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
      <CardHeader color="pink" className="text-white" floated={false}>
        <Typography variant="h6" className="p-4">Upcoming Work Anniversaries</Typography>
      </CardHeader>
      <CardBody >
        {paginatedCelebrants.map((celebrant) => (
          <div
            key={celebrant.id}
            className="flex items-center mb-4 space-x-4"
          >
            <GiftIcon className="w-6 h-6 text-blue-500" />
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
                Date Hired: {celebrant.dateHired} | Years: {celebrant.totalYears}
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
          // color={{backgroundColor:"pink"}}
        />
      </div>
    </Card>
  );
};

export default UpcomingAnniversary;