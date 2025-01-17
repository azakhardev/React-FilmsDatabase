import { Cast } from "../models/Cast";

const Profile: React.FC<{ cast: Cast }> = (props) => {
  // function handleMouseOver(
  //   event: React.MouseEvent<HTMLImageElement>,
  //   src: string
  // ) {
  //   event.screenX;
  //   event.screenY;
  //   const path = `https://image.tmdb.org/t/p/w185/${src}`;
  // }

  return (
    <div
      {...props}
      className="flex flex-col justify-center items-center border-[1px] border-[#B0BEC5] rounded p-4 text-center"
    >
      <div className="rounded-[50%] w-[120px] h-[120px] overflow-hidden flex items-center">
        <img
          // onMouseOver={(event) =>
          //   handleMouseOver(event, props.cast.profile_path)
          // }
          src={
            props.cast.profile_path
              ? `https://image.tmdb.org/t/p/w185/${props.cast.profile_path}`
              : "/Missing_PfP.jpg"
          }
          className="object-cover w-[100%] h-[100%]"
        />
      </div>
      <p>
        <strong>{props.cast.name}</strong> as{" "}
        <span className="italic">
          {props.cast.character ?? props.cast.name}
        </span>
      </p>
    </div>
  );
};

export default Profile;
