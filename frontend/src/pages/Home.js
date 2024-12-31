import { useEffect } from "react";

// components
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { useAuthContext } from "../hooks/useAuthContext";
import { useWorkoutsContext } from "../hooks/useWorkoutsContext";

const Home = () => {
  const { workouts, dispatch } = useWorkoutsContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      const json = await response.json();

      console.log("Fetched Data:", json); // Log the fetched data

      if (response.ok) {
        dispatch({ type: "SET_WORKOUTS", payload: json.workouts }); // Access workouts array
      }
    };

    if (user) {
      fetchWorkouts();
    }
  }, [dispatch, user]);

  console.log("Workouts in State:", workouts); // Log the workouts state

  return (
    <div className="home">
      <div className="workouts">
        {Array.isArray(workouts) && workouts.length > 0 ? (
          workouts.map((workout) => (
            <WorkoutDetails workout={workout} key={workout._id} />
          ))
        ) : (
          <p>No workouts available</p>
        )}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
