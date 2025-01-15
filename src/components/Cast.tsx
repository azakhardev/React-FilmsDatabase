import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FiltersContext } from "../store";
import { getCast } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Profile from "./Profile";
const Cast: React.FC<{ id: string }> = (props) => {
  const context = useContext(FiltersContext);

  const castQuery = useQuery({
    queryKey: ["detail-cast", props.id],
    queryFn: (metaObj) => getCast(props.id, context.filter.category),
  });

  if (castQuery.isError) {
    return (
      <ErrorBlock title="An Error occured!" message={castQuery.error.message} />
    );
  }

  return (
    <div className="flex flex-row gap-2">
      {!castQuery.isLoading && castQuery.data ? (
        castQuery.data.map((c) => <Profile cast={c} key={c.id} />)
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Cast;
