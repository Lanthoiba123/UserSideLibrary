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

const Branch = () => {
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
      <div className="w-full  h-11 bg-white mt-[56px] fixed flex items-center">
        <input
          className="border rounded-2xl border-gray-600 pl-3 placeholder:text-xs ml-40"
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          placeholder="Search book name..."
        />
        <Select onValueChange={handleBranchInput}>
          <SelectTrigger className="h-7 w-[300px] ml-40 border rounded-2xl border-gray-600 px-2">
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
      <div className=" mt-[6em] grid items-stretch xl:grid-cols-5 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-y-[16px] gap-8 px-[40px] py-6 ">
        {filteredBooks.map((book) => (
          <div
            key={book._id}
            className="w-[12em]  flex flex-col  gap-y-1 rounded-md overflow-hidden"
          >
            <img
              className="w-full h-[18em] object-cover rounded-md"
              src={`https://drive.google.com/thumbnail?id=${book.image_url}`}
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
