const API_BASE_URL = "https://alrahman87.softvencealpha.com/api";

export type AccountType = "PATIENT" | "CLINIC_OWNER";

type ApiEnvelope<T> = {
  status: number;
  success: boolean;
  message: string;
  data: T;
};

export type SignupPayload = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  termAndCondition: boolean;
  privacyPolicy: boolean;
  accountType: AccountType;
};

export type SignupResponse = {
  id: number;
  email: string;
  message: string;
  role: string;
};

export type VerifyOtpPayload = {
  email: string;
  otp: string;
};

export type VerifyOtpResponse = {
  user: {
    id: number;
    email: string;
    avatar: string | null;
    is_verified: boolean;
  };
  access_token: string;
  refresh_token: string;
};

export type SigninPayload = {
  email: string;
  password: string;
};

export type AuthUser = {
  id: number;
  email: string;
  avatar: string | null;
  role: string;
};

export type SigninResponse = {
  user: AuthUser;
  refresh: string;
  access: string;
};

type ApiErrorBody = {
  message?: string;
  detail?: string;
  error?: string;
  errors?: Record<string, string[] | string>;
};

export class ApiError extends Error {
  status?: number;
  details?: ApiErrorBody;

  constructor(message: string, status?: number, details?: ApiErrorBody) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

const extractApiErrorMessage = (body: ApiErrorBody | null) => {
  if (!body) return "Something went wrong. Please try again.";
  if (body.message) return body.message;
  if (body.detail) return body.detail;
  if (body.error) return body.error;

  if (body.errors) {
    const firstError = Object.values(body.errors)[0];
    if (Array.isArray(firstError)) return firstError[0];
    if (typeof firstError === "string") return firstError;
  }

  return "Something went wrong. Please try again.";
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

const postForm = async <T>(
  path: string,
  values: Record<string, string | boolean>
) => {
  const formData = new FormData();

  Object.entries(values).forEach(([key, value]) => {
    formData.append(key, String(value));
  });

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    body: formData,
  });

  const body = await parseJson<ApiEnvelope<T> & ApiErrorBody>(response);

  if (!response.ok || !body?.success) {
    throw new ApiError(
      extractApiErrorMessage(body),
      response.status,
      body ?? undefined
    );
  }

  return body;
};

export const signup = (payload: SignupPayload) =>
  postForm<SignupResponse>("/signup/", {
    full_name: payload.fullName,
    email: payload.email,
    password: payload.password,
    confirm_password: payload.confirmPassword,
    term_and_condition_accepted: payload.termAndCondition,
    privacy_policy_accepted: payload.privacyPolicy,
    purpose: "signup",
    account_type: payload.accountType,
  });

export const verifySignupOtp = (payload: VerifyOtpPayload) =>
  postForm<VerifyOtpResponse>("/verify-otp/", {
    email: payload.email,
    otp: payload.otp,
    purpose: "signup",
  });

export const signin = (payload: SigninPayload) =>
  postForm<SigninResponse>("/signin/", {
    email: payload.email,
    password: payload.password,
  });

export const signout = async (accessToken: string, refreshToken: string) => {
  const response = await fetch(`${API_BASE_URL}/signout/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ refresh: refreshToken }),
  });

  const body = await parseJson<ApiEnvelope<unknown> & ApiErrorBody>(response);

  if (!response.ok || body?.success === false) {
    throw new ApiError(
      extractApiErrorMessage(body),
      response.status,
      body ?? undefined
    );
  }

  return body;
};
