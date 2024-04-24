import { useSelector, useDispatch } from "react-redux";
import { addCampground } from "../features/campgrounds/campgroundsSlice";
import { deleteCampground } from "../features/campgrounds/campgroundsSlice";
// import { reset } from "../features/campgrounds/campgroundsSlice";

const Campground = ({ campground, myCampground, homeLocation, index }) => {
  const user = useSelector((state) => state.auth.user);
  const userId = user && user._id;
  const dispatch = useDispatch();

  if (!campground) {
    console.log("campground is not defined");
    return <div>Loading...</div>;
  } else {
    console.log(myCampground);
  }

  const handleAddCampground = () => {
    dispatch(addCampground({ ...campground, userId }));
  };

  const handleDeleteCampground = () => {
    dispatch(deleteCampground(campground._id)).then(window.location.reload());
  };

  if (homeLocation === "/") {
    return (
      <div className="campground" key={index}>
        {campground.images && campground.images.length > 0 ? (
          <img
            className="campground-image"
            src={campground.images[0].url}
            alt={campground.name}
          />
        ) : (
          <div></div>
        )}
        <h3>{campground.name}</h3>
        <p>{campground.description}</p>
        <a href={campground.url} target="_blank" rel="noreferrer">
          {campground.url}
        </a>
        <div className="btn-container">
          <button className="btn" onClick={handleAddCampground}>
            Add to My Campgrounds
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="campground">
        {campground.images && campground.images.length > 0 ? (
          <img
            className="campground-image"
            src={campground.images[0].url}
            alt={campground.name}
          />
        ) : (
          <div></div>
        )}
        <h3>{campground.name}</h3>
        <p>{campground.description}</p>
        <a href={campground.url} target="_blank" rel="noreferrer">
          {campground.url}
        </a>
        <div className="btn-container">
          <button className="btn" onClick={handleDeleteCampground}>
            Delete from My Campgrounds
          </button>
        </div>
      </div>
    );
  }
  //   return (
  //     <div className="campground">
  //       {campground.images && campground.images.length > 0 ? (
  //         <img
  //           className="campground-image"
  //           src={campground.images[0].url}
  //           alt={campground.name}
  //         />
  //       )}
  //       <h3>{campground.name}</h3>
  //       <p>{campground.description}</p>
  //       <a href={campground.url} target="_blank" rel="noreferrer">
  //         {campground.url}
  //       </a>
  //       <div className="btn-container">
  //         {homeLocation === "/" ? (
  //           <div>
  //             {campground.images && campground.images.length > 0 ? (
  //               <img
  //                 className="campground-image"
  //                 src={campground.images[0].url}
  //                 alt={campground.name}
  //               />
  //             ) : ()}

  //             <h3>{campground.name}</h3>
  //             <p>{campground.description}</p>
  //             <a href={campground.url} target="_blank" rel="noreferrer">
  //               {campground.url}
  //             </a>

  //           <button className="btn" onClick={handleAddCampground}>
  //             Add to My Campgrounds
  //           </button>
  //           </div>
  //         ) : (
  //           <button className="btn" onClick={handleDeleteCampground}>
  //             Delete from My Campgrounds
  //           </button>
  //         )}
  //       </div>
  //     </div>
  //   );
};

export default Campground;
