import { User } from "../../App";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DeleteModal(props) {
  const context = useContext(User);
  const navigate = useNavigate();

  const deleteTopic = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/topic/${context.modal[2]}`)
      .then((data) => {
        console.log(data, 'supprimin')
        navigate("/");
        props.close()
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal-info">
      <div className="modal-top">
        Supprimer ce topic
        <div
          onClick={() => {
            props.close();
          }}
          className="modal-top-right"
        >
          FERMER
        </div>
      </div>
      <div className="modal-body">
        {/* <div className="modal-content"> */}
        <p>
          Etes vous sur de vouloir
          <span className="supprimer">supprimer</span> ce topic ?
        </p>
        <button className="modal-btn" onClick={deleteTopic}>
          SUPPRIMER
        </button>
      </div>
      {/* </div> */}
    </div>
  );
}
