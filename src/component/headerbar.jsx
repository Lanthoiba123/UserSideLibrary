function Headerbar() {
  return (
    <div className="grid grid-cols-3 bg-blue-500 p-2 rounded">
      <div />
      <div className="text-center text-white text-2xl font-medium">
        LIBRARY MANAGEMENT SYSTEM
      </div>
      <div className="justify-self-end">
        <img
          className=" object-contain h-10"
          src="mtuLogo.png"
          alt="MTU LOGO"
        />
      </div>
    </div>
  );
}

export default Headerbar;
