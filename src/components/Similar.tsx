import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { FiltersContext } from "../store";
import { getSimilar } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Card from "./Card";
import { motion } from "framer-motion";
import { Movie } from "../models/Movie";

const Similar: React.FC<{ id: string }> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  const context = useContext(FiltersContext);
  const similarQuery = useQuery({
    queryKey: ["detail-similar", props.id],
    queryFn: () =>
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

  function changeOffset(value: number) {
    setOffset((oldOffset) => oldOffset + value);
  }

  return (
    <div className="overflow-x-hidden relative">
      <h3 className="font-bold text-[24px] text-white mb-4">Cast:</h3>
      {!similarQuery.isLoading && similarQuery.data ? (
        <>
          <motion.div
            ref={divRef}
            animate={{ left: offset * 495 }}
            transition={{ type: "keyframes" }}
            className="flex flex-row gap-2 relative cursor-pointer"
          >
            {similarQuery.data.map((s: Movie) => {
              s.overview = "Click for more details";
              return (
                <Card
                  minWidth={240}
                  key={s.id}
                  movie={s}
                  className={`rounded-2xl p-5 border-solid select-none border-[#3B1C32] border-[1px] min-w-[240px] bg-[#6A1E55] max-h-[1000px] overflow-hidden text-[#F0F0F0]`}
                />
              );
            })}
          </motion.div>
          <div className="flex justify-between mt-2">
            <button
              onClick={() => {
                if (offset < 0) changeOffset(1);
              }}
            >
              <i
                className="bx bx-left-arrow-circle"
                style={{ color: "#A05283", fontSize: 50 }}
              ></i>
            </button>
            <button
              onClick={() => {
                const lastChild = divRef.current!.lastChild as HTMLDivElement;
                if (
                  lastChild.offsetLeft + 240 >
                  Math.abs(
                    divRef.current!.offsetLeft - divRef.current!.offsetWidth
                  )
                )
                  changeOffset(-1);
              }}
            >
              <i
                className="bx bx-right-arrow-circle"
                style={{ color: "#A05283", fontSize: 50 }}
              ></i>
            </button>
          </div>
        </>
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Similar;
