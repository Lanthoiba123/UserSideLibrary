import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";

import Headerbar from "@/component/headerbar";
import { format } from "date-fns";
import { data_one } from "@/component/bookrequestdata";
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
      <div>Please Wait...</div>
    </div>
  </div>
);
const Bookrequest = ({ setIsOpen, isOpen }) => {
  const [pending, setPending] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPending(false);
    }, 800);
    return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Sl.No",
      selector: (row) => row.sl,
      sortable: true,
      width: "82px",
    },
    {
      name: "Name of Books",
      selector: (row) => row.books,
      sortable: true,
      wrap: true,
      width: "300px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row.authors,
      sortable: true,
      wrap: true,
      width: "300px",
    },

    {
      name: "Date of Request",
      selector: (row) => format(new Date(row.request), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "150px",
    },

    {
      cell: (row) => {
        let backgroundColor;
        if (row.remark === "Request") {
          backgroundColor = "bg-[#1db4ff]";
        } else {
          backgroundColor = "bg-green-600";
        }

        return (
          <div
            className={`p-2 w-full ${backgroundColor} text-white rounded-lg`}
          >
            {row.remark}
          </div>
        );
      },
      name: "Remark",
      selector: (row) => row.remark,
      sortable: true,
      width: "125px",
    },
  ];
  // pagination color change

  createTheme("solarized", {
    text: {
      primary: "black",
      secondary: "#2aa198",
    },
    background: {
      default: "white",
    },
    context: {
      background: "#cb4b16",
      text: "#FFFFFF",
    },
    divider: {
      default: "black",
    },
  });

  // table column margin
  const customStyles = {
    header: {
      style: {
        minHeight: "56px",
      },
    },
    headRow: {
      style: {
        backgroundColor: "blue",
        color: "white",
        fontWeight: "bold",
        borderTopStyle: "solid",
        borderTopWidth: "1px",
        borderTopColor: "black",
      },
    },
    headCells: {
      style: {
        borderRightStyle: "solid",
        borderRightWidth: "1px",
        borderRightColor: "black",
        display: "flex",
        justifyContent: "center",
      },
    },
    cells: {
      style: {
        "&:not(:last-of-type)": {
          borderRightStyle: "solid",
          borderRightWidth: "1px",
          borderRightColor: "black",
        },
        display: "flex",
        justifyContent: "center",
        textAlign: "center",
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
  const [records, setRecords] = useState(data_one);
  function handleFilter(event) {
    console.log(event.target.value);
    const newData = data_one.filter((row) => {
      return row.books.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    const searchDate = Date.parse(event.target.value);
    const newData = data_one.filter((row) => {
      const takenDate = new Date(row.request);
      return takenDate.getTime() === searchDate;
    });
    setRecords(newData);
  };
  return (
    <>
      <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="bg-white flex flex-wrap  items-center p-2 gap-4 mt-14 fixed w-screen z-10 ">
        <input
          className="border rounded-2xl border-gray-600 pl-3 placeholder:text-xs ml-40"
          type="text"
          onChange={handleFilter}
          placeholder="Search book name..."
        />
        <input
          type="date"
          // value={filterDate}
          onChange={handleFilterChange}
          className="border rounded-2xl border-gray-600 px-2"
        />
        <div className="bg-gray-200 p-1 border rounded-2xl border-gray-600 px-2 ml-10 cursor-pointer">
          New Book Request
        </div>
      </div>

      <div className=" lg:flex lg:justify-center md:flex md:justify-center ">
        <div
          className=" mt-[120px] rounded-xl "
          style={{
            width: "65vw",
            height: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
          }}
        >
          <DataTable
            customStyles={customStyles}
            theme="solarized"
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

export default Bookrequest;
