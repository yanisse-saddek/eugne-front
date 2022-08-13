import {useState, useEffect, useContext} from "react"
import axios from "axios"
import { User } from '../../App'


export default function ImageUploader(props){
    const [imageList, setImageList] = useState([])
    const context = useContext(User)

    useEffect(()=>{
        getImages()

    }, [])
    const getImages = ()=>{
        axios.get(`http://localhost:4000/images/uploader/${context.user._id}`).then(data=>{
            setImageList(data.data)
        })
    }
    const addImage = (img)=>{
        const newText = props.text.slice(0, -4) + `<img src=${img} />`
        props.editText(newText)
    }
    const setFile = (e)=>{
        const file = new FormData(); 
        file.append('image',e.target.files[0]); 
        axios.post("http://localhost:4000/upload/image", file).then(ok=>{
            getImages()
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div className="uploader">
        <div className="uploader-info">
            <div className="uploader-top">
                Poster une nouvelle image
                <div 
                onClick={()=>{props.close(false)}}
                className="uploader-top-right">
                    FERMER
                </div>
            </div>
            <div className="uploader-body">
                <div className="button-right">
                <input type="file" 
                onChange={setFile}
                 name="image" id="file-1" className="inputfile inputfile-1" data-multiple-caption="{count} files selected" multiple />
                <label htmlFor="file-1"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="17" viewBox="0 0 20 17"><path d="M10 0l-5.2 4.9h3.3v5.1h3.8v-5.1h3.3l-5.2-4.9zm9.3 11.5l-3.2-2.1h-2l3.4 2.6h-3.5c-.1 0-.2.1-.2.1l-.8 2.3h-6l-.8-2.2c-.1-.1-.1-.2-.2-.2h-3.6l3.4-2.6h-2l-3.2 2.1c-.4.3-.7 1-.6 1.5l.6 3.1c.1.5.7.9 1.2.9h16.3c.6 0 1.1-.4 1.3-.9l.6-3.1c.1-.5-.2-1.2-.7-1.5z"/></svg> <span>Charger une image</span></label>
                </div>
                <div className="images">
                    <div className="images-list">
                        {
                            imageList.map((image, index)=>{
                                return(
                                    <img onClick={()=>{addImage(image.link)}} key={index} src={image.link} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}