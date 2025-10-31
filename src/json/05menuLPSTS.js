// const menuLPSTS = [
//   {
//     label: "รายงานธรรมาภิบาลข้อมูลภาครัฐ",
//     icon: "pi pi-info-circle",
//     to: "/LPSTS01",
//   },
//   {
//     label: "เอกสารธรรมาภิบาลข้อมูลภาครัฐ",
//     icon: "pi pi-info-circle",
//     to: "/LPSTS02",
//   },
//   { label: "ข้อมูล Log Service", to: "/MSM03" },
// ];

const menuLPSTS = [
  {
    label: "",
    group: true,
    items: [
      {
        label: "รายงานธรรมาภิบาลข้อมูลภาครัฐ",
        // icon: "pi pi-info-circle",
        to: "/LPSTS01",
      },
      {
        label: "เอกสารธรรมาภิบาลข้อมูลภาครัฐ",
        // icon: "pi pi-info-circle",
        to: "/LPSTS02",
      },
      // { label: "ข้อมูล Log Service", to: "/MSM03" },
      { label: "รายงานสรุปการถ่ายโอนข้อมูล", to: "/DBT06" },
      { label: "รายงานจำนวนข้อมูลและผลต่าง", to: "/MSM35" },
    ],
  },
];

export default menuLPSTS;
