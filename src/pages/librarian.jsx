import Headerbar from "@/component/headerbar";
import "./librarian.css";
const Librarian = ({ setIsOpen, isOpen }) => {
  return (
    <>
      <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <div className="container1">
        <div className="card">
          <div className="imgbox">
            <img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cG9ydHJhaXQlMjBwaWN8ZW58MHx8MHx8fDA%3D"
              alt="man"
            />
          </div>
          <div className="content">
            <h2 className="h2">Bon Bon </h2>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore,
              dicta?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Librarian;
