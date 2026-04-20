export default function PerformanceCard() {
  return (
    <section className="w-full py-5 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div 
          className="rounded-3xl py-6 px-8 md:px-12 text-center text-white relative overflow-hidden gradienttwo"
          
        >
          {/* Subtle overlay for depth */}
          <div className="absolute inset-0 bg-[radial-gradient(at_center,#ffffff10_0%,transparent_70%)]" />

          <div className="relative z-10">
            {/* Main Heading */}
            <h2 className="text-2xl font-bold leading-tight mb-1">
              Performance That Drives Trust
            </h2>

            {/* Description */}
            <p className="max-w-4xl mx-auto text-sm  opacity-90 leading-relaxed mb-10">
              Real data showcasing our growth and dedication
            </p>

            {/* Button */}
            <div className="flex items-center justify-evenly gap-6 ">
                <div className="px-2 py-2">
                    <h3 className="text-3xl">500+</h3>
                    <p className="text-base">Partner Clinics</p>
                </div>
                <div className="px-2 py-2">
                    <h3 className="text-3xl">50k+</h3>
                    <p className="text-base">Happy Patients</p>
                </div>
                <div className="px-2 py-2">
                    <h3 className="text-3xl">4.9/5</h3>
                    <p className="text-base">Average Rating</p>
                </div>
                <div className="px-2 py-2">
                    <h3 className="text-3xl">98%</h3>
                    <p className="text-base">Satisfaction Rate</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}