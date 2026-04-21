export default function HomeClinicForm({ errors }: any) {
  return (
    <div>
      <h2 className="text-base font-bold mb-5">Home Clinic Details</h2>

      <div className="flex flex-col gap-4">

        {/* Country */}
        <input
          placeholder="Country"
          className="input"
        />

        {/* Clinic Name */}
        <input
          placeholder="Clinic Name"
          className="input"
        />

        {/*  NEW FIELD */}
        <input
          placeholder="Consultant Name"
          className={`input ${errors?.consultant ? "border-red-500" : ""}`}
        />

        {errors?.consultant && (
          <p className="text-xs text-red-500">Consultant name is required</p>
        )}
      </div>
    </div>
  );
}