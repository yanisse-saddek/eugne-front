import { AnimatePresence, motion } from "framer-motion"
import { useContext, useState } from "react";
import { User } from "../../App";
import "../../styles/modal.css";
import DeleteModal from '../modals/DeleteModal'
import PPModal from '../modals/PPModal'
import EditModal from '../modals/EditModal'
import DeleteMsgModal from '../modals/DeleteMsgModal'
import ReportMsgModal from '../modals/ReportMsgModal'
import ImageUploader from "../modals/ImageUploader";

export default function Modal() {
  const context = useContext(User);
  const [visibility, setVisibility] = useState(true)
  console.log('ok')
  const hide = ()=>{
    setVisibility(false)
    setTimeout(()=>{
      context.setModal([false])
    }, 1000)
  }

  return (
    <AnimatePresence>
          {
        visibility? 
        <motion.div 
            key="modal"
            initial={{y:"-100%", opacity:1}}
            animate={{y:0, opacity:1}}
            transition={{duration:0.6}}
            exit={{y:"-100%", opacity:1, transition:{duration:0.6}}}
            className="modal">

          {context.modal[1] == "delete" ? (
            <DeleteModal close={hide} />
          ) : context.modal[1] == "profile-picture" ? (
            <PPModal close={hide}/>
          ) : context.modal[1] == "edit" ? 
            <EditModal close={hide}/>
            : context.modal[1] == "delete-msg" ? 
            <DeleteMsgModal close={hide}/>
            : context.modal[1] == "report-msg" ? 
            <ReportMsgModal close={hide}/>
            : context.modal[1] == "uploader" ? 
            <ImageUploader close={hide}/>
        :null}
        </motion.div>
        :null
      }
    </AnimatePresence>
  );
}
