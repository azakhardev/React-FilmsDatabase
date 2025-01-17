import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FiltersContext } from "../store";
import { getCast } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Profile from "./Profile";
import { motion } from "framer-motion";

const Cast: React.FC<{ id: string }> = (props) => {
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
    setOffset((oldOffset) => oldOffset - value);
  }

  return (
    <div className="overflow-x-hidden relative">
      <motion.div
        animate={{ left: offset * 250 }}
        className="flex flex-row gap-2 relative"
      >
        {!castQuery.isLoading && castQuery.data ? (
          castQuery.data.map((c) => <Profile cast={c} key={c.id} />)
        ) : (
          <SpinningLoader />
        )}
      </motion.div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            if (offset < 0) changeOffset(-1);
          }}
        >
          Prev
        </button>
        <button
          onClick={() => {
            console.log((castQuery.data!.length * 160) / window.innerWidth);
            console.log((Math.abs(offset) * 160) / window.innerWidth);
            if (
              (castQuery.data!.length * 160) / window.innerWidth >
              (Math.abs(offset) * 160) / window.innerWidth
            )
              changeOffset(1);
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Cast;
