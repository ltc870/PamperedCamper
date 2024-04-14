import { useSelector, useDispatch } from "react-redux";
import { addCampground } from "../features/campgrounds/campgroundsSlice";
import { deleteCampground } from "../features/campgrounds/campgroundsSlice";

const Campground = ({ campground, homeLocation }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user && user._id;
  const dispatch = useDispatch();

  if (!campground) {
    console.log("campground is not defined");
    return <div>Loading...</div>;
  }

  const handleAddCampground = () => {
    dispatch(addCampground({ ...campground, userId }));
  };

  const handleDeleteCampground = () => {
    dispatch(deleteCampground(campground._id));
  };

  return (
    <div className="campground">
      {campground.images && campground.images.length > 0 && (
        <img
          className="campground-image"
          src={campground.images[0].url}
          alt={campground.name}
        />
      )}
      <h3>{campground.name}</h3>
      <p>{campground.description}</p>
      <a href={campground.url} target="_blank" rel="noreferrer">
        {campground.url}
      </a>
      <div className="btn-container">
        {homeLocation === "/" ? (
          <button className="btn" onClick={handleAddCampground}>
            Add to My Campgrounds
          </button>
        ) : (
          <button className="btn" onClick={handleDeleteCampground}>
            Delete from My Campgrounds
          </button>
        )}
      </div>
    </div>
  );
};

export default Campground;
