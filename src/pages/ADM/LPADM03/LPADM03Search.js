import React from "react";
import { Calendars } from "../../../components/Calendar/Calendar";
import { Button } from "primereact/button";

export default function ADM06Search({ searchData, setSearchData, onSearch }) {
  return (
    <div className="p-fluid p-formgrid p-grid search-wrapper">
      <div className="p-field p-col-12 p-md-6">
        <label>วันที่ประกาศ</label>
        <Calendars
          // maxDate={searchData.announce_date_to}
          value={searchData.announce_date_from}
          dateFormat={"dd/mm/yy"}
          onChange={(e) =>
            setSearchData({ ...searchData, announce_date_from: e.value })
          }
        />
      </div>
      <div className="p-field p-col-12 p-md-6">
        <label>ถึงวันที่ประกาศ</label>
        <Calendars
          // maxDate={new Date()}
          // minDate={searchData.announce_date_from}
          value={searchData.announce_date_to}
          dateFormat={"dd/mm/yy"}
          onChange={(e) =>
            setSearchData({ ...searchData, announce_date_to: e.value })
          }
        />
      </div>
      <div className="p-field p-col-12" style={{ marginTop: "1rem" }}>
        <Button
          onClick={() => onSearch()}
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
