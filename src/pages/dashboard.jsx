import Borrowedlist from "../component/borrowedlist";
import Headerbar from "../component/headerbar";

const Dashboard = ({ setIsOpen, isOpen }) => {
  return (
    <>
      <div>
        <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
        <Borrowedlist />
      </div>
    </>
  );
};

export default Dashboard;
