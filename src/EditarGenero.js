import React, {useEffect, useState} from "react"
import axios from "axios"
import { Navigate, useParams } from "react-router-dom"

const EditarGenero = ( ) => {

    const [name, setName] = useState('')
    const [success, setSuccess] = useState(false)
    const { id } = useParams()

    useEffect(() => {
        axios
            .get('/api/genres/' + id)
            .then(res =>{
                setName(res.data.name)
            })
    }, [id])

    const OnChange = evt =>{
        setName(evt.target.value)
    }
    const save = () => {
        axios
            .put('/api/genres/' + id, { name })
            .then(res => {
                setSuccess(true)
            })
    }

    if(success){
        return <Navigate to='/generos'/>
    }

    return (
        <div className='container'>
            <h1>Editar Gênero</h1>
            <form>
             <div className='form-group'>
                 <label htmlFor='name'>Nome</label>
                 <input type='text' value={name} onChange={OnChange} className='form-control' id='name' placeholder='Nome do Genêro' />
                 <br/>
             </div>
            </form>
            <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
            <br/>
        </div>
    )
}

export default EditarGenero