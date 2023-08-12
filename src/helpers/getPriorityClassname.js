
export default function getPriorityClassName(num) {
    if (num === 3) {
        return "lowPriorityCircle";
    } else if (num === 2) {
        return "mediumPriorityCircle";
    } else if (num === 1) {
        return "highPriorityCircle";
    } else {
        return "doesnt recognize num"; // Default class name or empty string if priority is not 1, 2, or 3
    }
}
