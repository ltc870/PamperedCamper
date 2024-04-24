import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getCampgrounds,
  reset,
} from "../features/campgrounds/campgroundsSlice";
import Campground from "./Campground";
import Spinner from "./Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const campgrounds = useSelector((state) => state.campgrounds.campgrounds);
  const status = useSelector((state) => state.campgrounds.status);
  const error = useSelector((state) => state.campgrounds.error);
  const homeLocation = useLocation().pathname;
  const [start, setStart] = useState(5);
  console.log(campgrounds);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      dispatch(reset());
      setLoading(true);
      dispatch(getCampgrounds(start))
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, navigate, user, start]);

  const handleShowMore = () => {
    setStart(start + 5);
  };

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && user.name}</h1>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button className="btn" onClick={() => navigate("/mycampgrounds")}>
            View My Campgrounds
          </button>
        </div>
      </section>
      <div className="campground-list">
        {loading && <Spinner />}
        <div className="campgrounds">
          {campgrounds.map((campground, index) => (
            <Campground
              key={campground._id}
              index={index}
              campground={campground}
              homeLocation={homeLocation}
            />
          ))}
          <button className="btn" onClick={handleShowMore}>
            Show More
          </button>
        </div>
        {status === "failed" && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default Dashboard;
