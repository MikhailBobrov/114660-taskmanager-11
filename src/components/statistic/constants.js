export const COLORS_HEX = {
  black: `#000000`,
  yellow: `#ffe125`,
  blue: `#0c5cdd`,
  green: `#31b55c`,
  pink: `#ff3cb9`,
};

export const PIE_CHART_OPTIONS = {
  plugins: {
    datalabels: {
      display: false
    }
  },
  tooltips: {
    callbacks: {
      label: (tooltipItem, data) => {
        const allData = data.datasets[tooltipItem.datasetIndex].data;
        const tooltipData = allData[tooltipItem.index];
        const total = allData.reduce((acc, it) => acc + parseFloat(it));
        const tooltipPercentage = Math.round((tooltipData / total) * 100);
        return `${tooltipData} TASKS — ${tooltipPercentage}%`;
      }
    },
    displayColors: false,
    backgroundColor: `#ffffff`,
    bodyFontColor: `#000000`,
    borderColor: `#000000`,
    borderWidth: 1,
    cornerRadius: 0,
    xPadding: 15,
    yPadding: 15
  },
  title: {
    display: true,
    text: `DONE BY: COLORS`,
    fontSize: 16,
    fontColor: `#000000`
  },
  legend: {
    position: `left`,
    labels: {
      boxWidth: 15,
      padding: 25,
      fontStyle: 500,
      fontColor: `#000000`,
      fontSize: 13
    }
  }
};

export const LINE_CHART_OPTIONS = {
  plugins: {
    datalabels: {
      font: {
        size: 8
      },
      color: `#ffffff`
    }
  },
  scales: {
    yAxes: [{
      ticks: {
        beginAtZero: true,
        display: false
      },
      gridLines: {
        display: false,
        drawBorder: false
      }
    }],
    xAxes: [{
      ticks: {
        fontStyle: `bold`,
        fontColor: `#000000`
      },
      gridLines: {
        display: false,
        drawBorder: false
      }
    }]
  },
  legend: {
    display: false
  },
  layout: {
    padding: {
      top: 10
    }
  },
  tooltips: {
    enabled: false
  }
};
