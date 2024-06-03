import { chartsConfig, chartsConfigInterface, chartsConfigXAxis, chartsConfigYAxis } from "@/configs";

export interface websiteViewsChartInterface {
  type: string,
  height: number,
  series: [
    {
      name: string,
      data: number[],
    },
  ],
  options: chartsConfigInterface & {
    colors: string,
    plotOptions: {
      bar: {
        columnWidth: string,
        borderRadius: number,
      },
    },
    xaxis: chartsConfigXAxis & {
      categories: string[],
    }
  }
}

const websiteViewsChart = {
  type: "bar",
  height: 220,
  series: [
    {
      name: "Percentage",
      data: [85, 60, 80, 85, 81, 75, 95, 68, 85],
    },
  ],
  options: {
    ...chartsConfig,
    colors: "#fff",
    plotOptions: {
      bar: {
        columnWidth: "16%",
        borderRadius: 5,
      },
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};

const dailySalesChart = {
  type: "line",
  height: 220,
  series: [
    {
      name: "KPI Eval Score",
      data: [66, 75, 80, 95, 68, 88, 80, 60, 85],
    },
  ],
  options: {
    ...chartsConfig,
    colors: ["#fff"],
    stroke: {
      lineCap: "round",
    },
    markers: {
      size: 5,
    },
    xaxis: {
      ...chartsConfig.xaxis,
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
  },
};

const completedTasksChart = {
  ...dailySalesChart,
  series: [
    {
      name: "Core Score",
      data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
    },
  ],
};



export const statisticsChartsData = [
  {
    color: "blue",
    title: "Final Rating Status Trend: Year 2023",
    description: "Computed Rating Percentage Rating Chart",
    footer: " 'A' - 91% Above, 'B' - 80%-90%, 'C' - 79% Below ",
    chart: websiteViewsChart,
    link: '-',
    // link: 'development',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "pink",
    title: "KPI Evaluation Score Trend: Year 2023",
    description: "Line Chart Report of Monthly KPI Score",
    footer: "Employee Name: Matthew Blasco",
    chart: dailySalesChart,
    link: '-',
    // link: 'development',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "green",
    title: "Core Competencies Score Trend: Year 2023",
    description: "Line Chart Report of Monthly CC Score",
    footer: "Employee Name: Matthew Blasco",
    chart: completedTasksChart,
    link: '-',
    // link: 'development',
    customTop: 30,
    customLeft: 40,
  },
];

export default statisticsChartsData;




const statisticsChartsDataFullView = [
  {
    color: "blue",
    title: "Final Rating Status Trend: Year 2023",
    description: "Computed Rating Percentage Rating Chart",
    footer: " 'A' - 91% Above, 'B' - 80%-90%, 'C' - 79% Below ",
    chart: {
      type: "bar",
      height: 220,
      series: [
        {
          name: "Percentage",
          data: [85, 60, 80, 85, 81, 75, 95, 68, 85],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        grid: {
          show: true,
          borderColor: "#ffffff40",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
        colors: "#fff",
        plotOptions: {
          bar: {
            columnWidth: "16%",
            borderRadius: 5,
          },
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
        },
      },
    },
    link: '-',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "pink",
    title: "KPI Evaluation Score Trend: Year 2023",
    description: "Line Chart Report of Monthly KPI Score",
    footer: "Employee Name: Matthew Blasco",
    chart: {
      type: "line",
      height: 220,
      series: [
        {
          name: "KPI Eval Score",
          data: [66, 75, 80, 95, 68, 88, 80, 60, 85],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#ffffff40",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
        colors: ["#fff"],
        stroke: {
          lineCap: "round",
        },
        markers: {
          size: 5,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
      },
    },
    link: '-',
    customTop: 30,
    customLeft: 40,
  },
  {
    color: "green",
    title: "Core Competencies Score Trend: Year 2023",
    description: "Line Chart Report of Monthly CC Score",
    footer: "Employee Name: Matthew Blasco",
    chart: {
      type: "line",
      height: 220,
      series: [
        {
          name: "Core Score",
          data: [50, 40, 300, 220, 500, 250, 400, 230, 500],
        },
      ],
      options: {
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          show: "",
        },
        dataLabels: {
          enabled: false,
        },
        yaxis: {
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
        },
        grid: {
          show: true,
          borderColor: "#ffffff40",
          strokeDashArray: 5,
          xaxis: {
            lines: {
              show: true,
            },
          },
          padding: {
            top: 5,
            right: 20,
          },
        },
        fill: {
          opacity: 0.8,
        },
        tooltip: {
          theme: "dark",
        },
        colors: ["#fff"],
        stroke: {
          lineCap: "round",
        },
        markers: {
          size: 5,
        },
        xaxis: {
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          labels: {
            style: {
              colors: "#fff",
              fontSize: "13px",
              fontFamily: "inherit",
              fontWeight: 300,
            },
          },
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
      },
    },
    link: '-',
    customTop: 30,
    customLeft: 40,
  },
];