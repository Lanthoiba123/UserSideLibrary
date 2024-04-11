import Borrowedlist from "../component/borrowedlist";
import Headerbar from "../component/headerbar";

const Dashboard = () => {
  return (
    <>
      <div>
        <Headerbar />
        <Borrowedlist />
      </div>
    </>
  );
};

export default Dashboard;
