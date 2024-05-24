import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import "./borrowedlist.css";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { BASEURL } from "../../constant";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "react-toastify";

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

const Borrowedlist = ({ isOpen }) => {
  const [pending, setPending] = useState(true);
  const [renewColumnShow, setRenewColumn] = useState(true);
  const [borrowedBook, setBorrowedBook] = useState([]);
  const [filter, setFilter] = useState([]);
  const [renewBook, setRenewBook] = useState([]);
  const token=window.localStorage.getItem('token')

  const fetchRenewBook = async () => {
    const res = await fetch(`${BASEURL}/api/renew`, {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    setRenewBook(data.data);
    setPending(false);
  };

  const fetchBorrowedBook = async () => {
    const res = await fetch(`${BASEURL}/api/student/profile`, {
      method:"GET",
      headers:{
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }
    });
    const data = await res.json();
    console.log(data);
    // biome-ignore lint/complexity/noForEach: <explanation>
    data.student?.book_list.forEach((book) => {
      setBorrowedBook((prev) => [...prev, book.loan_id]);
      setFilter((prev) => [...prev, book.loan_id]);
    });
    setPending(false);
  };

  const addRenewBook = async (loan_id) => {
    try {
      console.log(loan_id);
      const res = await fetch(`${BASEURL}/api/renew`, {
        method: "POST",
        credentials: "include",
        body: JSON.stringify({
          loan_id: loan_id,
        }),
        headers: {
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      } else {
        toast.error("Cannot renew again");
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchBorrowedBook();
  }, []);

  const columns = [
    {
      name: "Sl.no",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Name of Books",
      selector: (row) => row?.book_title,
      sortable: true,
      wrap: true,
      width: "190px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row?.book_author,
      sortable: true,
      wrap: true,
      width: "160px",
    },
    {
      name: "Book Id",
      selector: (row) => row?.book_id,
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Date of Taken",
      selector: (row) =>
        row?.loanDate ? format(new Date(row?.loanDate), "dd/MM/yyyy") : "---",
      sortable: true,
      wrap: true,
      width: "139px",
    },
    {
      name: "Date of Return",
      selector: (row) =>
        row?.returnDate
          ? format(new Date(row?.returnDate), "dd/MM/yyyy")
          : "---",
      sortable: true,
      wrap: true,
      width: "143px",
    },
    {
      name: "Date of Submit",
      selector: (row) =>
        row?.submitDate !== null
          ? format(new Date(row?.submitDate), "dd/MM/yyyy")
          : "---",
      sortable: true,
      wrap: true,
      width: "145px",
    },
    {
      selector: (row) => row.remark,
      sortable: true,
      width: "125px",
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
    },
    {
      cell: (row) =>
        row.remark === "Submitted" || row.remark === "Due Fine" ? null : (
          <button
            type="submit"
            className="bg-blue-500 p-1.5 rounded-lg w-full text-white"
            onClick={() => addRenewBook(row._id)}
          >
            Renew
          </button>
        ),
      name: "Request",
      // selector: (row) => row.request,
      sortable: true,
      width: "102px",
      // button: true,
    },
  ];
  // pagination color change
  const renewColumn = [
    {
      name: "Sl.no",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Name of Books",
      selector: (row) => row?.loan_id?.book_title,
      sortable: true,
      wrap: true,
      width: "190px",
    },
    {
      name: "Name of Authors",
      selector: (row) => row?.loan_id?.book_author,
      sortable: true,
      wrap: true,
      width: "160px",
    },
    {
      name: "Book Id",
      selector: (row) => row?.loan_id?.book_id,
      sortable: true,
      wrap: true,
      width: "110px",
    },
    {
      name: "Date of Taken",
      selector: (row) =>
        row?.loan_id?.loanDate
          ? format(new Date(row?.loan_id?.loanDate), "dd/MM/yyyy")
          : "---",
      sortable: true,
      wrap: true,
      width: "139px",
    },
    {
      name: "Date of Return",
      selector: (row) =>
        row?.loan_id?.returnDate
          ? format(new Date(row?.loan_id?.returnDate), "dd/MM/yyyy")
          : "---",
      sortable: true,
      wrap: true,
      width: "143px",
    },
    {
      name: "Date of Renew",
      selector: (row) =>
        row?.renew_date !== null
          ? format(new Date(row?.renew_date), "dd/MM/yyyy")
          : "---",
      sortable: true,
      wrap: true,
      width: "145px",
    },
    {
      cell: (row) => {
        let backgroundColor;
        if (row.remark === "accept") {
          backgroundColor = "bg-green-600";
        } else if (row.remark === "reject") {
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
  ];

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
  function handleFilter(event) {
    console.log(event.target.value);
    if (event.target.value.length === 0) {
      setFilter(borrowedBook);
    }
    const newData = borrowedBook.filter((row) => {
      return row?.book_title
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });
    console.log(newData);
    setFilter(newData);
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value);
    const searchDate = new Date(event.target.value);
    console.log(borrowedBook);
    const newData = borrowedBook.filter((row) => {
      const takenDate = new Date(row?.loanDate);
      console.log(`${takenDate.getDate()}--taken date`);
      console.log(`${searchDate.getDate()}--search date`);
      return (
        takenDate.getDate() === searchDate.getDate() &&
        takenDate.getMonth() === searchDate.getMonth() &&
        takenDate.getFullYear() === searchDate.getFullYear()
      );
    });
    console.log(newData);
    setFilter(newData);
  };

  return (
    <div>
      <div className="bg-white flex sm:flex-wrap  items-center p-2 gap-4 sm:mt-14 mt-[7px] fixed w-screen z-10 ">
        <input
          className="border rounded-2xl border-gray-600 pl-3 placeholder:text-xs sm:ml-40"
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
        <Select
          onValueChange={(value) => {
            if (value === "borrowList") {
              window.location.reload();
              // fetchBorrowedBook()
              // setRenewColumn(true)
            } else {
              setRenewColumn(false);
              fetchRenewBook();
            }
          }}
        >
          <SelectTrigger className="h-7 w-[180px] sm:ml-40 border rounded-2xl border-gray-600 px-2">
            <SelectValue placeholder="Borrowed Book List" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="borrowList">Borrowed Book List</SelectItem>
              <SelectItem value="renewlist">Renew Book List</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <div className=" lg:flex lg:justify-center md:flex md:justify-center ">
        <div
          className={` sm:mt-[0px] mt-[50px]  rounded-xl  h-[80vh]  flex flex-col px-2 pt-20 sm:pt-36 justify-start ${
            !isOpen
              ? "sm:w-[90vw]  transition-all duration-1000 "
              : "sm:w-[80vw] transition-all duration-1000 "
          } w-screen`}
        >
          {renewColumnShow ? (
            <DataTable
              customStyles={customStyles}
              theme="solarized"
              conditionalRowStyles={conditionalRowStyles}
              columns={columns}
              data={filter}
              fixedHeader
              progressPending={pending}
              progressComponent={<CustomLoader />}
              pagination
            />
          ) : (
            <DataTable
              customStyles={customStyles}
              theme="solarized"
              conditionalRowStyles={conditionalRowStyles}
              columns={renewColumn}
              data={renewBook}
              fixedHeader
              progressPending={pending}
              progressComponent={<CustomLoader />}
              pagination
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Borrowedlist;
