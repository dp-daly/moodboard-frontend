import '../../styles/App.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { baseUrl } from '../../config.js'

function EditBoard() {
    const { boardId } = useParams()  
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        description: '',
    })

    useEffect(() => {
        fetchBoard()
    }, [boardId])

    async function fetchBoard() {
        try {
            const token = localStorage.getItem('token')
            const { data } = await axios.get(`${baseUrl}/api/boards/${boardId}/`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            setFormData(data)
        } catch (err) {
            console.log(err.response.data)
            toast.error("Cannot load this board's information.")
        }
    }

    function handleChange(e) {
        const newFormData = structuredClone(formData)
        newFormData[e.target.name] = e.target.value
        setFormData(newFormData)
        }

    async function handleSubmit(e) {
        e.preventDefault()
        const token = localStorage.getItem('token')
        try {
            await axios.put(`${baseUrl}/api/boards/${boardId}/`, formData, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            navigate('/')
        } catch (err) {
            console.log(err.response.data)
            toast.error("Try again - something went wrong.")
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

export default EditBoard