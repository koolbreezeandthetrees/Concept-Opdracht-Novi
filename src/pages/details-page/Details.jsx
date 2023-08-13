import { useParams } from "react-router-dom";
import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import getPriorityClassName from "../../helpers/getPriorityClassname.js";
import './Details.css'


import { Pencil, Check, ArrowLeft } from "@phosphor-icons/react";
import axios from "axios";
import SelectElement from "../../components/input-item/SelectElement.jsx";

export default function Details() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [detailEdit, toggleDetailEdit] = useState(false);

    const [todo, setTodo] = useState({});
    const [inputValues, setInputValues] = useState({
        title: "",
        completed: null,
        priority: null,
        date: "",
        tag: "",
        description: "",
        className: "",
        deadline: ""
    });


    useEffect(() => {
        async function fetchTodo() {
            try {
                const response = await axios.get(`http://localhost:3000/todos/${id}`);
                setTodo({
                    ...response.data,
                });

                const deadlineDate = response.data.deadline ? response.data.deadline.split(" ")[0] : "";

                setInputValues({
                    title: response.data.title,
                    completed: response.data.completed === 'true',
                    priority: response.data.priority,
                    date: response.data.date,
                    tag: response.data.tags,
                    description: response.data.description,
                    className: getPriorityClassName(response.data.priority),
                    deadline: deadlineDate
                });
            } catch (e) {
                console.error(e);
            }
        }
        fetchTodo();
    }, [id]);

    const saveInput = async (e) => {
        e.preventDefault();
        toggleDetailEdit(false);
        try {
            const editedTask = {
                title: inputValues.title,
                completed: inputValues.completed === 'true',
                priority: inputValues.priority,
                description: inputValues.description,
                date: inputValues.date,
                tags: inputValues.tag,
                deadline: inputValues.deadline,
                className: getPriorityClassName(inputValues.priority)
            };

            const response = await axios.put(`http://localhost:3000/todos/${id}`, editedTask);

            setTodo(response.data);

        } catch (error) {
            console.error(error);
        }
    };

/*
    useEffect(() => {
        console.log(todo);
    }, [todo]);
*/

    const handleToggleEdit = () => {
        toggleDetailEdit(!detailEdit);
    };
    function handleBackButton(e) {
        e.preventDefault();
        navigate("/");
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setInputValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));

        if (name === 'priority') {
            setInputValues((prevValues) => ({
                ...prevValues,
                priority: parseInt(value),
            }));
        }
    };

        return (
        <>
            <div className='go-back-to-homepage-arrow' onClick={handleBackButton}>
                <button className="arrow-icon" >
                    <ArrowLeft size={55} />
                </button>
                <p>back to task list</p>
            </div>
            <div className='page-container-details'>
                <div className='details global-container'>
                    {detailEdit ? <h2> Edit task </h2> : <h2> {todo.title} </h2>}


                    {detailEdit ?
                        <form className='details-wrapper' onSubmit={saveInput}>
                            <section className="details-form-section title">
                                <label>
                                    title:
                                    <input
                                        type="text"
                                        value={inputValues.title}
                                        onChange={handleInputChange}
                                        name="title"
                                    />
                                </label>
                            </section>

                            <section className="details-form-section status">
                                <label>
                                    status:
                                    <SelectElement
                                        name="completed"
                                        value={inputValues.completed}
                                        placeholder="status"
                                        options={[
                                            { value: 'false', label: 'pending' },
                                            { value: 'true', label: 'completed' },
                                        ]}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </section>

                            <section className="details-form-section priority">
                                <label>
                                    priority:
                                    <SelectElement
                                        name="priority"
                                        value={inputValues.priority}
                                        placeholder="priority"
                                        options={[
                                            { value: 3, label: 'low' },
                                            { value: 2, label: 'medium' },
                                            { value: 1, label: 'high' }
                                        ]}
                                        onChange={(e) => setInputValues({ ...inputValues, priority: parseInt(e.target.value) })}
                                    />
                                </label>
                            </section>

                            <section className="details-form-section deadline">
                                <label>
                                    deadline:
                                    <input
                                        type="date"
                                        className="details-input"
                                        name="deadline"
                                        value={inputValues.deadline}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </section>

                            <section className="details-form-section tags">
                                <label>
                                    tags:
                                    <input
                                        type="text"
                                        className="details-input"
                                        name="tag"
                                        value={inputValues.tag}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </section>
                            <section className="details-form-section description">
                                <label>
                                    description:
                                    <textarea
                                        className="details-input"
                                        name="description"
                                        value={inputValues.description}
                                        onChange={handleInputChange}
                                    />
                                </label>
                            </section>
                            <button type='submit' className="submit-icon">
                                <Check size={35} />
                            </button>
                        </form>
                        :
                            <div className='details-wrapper'>
                                <section className="details-form-section status-display">
                                    <label>
                                        status:
                                        <p className={todo.completed ? "display-status-complete" : "display-status-pending"}>
                                            {todo.completed ? "completed" : "pending"}
                                        </p>
                                    </label>
                                </section>

                                <section className="details-form-section priority">
                                    <label>
                                        priority:
                                        <div className={todo.className}></div>
                                    </label>
                                </section>
                                <section className="details-form-section deadline">
                                    <label>
                                        dead-line:
                                        <p>{todo.deadline}</p>
                                    </label>
                                </section>
                                <section className="details-form-section tags">
                                    <label>
                                        tags:
                                        <p>{todo.tags}</p>
                                    </label>
                                </section>
                                <section className="details-form-section description">
                                    <label>
                                        description:
                                        <span className='display-description'>{todo.description}</span>
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