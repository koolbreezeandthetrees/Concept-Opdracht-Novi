export  default function InputElement({type, title, value, eventHandler}) {
    return (
        <input
            type={type}
            placeholder={title}
            value={value}
            onChange={eventHandler}
        />
    )
}
