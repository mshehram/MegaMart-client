const SearchBar = ({ setFilterList, products }) => {
  const handleChange = (e) => {
    const value = e.target.value.toLowerCase();

    setFilterList(
      products.filter((item) =>
        item.productName.toLowerCase().includes(value)
      )
    );
  };

  return (
    <div className="relative flex items-center max-w-[650px] h-10 px-4 rounded-2xl bg-[#f2f2f2]">
      <input
        type="text"
        placeholder="Search..."
        onChange={handleChange}
        className="w-full h-full px-2 text-[16px] text-[#333] outline-none bg-transparent border-none"
      />
      <ion-icon
        name="search-outline"
        className="absolute right-4 text-[20px] text-[#999] cursor-pointer"
      ></ion-icon>
    </div>
  );
};

export default SearchBar;
