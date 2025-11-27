import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";

const NavBar = () => {
  const { cartList } = useSelector((state) => state.cart);
  const [expand, setExpand] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState({ email: "", name: "", role: "user" });

  useEffect(() => {
    const scrollHandler = () => {
      if (window.scrollY >= 100) setIsFixed(true);
      else if (window.scrollY <= 50) setIsFixed(false);
    };
    window.addEventListener("scroll", scrollHandler);
    return () => window.removeEventListener("scroll", scrollHandler);
  }, []);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("loggedUser"));
    if (storedUser)
      setProfileData({
        email: storedUser.email,
        name: storedUser.name || storedUser.email,
        role: storedUser.role || "user",
      });
  }, [user]);

  const handleProtectedClick = (e, path) => {
    if (!user) {
      e.preventDefault();
      toast.info("Please login first");
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  const handleLogout = () => {
    logout();
    setProfileData({ email: "", name: "", role: "user" }); // reset to hide Dashboard
    setProfileOpen(false);
    setExpand(false);
  };

  return (
    <nav className={`${isFixed ? "fixed top-0 left-0 w-screen" : "relative"} bg-white shadow-md transition-all duration-300 z-50`}>
      <div className="max-w-[78rem] mx-auto flex justify-between items-center px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <ion-icon name="bag"></ion-icon>
          <h1 className="text-black text-2xl font-medium">MegaMart</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden sm:flex items-center gap-6">
          <Link to="/" className="text-black px-2 py-1">Home</Link>
          <Link to="/shop" onClick={(e) => handleProtectedClick(e, "/shop")} className="text-black px-2 py-1">Shop</Link>
          <Link to="/cart" onClick={(e) => handleProtectedClick(e, "/cart")} className="text-black px-2 py-1 relative">
            Cart
            {cartList.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#0f3460] text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                {cartList.length}
              </span>
            )}
          </Link>

          {/* Dashboard only for admin */}
          {profileData.role === "admin" && (
            <Link to="/admin" className="text-black px-2 py-1">Dashboard</Link>
          )}

          {!user ? (
            <button onClick={() => navigate("/login")} className="bg-[#0f3460] text-white px-3 py-1 rounded">Login</button>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-full px-3 py-1 bg-[#0f3460] text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border shadow-lg rounded-md z-50">
                  <div className="px-4 py-2 border-b bg-gray-100 font-semibold text-gray-700">User Profile</div>
                  <div className="px-4 py-2 text-gray-800">
                    <p className="font-medium">{profileData.name}</p>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2 text-white bg-[#0f3460] hover:bg-[#162a4d] rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="sm:hidden text-black text-2xl" onClick={() => setExpand(!expand)}>
          {expand ? <ion-icon name="close"></ion-icon> : <ion-icon name="menu"></ion-icon>}
        </button>
      </div>

      {/* Mobile Menu */}
      {expand && (
        <div className="sm:hidden flex flex-col bg-white shadow-md px-4 pb-4 gap-2">
          <Link to="/" onClick={() => setExpand(false)} className="text-black">Home</Link>
          <Link to="/shop" onClick={(e) => { handleProtectedClick(e, "/shop"); setExpand(false); }} className="text-black">Shop</Link>
          <Link to="/cart" onClick={(e) => { handleProtectedClick(e, "/cart"); setExpand(false); }} className="text-black">Cart ({cartList.length})</Link>

          {profileData.role === "admin" && (
            <Link to="/admin" onClick={() => setExpand(false)} className="text-black">Dashboard</Link>
          )}

          {!user ? (
            <button onClick={() => { navigate("/login"); setExpand(false); }} className="bg-[#0f3460] text-white px-3 py-1 rounded mt-2">Login</button>
          ) : (
            <div className="relative">
              <button onClick={() => setProfileOpen(!profileOpen)} className="flex items-center gap-2 rounded-full px-3 py-1 bg-[#0f3460] text-white w-full justify-center mt-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" className="w-5 h-5">
                  <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                </svg>
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white border shadow-lg rounded-md z-50">
                  <div className="px-4 py-2 border-b bg-gray-100 font-semibold text-gray-700">User Profile</div>
                  <div className="px-4 py-2 text-gray-800">
                    <p className="font-medium">{profileData.name}</p>
                    <p className="text-sm text-gray-500">{profileData.email}</p>
                  </div>
                  <button 
                    onClick={handleLogout} 
                    className="w-full text-left px-4 py-2 text-white bg-[#0f3460] hover:bg-[#162a4d] rounded-b-md"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
