import { User } from "../../App";
import { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditorC from "../Other/Editor";
export default function ReportMsgModal(props) {
  const context = useContext(User);
  const navigate = useNavigate();

  const reportMessage = (e) => {
    e.preventDefault();
    console.log("ok");
    const info = {
      content: context.textEditor,
    };
    axios
      .post(`http://localhost:4000/topic/report/${context.modal[2]._id}`, info)
      .then((data) => {
        // navigate("/");
        console.log("c bon la wsh");
        props.close()
        context.setTextEditor("");
      })
      .catch((err) => {
        console.log("  c pas bon");
        console.log(err);
      });
  };

  return (
    <div className="modal-info">
      <div className="modal-top">
        Signaler ce message
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
        <EditorC />
        <button className="modal-btn" onClick={reportMessage}>
          SIGNALER
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
