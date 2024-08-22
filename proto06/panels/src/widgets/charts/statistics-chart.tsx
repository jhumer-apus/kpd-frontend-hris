import { UnderDevelopmentMsg } from "@/pages/dashboard/hris-portal/local-components/projects-card";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { color } from "@material-tailwind/react/types/components/alert";
import PropTypes from "prop-types";
import Chart from "react-apexcharts";
import { useNavigate } from "react-router-dom";

interface StatisticsChartInterface {
  color: color
  chart: any
  title: any
  description: any
  footer: any
  link: any
}



export function StatisticsChart({ color, chart, title, description, footer, link }: StatisticsChartInterface) {
  const navigate = useNavigate();
  return (
    <Card style={{cursor: link !== 'development' ? 'pointer' : ''}}>
      {
      link === 'development' 
      ? 
      <UnderDevelopmentMsg fontSize={12}/> 
      :
      <div className="absolute w-full h-full" onClick={()=> { navigate(`${link}`) }}></div>
      }
      <CardHeader variant="gradient" color={color}>
        <Chart
        {...chart} 
        type={chart.type}
        series={[{
          name: `${chart.series[0].name}`,
          data: chart.series[0].data
        }]}
        
        />
      </CardHeader>
      <CardBody className="p-6">
        <Typography variant="h6" color="blue-gray">
          {title}
        </Typography>
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {description}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 px-6 py-5">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsChart.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsChart.propTypes = {
  color: PropTypes.oneOf([
    "white",
    "blue-gray",
    "gray",
    "brown",
    "deep-orange",
    "orange",
    "amber",
    "yellow",
    "lime",
    "light-green",
    "green",
    "teal",
    "cyan",
    "light-blue",
    "blue",
    "indigo",
    "deep-purple",
    "purple",
    "pink",
    "red",
  ]),
  chart: PropTypes.object.isRequired,
  title: PropTypes.node.isRequired,
  description: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsChart.displayName = "/src/widgets/charts/statistics-chart.tsx";

export default StatisticsChart;
