
export default function sortOnTimestamp(todos, setTodos, sorted, setSorted) {
    const sortedTodos = [...todos].sort((a, b) => {
        return sorted ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    });
    setTodos(sortedTodos);
    setSorted(!sorted);
}
