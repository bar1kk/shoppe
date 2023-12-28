import { useRef } from "react";
import { useField } from "formik";

const TextareaInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    const ref = useRef(null);
    const handleInput = (e) => {
        if (ref.current) {
            ref.current.style.height = 'auto';
            ref.current.style.height = `${e.target.scrollHeight}px`;
        }
    };
    return (
        <div>
            <textarea {...field} {...props} ref={ref} onInput={handleInput} />
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </div>
    );
};

export default TextareaInput