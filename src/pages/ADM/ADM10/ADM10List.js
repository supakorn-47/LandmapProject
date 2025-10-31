import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import {
  currentPageReportTemplate,
  paginatorTemplate,
  rowsPerPageOptions,
} from "../../../utils/TableUtil";
import { formatDateTH, formatDateTH2 } from "../../../utils/DateUtil";
import useResponsivePaginator from "../../../hooks/useResponsivePaginator";

export default function ADM10List({ dataTable }) {
  let styleSpan = useStyleSpan();
  const [globalFilter, setGlobalFilter] = useState(null);

  const {
    rows,
    pageLinkSize,
    rowsPerPageOptions,
    currentPageReportTemplate,
    paginatorTemplate,
  } = useResponsivePaginator();

  const header = (
    <div className="table-header">
      <div className="header-left"></div>
      <div className="header-right">
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            type="search"
            placeholder="ค้นหา"
            onInput={(e) => setGlobalFilter(e.target.value)}
          />
        </span>
      </div>
    </div>
  );

  const actionBodyStatus = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <span
          style={{
            background: rowData.otp_status == "1" ? "#c8e6c9" : "#ffcdd2",
            color: rowData.otp_status == "1" ? "#256029" : "#c63737",
            ...styleSpan,
          }}
        >
          {rowData.otp_status == "1" ? "สำเร็จ" : "ไม่สำเร็จ"}
        </span>
      </div>
    );
  };

  const formatDate = (rowData, isTime, checkColumn) => {
    let date = { ...rowData };
    let datevalue = date[`${checkColumn}`];
    return <>{formatDateTH(datevalue, isTime)}</>;
  };

  return (
    <DataTable
      value={dataTable}
      dataKey="id"
      paginator
      // rows={10}
      // rowsPerPageOptions={rowsPerPageOptions()}
      // paginatorTemplate={paginatorTemplate()}
      // currentPageReportTemplate={currentPageReportTemplate()}
      pageLinkSize={pageLinkSize}
      rows={rows}
      rowsPerPageOptions={rowsPerPageOptions}
      paginatorTemplate={paginatorTemplate}
      currentPageReportTemplate={currentPageReportTemplate}
      header={header}
      globalFilter={globalFilter}
      emptyMessage="ไม่พบข้อมูลที่ค้นหา"
      rowHover
      // className="p-datatable-responsive-demo"
      scrollable
      scrollDirection="horizontal"
    >
      <Column
        field="index"
        header="ลำดับ"
        style={{ textAlign: "center", width: 80 }}
      />
      <Column
        field="otp_dtm"
        header="วันเวลาสร้าง OTP"
        style={{ textAlign: "center", width: 150 }}
        body={(e) => formatDate(e, true, "otp_dtm")}
        sortable
      />
      <Column
        field="otp_expire"
        header="วันเวลาหมดอายุ OTP"
        style={{ textAlign: "center", width: 150 }}
        body={(e) => formatDate(e, true, "otp_expire")}
        sortable
      />
      <Column
        field="ref_code"
        header="REF CODE"
        sortable
        style={{ textAlign: "center", width: 300 }}
      />
      <Column
        field="otp"
        header="OTP"
        sortable
        style={{ textAlign: "center", width: 300 }}
      />
      <Column
        field="to_email"
        header="EMAIL"
        sortable
        style={{ textAlign: "center", width: 300 }}
      />
      <Column
        field="otp_status"
        header="สถานะยืนยันตัวตน"
        body={actionBodyStatus}
        style={{ textAlign: "center", width: 200 }}
        sortable
      />
      {/* <Column header="แก้ไข" body={actionBodyEdit} style={{ width: '8%' }}></Column> */}
      {/* <Column header="ลบ" body={actionBodyDelete}style={{ width: '8%' }}></Column> */}
    </DataTable>
  );
}

function useStyleSpan() {
  return {
    borderRadius: "10px",
    padding: ".25em .5rem",
    textTransform: "uppercase",
    fontWeight: "700",
    fontSize: "13px",
    letterSpacing: ".3px",
  };
}
