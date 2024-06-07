import { books } from "./booksData";
import { useState, useEffect } from "react";
import { BASEURL } from "../../constant";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Branch = ({ isOpen }) => {
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [records, setRecords] = useState([]);

  // function handleFilter(event) {
  //   console.log(event.target.value);
  //   const newBookData = records.filter((book) => {
  //     return book.title
  //       .toLowerCase()
  //       .includes(event.target.value.toLowerCase());
  //   });
  //   setRecords(newBookData);
  // }

  const [branch, setBranch] = useState([]);

  useEffect(() => {
    const fetchBranch = async () => {
      const res = await fetch(`${BASEURL}/api/branch`);
      const data = await res.json();
      setBranch(data.data);
    };
    const fetchBooks = async () => {
      const res = await fetch(`${BASEURL}/api/book/get`);
      const data = await res.json();
      console.log(data);
      setRecords(data.book);
      setFilteredBooks(data.book);
    };
    fetchBranch();
    fetchBooks();
  }, []);

  const handleInputChange = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);
    if (searchTerm === "") {
      setFilteredBooks(records);
    } else {
      const filtered = records.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredBooks(filtered);
    }
  };

  const handleBranchInput = (value) => {
    if (value === "all_branch") {
      setFilteredBooks(records);
      return;
    }
    const filtered = records.filter((item) => item.branch._id === value);
    setFilteredBooks(filtered);
  };

  return (
    <>
      <div className=" w-screen  h-11 bg-white sm:mt-[56px] mt-[55px] fixed flex sm:items-center items-center justify-around gap-6  ">
        <input
          className="border rounded-2xl border-gray-600 placeholder:text-xs sm:ml-40 ml-2"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search book name..."
        />
        <Select onValueChange={handleBranchInput}>
          <SelectTrigger className="h-7 w-[300px] sm:ml-40 mr-3 border rounded-2xl border-gray-600 sm:px-2">
            <SelectValue placeholder="All Branch Books" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {/* <SelectLabel>Branch Books</SelectLabel> */}
              <SelectItem value="all_branch">All Branch Books</SelectItem>
              {branch.map((item) => (
                <SelectItem
                  key={item._id}
                  onClick={() => filterRecords(item._id)}
                  value={item._id}
                >
                  {item.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div
        className={` ${
          isOpen ? "grid-cols-1" : null
        } sm:mt-[6em] mt-[6rem] grid   items-stretch xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-y-[16px] gap-8 px-[40px] py-6 grid-cols-2 `}
      >
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="sm:w-[12em] w-[150px]  h-30 flex flex-col  gap-y-1 rounded-md overflow-hidden"
          >
            <img
              className="sm:w-full sm:h-[18em]   rounded-md"
              src={`https://drive.google.com/thumbnail?id=${book.image_url}&sz=w1000-h1000`}
              alt="None"
            />
            <div className="bg-white px-3 py-1 h-full flex flex-col justify-center items-start text-sm rounded-md font-sans">
              <p>Name:{book.title}</p>
              <p>Writer: {book.author}</p>
              <p>No. of Books: {book.copiesOwned}</p>
              <p>Available Books: {book.copiesAvailable}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Branch;
