import React, { useEffect, useState } from 'react'

const StudentView = () => {

    const [students, setStudents] = useState([]);

    useEffect(() => {
        fetchingData();

    }, [])

    async function deleteStudentData(id) {
        try {
            const response = await fetch(`http://localhost:8080/delete/${id}`, {
                method: 'DELETE'
            })
            if (response.ok) {

                setStudents((prevStudents) => prevStudents.filter(student => student.id !== id));

            }
            else {
                throw new Error("Could Not Delete")
            }
        }
        catch (error) {

            throw error;
        }


    }

    async function fetchingData() {
        try {
            const response = await fetch("http://localhost:8080/students");
            if (response.ok) {
                const result = await response.json();
                setStudents(result);
            } else {
                throw new Error("Something went erong" + response.status)
            }
        } catch (error) {

            throw error;
        }
    }


    return (
        <section>
            <table>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Department</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        students.map((student, index) => (
                            <tr key={student.id}>
                                {/* <th scope='row' key={index}>{index + 1
                                }</th> */}
                                <td>{student.id}</td>
                                <td>{student.firstName}</td>
                                <td>{student.lastName}</td>
                                <td>{student.email}</td>
                                <td>{student.department}</td>
                                <button>View</button>
                                <button onClick={() => deleteStudentData(student.id)}>Delete</button>
                                <button>Update</button>
                            </tr>
                        ))

                    }
                </tbody>
            </table>



        </section>
    )
}

export default StudentView