


export interface chartsConfigXAxis {
    axisTicks: {
      show: boolean,
    },
    axisBorder: {
      show: boolean,
    },
    labels: {
      style: {
        colors: string,
        fontSize: string,
        fontFamily: string,
        fontWeight: number,
      },
    },
}

export interface chartsConfigYAxis {
  labels: {
    style: {
      colors: string,
      fontSize: string,
      fontFamily: string,
      fontWeight: number,
    },
  },
}


export interface chartsConfigInterface {
  chart: {
    toolbar: {
      show: boolean,
    },
  },
  title: {
    show: string,
  },
  dataLabels: {
    enabled: boolean,
  },
  xaxis: chartsConfigXAxis,
  yaxis: chartsConfigYAxis,
  grid: {
    show: boolean,
    borderColor: string,
    strokeDashArray: number,
    xaxis: {
      lines: {
        show: boolean,
      },
    },
    padding: {
      top: number,
      right: number,
    },
  },
  fill: {
    opacity: number,
  },
  tooltip: {
    theme: string,
  },
}


export const chartsConfig: chartsConfigInterface = {
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
};

export default chartsConfig;
