import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { FiltersContext } from "../store";
import { getVideos } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
const Videos: React.FC<{ id: string }> = (props) => {
  const context = useContext(FiltersContext);

  const videosQuery = useQuery({
    queryKey: ["cast", props.id],
    queryFn: (metaObj) =>
      getVideos(props.id, context.filter.category, context.filter.english),
  });

  if (videosQuery.isError) {
    return (
      <ErrorBlock
        title="An Error occured!"
        message={videosQuery.error.message}
      />
    );
  }

  return (
    <div>
      {!videosQuery.isLoading && videosQuery.data ? (
        videosQuery.data.map((v) => (
          <iframe
            key={v.id}
            //   width="560"
            //   height="315"
            src={`https://www.youtube.com/embed/${v.key}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        ))
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Videos;
