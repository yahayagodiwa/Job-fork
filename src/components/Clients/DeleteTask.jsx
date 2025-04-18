import { useContext, useEffect, useState } from "react"
import { UserContext } from "../context/UserContext"
import { Link, useParams } from "react-router-dom"
import Loader from "../Loader"

const DeleteTask = () => {
    const {userToken, url}  = useContext(UserContext)
    const [msg, setMsg] = useState('')
    const [loading, SetLoading] = useState(false)
    const {id} = useParams()
    const deleteTask = async ()=>{
        SetLoading(true)
        const response = await fetch(`${url}client/delete-tasks/${id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${userToken}`,
            'content-type': 'application/json'
          }
        })
        if(response.ok){
          const data = await response.json()
          SetLoading(false)
          setMsg(data)
        } else{
          const err = await response.json();
          console.log(err);
          setMsg(err)
          SetLoading(false)
          
          
        }
      }

useEffect(()=>{
    deleteTask()
},[])

  return (
    
    <div className="h-screen flex justify-center items-center">
        {loading ? <Loader />: <>
        <div className="w-80 border-1 border-[#F3F5FF] h-62 rounded-2xl
          shadow-xl flex flex-col justify-center items-center">

        <p className="text-2xl text-red-600 mb-3">{msg.message}</p>
        <Link to='/client-dashboard'>Go Back</Link>
        </div>
        </>}
</div>
  )
}

export default DeleteTask