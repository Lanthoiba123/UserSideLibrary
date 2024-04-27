import Headerbar from "@/component/headerbar";

function Profile({ setIsOpen, isOpen }) {
  return (
    <>
      <Headerbar setIsOpen={setIsOpen} isOpen={isOpen} />
      <h1>Profile</h1>
    </>
  );
}

export default Profile;
