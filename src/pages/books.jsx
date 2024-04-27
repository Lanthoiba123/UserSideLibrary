import Branch from "../component/branch";
import Headerbar from "../component/headerbar";

const Books = ({ setIsOpen, isOpen }) => {
  return (
    <>
      <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <Branch />
    </>
  );
};

export default Books;
