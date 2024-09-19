import { Toaster as HotToaster } from "react-hot-toast";

const Toaster = () => {
  return (
    <HotToaster
      position="top-right"
      reverseOrder={false}
      toastOptions={{
        // Define default options
        duration: 5000,
        style: {
          background: "#333",
          color: "#fff",
        },
        // Default options for specific types
        success: {
          duration: 3000,
          // Removed the theme property to fix the error
        },
      }}
    />
  );
};

export default Toaster;
