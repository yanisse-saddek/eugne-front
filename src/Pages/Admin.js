import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { User } from "../App";
import { useNavigate } from "react-router-dom";
import '../styles/admin.css'
import { Markup } from "interweave";

export default function Admin() {
  const [reports, setReports] = useState([]);
  const context = useContext(User);
  const navigate = useNavigate();
  useEffect(() => {
    if(context.log){
        getReports()
    }
  }, [context]);

  const getReports = ()=>{
    if (context.user.status === "admin") {
        axios.get("http://localhost:4000/admin/reports").then((data) => {
          setReports(data.data);
          console.log(data.data)
        });
    } else {
        navigate("/");
    }
  }

  return(
    <div className="admin">
      <div className="admin-main">
        <p>Interface administrateur</p>
          <div className="admin-title">40 reports à moderer</div>
          <div className="reports">
          {
            reports.map(report=>{
              return(
              <div className="report">
                <p><span className="reporter"> {report.created_by.username} </span> 
                  à report 
                  <span className="reported"> {report.message_id.created_by.username} </span>
                  pour 
                  <span className="reason"> message innoportun </span>
                </p>
                <div className="report-detail">
                <Markup content={report.content}/>
                <button className='see-report'>Voir le report</button>
                </div>
              </div>                  
            )
            })
          }
          </div>
      </div>
    </div>
  );
}
