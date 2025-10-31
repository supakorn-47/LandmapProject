import React, { useState, useEffect } from "react";
import { Chart } from "primereact/chart";

import Highcharts from "highcharts/highstock";
import HighchartsReact from "highcharts-react-official";
import { formatDateTH } from "../../../utils/DateUtil";
// const  series=[
//   {
//     "feature": "ที่ดินของฉัน",
//     "clicks": 124
//   },
//   {
//     "feature": "ค้นหาที่ดินของฉัน",
//     "clicks": 87
//   },
//   {
//     "feature": "ข่าวสาร",
//     "clicks": 45
//   },
//   {
//     "feature": "แบบความพึงพอใจ",
//     "clicks": 20
//   },
//   {
//     "feature": "ดูรายละเอียดที่ดิน",
//     "clicks": 152
//   }
// ]

export const Dashboard = (props) => {
  const [lineOptions, setLineOptions] = useState({});
  const [stackedOptions, setStackedOptions] = useState({});
  const [pieData, setPieData] = useState([]);
  const [graph, setGraph] = useState({ title: { text: "" } });

  //  useEffect(() => {
  //     // onLMS05GetDataList();

  //     //format comma
  //     Highcharts.setOptions({
  //         lang: { thousandsSep: ',' },
  //     })
  // }, []);

  //    const categories = seriesData.map(item => item.feature);
  // const data = seriesData.map(item => item.clicks);
  // useEffect(() => {

  //     //Line
  //     setLineOptions({
  //         maintainAspectRatio: false,
  //         aspectRatio: .6,
  //         plugins: {
  //             legend: {
  //                 labels: {
  //                     color: '#495057'
  //                 }
  //             }
  //         },
  //         scales: {
  //             x: {
  //                 ticks: {
  //                     color: '#495057'
  //                 },
  //                 grid: {
  //                     color: '#ebedef'
  //                 }
  //             },
  //             y: {
  //                 ticks: {
  //                     color: '#495057'
  //                 },
  //                 grid: {
  //                     color: '#ebedef'
  //                 }
  //             }
  //         }
  //     });

  //     //Stacked
  //     setStackedOptions({
  //         tooltips: {
  //             mode: 'index',
  //             intersect: false
  //         },
  //         responsive: true,
  //         scales: {
  //             xAxes: [{
  //                 stacked: true,
  //                 ticks: {
  //                     fontColor: '#495057'
  //                 },
  //                 gridLines: {
  //                     color: '#ebedef'
  //                 }
  //             }],
  //             yAxes: [{
  //                 stacked: true,
  //                 ticks: {
  //                     fontColor: '#495057'
  //                 },
  //                 gridLines: {
  //                     color: '#ebedef'
  //                 }
  //             }]
  //         },
  //         legend: {
  //             labels: {
  //                 fontColor: '#495057'
  //             }
  //         }
  //     });

  // }, [])

  useEffect(() => {
    const dates = [
      new Date("2025-07-02"),
      new Date("2025-07-09"),
      new Date("2025-07-16"),
      new Date("2025-07-23"),
      new Date("2025-07-27"),
    ];
    const rawSeries = [
      {
        name: "ที่ดินของฉัน",
        data: [4200, 5100, 4900, 5300, 5000],
      },
      {
        name: "ค้นหาที่ดินของฉัน",
        data: [3800, 4000, 4100, 4200, 3900],
      },
      {
        name: "ดูรายละเอียดที่ดิน",
        data: [2200, 2500, 2300, 2600, 2400],
      },
      {
        name: "ข่าวสาร",
        data: [700, 1200, 900, 1500, 1300],
      },
      {
        name: "แบบความพึงพอใจ",
        data: [100, 200, 150, 180, 120],
      },
    ];

    const series = rawSeries.map((item) => ({
      name: item.name,
      data: item.data.map((value, index) => [dates[index].getTime(), value]),
    }));

    // Set thousands separator
    Highcharts.setOptions({
      lang: { thousandsSep: "," },
    });

    // สร้างข้อมูลสำหรับ Highcharts
    // const categories = seriesData.map((item) => item.feature);
    // const data = seriesData.map((item) => item.clicks);

    setGraph({
      chart: {
        type: "area",
      },
      //   categories: series.map((item) => item.feature),
      colors: ["#FF69B4", "#ff5722", "#ffeb3b", "#8bc34a", "#29b6f6"],
      title: {
        text: "กราฟแสดงปริมาณการใช้งานของ API",
      },
      subtitle: {
        text:
          "วันที่ " +
          formatDateTH(new Date("2025/7/2")) +
          " - " +
          formatDateTH(new Date("2025/7/27")),
      },
      xAxis: {
        type: "datetime",
        title: { text: "วันที่" },
        labels: { format: "{value:%d %b}" },
      },
      yAxis: {
        title: {
          text: "จำนวนการใช้งาน (ครั้ง)",
        },
      },
      tooltip: {
        shared: true,
        crosshairs: true,
      },
      series: series,
      credits: {
        enabled: false,
      },
    });
  }, []);

  const renderLine = () => {
    return (
      <>
        <Chart
          type="line"
          data={props.graphData.chart_series}
          options={lineOptions}
        />
      </>
    );
  };

  // const renderStacked = () => {
  //     return (
  //         <>
  //             <Chart type="bar" data={props.graphData.bar_series} options={stackedOptions} />
  //         </>
  //     )
  // }

  // const optionsBar = {
  //     chart: {
  //         type: 'column'
  //     },
  //     title: {
  //         text: '',
  //         align: 'left'
  //     },
  //     xAxis: {
  //         categories: props.graphData.categories
  //     },
  //     yAxis: {
  //         min: 0,
  //         title: {
  //             text: 'การเข้าใช้งาน'
  //         },
  //         stackLabels: {
  //             enabled: true,
  //             style: {
  //                 fontWeight: '',
  //                 color: ( // theme
  //                     Highcharts.defaultOptions.title.style &&
  //                     Highcharts.defaultOptions.title.style.color
  //                 ) || 'gray',
  //                 textOutline: 'none'
  //             }
  //         }
  //     },
  //     legend: {
  //         align: 'center',
  //         x: 0,
  //         verticalAlign: 'bottom',
  //         y: 0,
  //         // floating: true,
  //         backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || 'white',
  //         borderColor: '#CCC',
  //         // borderWidth: 1,
  //         shadow: false
  //     },
  //     tooltip: {
  //         headerFormat: '<b>{point.x}</b><br/>',
  //         pointFormat: '{series.name}: {point.y}<br/>ทั้งหมด: {point.stackTotal} ครั้ง'
  //     },
  //     plotOptions: {
  //         column: {
  //             stacking: 'normal',
  //             dataLabels: {
  //                 enabled: true
  //             }
  //         }
  //     },
  //     series: props.graphData.newDataBar
  // };

  // const optionsPie = {
  //     chart: {
  //         plotBackgroundColor: null,
  //         plotBorderWidth: null,
  //         plotShadow: false,
  //         type: 'pie'
  //     },
  //     title: {
  //         text: '',
  //         align: 'left'
  //     },
  //     tooltip: {
  //         pointFormat: '{series.name}: <b>{point.y}</b> ครั้ง'
  //     },
  //     accessibility: {
  //         point: {
  //             valueSuffix: '%'
  //         }
  //     },
  //     plotOptions: {
  //         pie: {
  //             allowPointSelect: true,
  //             cursor: 'pointer',
  //             dataLabels: {
  //                 enabled: true,
  //                 format: "<b font-family: 'CSChatThaiUI';>{point.name}</b>: {point.y} ครั้ง"
  //             },
  //             showInLegend: true
  //         }
  //     },
  //     colors: ['#64E572', '#ED561B', '#24CBE5', '#FF9655', '#8085e9', '#6AF9C4'],
  //     series: [{
  //         name: '',
  //         colorByPoint: true,
  //         data: props.graphData.newDataPie
  //     }]
  // };

  return (
    <div>
      <div className="p-grid card">
        <div className="p-col-12">
          <HighchartsReact
            highcharts={Highcharts}
            options={graph}
            ref={React.createRef()}
          />
        </div>
      </div>
    </div>
  );
};
//  <div>
//             <div className="p-grid card">
//                 <div className='p-col-12'>
//                     {renderLine()}
//                     {/* <HighchartsReact highcharts={Highcharts} options={options} /> */}
//                 </div>
//                 <div className='p-col-7' style={{ marginTop: '30px' }}>
//                     {/* {renderStacked()} */}
//                     <HighchartsReact highcharts={Highcharts} options={optionsBar} />
//                 </div>
//                 <div className='p-col-5' style={{ alignSelf: 'center', marginTop: '30px' }}>
//                     {/* {renderPie()} */}
//                     <HighchartsReact highcharts={Highcharts} options={optionsPie} />
//                 </div>
//             </div>
//         </div>
