import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getMyCampgrounds } from "../features/campgrounds/campgroundsSlice";
import Campground from "./Campground";
import Spinner from "./Spinner";

const CampgroundList = () => {
  const dispatch = useDispatch();
  const { isLoading, isError } = useSelector((state) => state.campgrounds);
  const myCampgrounds = useSelector((state) => state.campgrounds.myCampgrounds);
  console.log(myCampgrounds);

  useEffect(() => {
    dispatch(getMyCampgrounds());
  }, [dispatch]);

  return (
    <div>
      <h2>My Campgrounds</h2>
      {isLoading && <Spinner />}
      {isError && <div className="error">Something went wrong...</div>}
      <div className="campgrounds">
        {myCampgrounds.map((campground) => (
          <Campground key={campground._id} campground={campground} />
        ))}
      </div>
    </div>
  );
};

export default CampgroundList;
