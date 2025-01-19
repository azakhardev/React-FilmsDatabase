import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { FiltersContext } from "../store";
import { getSimilar } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Card from "./Card";
import { motion } from "framer-motion";

const Similar: React.FC<{ id: string }> = (props) => {
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [offset, setOffset] = useState(0); // Tracks the scroll position
  const startX = useRef(0); // Tracks the initial mouse position during drag

  const context = useContext(FiltersContext);
  const similarQuery = useQuery({
    queryKey: ["detail-similar", props.id],
    queryFn: (metaObj) =>
      getSimilar(props.id, context.filter.category, context.filter.english),
  });

  if (similarQuery.isError) {
    return (
      <ErrorBlock
        title="An Error occured!"
        message={similarQuery.error.message}
      />
    );
  }

  const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    setIsMouseDown(true);
    startX.current = event.clientX;
  };

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isMouseDown) {
      const distance = event.clientX - startX.current;
      setOffset((prevOffset) => prevOffset + distance);
      startX.current = event.clientX;
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  return (
    <div
      className="overflow-x-hidden py-5 my-5 relative"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseUp}
      onMouseUp={handleMouseUp}
      draggable={false}
    >
      <h3 className="font-bold text-[24px] text-white mb-4">Cast:</h3>
      {!similarQuery.isLoading && similarQuery.data ? (
        <motion.div
          animate={{ left: offset }}
          transition={{ type: "keyframes" }}
          className="flex flex-row gap-2 relative cursor-grab"
        >
          {similarQuery.data.map((s) => (
            <Card
              minWidth={240}
              key={s.id}
              movie={s}
              className={`rounded-2xl p-5 border-solid select-none border-[#3B1C32] border-[1px] min-w-[240px] bg-[#6A1E55] max-h-[1000px] overflow-hidden text-[#F0F0F0]`}
            />
          ))}
        </motion.div>
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Similar;
