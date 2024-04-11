import DataTable, { defaultThemes } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import "./borrowedlist.css";
import { data } from "./data";
import { useState, useEffect } from "react";

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  margin: 16px;
  animation: ${rotate360} 1s linear infinite;
  transform: translateZ(0);
  border-top: 2px solid grey;
  border-right: 2px solid grey;
  border-bottom: 2px solid grey;
  border-left: 4px solid black;
  background: transparent;
  width: 80px;
  height: 80px;
  border-radius: 50%;
`;
const CustomLoader = () => (
  <div
    style={{
      padding: "24px",
      minHeight: "78dvh",
      display: "grid",
      placeItems: "center",
    }}
  >
    <div>
      <Spinner />
      <div>Fancy Loader...</div>
    </div>
  </div>
);
const Borrowedlist = () => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Sl.No",
      selector: (row) => row.sl,
      sortable: true,
      width: "80px",
    },
    {
      name: "Name of Books",
      selector: (row) => row.books,
      sortable: true,
      wrap: true,
      width: "200px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row.authors,
      sortable: true,
      wrap: true,
      width: "160px",
    },
    {
      name: "Book Id",
      selector: (row) => row.id,
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Date of Taken",
      selector: (row) => row.taken,
      sortable: true,
      wrap: true,
      width: "132px",
    },
    {
      name: "Date of Return",
      selector: (row) => row.return,
      sortable: true,
      wrap: true,
      width: "138px",
    },
    {
      name: "Date of Submit",
      selector: (row) => row.submit,
      sortable: true,
      wrap: true,
      width: "140px",
    },
    {
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
    },
    {
      cell: () => (
        <button
          type="submit"
          className="bg-blue-500 p-1.5 rounded-lg text-white"
        >
          Renew
        </button>
      ),
      name: "Request",
      selector: (row) => row.request,
      sortable: true,
      // button: true,
    },
  ];

  // table column margin
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: defaultThemes.default.divider.default,
      },
    },
    headCells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: defaultThemes.default.divider.default,
        },
      },
    },
  };
  // hover effect
  const conditionalRowStyles = [
    {
      when: (row) => row.remark === "Submitted",
      style: {
        "&:hover": {
          backgroundColor: "rgba(49, 220, 60, 0.8)",
          color: "white",
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.remark === "Due Fine",
      style: {
        "&:hover": {
          backgroundColor: "rgba(0, 140, 255, 0.8)",
          color: "white",
          cursor: "pointer",
        },
      },
    },
    {
      when: (row) => row.remark === "Unsubmitted",
      style: {
        "&:hover": {
          backgroundColor: "rgb(206, 103, 94)",
          color: "white",
          cursor: "not-allowed",
        },
      },
    },
  ];
  const [records, setRecords] = useState(data);
  function handleFilter(event) {
    console.log(event.target.value);
    const newData = data.filter((row) => {
      return row.books.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  return (
    <>
      <div className="bg-yellow-400 flex items-center">
        {/* filter bar area */}
        <div className="table-filter bg-white p-2 mx-6">
          <input
            className="border rounded-2xl border-gray-600"
            type="text"
            onChange={handleFilter}
            placeholder="Search book name..."
          />
        </div>
        <div className="bg-red-500">fdf</div>
      </div>
      <div className="main-container">
        <div
          className="container mt-5 "
          style={{
            width: "85vw",
            height: "80vh",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <DataTable
            customStyles={customStyles}
            conditionalRowStyles={conditionalRowStyles}
            columns={columns}
            data={records}
            fixedHeader
            progressPending={pending}
            progressComponent={<CustomLoader />}
            pagination
          />
        </div>
      </div>
    </>
  );
};

export default Borrowedlist;
