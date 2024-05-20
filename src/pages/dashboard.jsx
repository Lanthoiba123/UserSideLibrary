import Borrowedlist from "../component/borrowedlist";
import Headerbar from "../component/headerbar";

const Dashboard = ({ setIsOpen, isOpen }) => {
  return <Borrowedlist setIsOpen={setIsOpen} isOpen={isOpen} />;
};

export default Dashboard;
