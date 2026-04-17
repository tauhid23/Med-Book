import {  MoveRight } from "lucide-react"
import image from "../../../../public/Images/special_doctors.jpg"
import { Link } from "react-router-dom"


const AboutUs = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center">
            <div className="w-full h-full max-w-xl">
                <img src={image} alt="Special Doctors"  className="h-auto w-auto"/>
            </div>
            <div className="flex flex-col gap-4">
                <h1 className="text-primary text-[48px] leading-tight">About Us</h1>
                <h4 className="flex items-center gap-3"> <MoveRight className="text-primary w-8 h-8" /> <span className="text-[24px]">Safe, Simple, and Global Dialysis Booking</span></h4>
                <p className="text-base text-secondary/70 max-w-lg">We believe that travel should never be limited by health conditions. Our platform connects patients with certified dialysis clinics around the world, making it easy to compare services, check real-time availability, and book appointments with confidence. Whether you’re traveling for business, vacation, or family reasons your care is always within reach.</p>
                <Link to={"about-us"} className="bg-primary text-white mt-5 text-base w-2/7 text-center px-3 py-2 rounded-md" >Learn More</Link>
            </div>
        </div>

    </div>
  )
}

export default AboutUs