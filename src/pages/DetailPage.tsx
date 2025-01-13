import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getCast, getDetail, getSimilar, getVideos } from "../http/api-calls";
import { useContext } from "react";
import { FiltersContext } from "../store";
import SpinningLoader from "../components/SpinningLoader";
import ErrorBlock from "../components/ErrorBlock";

const DetailPage: React.FC<{}> = (props) => {
  const { id } = useParams();
  const context = useContext(FiltersContext);

  const detailQuery = useQuery({
    queryKey: ["detail", id],
    queryFn: (metaObj) =>
      getDetail(id!, context.filter.category, context.filter.english),
  });

  const castQuery = useQuery({
    queryKey: ["cast", id],
    queryFn: (metaObj) =>
      getCast(id!, context.filter.category, context.filter.english),
  });

  const similarQuery = useQuery({
    queryKey: ["similar", id],
    queryFn: (metaObj) =>
      getSimilar(id!, context.filter.category, context.filter.english),
  });

  const videosQuery = useQuery({
    queryKey: ["videos", id],
    queryFn: (metaObj) =>
      getVideos(id!, context.filter.category, context.filter.english),
  });

  if (detailQuery.isError) {
    return (
      <ErrorBlock
        title="An Error occured!"
        message={detailQuery.error.message}
      />
    );
  }

  console.log(videosQuery.data);

  return (
    <div className="flex my-1 md:my-4 xl:my-8 flex-col">
      <SpinningLoader />
    </div>
  );
};

export default DetailPage;
