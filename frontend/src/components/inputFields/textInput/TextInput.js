import { useField } from "formik";

const TextInput = ({ ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <input {...field} {...props} />
            {meta.touched && meta.error ? <div className='error'>{meta.error}</div> : null}
        </div>
    );
};

export default TextInput