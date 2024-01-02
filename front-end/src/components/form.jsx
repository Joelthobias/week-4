import { useState } from "react"

const Form = () => {
    const [name, setName] = useState('')
    const [UserName, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [error,setError]=useState(null)
    const handleSubmit=async(e)=>{
        e.preventDefault()
        const body={name,UserName,email,mobile}
        const response = await fetch('/api/user',{
            method:'POST',
            body:JSON.stringify(body),
            headers:{
                'Content-Type':'application/json'
            }
        })
        const json=await response.json()
        if(!response.ok){
            setError(json.error)
        }
        if(response.ok){
            setError(null)
            setName('')
            setUserName('')
            setEmail('')
            setMobile('')
            console.log('new account added');
        }
    }
    return (
        <form  onSubmit={handleSubmit} className="create col-md-4 container">
            <h3>Add New User</h3>
            <label htmlFor="">Name : </label>
            <input
                className="form-control"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
                type="text" 
            />
            <label htmlFor="">User Name : </label>
            <input
                className="form-control"
                value={UserName}
                onChange={(e) => { setUserName(e.target.value) }}
                type="text"
            />
            <label htmlFor="">email : </label>
            <input
                className="form-control"
                value={email}
                onChange={(e) => {setEmail(e.target.value) }}
                type="email"
            />
            <label htmlFor="">Name : </label>
            <input
                className="form-control"
                value={mobile}
                onChange={(e) => { setMobile(e.target.value) }}
                type="number"
            />
            <button className="btn btn-primary mt-3 text-center" type="submit">Add User</button>
            {error && <div className="error">{error}</div> }
        </form>
    )
}

export default Form