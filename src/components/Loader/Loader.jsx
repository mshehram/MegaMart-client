import { RotateLoader } from "react-spinners";

const Loader = () => {
  return (
    <div className="fixed left-0 top-0 w-screen h-screen bg-[#f6f9fc] flex justify-center items-center">
      <RotateLoader
        color="#0f3460"
        size={20}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
};

export default Loader;


