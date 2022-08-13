export default function Select(props){
    return(
        <select className="select-language" onChange={(e)=>{props.setType(e.target.value)}}>
                        <option selected>Sujet</option>
                        <option value="HTML">HTML/CSS</option>
                        <option value="Javascript">JavaScript</option>
                        <option value="NodeJS">NodeJS</option>
                        <option value="VueJS">VueJS</option>
                        <option value="ReactJS">ReactJS</option>
                        <option value="AngularJS">AngluarJS</option>
                        <option value="PHP">PHP</option>
                        <option value="Symfony">Symfony</option>
                        <option value="Laravel">Laravel</option>
        </select>
    )
}