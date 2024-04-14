import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCampgrounds } from "../features/campgrounds/campgroundsSlice";
import Campground from "./Campground";
import Spinner from "./Spinner";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { campgrounds, status, error } = useSelector(
    (state) => state.campgrounds
  );
  const homeLocation = useLocation().pathname;
  console.log(campgrounds);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      setLoading(true);
      dispatch(getCampgrounds())
        .then(() => setLoading(false))
        .catch(() => setLoading(false));
    }
  }, [dispatch, navigate, user]);

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
          {campgrounds.map((campground) => (
            <Campground
              key={campground._id}
              campground={campground}
              homeLocation={homeLocation}
            />
          ))}
        </div>
        {status === "failed" && <div className="error">{error}</div>}
      </div>
    </>
  );
};

export default Dashboard;
