import '../../styles/App.css'
import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function CreateBoard() {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        artobjects: []
    })

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
    }

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            await axios.post(`http://localhost:8000/api/boards/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
            toast.error("Try again - something went wrong.");
        }
    }

    return <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="field">
                    <label className="label">Title</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'title'}
                            onChange={handleChange}
                            value={formData.title}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Description</label>
                    <div className="control">
                        <input
                            className="input"
                            type="text"
                            name={'description'}
                            onChange={handleChange}
                            value={formData.description}
                            autoComplete="off"
                        />
                    </div>
                </div>
                <button className="button">Submit</button>
            </form>
            <ToastContainer
                position="bottom-center"
                autoClose={2000}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                toastStyle={{ backgroundColor: "black", color: "white" }}
            />
        </div>
}

export default CreateBoard;