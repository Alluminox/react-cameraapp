import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

export const UserForm = () => {

    const { register, handleSubmit, errors, watch } = useForm();
    // const [ formData, setFormData ] = useState({});

    const sendForm = () => {
        console.log('ERRORS -> ', errors)
    }

    // console.log(watch('name'))
    // console.log(watch('age'))

   return (
    <div className="form">
        <form onSubmit={handleSubmit(sendForm)}>
            <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" className="form-control" name="name" placeholder="My name"
                ref={register({ 
                    required: 'This field is madatory',
                    validate: value => value !== null || 'This field is madatory'
                })}/>
                <span>{errors.name && errors.name.message}</span>
            </div>

            <div className="form-group">
                <label htmlFor="age">Your Age</label>
                <input type="number" min="0" max="200" id="age" className="form-control" name="age" placeholder="My Age"
                ref={register({
                    required: 'Required',
                    min: 0,
                    max: 200
                })}/>
            </div>

            <input type="submit" value="Send Data"/>
        </form>
    </div>

   )
}