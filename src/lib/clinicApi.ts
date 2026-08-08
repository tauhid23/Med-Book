const API_BASE_URL = "https://alrahman87.softvencealpha.com/api";

type ApiEnvelope<T> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};

type ApiErrorBody = {
  message?: string;
  detail?: string;
  error?: string;
};

export class ClinicApiError extends Error {
  status?: number;

  constructor(message: string, status?: number) {
    super(message);
    this.name = "ClinicApiError";
    this.status = status;
  }
}

export type ClinicImage = {
  id: number;
  image: string;
  image_url: string;
};

export type ClinicTreatment = {
  id?: number;
  name?: string;
  title?: string;
  treatment_name?: string;
  price?: string;
  amount?: string;
};

export type ClinicRating = {
  clinic: number;
  rating: string;
};

export type ClinicFacility = {
  id?: number;
  name?: string;
  facility_name?: string;
  title?: string;
};

export type ClinicInsurance = {
  id: number;
  insurance_name: string;
  clinic: number;
};

export type ClinicAcceptedPatient = {
  id?: number;
  name?: string;
  patient_type?: string;
  title?: string;
};

export type ClinicPaymentMethod = {
  id?: number;
  name?: string;
  payment_method?: string;
  title?: string;
};

export type ClinicAvailability = {
  id?: number;
  date?: string;
  day?: string;
};

type ClinicBase = {
  id: number;
  clinic: number;
  name: string;
  title: string;
  country: string;
  city: string;
  images: ClinicImage[];
  treatments: ClinicTreatment[];
  facilities: ClinicFacility[];
  insurances: ClinicInsurance[];
};

export type ClinicListItem = ClinicBase & {
  distance_from_city_center: string;
  ratings: ClinicRating[];
  average_rating: number;
};

export type ClinicDetailsItem = ClinicBase & {
  description: string;
  address: string;
  latitude: string;
  longitude: string;
  per_treatment_price: string;
  accepted_patients: ClinicAcceptedPatient[];
  payment_methods: ClinicPaymentMethod[];
  availabilities: ClinicAvailability[];
};

const parseJson = async <T>(response: Response): Promise<T | null> => {
  const text = await response.text();
  if (!text) return null;

  try {
    return JSON.parse(text) as T;
  } catch {
    return null;
  }
};

const extractErrorMessage = (body: ApiErrorBody | null) => {
  if (body?.message) return body.message;
  if (body?.detail) return body.detail;
  if (body?.error) return body.error;
  return "Something went wrong. Please try again.";
};

const get = async <T>(path: string) => {
  const response = await fetch(`${API_BASE_URL}${path}`);
  const body = await parseJson<ApiEnvelope<T> & ApiErrorBody>(response);

  if (!response.ok || !body?.success) {
    throw new ClinicApiError(extractErrorMessage(body), response.status);
  }

  return body.data;
};

export const getClinics = () =>
  get<{ clinics: ClinicListItem[] }>("/clinics/");

export const getClinicDetails = (clinicId: string | number) =>
  get<{ clinic: ClinicDetailsItem }>(`/clinics/${clinicId}/`);
