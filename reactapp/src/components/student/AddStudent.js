import React, { useEffect, useState } from 'react'

const AddStudent = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [department, setDepartment] = useState("");
    const stateChangeHandler = (event) => {
        if (event.target.id === "firstName") {
            setFirstName(event.target.value);
        }
        if (event.target.id === "lastName") {
            setLastName(event.target.value);
        }
        if (event.target.id === "email") {
            setEmail(event.target.value);
        }
        if (event.target.id === "department") {
            setDepartment(event.target.value);
        }
    }

    async function addStudentData(event) {
        event.preventDefault();
        const studentData = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            department: department
        }

        await fetch("http://localhost:8080/add", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        })

    }



    return (
        <div>
            <form>

                <label htmlFor='firstName'>
                    First Name
                </label>
                <input type='text' name='firstName' id='firstName' onChange={stateChangeHandler} value={firstName}>

                </input>

                <label htmlFor='lastName'>
                    Last Name
                </label>
                <input type='text' name='lastName' id='lastName' onChange={stateChangeHandler} value={lastName}>

                </input>

                <label htmlFor='email'>
                    Email                </label>
                <input type='email' name='email' id='email' onChange={stateChangeHandler} value={email}>

                </input>
                <label htmlFor='department'>
                    Department
                </label>
                <input type='text' name='department' id='department' onChange={stateChangeHandler} value={department}>

                </input>
                <button type='submit' onClick={addStudentData}>Submit Data</button>


            </form>



        </div>
    )
}

export default AddStudent