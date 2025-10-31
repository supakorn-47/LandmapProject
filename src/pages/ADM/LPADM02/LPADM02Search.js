import React from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Calendars } from "../../../components/Calendar/Calendar";
import "../../../styles/global.css";

export default function LPADM02Search({
  registerType,
  registerDepartment,
  searchData,
  setSearchData,
  onSearch,
  provinceList,
}) {
  return (
    <div className="p-fluid p-formgrid p-grid search-wrapper">
      <div className="p-field p-col-12 p-md-6 p-xl-3">
        <label>วันที่</label>
        <Calendars
          maxDate={searchData.create_dtm_to}
          value={searchData.create_dtm_from}
          onChange={(e) =>
            setSearchData({ ...searchData, create_dtm_from: e.value })
          }
        />
      </div>
      <div className="p-field p-col-12 p-md-6 p-xl-3">
        <label>ถึงวันที่</label>
        <Calendars
          maxDate={new Date()}
          minDate={searchData.create_dtm_from}
          value={searchData.create_dtm_to}
          onChange={(e) =>
            setSearchData({ ...searchData, create_dtm_to: e.value })
          }
        />
      </div>
      {/* <div className="p-field p-col-12 p-md-6" /> */}

      <div className="p-field p-col-12 p-md-6">
        <label>ชื่อ-สกุล</label>
        <InputText
          value={searchData.person_fullname}
          onChange={(e) =>
            setSearchData({ ...searchData, person_fullname: e.target.value })
          }
        />
      </div>
      <div className="p-field p-col-12 p-md-6 p-xl-4">
        <label>กลุ่มผู้ใช้งาน</label>
        <Dropdown
          filter
          showClear
          filterBy="label"
          optionLabel="label"
          optionValue="value"
          value={searchData.register_type_seq}
          options={registerType}
          onChange={(e) =>
            setSearchData({ ...searchData, register_type_seq: e.value })
          }
          appendTo={document.body}
        />
      </div>

      <div className="p-field p-col-12 p-md-6 p-xl-4">
        <label>จังหวัด</label>
        <Dropdown
          filter
          showClear
          filterBy="label"
          optionLabel="label"
          optionValue="value"
          value={searchData.province_seq}
          options={provinceList}
          onChange={(e) =>
            setSearchData({ ...searchData, province_seq: e.value })
          }
          appendTo={document.body}
        />
      </div>

      <div className="p-field p-col-12 p-md-6 p-xl-4">
        <label>หน่วยงาน</label>
        <Dropdown
          filter
          showClear
          filterBy="department_name_th"
          optionLabel="department_name_th"
          optionValue="department_seq"
          value={searchData.department_seq}
          options={registerDepartment}
          onChange={(e) =>
            setSearchData({ ...searchData, department_seq: e.value })
          }
          appendTo={document.body}
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
