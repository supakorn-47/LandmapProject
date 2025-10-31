import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
// import { currentPageReportTemplate, paginatorTemplate, rowsPerPageOptions } from '../../../utils/TableUtil';
import { formatDateTH } from "../../../utils/DateUtil";
//Paginator
import {
  currentPageReportTemplate,
  paginatorTemplate,
  rowsPerPageOptions,
} from "../../../utils/TableUtil";
import { Paginator } from "primereact/paginator";
import "../../../styles/global.css";
import useResponsivePaginator from "../../../hooks/useResponsivePaginator";

export default function LPADM02List({
  adflag,
  setAdflag,
  onSetConsumer,
  onGetRegisterServiceClick,
  dataTable,
  setDialog,
  setDeleteDialog,
  setResetDialog,
  onPageChange,
  First,
  Rows,
  totalRecords,
}) {
  const menu = useRef(null);
  const [globalFilter, setGlobalFilter] = useState(null);

  const {
    rows,
    pageLinkSize,
    rowsPerPageOptions,
    currentPageReportTemplate,
    paginatorTemplate,
  } = useResponsivePaginator();

  const header = () => {
    const onClick = () => {
      setAdflag(false);
      setDialog({ dialog: true, action: "เพิ่ม" });
    };
    return (
      <div className="table-header">
        <div className="header-left">
          <Button
            label="เพิ่มผู้ใช้งาน"
            icon="pi pi-plus"
            onClick={() => onClick()}
            className="p-button-rounded p-button-info"
          />
        </div>
        <div className="header-right">
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText
              type="search"
              placeholder="ค้นหาข้อมูล..."
              onInput={(e) => setGlobalFilter(e.target.value)}
            />
          </span>
        </div>
      </div>
    );
  };

  const btnEdit = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          onClick={() =>
            setDialog({ dialog: true, action: "แก้ไข", data: rowData })
          }
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          tooltip="แก้ไข"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  const btnDelete = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          onClick={() => setDeleteDialog({ open: true, data: rowData })}
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="ลบ"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  const btnResetPassword = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          onClick={() => setResetDialog({ open: true, data: rowData })}
          icon="pi pi-replay"
          className={`p-button-rounded p-button-info ${
            rowData.register_ad_flag === "1" ||
            rowData.register_type_seq === 3 ||
            rowData.register_type_seq === 4 ||
            rowData.register_type_seq === 5
              ? "disabled"
              : ""
          }`}
          tooltip="รีเซ็ตรหัสผ่าน"
          tooltipOptions={{ position: "top" }}
          disabled={
            rowData.register_ad_flag === "1" ||
            rowData.register_type_seq === 3 ||
            rowData.register_type_seq === 4 ||
            rowData.register_type_seq === 5
          }
        />
      </div>
    );
  };

  const statusRecord = (rowData) => {
    return (
      <div className="status-badge">
        <span
          className={`status-indicator ${
            rowData.record_status === "N" ? "status-active" : "status-inactive"
          }`}
        >
          {rowData.record_status === "N" ? "ใช้งาน" : "ยกเลิก"}
        </span>
      </div>
    );
  };

  const formatDate = (rowData, isTime, checkColumn) => {
    let date = { ...rowData };
    let datevalue = date[`${checkColumn}`];
    return formatDateTH(datevalue, isTime);
  };

  const personalFormat = (rowData) => {
    if (rowData.personal_id === null || rowData.personal_id === undefined)
      return "-";
    let str = rowData.personal_id.toString();
    if (str.length < 13) return "-";
    return `${str.substring(0, 1)}-${str.substring(1, 5)}-${str.substring(
      5,
      10
    )}-${str.substring(10, 12)}-${str.substring(12)}`;
  };

  const onConfigConsumerClick = (rowData) => {
    // console.log(rowData);

    return (
      <div className="action-buttons">
        <Button
          onClick={() => onSetConsumer(rowData)}
          icon="pi pi-key"
          className={`p-button-rounded p-button-help ${
            rowData.register_type_seq === 1 ||
            rowData.register_type_seq === 2 ||
            rowData.register_type_seq === 5 ||
            rowData.register_type_seq === 6
              ? "disabled"
              : ""
          }`} // disabled  rowData.register_type_seq === 4
          tooltip="กำหนด Consumer"
          tooltipOptions={{ position: "top" }}
          disabled={
            rowData.register_type_seq === 1 ||
            rowData.register_type_seq === 2 ||
            rowData.register_type_seq === 5 ||
            rowData.register_type_seq === 6
          }
        />
      </div>
    );
  };

  const onServiceClick = (rowData) => {
    return (
      <div className="action-buttons">
        <Button
          onClick={() => onGetRegisterServiceClick(rowData)}
          icon="pi pi-cog"
          className={`p-button-rounded p-button${
            rowData.register_type_seq === 1 ||
            rowData.register_type_seq === 2 ||
            rowData.register_type_seq === 4 ||
            rowData.register_type_seq === 5 ||
            rowData.register_type_seq === 6
              ? "disabled"
              : ""
          }`}
          tooltip="กำหนด Service"
          tooltipOptions={{ position: "top" }}
          disabled={
            rowData.register_type_seq === 1 ||
            rowData.register_type_seq === 2 ||
            rowData.register_type_seq === 4 ||
            rowData.register_type_seq === 5 ||
            rowData.register_type_seq === 6
          }
        />
      </div>
    );
  };

  const actionBodyTxt = (text) => {
    if (text === undefined || text === null || text === " ") return "-";
    return <div className="text-content">{text}</div>;
  };

  return (
    <>
      <DataTable
        value={dataTable}
        dataKey="row_num"
        //{Rows}
        // onPage={(e) => onPageChange(e)}
        header={header()}
        globalFilter={globalFilter}
        emptyMessage="ไม่พบข้อมูลที่ค้นหา"
        className="p-datatable-responsive-demo"
        rowHover
        showGridlines
        scrollable
        scrollDirection="horizontal"
        // rowsPerPageOptions={rowsPerPageOptions()}
        // paginatorTemplate={paginatorTemplate()}
        // currentPageReportTemplate={currentPageReportTemplate()}
        pageLinkSize={pageLinkSize}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        paginatorTemplate={paginatorTemplate}
        currentPageReportTemplate={currentPageReportTemplate}
        paginator
      >
        <Column
          field="row_num"
          header="ลำดับ"
          style={{ textAlign: "center", width: 80 }}
          className="order-column"
        />
        <Column
          field="create_dtm"
          header="วันเวลาลงทะเบียน"
          body={(e) => formatDate(e, true, "create_dtm")}
          style={{ textAlign: "center", width: 150 }}
          className="date-column"
        />
        <Column
          field="register_type_name"
          header="กลุ่มผู้ใช้งาน"
          style={{ width: 200 }}
          className="type-column"
        />
        <Column
          field="province_name"
          header="จังหวัด"
          body={(e) => actionBodyTxt(e.province_name)}
          className="province-column"
          style={{ width: 200 }}
        />
        <Column
          field="landoffice_name"
          header="หน่วยงาน"
          className="office-column"
          style={{ width: 300 }}
        />
        <Column
          field="person_fullname"
          header="ชื่อ-สกุล"
          className="name-column"
          style={{ width: 300 }}
        />
        <Column
          field="person_email"
          header="อีเมล"
          className="email-column"
          style={{ width: 300 }}
        />
        <Column
          field="record_status"
          body={statusRecord}
          header="สถานะ"
          style={{ width: 150 }}
          className="status-column"
        />
        <Column
          header="กำหนด Consumer"
          body={onConfigConsumerClick}
          style={{ width: 150 }}
          className="consumer-column"
        />
        <Column
          header="กำหนด Service"
          body={onServiceClick}
          style={{ width: 200 }}
          className="service-column"
        />
        <Column
          header="รีเซ็ตรหัสผ่าน"
          body={btnResetPassword}
          style={{ width: 200 }}
          className="reset-column"
        />
        <Column
          header="แก้ไข"
          body={btnEdit}
          style={{ width: 80 }}
          className="edit-column"
        />
        <Column
          header="ลบ"
          body={btnDelete}
          style={{ width: 80 }}
          className="delete-column"
        />
      </DataTable>
      {/* <Paginator
        first={First}
        rows={Rows}
        totalRecords={dataTable.length === 0 ? 0 : totalRecords}
        rowsPerPageOptions={[10, 25, 50, 100]}
        onPageChange={onPageChange}
        template={paginatorTemplate()}
        currentPageReportTemplate={currentPageReportTemplate()}
        className="modern-paginator"
      /> */}
    </>
  );
}
