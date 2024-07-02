import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";

const AddWorkout = () => {
    const [exerciseName, setName] = useState("");
    const [duration, setDuration] = useState("");
    const [isActive, setIsActive] = useState(false);
    const [error, setError] = useState("");

    function addWorkouts(e) {
        e.preventDefault();

        fetch(`${process.env.REACT_APP_API_URL}/workout/addWorkout`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({
                exerciseName,
                duration
            })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            if (!data.error) {
                setName('');
                setDuration('');
                alert("Workout Added");
                setError('')
            } else {
                console.error('Error adding workout:', error);
                setError(data.message || "Something went wrong");
            }
        })
        .catch(error => {
            console.error('Error adding workout:', error);
            setError("Failed to add workout. Please try again.");
        });
    }

    useEffect(() => {
        setIsActive(exerciseName !== "" && duration !== "");
    }, [exerciseName, duration]);

    return (
        <div>
            {error && <p>{error}</p>}
            <Form onSubmit={addWorkouts}>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                    <Form.Label>Workout Routine</Form.Label>
                    <Form.Control
                        type="text"
                        value={exerciseName}
                        onChange={e => setName(e.target.value)}
                        autoFocus
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                        type="text"
                        value={duration}
                        onChange={e => setDuration(e.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                    <Button type="submit" disabled={!isActive}>Add</Button>
                </Form.Group>
            </Form>
        </div>
    );
}

export default AddWorkout;
