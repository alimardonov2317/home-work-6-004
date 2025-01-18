import React, { useRef, useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import "./Hero.css"
import { Toaster, toast } from 'sonner'

const Hero = () => {
    const fnameRef = useRef(null)
    const lnameRef = useRef(null)
    const ageRef = useRef(null)
    const professionRef = useRef(null)
    const genderRef = useRef(null)
    const bioRef = useRef(null)
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(null)

    const handleCreate = e => {
        e.preventDefault()
        const fname = fnameRef.current.value
        const lname = lnameRef.current.value
        const age = ageRef.current.value
        const profession = professionRef.current.value
        const gender = genderRef.current.value
        const bio = bioRef.current.value

        if (!fname || !lname || !age || !profession || !gender || !bio) {
            return toast.warning("Iltimos barcha maydonlarni to'ldiring")
        }

        if (edit) {
            setData((prev) =>
                prev.map((item) =>
                    item.id === edit.id
                        ? { ...item, firstname: fname, lastname: lname, age, profession, gender, bio } : item))
            setEdit(null)
        } else {
            const post = {
                id: uuidv4(),
                firstname: fname,
                lastname: lname,
                age,
                profession,
                gender,
                bio,
            }
            setData((prev) => ([...prev, post]))
        }

        fnameRef.current.value = ""
        lnameRef.current.value = ""
        ageRef.current.value = ""
        professionRef.current.value = ""
        genderRef.current.value = ""
        bioRef.current.value = ""
    }

    const handleDelete = (id) => {
        setData(prev => prev.filter((item) => item.id !== id))
    }
    const handleEdit = (item) => {
        fnameRef.current.value = item.firstname
        lnameRef.current.value = item.lastname
        ageRef.current.value = item.age
        professionRef.current.value = item.profession
        genderRef.current.value = item.gender
        bioRef.current.value = item.bio
        setEdit(item)
    }
    return (
        <div>
            <div className="main">
                <div className="sidebar__wrapper">
                    <h2>Create Users</h2>
                    <div className="sidebar">
                        <form onSubmit={handleCreate} class="form" action="">
                            <input ref={fnameRef} type="text" placeholder="First Name" />
                            <input ref={lnameRef} type="text" placeholder="Last Name" />
                            <input ref={ageRef} type="number" placeholder="Age" />
                            <input ref={professionRef} type="text" placeholder="Profession" />
                            <select ref={genderRef}>
                                <option value="" disabled selected>Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                            <input ref={bioRef} type="text" placeholder="Bio" />
                            <button>{edit ? "Save" : "Create"}</button>
                        </form>
                    </div>
                </div>
                <div className="content">
                    <div className="wrapper">
                        {
                            data?.map((item) => (
                                <div key={item.id} className="card">
                                    <h3>{item.firstname} {item.lastname}</h3>
                                    <p>Age: {item.age}</p>
                                    <p>Profession: {item.profession}</p>
                                    <p>Gender: {item.gender}</p>
                                    <p>Bio: {item.bio}</p>
                                    <div className='card__actions'>
                                        <button onClick={() => handleDelete(item.id)} className='card__btn'>Delete</button>
                                        <button onClick={() => handleEdit(item)} className='card__edit'>Edit</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Hero