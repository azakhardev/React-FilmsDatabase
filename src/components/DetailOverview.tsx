import { Detail } from "../models/Detail";
import { Genre } from "../models/Genre";

const DetailOverviev: React.FC<{ data: Detail }> = (props) => {
  // const genres: Genre[] = JSON.parse(localStorage.getItem("genres")!);

  return (
    <div>
      <h2 className="text-center text-[32px] text-[#F05454] font-bold">
        {props.data.title ?? props.data.name}
      </h2>
      <div className="md:grid md:grid-cols-2">
        <div className="flex flex-col gap-2 md:block">
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
          />
          <div className="flex flex-row gap-2 flex-wrap">
            {props.data.genres.map((g) => (
              <div
                className="px-4 py-2 rounded-[16px] bg-blue-500 text-[#E8E8E8] text-center capitalize"
                key={g.id}
              >
                {g.name}
              </div>
            ))}
          </div>
          <p>
            Budget <span className="text-green-400">{props.data.budget}</span>$
          </p>
        </div>
      </div>
    </div>
  );
};

export default DetailOverviev;
