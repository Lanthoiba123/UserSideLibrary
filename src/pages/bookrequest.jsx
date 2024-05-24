import DataTable, { createTheme } from "react-data-table-component";
import styled, { keyframes } from "styled-components";
import { BASEURL } from "../../constant.js";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { format } from "date-fns";
import { data_one } from "@/component/bookrequestdata";
import { useState, useEffect } from "react";
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
const Bookrequest = ({ isOpen, setIsOpen }) => {
  const [pending, setPending] = useState(true);
  const [requestTitle, setRequestTitle] = useState("");
  const [requestAuthor, setRequestAuthor] = useState("");
  const [requestDescription, setRequestDescription] = useState("");
  const [records, setRecords] = useState();

  const requestBookHandler = async (e) => {
    try {
      e.preventDefault();
      const token = window.localStorage.getItem('token')
      const requestData = {
        title: requestTitle,
        author: requestAuthor,
        details: requestDescription,
      };

      const res = await fetch(`${BASEURL}/api/request`, {
        method: "POST",
        // credentials: "include",
        body: JSON.stringify(requestData),
        headers: {
          "content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });
      const data = await res.json();
      console.log(data);
      if (data.success === true) {
        toast.success("Book Requested Successfully");
        setRequestTitle("");
        setRequestAuthor("");
        setRequestDescription("");
      } else {
        toast.error(res.error);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    // const timeout = setTimeout(() => {
    //   setPending(false);
    // }, 800);
    const fetchRequestBook = async () => {
      try {
        const res = await fetch(`${BASEURL}/api/request`);
        const data = await res.json();
        console.log(data);
        setRecords(data.data);
        setPending(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchRequestBook();
    // return () => clearTimeout(timeout);
  }, []);

  const columns = [
    {
      name: "Sl.no",
      cell: (row, index) => index + 1, //RDT provides index by default
    },
    {
      name: "Name of Books",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
      width: "300px",
    },
    {
      name: "Name of author",
      selector: (row) => row.author,
      sortable: true,
      wrap: true,
      width: "300px",
    },
    {
      name: "Details",
      selector: (row) => row.details,
      sortable: true,
      wrap: true,
      width: "300px",
    },

    {
      name: "Date of Request",
      selector: (row) => format(new Date(row.dateOfRequest), "dd/MM/yyyy"),
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
      width: "150px",
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
      <div className="bg-white flex sm:flex-wrap  items-center p-2 gap-4 mt-14 fixed w-screen z-10 ">
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
        />
        <Dialog>
          <DialogTrigger className="bg-gray-200 p-1  rounded-2xl border-gray-600 sm:px-2 sm:ml-10 cursor-pointer sm:text-lg text-sm">
            New Book Request
          </DialogTrigger>
          <DialogContent className="">
            <DialogHeader>
              <DialogTitle>Add New Request Book Details </DialogTitle>
            </DialogHeader>
            {/* <form className=" flex flex-col items-start gap-4"> */}
            <DialogDescription className="text-black">
              <div className="flex flex-col">
                <label htmlFor="title">Title :</label>
                <input
                  type="text"
                  value={requestTitle}
                  onChange={(e) => setRequestTitle(e.target.value)}
                  className="border rounded-xl p-2 "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="author">Author :</label>

                <input
                  type="text"
                  value={requestAuthor}
                  onChange={(e) => setRequestAuthor(e.target.value)}
                  className="border rounded-xl p-2 "
                />
              </div>
              <div className="flex flex-col">
                <label htmlFor="details">Additional details :</label>
                <input
                  type="text"
                  value={requestDescription}
                  onChange={(e) => setRequestDescription(e.target.value)}
                  className="border rounded-xl p-2 "
                />
              </div>
              <button
                type="submit"
                className="border bg-blue-400 hover:bg-blue-900 hover:text-white mt-3 px-4 py-2 rounded-xl w-full"
                onClick={requestBookHandler}
              >
                Request
              </button>
            </DialogDescription>
            {/* </form> */}
          </DialogContent>
        </Dialog>
      </div>

      <div className=" lg:flex lg:justify-center md:flex md:justify-center ">
        <div
          className={` mt-[120px] rounded-xl  h-[80vh]  flex flex-col px-2 pt-2 justify-start ${
            !isOpen
              ? "sm:w-[90vw]  transition-all duration-1000 "
              : "sm:w-[80vw] transition-all duration-1000 "
          } w-screen`}
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
