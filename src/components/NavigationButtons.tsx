import { motion } from "framer-motion";
import { useContext } from "react";
import { FiltersContext } from "../store";

function NavigationButtons() {
  const { filter, updateFilterProperty: updateFilter } =
    useContext(FiltersContext);

  return (
    <div className="flex flex-row justify-between my-2 mx-6 md:mx-10 lg:mx-14    ">
      <motion.button
        onClick={() => {
          if (filter.page > 1) {
            updateFilter("page", filter.page - 1);
          }
        }}
        className="bg-[#A64D79] py-2 px-6 rounded-lg"
      >
        <i className="bx bx-chevrons-left text-[36px]"></i>
      </motion.button>
      <div className="flex items-center text-white">{filter.page}/100</div>
      <motion.button
        onClick={() => {
          if (filter.page < 100) {
            updateFilter("page", filter.page + 1);
          }
        }}
        className="bg-[#A64D79] py-2 px-6 rounded-lg"
      >
        <i className="bx bx-chevrons-right text-[36px]"></i>
      </motion.button>
    </div>
  );
}
export default NavigationButtons;
