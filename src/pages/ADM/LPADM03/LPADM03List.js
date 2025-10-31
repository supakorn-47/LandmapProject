import React, { useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import {
  currentPageReportTemplate,
  paginatorTemplate,
  rowsPerPageOptions,
} from "../../../utils/TableUtil";
import { formatDateTH } from "../../../utils/DateUtil";
import useResponsivePaginator from "../../../hooks/useResponsivePaginator";

export default function ADM06List({
  dataTable,
  setDialog,
  setDeleteDialog,
  onGetAnnounceFileList,
  onViewFileClick,
}) {
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
      <div className="header-left">
        <Button
          className="p-button-rounded p-button-info"
          label="เพิ่มข่าวประกาศ"
          icon="pi pi-plus"
          onClick={() => setDialog({ dialog: true, action: "บันทึก" })}
          style={{ marginBottom: 20 }}
        />
      </div>
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

  const actionBodyEdit = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => onGetAnnounceFileList(rowData)}
          icon="pi pi-pencil"
          className="p-button-rounded p-button-warning"
          tooltip="คลิกเพื่อ แก้ไข"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  const actionBodyDelete = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() =>
            setDeleteDialog({ open: true, data: rowData, onClickDelete: "ROW" })
          }
          style={{ marginLeft: 5 }}
          icon="pi pi-trash"
          className="p-button-rounded p-button-danger"
          tooltip="คลิกเพื่อ ลบ"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  const actionBodyViewImage = (rowData) => {
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          onClick={() => onViewFileClick(rowData)}
          style={{ marginLeft: 5 }}
          icon="pi pi-image"
          className="p-button-rounded p-button-secondary"
          tooltip="คลิกเพื่อ แสดงรูปภาพ"
          tooltipOptions={{ position: "top" }}
        />
      </div>
    );
  };

  return (
    <DataTable
      // className="p-datatable-responsive-demo"
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
      // autoLayout
      rowHover
      scrollable
      scrollDirection="horizontal"
    >
      {/* body={(e) => formatDate(e, false, 'announce_date')}  */}
      <Column
        field="index"
        header="ลำดับ"
        style={{ textAlign: "center", width: 80 }}
      />
      <Column
        field="announce_date"
        header="วันที่ประกาศ"
        body={(e) => formatDateTH(e.announce_date)}
        style={{ textAlign: "center", width: 150 }}
      />
      <Column
        field="announce_start_date"
        header="วันที่เริ่มต้นประกาศ"
        body={(e) => formatDateTH(e.announce_start_date, true)}
        style={{ textAlign: "center", width: 150 }}
      />
      <Column
        field="announce_finish_date"
        header="วันที่สิ้นสุดประกาศ"
        body={(e) => formatDateTH(e.announce_finish_date, true)}
        style={{ textAlign: "center", width: 150 }}
      />
      <Column
        field="announce_title_th"
        header="หัวข้อประกาศ(ภาษาไทย)"
        style={{ width: 300 }}
      />
      <Column
        field="announce_title_en"
        header="หัวข้อประกาศ(ภาษาอังกฤษ)"
        style={{ width: 300 }}
      />
      <Column
        field="announce_attach"
        header="ไฟล์แนบ"
        body={actionBodyViewImage}
        style={{ width: 80 }}
      />
      <Column
        header="แก้ไข"
        body={actionBodyEdit}
        style={{ width: 80 }}
      ></Column>
      <Column
        header="ลบ"
        body={actionBodyDelete}
        style={{ width: 80 }}
      ></Column>
    </DataTable>
  );
}
