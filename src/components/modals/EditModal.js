import { User } from "../../App";
import { useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "../Other/Select";
import Editor from "../Other/Editor";

export default function DeleteModal(props) {
  const context = useContext(User);
  const navigate = useNavigate();
  const [title, setTitle] = useState(context.modal[2]?.title);
  const [type, setType] = useState(context.modal[2].type);

  useEffect(() => {
    context.setTextEditor(context.modal[2]?.content);
  }, []);

  const editTopic = (e) => {
    if (e) {
      e.preventDefault();
    }
    const info = {
      title: title,
      content: context.textEditor,
      subject: type,
    };

    axios
      .put(`http://localhost:4000/topic/${context.modal[2]._id}`, info)
      .then((data) => {
        context.setTextEditor("");
        props.close()
      })
      .catch((err) => {
        if (window.localStorage.getItem("isLoggedIn")) {
          context.reLogUser();
          editTopic();
        }
      });
  };
  return (
    <div className="modal-info">
      <div className="modal-top">
        Modifier ce topic
        <div
          onClick={() => {
            context.setTextEditor('') 
            props.close();
          }}
          className="modal-top-right"
        >
          FERMER
        </div>
      </div>
      <div className="new-topic-body">
        <div className="button-right">
          <button
            onClick={() => {
              context.setUploader(true);
            }}
          >
            Publier une nouvelle image
          </button>
        </div>
        <p>Titre du topic</p>
        <input
          type="text"
          className="title-input"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <Editor />
        <div className="new-topic-footer">
          <Select setType={setType} />
          <button onClick={editTopic} className="send-message">
            ENVOYER
          </button>
        </div>
      </div>
    </div>
  );
}
