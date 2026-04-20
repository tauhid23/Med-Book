import AboutUs from "../home/_components/AboutUs"
import AboutHero from "./_components/AboutHero"
import BottomCard from "./_components/BottomCard"
import ExpertTeam from "./_components/ExpertTeam"
import MissionVision from "./_components/MissionVission"
import PerformanceCard from "./_components/PerformanceCard"
import WhyChooseUs from "./_components/WhyChooseUs"

const AboutPage = () => {
  return (
    <div className="md:space-y-35 space-y-20">
       <AboutHero /> 
       <AboutUs />
       <WhyChooseUs/>
       <MissionVision/>
       <PerformanceCard/>
       <ExpertTeam/>
       <BottomCard/>
    </div>
  )
}

export default AboutPage