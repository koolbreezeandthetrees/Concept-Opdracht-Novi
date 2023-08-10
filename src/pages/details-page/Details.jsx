import { useParams } from "react-router-dom";
import {useState} from "react";
import { useNavigate } from "react-router-dom";

import './Details.css'

import { Pencil, Check, ArrowLeft} from "@phosphor-icons/react";

export default function Details() {

    const { id } = useParams();
    const [detailEdit, toggleDetailEdit] = useState(false);
    const navigate = useNavigate();
    const handleToggleEdit = () => {
        toggleDetailEdit(!detailEdit);
    }

    function handleBackButton(e) {
        e.preventDefault();
        navigate("/");
    }
        return (
        <>
            <div className='go-back-to-homepage-arrow' onClick={handleBackButton}>
                <button className="arrow-icon" >
                    <ArrowLeft size={60} />
                </button>
                <p>back to tasklist</p>
            </div>

            <div className='page-container-details'>
                <div className='details global-container'>
                    {detailEdit ? <h2> Edit task </h2> : <h2> {id} </h2>}


                    {detailEdit ?
                        <form className='details-wrapper'>
                            <section className="details-form-section title">
                                <label>
                                    title:
                                    <input type="text" className="details-input"/>
                                </label>
                            </section>
                            <section className="details-form-section status">
                                <label>
                                    status:
                                    <select name='status'>
                                        <option>pending</option>
                                        <option>complete</option>
                                    </select>
                                </label>
                            </section>
                            <section className="details-form-section priority">
                                <label>
                                    priority:
                                    <select name='status'>
                                        <option>low</option>
                                        <option>medium</option>
                                        <option>high</option>
                                    </select>
                                </label>
                            </section>
                            <section className="details-form-section deadline">
                                <label>
                                    dead-line:
                                    <input type="date" className="details-input"/>
                                </label>
                            </section>
                            <section className="details-form-section tags">
                                <label>
                                    tags:
                                    <input type="text" className="details-input"/>
                                </label>
                            </section>
                            <section className="details-form-section description">
                                <label>
                                    description:
                                    <textarea className="details-input"/>
                                </label>
                            </section>
                            <button className="submit-icon">
                                <Check size={35} />
                            </button>
                        </form>
                        :
                        <div className='details-wrapper'>
                            <section className="details-form-section status-display">
                                <label>
                                    status:
                                    <p className='display-status-complete'>complete</p>{/*className={state? "display-status-complete" : "display-status-pending"}*/}
                                </label>
                            </section>
                            <section className="details-form-section priority">
                                <label>
                                    priority:
                                    <div className='highPriorityCircleDetails'></div>
                                </label>
                            </section>
                            <section className="details-form-section deadline">
                                <label>
                                    dead-line:
                                    <p>03-08-2023</p>
                                </label>
                            </section>
                            <section className="details-form-section tags">
                                <label>
                                    tags:
                                    <p>garden</p>
                                </label>
                            </section>
                            <section className="details-form-section description">
                                <label>
                                    description:
                                    <span className='display-description'>"als je tijd hebt ook onkruid wieden"</span>
                                </label>
                            </section>
                        </div>
                    }


                    <button className="edit-icon" onClick={handleToggleEdit}>
                        <Pencil size={35} />
                    </button>

                   </div>
            </div>

        </>
    )
}