const SearchInput = ({ value='', placeholder='Search Image', type='text', onChange }) => {

  const handleChange = (e) => {
    onChange(e.target.value)
  }

  return (
    <input
      value={value}
      placeholder={placeholder}
      type={type}
      onChange={(e) => handleChange(e)}
      className="px-5 py-1 w-1/3 sm:px-5 sm:py-2 flex-1 text-black bg-zinc-100 focus:bg-zinc-200 rounded-full focus:outline-none focus:ring-[1px] focus:ring-blue-900 placeholder:text-zinc-400"  
    />
  );
};

export default SearchInput;
