import {v4 as uuid} from 'uuid';
import {useEffect, useState} from "react";
import './Home.css'
import axios from "axios";


import Button from "../../components/button/Button.jsx";

import InputElement from "../../components/input-item/InputElement.jsx";
import SelectElement from "../../components/input-item/SelectElement.jsx";
import SearchField from "../../components/input-item/Search.jsx";

import ListItem from "../../components/list-item/ListItem.jsx";

import getReadableDateTime from "../../helpers/currentTimeStamp.js";
import getPriorityClassName from "../../helpers/getPriorityClassname.js";

import toggleSort from "../../helpers/sort-functions/sortByPriority.js"
import sortOnTimestamp from "../../helpers/sort-functions/sortByDate.js";
import sortByCompletion from "../../helpers/sort-functions/sortByCompletion.js";
import {Backspace} from "@phosphor-icons/react";

function Home() {

    const [todos, setTodos] = useState([]);
    const [inputField, setInputfield] = useState("")
    const [priority, setPriority] = useState(NaN)
    const [completion, setCompletion] = useState(false)
    const [description, setDescription] = useState("")
    const [sorted, setSorted] = useState(false)
    const [tag, setTags] = useState("")
    const [searchInput, setSearchInput] = useState("");
    const [foundTodo, setFoundTodo] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState(null);




    function handleSearch() {
        const found = todos.find((todo) =>
            todo.title.toLowerCase().includes(searchInput.toLowerCase())
        );
        setFoundTodo(found);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    function clearSearchResult() {
        setFoundTodo(null);
        setSearchInput("");
    }

    useEffect(() => {
        async function fetchAllTodos() {
            try {
                const response = await axios.get('http://localhost:3000/todos');
                setTodos(response.data);
            } catch (error) {
                console.error(error);
            }
        }
        fetchAllTodos();
    }, []);
    async function addNewTodo(e) {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/todos', {
                id: uuid(),
                date: getReadableDateTime(),
                title: inputField,
                completed: completion,
                priority: priority,
                description: description,
                tags: tag,
                className: getPriorityClassName(parseInt(priority)),
            });

            console.log(response.data);
            const newTodo = response.data;
            setTodos([
                ...todos,
                newTodo
            ]);

            setSelectedPriority('');
            setInputfield('');
            setPriority(null);
        } catch (error) {
            console.error(error);
        }
    }

    async function deleteTodo(id) {
        try {
            await
                axios.delete(`http://localhost:3000/todos/${id}`);
            setTodos(todos.filter(todo => todo.id !== id))
        } catch (e){
            console.error(e);
        }
    }

    async function toggleOneCompleted(idParam) {
        const updatedTodos = todos.map((todo) =>
            todo.id === idParam ? { ...todo, completed: !todo.completed } : todo
        );

        setTodos(updatedTodos);

        const updatedTodo = updatedTodos.find(todo => todo.id === idParam);

        try {
            await axios.put(`http://localhost:3000/todos/${idParam}`, updatedTodo);
        } catch (e) {
            console.error(e);
        }
    }


return (
    <>
        <div className="outer-container">
            <div className='wrapper-wrapper'>
                <section className='page-left-wrapper-desktop'>
                    <nav className='left-one'>
                        <div className="button-wrapper">
                            <h3 className="sorting-title">sort by:</h3>
                            <Button
                                buttonType="button"
                                variant="sort-by-priority"
                                handleClick={() => toggleSort(sorted, todos, setTodos, setSorted)}
                            >priority</Button>


                            <Button
                                buttonType="button"
                                variant="sort-by-completion"
                                handleClick={() => sortByCompletion(todos, setTodos, sorted, setSorted)}
                            >status</Button>

                            <Button
                                buttonType="button"
                                variant="sort-by-timestamp"
                                handleClick={() => sortOnTimestamp(todos, setTodos, sorted, setSorted)}
                            >date</Button>

                        </div>

                        <SearchField
                            type="text"
                            placeholder=""
                            value={searchInput}
                            onChangeHandler={(e) => setSearchInput(e.target.value)}
                            keyDown={handleKeyPress}
                        />

                        {foundTodo && (
                            <div className="search-result-container">
                                search result: {foundTodo.title}. this task is {foundTodo ? "pending" : "complete"}
                                <Backspace size={15} className='remove-search-result-icon'
                                           onClick={() => clearSearchResult()}/>
                            </div>
                        )}

                    </nav>
                    <aside className='left-two'>
                        <form className="form-container" onSubmit={addNewTodo}>

                            <InputElement
                                type="text"
                                title="title"
                                value={inputField}
                                eventHandler={(e) => setInputfield(e.target.value)}
                            />

                            <SelectElement
                                name="priority"
                                value={selectedPriority !== null ? selectedPriority.toString() : (priority !== null ? priority.toString() : '')}
                                placeholder="priority"
                                options={[
                                    {value: 3, label: 'low'},
                                    {value: 2, label: 'medium'},
                                    {value: 1, label: 'high'}
                                ]}
                                onChange={(e) => {
                                    setSelectedPriority(parseInt(e.target.value)); // Parse the value to an integer
                                    setPriority(parseInt(e.target.value)); // Parse the value to an integer
                                }}
                            />


                            <Button
                                buttonType="submit"
                                variant="submit"
                            >+ Add new task
                            </Button>

                        </form>
                    </aside>
                </section>
                <main className='page-right-wrapper-desktop'>
                    <div className="list-wrapper">
                        <h1>Tasks</h1>
                        {todos.map((todo) => {
                            return (
                                <ListItem
                                    key={todo.id}
                                    id={todo.id}
                                    status={todo.completed}
                                    title={todo.title}
                                    variant={todo.className}
                                    toggleCompleted={toggleOneCompleted}
                                    deleteTask={deleteTodo}
                                />
                            );
                        })}
                    </div>
                </main>
            </div>
        </div>
    </>

);
}

export default Home;

/*    function addTodo(e) {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                id: uuid(),
                date: getReadableDateTime(),
                title: inputField,
                completed: completion,
                priority: priority,
                description: description,
                tags: tag,
                className: getPriorityClassName(parseInt(priority)),
            }
        ])
        setSelectedPriority('');
        setInputfield('');
        setPriority(null);
    }*/
/*    function deleteTask(idParam) {
        const updatedTodos = todos.filter(todo => todo.id !== idParam);
        setTodos(updatedTodos);
    }*/
/*
    function toggleOneCompleted(idParam) {
        const updatedTodos = todos.map((todo) =>
            todo.id === idParam ? {...todo, completed: !todo.completed} : todo
        );

        setTodos(updatedTodos);
    }*/
