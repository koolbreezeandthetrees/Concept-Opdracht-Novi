function sortOnLowPriority(todos, setTodos, setSorted) {
    const sortedTodos = [...todos].sort((a, b) => a.priority - b.priority);
    setTodos(sortedTodos);
    setSorted(false);
}

function sortOnHighPriority(todos, setTodos, setSorted) {
    const sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);
    setTodos(sortedTodos);
    setSorted(true);
}

export default function toggleSort(sorted, todos, setTodos, setSorted) {
    const sortingFunction = sorted ? sortOnLowPriority : sortOnHighPriority;
    sortingFunction(todos, setTodos, setSorted);
}