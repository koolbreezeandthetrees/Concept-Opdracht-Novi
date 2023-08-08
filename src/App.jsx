import {v4 as uuid} from 'uuid';
import {useState} from "react";


import Button from "./components/button/Button.jsx";
import InputElement from "./components/input-item/InputElement.jsx";
import SelectElement from "./components/input-item/SelectElement.jsx";
import SearchField from "./components/input-item/Search.jsx";

import ListItem from "./components/list-item/ListItem.jsx";

import getReadableDateTime from "./helpers/currentTimeStamp.js";
import getPriorityClassName from "./helpers/getPriorityClassname.js";

import toggleSort from "./helpers/sort-functions/sortByPriority.js"
import sortOnTimestamp from "./helpers/sort-functions/sortByDate.js";
import sortByCompletion from "./helpers/sort-functions/sortByCompletion.js";
/*import handleSearch from "./helpers/search.js";*/



function App() {

    const [todos, setTodos] = useState([]);
    const [inputField, setInputfield] = useState("")
    const [priority, setPriority] = useState(null)
    const [completion, setCompletion] = useState(false)
    const [sorted, setSorted] = useState(false)
/*    const [description, setDescription] = useState('')*/
    const [searchInput, setSearchInput] = useState("");
    const [foundTodo, setFoundTodo] = useState(null);
    const [selectedPriority, setSelectedPriority] = useState('');

    function addTodo(e) {
        e.preventDefault();
        setTodos([
            ...todos,
            {
                id: uuid(),
                date: getReadableDateTime(),
                title: inputField,
                completed: completion,
                priority: priority,
            /*    description: description,*/
                className: getPriorityClassName(parseInt(priority)),
            }
        ])
        setSelectedPriority('');
        setInputfield('');
        setPriority(null);
    }
    function deleteTask(idParam) {
        const updatedTodos = todos.filter(todo => todo.id !== idParam);
        setTodos(updatedTodos);
    }
    function toggleOneCompleted(idParam) {
        const updatedTodos = todos.map((todo) => {
            if (todo.id === idParam) {
                return {
                    ...todo,
                    completed: !todo.completed
                };
            }
            return todo;
        });

        setTodos(updatedTodos);
    }

    function handleSearch() {
        const found = todos.find((todo) => todo.title.includes(searchInput));
        setFoundTodo(found);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            handleSearch();
        }
    }

    // HALLO dit is de betere versie
    return (
        <>
            <div className="outer-container">
                <div className='page-container-desktop'>

                    <div className='page-left-wrapper-desktop'>
                        <nav className='left-one'>
                            <div className="button-wrapper">
                                <h3 className="sorting-title">sort by:</h3>
                                <Button
                                    buttonType="button"
                                    variant="sort-by-priority"
                                    handleClick= {() => toggleSort(sorted, todos, setTodos, setSorted)}
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
                                     search result: "{foundTodo.title}" this task is {foundTodo ? "pending" : "complete"}
                                </div>
                            )}


                        </nav>
                        <aside className='left-two'>
                                <form className="form-container" onSubmit={addTodo}>

                                <InputElement
                                    type="text"
                                    title="title"
                                    value={inputField}
                                    eventHandler={(e) => setInputfield(e.target.value)}
                                />

                                    <SelectElement
                                        name="priority"
                                        value={priority || selectedPriority}
                                        placeholder="priority"
                                        options={[
                                            { value: 3, label: 'low' },
                                            { value: 2, label: 'medium' },
                                            { value: 1, label: 'high' }
                                        ]}
                                        onChange={(e) => {
                                            setSelectedPriority(e.target.value);
                                            setPriority(e.target.value);
                                        }}
                                    />

                                <Button
                                    buttonType="submit"
                                    variant="submit"
                                >+ Add new task
                                </Button>

                            </form>
                            </aside>
                    </div>

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
                                        deleteTask={deleteTask}
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

export default App;

