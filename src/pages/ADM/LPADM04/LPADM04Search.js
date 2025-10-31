import React from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";

export default function LPADM04Search() {
  return (
    <div className="p-fluid p-formgrid p-grid search-wrapper">
      <div className="p-field p-col-12 p-md-6 p-xl-3">
        <label htmlFor="date1">วันที่แบบสำรวจ</label>
        <Calendar id="date1" showIcon value={new Date()} />
      </div>
      <div className="p-field p-col-12 p-md-6 p-xl-3">
        <label htmlFor="date2">ถึงวันที่แบบสำรวจ</label>
        <Calendar id="date2" showIcon value={new Date()} />
      </div>
      <div className="p-field p-col-12" style={{ marginTop: "1rem" }}>
        <Button
          className="p-button-rounded p-button-info"
          type="button"
          icon="pi pi-search"
          label="ค้นหา"
          style={{ width: "auto" }}
        />
      </div>
    </div>
  );
}
