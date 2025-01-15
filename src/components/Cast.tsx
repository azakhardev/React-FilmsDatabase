import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FiltersContext } from "../store";
import { getCast } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
const Cast: React.FC<{ id: string }> = (props) => {
  const context = useContext(FiltersContext);

  const castQuery = useQuery({
    queryKey: ["cast", props.id],
    queryFn: (metaObj) =>
      getCast(props.id, context.filter.category, context.filter.english),
  });

  if (castQuery.isError) {
    return (
      <ErrorBlock title="An Error occured!" message={castQuery.error.message} />
    );
  }

  return (
    <div>
      {!castQuery.isLoading && castQuery.data ? (
        castQuery.data.map((c) => <div key={c.id}>{c.name}</div>)
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Cast;
