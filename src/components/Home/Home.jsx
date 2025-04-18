
import "../Home/Home.css"
// import Select from '../Select/Select'
import GetTasks from "../Tasks/GetTasks"


const Home = () => {
  return (
    <div className='home-gap'>
      <div className='home-container'>
            <div className='home-pull'>
                <div className='background'>
                    <div>
                        <div className='home-text'>
                            <h1 className='home-h1'>THEBEST PRICE</h1>
                            <p className='home-p'>You&apos;re One Way in. <span className='home-span'></span></p>
                        </div>
                        <button className='home-bn'>Get Started</button>
                    </div>
                </div>
            </div>
         </div>
         {/* <Select /> */}
         <GetTasks />
    </div>
  )
}

export default Home