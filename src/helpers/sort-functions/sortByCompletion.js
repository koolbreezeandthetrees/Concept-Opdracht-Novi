export default function sortByCompletion(todos, setTodos, sorted, setSorted) {
    const sortedTodos = [...todos].sort((a, b) => {
        if (a.completed === b.completed) {
            return 0;
        }
        return sorted ? (a.completed ? -1 : 1) : a.completed ? 1 : -1;
    });
    setTodos(sortedTodos);
    setSorted(!sorted); // Toggle the sorted state
}