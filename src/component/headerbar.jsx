import { useDisclosure } from "@mantine/hooks";
import { Burger } from "@mantine/core";

function Headerbar({ setIsOpen, isOpen }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <div className="flex bg-blue-500 p-2 items-center z-10 fixed w-screen top-0 left-0">
      <Burger
        opened={opened}
        size="md"
        className="h-8 "
        onClick={() => {
          setIsOpen(!isOpen);
          toggle();
        }}
      />
      <div className="ml-auto text-white sm:text-2xl text-lg  font-medium flex items-center">
        LIBRARY MANAGEMENT SYSTEM
      </div>

      <img
        className=" ml-auto object-contain h-10"
        src="mtuLogo.png"
        alt="MTU LOGO"
      />
    </div>
  );
}

export default Headerbar;
