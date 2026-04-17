import AboutUs from "./_components/AboutUs"
import Awards from "./_components/Award"
import FeaturedClinics from "./_components/ClinicCard"
import HeroSection from "./_components/Hero"
import OurValues from "./_components/OurValues"

const Home = () => {
  return (
    <div className="space-y-35">
        <HeroSection />
        <AboutUs />
        <OurValues />
        <Awards />
        <FeaturedClinics />
    </div>
  )
}

export default Home