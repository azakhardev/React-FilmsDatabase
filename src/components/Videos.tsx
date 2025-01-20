import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { FiltersContext } from "../store";
import { getVideos } from "../http/api-calls";
import ErrorBlock from "./ErrorBlock";
import SpinningLoader from "./SpinningLoader";
const Videos: React.FC<{ id: number }> = (props) => {
  const context = useContext(FiltersContext);
  const [currentVideo, setCurrentVideo] = useState<string>("");

  const videosQuery = useQuery({
    queryKey: ["detail-videos", props.id],
    queryFn: () => getVideos(props.id, context.filter.category),
  });

  if (videosQuery.isError) {
    return (
      <ErrorBlock
        title="An Error occured!"
        message={videosQuery.error.message}
      />
    );
  }

  function handlePlay(key: string) {
    setCurrentVideo(key);
  }

  return (
    <div className="flex flex-col gap-5">
      {!videosQuery.isLoading &&
      videosQuery.data &&
      videosQuery.data.length > 0 ? (
        <>
          <div className="flex-1">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${
                currentVideo === "" ? videosQuery.data[0].key : currentVideo
              }`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-2">
            {videosQuery.data.length > 1 &&
              videosQuery.data.map((v) => (
                <div
                  key={v.key}
                  className="flex-1 flex justify-center cursor-pointer"
                  onClick={() => handlePlay(v.key)}
                >
                  <iframe
                    width="100%"
                    src={`https://www.youtube.com/embed/${v.key}`}
                    title="YouTube video player"
                    style={{ pointerEvents: "none" }}
                  ></iframe>
                </div>
              ))}
          </div>
        </>
      ) : !videosQuery.isLoading && videosQuery.data ? (
        <div className="bg-slate-500 rounded-[25px] flex h-[100%] justify-center items-center text-white text-[25px] text-center">
          There are no trailers for this movie
        </div>
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default Videos;
