import { useContext, useState } from "react"
import { UserContext } from "../context/UserContext"
import Loader from "../Loader"
import { toast, ToastContainer } from "react-toastify"


const UpdateProfile = () => {
    const {url, user} = useContext(UserContext)
    const [loading, setLoading] = useState(false)
    const userToken = localStorage.getItem('token')
console.log(user);
    
    const [formdata, setFormdata] = useState({
        profilePicture: user?.profilePicture,
        jobTitle: user?.jobTitle,
        profileDescription: user?.profileDescription,
        location: user?.location
        })
     
// console.log(formdata);

const handleChange = (e) => {
  const { name, value, type, files } = e.target;

  setFormdata(prevData => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value
  }));
};
        
    const handleSubmit = async (e)=>{
        e.preventDefault()
        
      const formData = new FormData()
      formData.append("profilePicture", formdata.profilePicture);
      formData.append("jobTitle", formdata.jobTitle);
      formData.append("profileDescription", formdata.profileDescription);
      formData.append("location", formdata.location);

        setLoading(true)
       const response = await fetch(`${url}user/update-profile`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${userToken}`,
          // 'content-type': 'application/json'
        },
        body: formData
       })
       if (response.ok){
        const data = await response.json()
        setLoading(false)
        console.log(data);
        toast.success(data.message)
        window.location.href = '/dashboard'
        // navigate('/dashboard')
        
       } else {
        const error = await response.json()
        console.log(error);
        setLoading(false)
        toast.error(error.error)
       }
     }
  return (
    <div className="flex min-h-screen md:gap-10">
    {loading || !user  ? <Loader /> :
          <>
          <div className="w-full gap-y-2 flex flex-col">
          <h1 className="text-[25px] text-center font-semibold pb-6 mt-10">Update 
          <span className="text-[#EA1588] "> Profile</span></h1>
          <ToastContainer />
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-y-4 justify-center items-center">
              
              <div className="flex flex-col gap-2">
                <label className="font-semibold">Upload your profile picture:</label>
              <input type="file" placeholder="Upload your profile" 
              onChange={handleChange}
              name="profilePicture"
              
              className="w-[328px] md:w-[652px] h-[50px] rounded-md p-2 px-5 outline-0
                 bg-[#FFF5F6]" />
                </div>

                <div className="flex flex-col gap-2">
               <label className="font-semibold">Tagline: </label>
              <input type="text" placeholder="Cerfified Photographer."
              onChange={handleChange}
              name="jobTitle"
              value={formdata.jobTitle}
              className="w-[328px] md:w-[652px] rounded-md p-2 px-5 outline-0
                bg-[#FFF5F6]" />
            </div>

                <div className="flex flex-col gap-2">
                <label className="font-semibold">Description: </label>
              <textarea type="text" placeholder="I am a phontographer with 5 years experience. I shoot various type of pictures include...." 
              onChange={handleChange}
              name="profileDescription"
              value={formdata?.profileDescription}
              className="w-[328px] md:w-[652px] min-h-[100px] rounded-md p-2 px-5 outline-0
                 bg-[#FFF5F6]" />
               </div>

               
               <div className="flex flex-col gap-2">
               <label className="font-semibold">Location: </label>
              <input type="text" placeholder="Tosh consult Inc. Ilorin, Kwara state" 
              onChange={handleChange}
              name="location"
              value={formdata.location}
              className="w-[328px] md:w-[652px] h-[50px] rounded-md p-2 px-5 outline-0
                 bg-[#FFF5F6]" />
               </div>
             {/* <ToastContainer /> */}
            <button type="submit" className="w-[328px] md:w-[652px] py-[20px] 
            cursor-pointer bg-[#EA1588] hover:bg-white rounded-3xl text-white hover:text-black hover:border-2 hover:border-[#F3F5FF]">Continue</button>
            </form>
             
          </div>
          </>
          }
        </div>
  )
}

export default UpdateProfile