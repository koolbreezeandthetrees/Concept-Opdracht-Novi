import './button.css'
function Button({ buttonType, variant, handleClick, children}) {
    return (
        <button type={buttonType}
                className={`button button--${variant}`}
                onClick={ handleClick }
        > {children} </button>
    );
}

export default Button;