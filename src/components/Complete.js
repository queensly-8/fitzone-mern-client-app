import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const CompleteStatus = ({movieId, onUpdateStatus})=>{
    const handleStatus =()=>{
        fetch(`${process.env.REACT_APP_API_URL}/workout/completeWorkoutStatus/${movieId}`, {
            method: 'PATCH',
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            if(!res.ok){
                throw new Error('Failed to Update Status');
            }
            return res.json();
        })
        .then(data=>{
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Workout updated Status."
              });
              onUpdateStatus();
        })
        .catch(error => {
            console.error('Error updating Workout Status:', error);
            Swal.fire({
              title: "Error",
              icon: "error",
              text: `Failed to Update Workout status. Error details: ${error.message}` // Display error message
            });
          });
    }
    return (
        <Button variant="success m-2" onClick={handleStatus}>Completed</Button>
    )
}
export default CompleteStatus;