export default function PatientForm({ form, setForm, errors }: any) {
  return (
    <div>
      <h2 className="text-base font-bold mb-4">Patient Details</h2>

      <input
        placeholder="Full Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className={`input ${errors.name && "border-red-500"}`}
      />
      {errors.name && <p className="text-red-500 text-xs">Name required</p>}

      <input
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        className={`input ${errors.email && "border-red-500"}`}
      />
      {errors.email && <p className="text-red-500 text-xs">Invalid email</p>}
    </div>
  );
}