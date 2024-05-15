import Headerbar from "@/component/headerbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { BASEURL } from "../../constant.js";
function Profile({ setIsOpen, isOpen }) {
  const [profile, setProfile] = useState([]);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${BASEURL}/api/student/profile`, {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data.student);
        setProfile(data.student);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="mt-14">
      {profile && (
        <div>
          <h1 className="">Profile</h1>
          <>
            <h1>{profile.fullName}</h1>
            <p>{profile.registrationNo}</p>
            {/* <p>{profile.branch}</p> */}
            <p>{profile.email}</p>
          </>
        </div>
      )}
    </div>
  );
}

export default Profile;
