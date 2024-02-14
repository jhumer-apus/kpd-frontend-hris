
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  CheckIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import {
  projectsTableData,

} from "@/data";
import { CSSProperties } from "react";


export const UnderDevelopmentMsg = (props: {left?: number, top?: number, fontSize?: number, borderRadius?: number}) => {
    const UnderDevelopmentTag: CSSProperties = {
        content: '',
        fontSize: `${props.fontSize? props.fontSize: 25}px`,
        color: '#fff',
        fontWeight: 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',
        width: '100%',
        position: 'absolute',
        top: 0,
        left: 0,
        background: 'rgba(0,0,0,0.5)',
        zIndex: 20,
        borderRadius: `${props.borderRadius ? props.borderRadius : 16}px`,
    }
    // return(
    //     <div style={UnderDevelopmentTag}>
    //         <p>LOCKED</p>
    //     </div>
    // )
};


function ProjectsCard() {
    return (
        <Card className="overflow-hidden xl:col-span-2 relative">
            <UnderDevelopmentMsg/>
            <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 flex items-center justify-between p-6"
            >
            <div>
                <Typography variant="h6" color="blue-gray" className="mb-1">
                Projects
                </Typography>
                <Typography
                variant="small"
                className="flex items-center gap-1 font-normal text-blue-gray-600"
                >
                <CheckIcon strokeWidth={3} className="h-4 w-4 text-blue-500" />
                <strong>30 done</strong> this month
                </Typography>
            </div>
            <Menu placement="left-start">
                <MenuHandler>
                <IconButton size="sm" variant="text" color="blue-gray">
                    <EllipsisVerticalIcon
                    strokeWidth={3}
                    fill="currenColor"
                    className="h-6 w-6"
                    />
                </IconButton>
                </MenuHandler>
                <MenuList>
                <MenuItem>Action</MenuItem>
                <MenuItem>Another Action</MenuItem>
                <MenuItem>Something else here</MenuItem>
                </MenuList>
            </Menu>
            </CardHeader>
            <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
                <thead>
                <tr>
                    {["companies", "members", "budget", "completion"].map(
                    (el) => (
                        <th
                        key={el}
                        className="border-b border-blue-gray-50 py-3 px-6 text-left"
                        >
                        <Typography
                            variant="small"
                            className="text-[11px] font-medium uppercase text-blue-gray-400"
                        >
                            {el}
                        </Typography>
                        </th>
                    )
                    )}
                </tr>
                </thead>
                <tbody>
                {projectsTableData.map(
                    ({ img, name, members, budget, completion }, key) => {
                    const className = `py-3 px-5 ${
                        key === projectsTableData.length - 1
                        ? ""
                        : "border-b border-blue-gray-50"
                    }`;

                    return (
                        <tr key={name}>
                        <td className={className}>
                            <div className="flex items-center gap-4">
                            <Avatar src={img} alt={name} size="sm" />
                            <Typography
                                variant="small"
                                color="blue-gray"
                                className="font-bold"
                            >
                                {name}
                            </Typography>
                            </div>
                        </td>
                        <td className={className}>
                            {members.map(({ img, name }, key) => (
                            <Tooltip key={name} content={name}>
                                <Avatar
                                src={img}
                                alt={name}
                                size="xs"
                                variant="circular"
                                className={`cursor-pointer border-2 border-white ${
                                    key === 0 ? "" : "-ml-2.5"
                                }`}
                                />
                            </Tooltip>
                            ))}
                        </td>
                        <td className={className}>
                            <Typography
                            variant="small"
                            className="text-xs font-medium text-blue-gray-600"
                            >
                            {budget}
                            </Typography>
                        </td>
                        <td className={className}>
                            <div className="w-10/12">
                            <Typography
                                variant="small"
                                className="mb-1 block text-xs font-medium text-blue-gray-600"
                            >
                                {completion}%
                            </Typography>
                            <Progress
                                value={completion}
                                variant="gradient"
                                color={completion === 100 ? "green" : "blue"}
                                className="h-1"
                            />
                            </div>
                        </td>
                        </tr>
                    );
                    }
                )}
                </tbody>
            </table>
            </CardBody>
        </Card>
    );
}

export default ProjectsCard;