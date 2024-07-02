import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Delete from './DeleteW'
import Complete from './Complete'

export default function CardCompleted() {
  const [workouts, setWorkouts] = useState([]);

  // Fetch workout data when component mounts


  // Function to fetch workout data
  const fetchWorkouts = () => {
    fetch(`${process.env.REACT_APP_API_URL}/workout/getMyWorkout`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch workout data");
        }
        return res.json();
      })
      .then((data) => {
        // Log the fetched data
        console.log("Fetched workout:", data.Workouts);
        if (Array.isArray(data.Workouts)) {
          const completedStatus = data.Workouts.filter(workouts => workouts.status === 'Completed')
          setWorkouts(completedStatus);
        } else {
          console.error("Unexpected data format:", data);
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Unexpected data format. Please try again."
          });
        }
      })
      .catch((error) => {
        console.error('Error fetching workout data:', error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to fetch workout data. Please try again."
        });
      });
  };


  useEffect(() => {
    fetchWorkouts();
    // Set interval to fetch workouts periodically
    const intervalId = setInterval(fetchWorkouts, 5000); // Fetch every 5 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []);
  // Function to handle updating the workout
  const handleUpdate = (id) => {
    // Implement your logic here to handle the update
    console.log("Update button clicked for ID:", id);
  };

  return (
    <div>
      {workouts.map((workout) => (
        <Card key={workout._id} border="success" style={{ width: '30rem', margin: '1rem' }}>
          <Card.Header>Workout Routine</Card.Header>
          <Card.Body>
            <Card.Title>{workout.exerciseName}</Card.Title>
            <Card.Text>
              Duration: {workout.duration}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="p-3">
            <Delete movieId={workout._id} onDeleteSuccess={fetchWorkouts} />
          </Card.Footer>
        </Card>
      ))}
    </div>
  );
}
