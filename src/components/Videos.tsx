import { Video } from "../models/Video";

const Videos: React.FC<{ videos: Video[] }> = (props) => {
  return (
    <div>
      {props.videos.map((v) => (
        <iframe
          key={v.id}
          //   width="560"
          //   height="315"
          src={`https://www.youtube.com/embed/${v.key}`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      ))}
    </div>
  );
};

export default Videos;
