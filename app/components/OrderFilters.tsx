import FilterButton from "./FilterButton";
import { BiSortAlt2 } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import { MdRefresh } from "react-icons/md";
import { FaSearch } from "react-icons/fa";

const OrderFilters = () => {
  const handleAllOrder = () => {};
  const handleUnFulFilled = () => {};
  const handleAddNewCustomer = () => {};

  const leftFilterButtons = [
    {
      id: 1,
      title: "All Orders",
      handleClick: handleAllOrder,
      className: "w-15 text-sm bg-[#0F0F10]",
    },
    {
      id: 2,
      title: "Unfullfilled",
      handleClick: handleUnFulFilled,
      className: "w-15 text-sm bg-[#0F0F10]",
    },
    {
      id: 3,
      title: "+",
      handleClick: handleAddNewCustomer,
      className:
        "text-xl text-black bg-white hover:bg-[#333337] hover:text-white",
    },
  ];

  const rightFilterButtons = [
    {
      id: 1,
      title: <BiSortAlt2 />,
      handleClick: handleAllOrder,
      className:
        "text-xl text-white bg-[#0F0F10] hover:bg-white hover:text-black",
    },
    {
      id: 2,
      title: <IoFilterSharp />,
      handleClick: handleAllOrder,
      className:
        "text-xl text-white bg-[#0F0F10] hover:bg-white hover:text-black",
    },
    {
      id: 3,
      title: <MdRefresh />,
      handleClick: handleAllOrder,
      className:
        "text-xl text-white bg-[#0F0F10] hover:bg-white hover:text-black",
    },
    {
      id: 4,
      title: <FaSearch />,
      handleClick: handleAllOrder,
      className:
        "text-white bg-[#0F0F10] hover:bg-white hover:text-black",
    },
  ];

  return (
    <div className="w-full flex justify-between items-center">
      <div className="w-full flex gap-3">
        {leftFilterButtons.map((button) => (
          <FilterButton
            key={button.id}
            title={button.title}
            handleClick={button.handleClick}
            className={button.className}
          />
        ))}
      </div>
      <div className="w-full flex gap-3 justify-end">
        {rightFilterButtons.map((button) => (
          <FilterButton
            key={button.id}
            title={button.title}
            handleClick={button.handleClick}
            className={button.className}
          />
        ))}
      </div>
    </div>
  );
};

export default OrderFilters;
