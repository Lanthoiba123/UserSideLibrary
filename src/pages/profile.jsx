import Headerbar from "@/component/headerbar";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { PiStudentDuotone } from "react-icons/pi";
import { BASEURL } from "../../constant.js";
function Profile({ setIsOpen, isOpen }) {
  const [profile, setProfile] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      const token=window.localStorage.getItem('token')
      try {
        const res = await fetch(`${BASEURL}/api/student/profile`, {
          // credentials: "include",
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await res.json();
        console.log(data.student);
        setProfile(data.student);
        setLoading(false);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchProfile();
  }, []);
  return (
    <div className="mt-14 h-[calc(100vh-56px)] pt-14 flex justify-center items-start ">
      {loading ? (
        <div className="flex space-x-2 justify-center items-center w-3/4  bg-blue-200 h-40 border border-black rounded-md dark:invert">
          <span className="sr-only">Loading...</span>
          <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.3s]" />
          <div className="h-4 w-4 bg-black rounded-full animate-bounce [animation-delay:-0.15s]" />
          <div className="h-4 w-4 bg-black rounded-full animate-bounce" />
        </div>
      ) : (
        <div className="border flex justify-around items-center border-black p-4 bg-blue-200 w-3/4 rounded-md">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <div>
              <h1>{profile.fullName}</h1>
              <p>{profile.registrationNo}</p>
              <p>{profile.branch?.name}</p>
              <p>{profile.role}</p>
              <p>{profile.email}</p>
            </div>
          </div>
          {profile.role === "Student" ? (
            <PiStudentDuotone size={80} />
          ) : (
            <img
              src="./teacher.png"
              alt="teacher"
              className="h-32 object-cover"
            />
          )}
        </div>
      )}

      {/* {profile && (
        <div className="border flex justify-around items-center border-black p-4 bg-blue-200 w-3/4 rounded-md">
          <div>
            <h1 className="text-xl font-bold">Profile</h1>
            <div>
              <h1>{profile.fullName}</h1>
              <p>{profile.registrationNo}</p>
              <p>{profile.branch?.name}</p>
              <p>{profile.role}</p>
              <p>{profile.email}</p>
            </div>
          </div>
          {profile.role === "Student" ? (
            <PiStudentDuotone size={80} />
          ) : (
            <img
              src="./teacher.png"
              alt="teacher"
              className="h-32 object-cover"
            />
          )}
        </div>
      )} */}
    </div>
  );
}

export default Profile;
