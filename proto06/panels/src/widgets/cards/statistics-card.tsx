import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import PropTypes from "prop-types";
import styles from './custom-styles/StatisticsCard.module.scss'; // Custom-Styles is created when Tailwind fails to work. 当Tailwind无法工作时，就会创建自定义样式
import { EasyAccessCardProps } from "@/types/types-widgets";
// import './custom-styles/StatisticsCard.css'

export function StatisticsCard({ color, icon, title, value, footer }: EasyAccessCardProps) {
  return (
    <Card className={styles.cardWrap}>
      <CardHeader
        variant="gradient"
        // color={color}
        className="absolute -mt-4 grid h-16 w-16 place-items-center"
        style={{background: "linear-gradient(87deg, #5e72e4 0, #825ee4 100%)"}}
        data-name={'iconwrap'}
      >
        <span className={styles.cardIcon}>{icon}</span>
      </CardHeader>
      <CardBody className="p-4 text-right">
        <Typography variant="small" className="font-normal text-blue-gray-600">
          {title}
        </Typography>
        <Typography variant="h4" color="blue-gray">
          {value}
        </Typography>
      </CardBody>
      {footer && (
        <CardFooter className="border-t border-blue-gray-50 p-4">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
}

StatisticsCard.defaultProps = {
  color: "blue",
  footer: null,
};

StatisticsCard.propTypes = {
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
  icon: PropTypes.node.isRequired,
  title: PropTypes.node.isRequired,
  value: PropTypes.node.isRequired,
  footer: PropTypes.node,
};

StatisticsCard.displayName = "/src/widgets/cards/statistics-card.tsx";

export default StatisticsCard;
