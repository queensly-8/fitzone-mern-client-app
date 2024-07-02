import { Button } from "react-bootstrap";
import Swal from "sweetalert2";

const DeleteWorkout = ({movieId, onDeleteSuccess}) =>{
    const handleDelete =()=>{
        fetch(`${process.env.REACT_APP_API_URL}/workout/deleteWorkout/${movieId}`, {
            method: 'PATCH',
            headers:{
                'Content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res=>{
            if(!res.ok){
                throw new Error('Failed to delete workout');
            }
            return res.json();
        })
        .then(data =>{
            Swal.fire({
                title: "Success",
                icon: "success",
                text: "Workout successfully deleted."
              });
              onDeleteSuccess();
        })
        .catch(error => {
            console.error('Error deleting Workout:', error);
            Swal.fire({
              title: "Error",
              icon: "error",
              text: `Failed to delete Workout. Error details: ${error.message}` // Display error message
            });
          });
    };
    return (
        <Button variant="danger m-2" onClick={handleDelete}>Delete</Button>
    )
}
export default DeleteWorkout;