import { motion } from "framer-motion";
import { useContext, useRef } from "react";
import { FiltersContext } from "../store";

const NavigationButtons: React.FC<{ totalPages: number }> = (props) => {
  const pageRef = useRef<HTMLInputElement>(null);
  const { filter, updateFilterProperty } = useContext(FiltersContext);

  function handleOnLeaveInput() {
    const filteredPage = parseFloat(pageRef.current!.value);
    if (filteredPage > 0 && filteredPage <= props.totalPages)
      updateFilterProperty("page", pageRef.current!.value);
  }

  return (
    <div className="flex flex-row justify-between my-2 mx-6 md:mx-10 lg:mx-14    ">
      <motion.button
        onClick={() => {
          if (filter.page > 1) {
            updateFilterProperty("page", filter.page - 1);
          }
        }}
        className="bg-[#A64D79] py-2 px-6 rounded-lg"
      >
        <i className="bx bx-chevrons-left text-[36px]"></i>
      </motion.button>
      <div className="flex items-center text-white">
        <input
          min={1}
          max={props.totalPages}
          step={1}
          ref={pageRef}
          type="number"
          onBlur={handleOnLeaveInput}
          className="w-[50px] p-0 text-center"
          defaultValue={filter.page}
        />
        /{props.totalPages}
      </div>
      <motion.button
        onClick={() => {
          if (filter.page < props.totalPages) {
            updateFilterProperty("page", filter.page + 1);
          }
        }}
        className="bg-[#A64D79] py-2 px-6 rounded-lg"
      >
        <i className="bx bx-chevrons-right text-[36px]"></i>
      </motion.button>
    </div>
  );
};
export default NavigationButtons;
