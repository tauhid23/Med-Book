import { Target, Eye } from "lucide-react";
import img1 from "../../../../public/Images/our_mission.png"
import img2 from "../../../../public/Images/our_vission.png"

const MissionVision = () => {
  return (
    <section className="w-full  px-6 bg-white">
      <div className="max-w-7xl mx-auto flex flex-col gap-6">

        {/* Row 1 — Image Left, Mission Right */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Doctor Image */}
          <div className="w-full md:w-[47%] rounded-2xl overflow-hidden min-h-80">
            <img
              src={img1}
              alt="Our Mission"
              width={600}
              height={420}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Mission Card */}
          <div className="w-full md:w-[53%] bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
            {/* Green icon */}
            <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <Target className="w-5 h-5 text-emerald-500" strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-emerald-500 mb-4">
              Our Mission
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              Our mission is to make quality healthcare accessible to patients around the
              world while helping clinics reach their full potential. We aim to simplify
              the process of finding, booking, and receiving medical care across borders,
              removing stress and uncertainty from international patient travel. We are
              committed to supporting healthcare providers by connecting them with patients
              who need their expertise, helping clinics grow sustainably, and ensuring that
              every patient receives timely, reliable, and compassionate care.
            </p>
          </div>
        </div>

        {/* Row 2 — Vision Left, Image Right */}
        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          {/* Vision Card */}
          <div className="w-full md:w-[53%] bg-gray-50 rounded-2xl p-8 flex flex-col justify-center">
            {/* Blue icon */}
            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
              <Eye className="w-5 h-5 text-primary" strokeWidth={1.5} />
            </div>

            <h2 className="text-2xl font-bold text-primary mb-4">
              Our Vision
            </h2>

            <p className="text-sm text-gray-600 leading-relaxed text-justify">
              To become the world's leading platform that seamlessly connects patients and
              clinics across borders, making quality healthcare accessible to everyone,
              everywhere. We envision a future where seeking medical care internationally
              is simple, transparent, and stress-free. Our goal is to empower clinics to
              expand their reach, grow sustainably, and provide exceptional care to patients
              from around the globe. At the same time, we aim to give patients confidence,
              convenience, and peace of mind when accessing the healthcare they need.
            </p>
          </div>

          {/* Doctor Image */}
          <div className="w-full md:w-[47%] rounded-2xl overflow-hidden min-h-80">
            <img
              src={img2}
              alt="Our Vision"
              width={600}
              height={420}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default MissionVision;