import { useQuery } from "@tanstack/react-query";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getDetail, getSimilar, getVideos } from "../http/api-calls";
import { useContext, useEffect } from "react";
import { FiltersContext } from "../store";
import SpinningLoader from "../components/SpinningLoader";
import ErrorBlock from "../components/ErrorBlock";
import DetailOverviev from "../components/DetailOverview";
import Similar from "../components/Similar";
import Cast from "../components/Cast";

const DetailPage: React.FC<{}> = (props) => {
  const { id } = useParams();
  const context = useContext(FiltersContext);

  const detailQuery = useQuery({
    queryKey: ["detail", id],
    queryFn: (metaObj) =>
      getDetail(id!, context.filter.category, context.filter.english),
  });

  if (detailQuery.isError) {
    return (
      <ErrorBlock
        title="An Error occured!"
        message={detailQuery.error.message}
      />
    );
  }

  return (
    <div className="mx-2 flex my-1 md:my-4 xl:my-8 flex-col justify-center text-[#A6A6A6] md:mx-[100px] xl:mx-[150px] 2xl:mx-[200px]">
      {!detailQuery.isLoading && detailQuery.data ? (
        <>
          <Link
            to={"/"}
            className="sticky md:absolute top-[10px] left-[10px] px-5 py-2 bg-blue-500 rounded z-[1] flex justify-center"
          >
            <i
              className="bx bx-home-alt-2 text-[32px]"
              style={{ color: "white" }}
            ></i>
          </Link>
          <DetailOverviev data={detailQuery.data} />
          <Cast id={id!} />
          {/* <Videos id={id!} /> */}
          <Similar id={id!} />
        </>
      ) : (
        <SpinningLoader />
      )}
    </div>
  );
};

export default DetailPage;
