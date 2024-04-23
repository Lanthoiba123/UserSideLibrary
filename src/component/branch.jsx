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
  const [records, setRecords] = useState([]);

  useEffect(() => {
    setRecords(books);
  }, []);

  function handleFilter(event) {
    console.log(event.target.value);
    const newBookData = books.filter((book) => {
      return book.Book.toLowerCase().includes(event.target.value.toLowerCase());
    });
    setRecords(newBookData);
  }

  const [branch, setBranch] = useState([]);
  // // const [email, setBranch] = useState("");

  useEffect(() => {
    const fetchBranch = async () => {
      const res = await fetch(`${BASEURL}/api/branch`);
      const data = await res.json();
      setBranch(data.data);
    };
    fetchBranch();
  }, []);
  return (
    <>
      <div className="w-full  h-11 bg-white mt-[56px] fixed flex items-center">
        <input
          className="border rounded-2xl border-gray-600 pl-3 placeholder:text-xs ml-40"
          type="text"
          onChange={handleFilter}
          placeholder="Search book name..."
        />
        <Select>
          <SelectTrigger className="h-7 w-[300px] ml-40 border rounded-2xl border-gray-600 px-2">
            <SelectValue placeholder="All Branch Books" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>List</SelectLabel>
              {branch.map((item) => (
                <SelectItem
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
      <div className=" mt-[6em] grid xl:grid-cols-6 lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-2 gap-y-[16px] gap-8 px-[40px] py-6 ">
        {records.map((book) => {
          return (
            <div
              key={book.id}
              className="w-[12em] h-[26em] flex flex-col  gap-y-1 rounded-md overflow-hidden"
            >
              <img
                className="w-full h-[18em] object-cover rounded-md"
                src={book.url}
                alt=""
              />
              <div className="bg-white px-3 py-1 text-sm rounded-md font-sans">
                <p>Name:{book.Book}</p>
                <p>Writer: {book.Writer}</p>
                <p>No. of Books: {book.No_of_Books}</p>
                <p>Available Books: {book.Available_Books}</p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Branch;
