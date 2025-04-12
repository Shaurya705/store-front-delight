
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the product listing page
    navigate("/");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-t-shop-blue border-gray-200 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-shop-text">Loading...</p>
      </div>
    </div>
  );
};

export default Index;
