import React from "react";
import { FaChevronDown } from "react-icons/fa";
import { Link } from "react-router-dom";
const NavigationAccordion = ({ subNavList = [], item }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className=" w-full px-4 py-3 gap-2 flex items-center justify-between uppercase rounded-lg hover:bg-dark/50 hover:transform hover:translate-x-1 duration-200 ease-in-out "
      >
        <div className="flex items-center gap-2">
          {item.icon} {item.label}
        </div>
        <FaChevronDown />
      </button>

      {isOpen && (
        <ul className="self-start  w-full">
          {subNavList.map((item, key) => {
            return (
              <li className=" w-full  " key={key}>
                <Link to={item.path} className="w-full pl-10 block hover:bg-black/50 ">
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
};

export default NavigationAccordion;
