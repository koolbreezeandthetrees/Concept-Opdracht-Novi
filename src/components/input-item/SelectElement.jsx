export default function SelectElement({ name, value, onChange, placeholder, options }) {
    return (
        <select name={name} value={value} onChange={onChange}>
            <option value="" disabled>
                {placeholder}
            </option>
            {options.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    );
}
