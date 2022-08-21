import { User } from "../../App";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function DeleteMsgModal(props) {
  const context = useContext(User);
  const navigate = useNavigate();

  const deleteMessage = (e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:4000/topic/delete/${context.modal[2]._id}`)
      .then((data) => {
        // navigate("/");
        console.log(data);
        props.close()
       })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="modal-info">
      <div className="modal-top">
        Supprimer ce message
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
          <span className="supprimer"> supprimer</span> votre message ?
        </p>
        <button className="modal-btn" onClick={deleteMessage}>
          SUPPRIMER
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
