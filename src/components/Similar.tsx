import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FiltersContext } from "../store";
import { getSimilar } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
import Card from "./Card";
import { useParams } from "react-router-dom";

const Similar: React.FC<{ id: string }> = (props) => {
  const context = useContext(FiltersContext);
  const params = useParams();
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

  return (
    <div className="flex flex-row gap-2 overflow-x-hidden overflow-y-visible">
      {!similarQuery.isLoading && similarQuery.data ? (
        similarQuery.data.map((s) => (
          <Card minWidth={240} key={s.id} movie={s} />
        ))
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Similar;
