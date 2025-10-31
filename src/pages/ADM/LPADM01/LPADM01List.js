import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { formatDateTH } from "../../../utils/DateUtil";
import { Paginator } from "primereact/paginator";
import {
  currentPageReportTemplate,
  paginatorTemplate,
  rowsPerPageOptions,
} from "../../../utils/TableUtil";
import "../../../styles/global.css";
import useResponsivePaginator from "../../../hooks/useResponsivePaginator";

export default function ADM08List({
  dataTable,
  setDialog,
  onADM08GetFilesList,
  onPageChange,
  First,
  Rows,
  totalRecords,
}) {
  const [globalFilter, setGlobalFilter] = useState(null);

  const {
    rows,
    pageLinkSize,
    rowsPerPageOptions,
    currentPageReportTemplate,
    paginatorTemplate,
  } = useResponsivePaginator();

  const header = () => {
    return (
      <div className="table-header">
        <div className="header-left"></div>
        {/* <div className="header-left">
                    <Button 
                        label="เพิ่มผู้ใช้งาน" 
                        icon="pi pi-plus" 
                        onClick={() => setDialog({ dialog: true, action: 'เพิ่ม' })} 
                        className="p-button-raised p-button-rounded modern-add-button" 
                    />
                </div> */}
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

  const actionBodyApprove = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() =>
            setDialog({
              openApprove: true,
              text: "ยืนยันอนุมัติผู้ใช้งาน",
              data: rowData,
              register_seq: rowData.register_seq,
            })
          }
          icon="pi pi-verified"
          className="p-button-rounded p-button-success"
          tooltip="คลิกเพื่อ อนุมัติผู้ใช้งาน"
          tooltipOptions={{ position: "top" }}
          disabled={
            rowData.register_type_seq === 1 ||
            rowData.register_type_seq === 2 ||
            rowData.approve_flag === 1
          }
        />
      </div>
    );
  };

  // btn แนบไฟล์
  const actionListUpload = (rowData) => {
    // let stylebg = {}
    // if (rowData.filelist === null) {
    //     stylebg = {
    //         backgroundColor: 'darkgrey',
    //         borderColor: 'darkgrey'
    //     }
    // }
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => onADM08GetFilesList(rowData)}
          icon="pi pi-file-pdf"
          className={
            rowData.filelist === null
              ? "p-button-rounded p-button-danger"
              : "p-button-rounded "
          }
          // style={{ ...stylebg }}
          // style={rowData.filelist === null ? { marginLeft: 5, backgroundColor: '#6c757d', borderColor: '#6c757d' } : { marginLeft: 5 }}
          tooltip="คลิกเพื่อ แสดงไฟล์แนบ"
          tooltipOptions={{ position: "top" }}
          // disabled={rowData.approve_flag ===  0}
        />
      </div>
    );
  };

  const formatDate = (rowData, isTime, checkColumn) => {
    let date = { ...rowData };
    let datevalue = date[`${checkColumn}`];
    return <>{formatDateTH(datevalue, isTime)}</>;
  };

  const personalFormat = (rowData) => {
    if (rowData.person_id === undefined || rowData.person_id === null)
      return "-";
    let str = rowData.person_id.toString();
    if (str.length < 13) return "-";
    return (
      <>
        {/* {str.substring(0, 1) + "-" + str.substring(1, 5) + "-" + str.substring(5, 10) + "-" + str.substring(10, 12) + "-" + str.substring(12)} */}
        {str.substring(0, 1) +
          "-" +
          str.substring(1, 5) +
          "-" +
          str.substring(5, 10) +
          "-" +
          "**" +
          "-" +
          "*"}{" "}
        {/*Jane 250466*/}
      </>
    );
  };

  const mobileFormat = (rowData) => {
    if (rowData.person_phone === undefined) return "-";
    if (rowData.person_phone === null) return "-";
    let str = rowData.person_phone.toString();
    if (str.length < 10) return "-";
    return (
      <>
        {str.substring(0, 3) +
          "-" +
          str.substring(3, 6) +
          "-" +
          str.substring(6, 10)}
      </>
    );
  };

  const returnStatus = (rowData, checkColumn) => {
    let data = { ...rowData };
    // console.log('data', data.approve_flag)
    let datavalue = data[`${checkColumn}`];

    let text = "";
    let background = "";
    let color = "";
    if (data.approve_flag === null) {
      text = "รออนุมัติ";
      background = "#FFFACD";
      color = "#FF6600";
    } else if (data.approve_flag === 0) {
      text = "ไม่อนุมัติ";
      background = "#ffcdd2";
      color = "#c63737";
    } else if (data.approve_flag === 1) {
      text = "อนุมัติ";
      background = "#c8e6c9";
      color = "#256029";
    } else {
      text = data.approve_flag;
      background = "#ffcdd2";
      color = "#c63737";
    }

    return (
      <>
        <span
          style={{
            background: background,
            color: color,
            borderRadius: "10px",
            padding: ".25em .5rem",
            textTransform: "uppercase",
            fontWeight: "700",
            fontSize: "13px",
            letterSpacing: ".3px",
          }}
        >
          {text}
        </span>
      </>
    );
  };

  const renderFeild = (rowData) => {
    let text = "";
    if (
      rowData.landoffice_name === null ||
      rowData.landoffice_name === undefined
    ) {
      // text = rowData.register_type_name;
      text = "-";
    } else {
      text = rowData.landoffice_name;
    }
    return <div>{text}</div>;
  };

  const actionBodyTxt = (text) => {
    if (text === undefined || text === null || text === " ") return "-";
    return <div>{text}</div>;
  };

  return (
    <>
      <DataTable
        value={dataTable.map((item, index) => ({
          ...item,
          row_num: index + 1,
        }))}
        dataKey="row_num"
        //{Rows}
        // onPage={(e) => onPageChange(e)}
        header={header()}
        globalFilter={globalFilter}
        emptyMessage="ไม่พบข้อมูลที่ค้นหา"
        className="p-datatable-responsive-demo"
        rowHover
        showGridlines
        pageLinkSize={pageLinkSize}
        rows={rows}
        rowsPerPageOptions={rowsPerPageOptions}
        paginatorTemplate={paginatorTemplate}
        currentPageReportTemplate={currentPageReportTemplate}
        scrollable
        scrollDirection="horizontal"
        paginator
      >
        <Column
          field="row_num"
          header="ลำดับ"
          style={{ width: 80, textAlign: "center" }}
        />
        <Column
          field="create_dtm"
          header="วันเวลาลงทะเบียน"
          body={(e) => formatDate(e, true, "create_dtm")}
          style={{ width: 150, textAlign: "center", wordWrap: "break-word" }}
        />
        {/* <Column field="register_type_name" header="กลุ่มผู้ใช้งาน" style={{ wordWrap: 'break-word' }} /> */}
        <Column
          field="landoffice_name"
          header="หน่วยงาน"
          style={{ width: 300, wordWrap: "break-word" }}
          body={renderFeild}
        />
        <Column
          field="province_name"
          header="จังหวัด"
          body={(e) => actionBodyTxt(e.province_name)}
          style={{ wordWrap: "break-word", width: 200 }}
        />
        <Column
          field="person_fullname"
          header="ชื่อ-สกุล"
          style={{ wordWrap: "break-word", width: 300 }}
        />
        <Column
          field="person_id"
          header="เลขประจำตัวประชาชน"
          style={{ textAlign: "center", width: 300 }}
          body={personalFormat}
        />
        <Column
          field="person_email"
          header="อีเมล"
          style={{ wordWrap: "break-word", width: 300 }}
        />
        <Column
          field="person_phone"
          header="เบอร์มือถือ"
          style={{ textAlign: "center", width: 300 }}
          body={mobileFormat}
        />
        <Column
          field="register_objective"
          header="วัตถุประสงค์"
          style={{ wordWrap: "break-word", width: 300 }}
          body={(e) => actionBodyTxt(e.register_objective)}
        />
        <Column
          field="approve_flag"
          header="สถานะผู้ใช้งาน"
          style={{ textAlign: "center", width: 150 }}
          body={(e) => returnStatus(e, "approve_flag")}
        />
        <Column
          header="ไฟล์แนบ"
          body={actionListUpload}
          style={{ textAlign: "center", width: 80 }}
        />
        <Column
          header="อนุมัติผู้ใช้งาน"
          body={actionBodyApprove}
          style={{ width: 80 }}
        ></Column>
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
