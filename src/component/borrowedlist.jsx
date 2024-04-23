import DataTable, {
  defaultThemes,
  createTheme,
} from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import "./borrowedlist.css";
import { format } from "date-fns";
import { data } from "./data";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      width: "82px",
    },
    {
      name: "Name of Books",
      selector: (row) => row.books,
      sortable: true,
      wrap: true,
      width: "190px",
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
      selector: (row) => format(new Date(row.taken), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "139px",
    },
    {
      name: "Date of Return",
      selector: (row) => format(new Date(row.return), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "143px",
    },
    {
      name: "Date of Submit",
      selector: (row) => format(new Date(row.submit), "dd/MM/yyyy"),
      sortable: true,
      wrap: true,
      width: "145px",
    },
    {
      cell: (row) => {
        let backgroundColor;
        if (row.remark === "Submitted") {
          backgroundColor = "bg-green-600";
        } else if (row.remark === "Unsubmitted") {
          backgroundColor = "bg-red-600";
        } else {
          backgroundColor = "bg-[#1db4ff]";
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
    {
      cell: (row) =>
        row.remark === "Submitted" || row.remark === "Due Fine" ? null : (
          <button
            type="submit"
            className="bg-blue-500 p-1.5 rounded-lg w-full text-white"
          >
            Renew
          </button>
        ),
      name: "Request",
      selector: (row) => row.request,
      sortable: true,
      width: "102px",
      // button: true,
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
  const [records, setRecords] = useState(data);
  function handleFilter(event) {
    console.log(event.target.value);
    const newData = data.filter((row) => {
      return row.books.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newData);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    const searchDate = Date.parse(event.target.value);
    const newData = data.filter((row) => {
      const takenDate = new Date(row.taken);
      return takenDate.getTime() === searchDate;
    });
    setRecords(newData);
  };
  return (
    <>
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
        />{" "}
        <Select>
          <SelectTrigger className="h-7 w-[180px] ml-40 border rounded-2xl border-gray-600 px-2">
            <SelectValue placeholder="Borrowed Book List" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>List</SelectLabel>
              <SelectItem value="borrowedlist">Borrowed Book List</SelectItem>
              <SelectItem value="renewlist">Renew Book List</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="lg:flex lg:justify-center md:flex md:justify-center ">
        <div
          className=" mt-[120px] rounded-xl "
          style={{
            width: "80vw",
            height: "80vh",
            flexDirection: "column",
            // justifyContent: "flex-start",
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

export default Borrowedlist;
