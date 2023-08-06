export default function getPriorityClassName(priority) {
    if (priority === 3) {
        return "lowPriorityCircle";
    } else if (priority === 2) {
        return "mediumPriorityCircle";
    } else if (priority === 1) {
        return "highPriorityCircle";
    } else {
        return ""; // Default class name or empty string if priority is not 1, 2, or 3
    }
}