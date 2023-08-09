import { ListMagnifyingGlass, X} from "@phosphor-icons/react";
import {Link, useNavigate} from "react-router-dom";
import sortByCompletion from "../../helpers/sort-functions/sortByCompletion.js";

export default function ListItem({ id, status, title, variant, toggleCompleted, deleteTask }) {
    const navigate = useNavigate()
    function clickHandler() {
        navigate(`/details/${id}`)
    }
    return (
        <li key={id} className="list-item">
            <div className="align-at-start">
                 <div className={`circle ${variant}`}></div>
                 <span className="list-title">{title}</span>
            </div>
            <div className="align-at-end">
                <div className={`checkbox-button ${status ? 'completed' : 'pending'}`}>
                    <input
                        type="checkbox"
                        id={`checkbox-${id}`}
                        checked={status}
                        onChange={() => toggleCompleted(id)}
                    />
                    <label htmlFor={`checkbox-${id}`}>
                        {status ? 'completed' : 'pending'}
                    </label>
                </div>
                <ListMagnifyingGlass size={38} onClick={clickHandler}/>
                <X size={35} onClick={() => deleteTask(id)} />
            </div>

        </li>
    );
}
