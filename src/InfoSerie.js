import React, {useState, useEffect} from "react"
import axios from "axios"
import { Badge } from "reactstrap"
import { Navigate, useParams } from "react-router-dom"

const InfoSerie = () => {

    const [form, setForm] = useState({})
    const [success, setSuccess] = useState(false)
    const [data, setData] = useState({})
    const { id } = useParams()
    const [mode, setMode] = useState('INFO')
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState('')

    useEffect(() => {
        axios
            .get('/api/series/' + id, {
                ...form,
                genre_id: genreId
            })
            .then(res => {
                setData(res.data)
                setForm(res.data)
            })
    }, [id])

    useEffect(() => {
        axios
            .get('/api/genres')
            .then(res => {
              setGenres(res.data.data)
              const genres = res.data.data
              const found = genres.find(value => data.genre_name === value.name)
              if(found){
                 setGenreId(found.id)
              }
        })
    }, [data, form])

    // custom header

    const masterHeader = {
        height: '50vh',
        minHeight: '500px',
        backgroundImage: `url('${data.background}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
    }

    const OnChange = field => evt => {
        setForm({
            ...form,
            [field]: evt.target.value})
    }
    const save = () => {
      axios
        .put('/api/series/' + id, form)
        .then(res => {
            setSuccess(true)
        })
    }

    const seleciona =  value => () => {
        setForm({
            ...form,
            status: value
        })
    }

    if(success){
        return <Navigate to='/series'/>
    }
    console.log(data)
    return (
       <div>
            <header style={masterHeader}>
                <div className="h-100" style={{background: 'rgba(0, 0, 0, 0.7) '}}>
                <div className='h-100 container'>
                <div className="row h-100 align-items-center">
                    <div className="col-3">
                        <img alt={data.name} className="img-fluid img-thumbnail" src={data.poster} />
                    </div>
                    <div className='col-8'>
                        <h1 className='font-weight-light text-white'>{data.name}</h1>
                        <div className="lead text-white">
                            { data.status === 'ASSISTIDO' && <Badge color='success'>Assistido</Badge> }
                            { data.status === 'PARA_ASSISTIR' && <Badge color='warning'>Para Assistir</Badge> }
                            Genêro: {data.genre_name}
                        </div>
                    </div>
                </div>
                </div>
                </div>
            </header>
            <div className='container'>
                <button className='btn btn-primary' onClick={() => setMode('EDIT')}>Editar</button>
            </div>
            { mode === 'EDIT' &&
                <div className='container'>
                    <h1>Editar Série</h1>
                    <button className='btn btn-primary' onClick={() => setMode('INFO')}>Cancelar edição</button>
                    <br/>
                    <form>
                    <div className='form-group'>
                        <label htmlFor='name'>Nome</label>
                        <input type='text' value={form.name} onChange={OnChange('name')} className='form-control' id='name' placeholder='Nome da série' />
                        <br/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>Comentários</label>
                        <input type='text' value={form.comments} onChange={OnChange('comments')} className='form-control' id='name' placeholder='Comentários' />
                        <br/>
                    </div>
                    <div className='form-group'>
                        <label htmlFor='name'>Genêro</label>
                    <select className='form-control' onChange={OnChange('genre_id')} defaultValue={genreId}>
                        {genres.map(genre => <option key={genre.id} value={genre.id}>{genre.name}</option>)}
                    </select>
                    </div>
                    <br/>
                        <div className='form-check'>
                            <input className='form-check-input' type='radio' defaultChecked={form.status === 'ASSISTIDO'} name='status' id='assistido' value='ASSISTIDO' onClick={seleciona('ASSISTIDO')} />
                                <label className='form-check-label' htmlFor="assistido">
                                    Assistido
                                </label>
                                </div>
                            <div className="form-check">
                                <input className='form-check-input' type='radio' defaultChecked={form.status === 'PARA_ASSISTIR'} name='status' id='paraAssistir' value='PARA_ASSISTIR' onClick={seleciona('PARA_ASSISTIR')} />
                                <label className='form-check-label' htmlFor='paraAssistir'>
                                    Para Assistir
                                </label>
                        </div>
                    </form>
                    <br/>
                    <button type='button' onClick={save} className='btn btn-primary'>Salvar</button>
                </div>
            }
      </div>

    )
}

export default InfoSerie