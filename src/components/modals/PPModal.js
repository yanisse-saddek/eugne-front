import { User } from "../../App";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Select from "../Other/Select";
import Editor from "../Other/Editor";

export default function DeleteModal(props) {
  const context = useContext(User);
  const navigate = useNavigate();
  const [image, setImage] = useState([]);
  const [previsuImg, setPrevisuImg] = useState(false);

  const changeProfilePicture = (e) => {
    e.preventDefault();

    axios.defaults.withCredentials = true;
    axios.post("http://localhost:4000/upload/profile-picture", image)
      .then((data) => {
        props.close()
        context.reLogUser();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const setFile = (e) => {
    const file = new FormData();
    file.append("image", e.target.files[0]);
    setImage(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPrevisuImg(e.target.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };
  return (
    <div className="modal-info">
      <div className="modal-top">
        Changer ma photo de profil
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
        <div className="modal-content-image">
          {previsuImg ? (
            <>
              <img src={previsuImg} />
              <button
                className="modal-btn modal-btn-pdp"
                onClick={changeProfilePicture}
              >
                CHANGER
              </button>
            </>
          ) : (
            <img src={context.user.profile_picture} />
          )}
          <input
            type="file"
            onChange={setFile}
            name="image"
            id="file-1"
            className="inputfile inputfile-1"
            data-multiple-caption="{count} files selected"
            multiple
          />
          <label htmlFor="file-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 20 17"
            >
              <path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z" />
            </svg>
            <span>Charger une image</span>
          </label>
        </div>
      </div>
    </div>
  );
}
