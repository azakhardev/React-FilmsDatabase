import { Detail } from "../models/Detail";
import Videos from "./Videos";

const DetailOverview: React.FC<{ data: Detail }> = (props) => {
  // const genres: Genre[] = JSON.parse(localStorage.getItem("genres")!);

  return (
    <div>
      <h2 className="text-center text-[32px] text-[#F05454] font-bold">
        {props.data.title ?? props.data.name}
      </h2>
      <h4 className="text-center text-[20px] italic">{props.data.tagline}</h4>
      <div className="flex flex-col gap-2 justify-center items-center visible xl:hidden">
        <div>
          <img
            src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
          />
        </div>
        <div className="flex flex-row gap-2 flex-wrap mt-1 md:my-3">
          {props.data.genres.map((g) => (
            <div
              className="px-4 py-2 rounded-[16px] bg-blue-500 text-[#E8E8E8] text-center capitalize"
              key={g.id}
            >
              {g.name}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[32px] md:grid md:grid-cols-2 xl:grid-cols-3">
        <div className="xl:flex flex-col gap-2 hidden xl:visible">
          <div>
            <img
              src={`https://image.tmdb.org/t/p/w500/${props.data.poster_path}`}
            />
          </div>
          <div className="flex flex-row gap-2 flex-wrap mt-1 md:my-3">
            {props.data.genres.map((g) => (
              <div
                className="px-4 py-2 rounded-[16px] bg-blue-500 text-[#E8E8E8] text-center capitalize"
                key={g.id}
              >
                {g.name}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-start px-[5%] md:px-0 md:max-w-[400px] xl:max-w-[620px]">
          <div className="text-[#E8E8E8]">
            <p>
              <strong className=" text-[17px]">Home Page:</strong>
              <a
                className="underline text-blue-500"
                href={props.data.homepage !== null ? props.data.homepage : ""}
              >
                {props.data.homepage !== "" ? props.data.homepage : "N/A"}
              </a>
            </p>
            <p>
              <strong className=" text-[17px]">IMDb: </strong>
              <a
                className=" underline text-blue-500"
                href={`https://www.imdb.com/${
                  props.data.imdb_id && "title/" + props.data.imdb_id
                }`}
              >
                IMDb
              </a>
            </p>
            <p>
              <strong className=" text-[17px]">Budget: </strong>
              <span className="text-green-400">
                {separateDigits(props.data.budget) ?? "N/A"} $
              </span>
            </p>
            <p>
              <strong className="text-[17px]">Revenue: </strong>
              <span className="text-green-400">
                {separateDigits(props.data.revenue)} $
              </span>
            </p>
            <p>
              <strong className="text-[17px]">Release Date: </strong>
              <span className="">
                {(props.data.release_date ?? props.data.first_air_date)
                  .split("-")
                  .reverse()
                  .map((s, i) => (i !== 2 ? s + ". " : s))}
              </span>
            </p>
            <p>
              <strong className="text-[17px]">Run Time: </strong>
              <span>{props.data.runtime} min</span>
            </p>
            <p>
              <strong className="text-[17px]">Rating: </strong>
              <span>{props.data.vote_average}</span>
            </p>
            <p>
              <strong className="text-[17px]">Number of Votes: </strong>
              <span>{props.data.vote_count}</span>
            </p>
            <p>
              <strong className="text-[17px]">Status: </strong>
              <span>{props.data.status}</span>
            </p>
            <strong className=" block text-[17px]">
              Production Companies:{" "}
            </strong>
            <div className="flex flex-row flex-wrap gap-5">
              {props.data.production_companies.map(
                (c) =>
                  c.logo_path !== null && (
                    <div
                      key={c.id}
                      className="flex w-[140px] h-[100px] flex-col gap-2 justify-center items-center bg-white p-5 rounded-[50%] cursor-pointer"
                    >
                      <img
                        className="w-[100%] object-fill"
                        src={`https://image.tmdb.org/t/p/original/${c.logo_path}`}
                        title={c.name}
                      />
                    </div>
                  )
              )}
            </div>
            <p className="text-justify">
              {props.data.overview !== ""
                ? props.data.overview
                : "There is no overview for this move so far."}
            </p>
          </div>
        </div>
        <Videos id={props.data.id} />
      </div>
    </div>
  );
};

function separateDigits(value: number): string {
  if (!value) {
    return "N/A";
  }

  const oldString = value.toString();
  let separatedDigits: string = "";

  let iteration = 0;
  for (let index = oldString.length - 1; index > 0; index--) {
    if (iteration % 3 === 0 && iteration !== 0)
      separatedDigits = "." + separatedDigits;
    iteration++;

    separatedDigits = oldString[index] + separatedDigits;
  }

  return separatedDigits;
}
export default DetailOverview;
