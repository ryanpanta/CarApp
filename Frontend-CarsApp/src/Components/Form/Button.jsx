import React from "react";
import styles from './Button.module.css'
function Button({ text, variant }) {
    return (
        <button
            className={`${styles.button} ${
                variant === "primary" ? styles.primary : styles.secondary
            }`}
        >
            {text}
        </button>
    );
}

export default Button;
