import ClinicDetail from "./_components/ClinicDetails"
import HeroImage from "./_components/HeroImage"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "react-router-dom"
import { getClinicDetails } from "../../lib/clinicApi"

const ClinicDetails = () => {
  const { id, slug } = useParams();
  const clinicId = id ?? slug;
  const { data } = useQuery({
    queryKey: ["clinic-details", clinicId],
    queryFn: () => getClinicDetails(clinicId ?? ""),
    enabled: Boolean(clinicId),
  });
  const clinic = data?.clinic;

  return (
    <div className="space-y-6 mt-38 px-4">
        <HeroImage images={clinic?.images}/>
        <ClinicDetail clinic={clinic}/>
    </div>
  )
}

export default ClinicDetails
