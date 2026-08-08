import image1 from "../../../../public/Images/Clinic_main_image.png";
import image2 from "../../../../public/Images/Clininc_image1.png";
import image3 from "../../../../public/Images/Clinic_image2.png";
import image4 from "../../../../public/Images/Clinic_image3.png";

const HeroImage = () => {
  return (
    <div className="w-full max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4">
      
      {/* Left Large Image */}
      <div className="w-full h-160">
        <img
          src={image1}
          alt="Main Clinic"
          className="w-full h-full object-cover rounded-3xl"
        />
      </div>

      {/* Right Side Images */}
      <div className="grid grid-cols-2 gap-4">
        
        {/* Top Right (small) */}
        <div className="col-span-2 h-50">
          <img
            src={image2}
            alt="Clinic 1"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Top Right (small) */}
        <div className="col-span-2 h-50">
          <img
            src={image3}
            alt="Clinic 2"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

        {/* Bottom Full Width */}
        <div className="col-span-2 h-50">
          <img
            src={image4}
            alt="Clinic 3"
            className="w-full h-full object-cover rounded-2xl"
          />
        </div>

      </div>
    </div>
  );
};

export default HeroImage;