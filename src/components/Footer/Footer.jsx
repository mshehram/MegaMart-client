const Footer = () => {
  return (
    <footer className="bg-[#0f3460] text-white py-20">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-[1fr_1fr_1fr_1.5fr] gap-8 justify-center">
        <div className="px-5">
          <div className="flex items-center gap-2 mb-5">
            <ion-icon name="bag"></ion-icon>
            <h1 className="text-[25px] font-extrabold w-max">MegaMart</h1>
          </div>
          <p className="text-[16px] mb-5 opacity-50 text-justify">
            MegaMart is your one-stop destination for quality products,
            unbeatable prices, and seamless shopping experiences. We’re
            committed to delivering excellence, reliability, and satisfaction to
            every customer  every time.
          </p>
        </div>

        <div className="px-5">
          <h2 className="text-[20px] mb-5">About Us</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">Careers</li>
            <li className="mb-2 opacity-50">Our Stores</li>
            <li className="mb-2 opacity-50">Our Cares</li>
            <li className="mb-2 opacity-50">Terms & Conditions</li>
            <li className="mb-2 opacity-50">Privacy Policy</li>
          </ul>
        </div>

        <div className="px-5">
          <h2 className="text-[20px] mb-5">Customer Care</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">Help Center</li>
            <li className="mb-2 opacity-50">How to Buy</li>
            <li className="mb-2 opacity-50">Track Your Order</li>
            <li className="mb-2 opacity-50">Corporate & Bulk Purchasing</li>
            <li className="mb-2 opacity-50">Returns & Refunds</li>
          </ul>
        </div>

        <div className="px-5 min-w-[200px]">
          <h2 className="text-[20px] mb-5">Contact Us</h2>
          <ul className="p-0">
            <li className="mb-2 opacity-50">
              Near Tehsil Chowk, Chakwal, Punjab, Pakistan Postal Code: 48800
            </li>
            <li className="mb-2 opacity-50">Email: m.shehram01@gmail.com</li>
            <li className="mb-2 opacity-50">Phone: 0314 7725250</li>
            <li className="mb-2 opacity-50">Instagram: m_shehram01</li>
            <li className="mb-2 opacity-50">Facebook: M Shehram</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-60">
        <p>
          © {new Date().getFullYear()} MegaMart. All Rights Reserved. | Made by{" "}
          <span className="font-semibold text-white">Muhammad Shehram</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
