import { MagnifyingGlass } from "@phosphor-icons/react";

export default function SearchField({type, placeholder, value, onChangeHandler, keyDown}) {
    return (
        <div className="search-field">
            <MagnifyingGlass size={30} className="search-icon" />
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChangeHandler}
                onKeyDown={keyDown}
            />
        </div>
    )
}
