import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Swal from 'sweetalert2';
import Delete from './DeleteW'
import Complete from './Complete'

// Modal component for updating workout
function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Workout
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formExerciseName">
            <Form.Label>Exercise Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter exercise name"
              value={props.exerciseName}
              onChange={props.onExerciseNameChange}
            />
          </Form.Group>
          <Form.Group controlId="formDuration">
            <Form.Label>Duration</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter duration"
              value={props.duration}
              onChange={props.onDurationChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
        <Button onClick={props.onUpdate}>Update</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default function CardPending() {
  const [workouts, setWorkouts] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [exerciseName, setExerciseName] = useState('');
  const [duration, setDuration] = useState('');

  // Fetch workouts from API
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
        if (Array.isArray(data.Workouts)) {
          const pendingWorkouts = data.Workouts.filter(workout => workout.status === 'pending');
          setWorkouts(pendingWorkouts);
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: "Unexpected data format. Please try again."
          });
        }
      })
      .catch((error) => {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to fetch workout data. Please try again."
        });
      });
  };

  // Fetch workouts on component mount and set interval for periodic fetching
  useEffect(() => {
    fetchWorkouts();
    const intervalId = setInterval(fetchWorkouts, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // Function to handle update button click
  const handleUpdate = (workout) => {
    setSelectedWorkout(workout);
    setExerciseName(workout.exerciseName);
    setDuration(workout.duration);
    setModalShow(true);
  };

  // Function to handle update submission
  const handleUpdateSubmit = () => {
    fetch(`${process.env.REACT_APP_API_URL}/workout/updateWorkout/${selectedWorkout._id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify({
        exerciseName,
        duration
      })
    })
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to update workout');
        }
        return res.json();
      })
      .then(data => {
        setModalShow(false);
        fetchWorkouts(); // Refresh workouts after update
        Swal.fire({
          title: "Success",
          icon: "success",
          text: "Workout updated successfully."
        });
      })
      .catch(error => {
        console.error('Error updating workout:', error);
        Swal.fire({
          title: "Error",
          icon: "error",
          text: "Failed to update workout. Please try again."
        });
      });
  };

const handleDelete = () => {
  if (!selectedWorkout || !selectedWorkout._id) {
    // If selectedWorkout is null or _id is not available, return
    return;
  }
  
  fetch(`${process.env.REACT_APP_API_URL}/workout/deleteWorkout/${selectedWorkout._id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
    .then(res => {
      if (!res.ok) {
        throw new Error('Failed to delete workout');
      }
      return res.json();
    })
    .then(data => {
      Swal.fire({
        title: "Success",
        icon: "success",
        text: "Workout successfully deleted."
      });
      fetchWorkouts(); // Refresh workouts after deletion
    })
    .catch(error => {
      console.error('Error deleting workout:', error);
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Failed to delete workout. Please try again."
      });
    });
};



  return (
    <div>
      {workouts.map((workout) => (
        <Card key={workout._id} border="warning" style={{ width: '30rem', margin: '1rem' }}>
          <Card.Header>Workout Routine</Card.Header>
          <Card.Body>
            <Card.Title>{workout.exerciseName}</Card.Title>
            <Card.Text>
              Duration: {workout.duration}
            </Card.Text>
          </Card.Body>
          <Card.Footer className="p-3">
          <Complete movieId={workout._id} onUpdateStatus={fetchWorkouts} />
            <Button variant="warning m-2" onClick={() => handleUpdate(workout)}>Update</Button>
            <Delete movieId={workout._id} onDeleteSuccess={fetchWorkouts} />
          </Card.Footer>
        </Card>
      ))}

      {selectedWorkout && (
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
          exerciseName={exerciseName}
          duration={duration}
          onExerciseNameChange={(e) => setExerciseName(e.target.value)}
          onDurationChange={(e) => setDuration(e.target.value)}
          onUpdate={handleUpdateSubmit}
        />
      )}
    </div>
  );
}
