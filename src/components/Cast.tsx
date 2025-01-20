import { useQuery } from "@tanstack/react-query";
import { useContext, useRef, useState } from "react";
import { FiltersContext } from "../store";
import { getCast } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Profile from "./Profile";
import { motion } from "framer-motion";

const Cast: React.FC<{ id: string }> = (props) => {
  const divRef = useRef<HTMLDivElement>(null);
  const context = useContext(FiltersContext);
  const [offset, setOffset] = useState(0);

  const castQuery = useQuery({
    queryKey: ["detail-cast", props.id],
    queryFn: (metaObj) => getCast(props.id, context.filter.category),
  });

  if (castQuery.isError) {
    return (
      <ErrorBlock title="An Error occured!" message={castQuery.error.message} />
    );
  }

  function changeOffset(value: number) {
    setOffset((oldOffset) => oldOffset + value);
  }

  return (
    <div className="overflow-x-hidden relative my-4">
      <h3 className="font-bold text-[24px] text-white">Cast:</h3>
      <motion.div
        ref={divRef}
        animate={{ left: offset * 304 }}
        className="flex flex-row gap-2 relative"
      >
        {!castQuery.isLoading && castQuery.data ? (
          castQuery.data.map((c) => <Profile cast={c} key={c.id} />)
        ) : (
          <SpinningLoader />
        )}
      </motion.div>
      {castQuery.data && castQuery.data?.length > 0 ? (
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
                lastChild.offsetLeft + 154 >
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
      ) : (
        <div className="flex justify-center">Missing cast information.</div>
      )}
    </div>
  );
};

export default Cast;
