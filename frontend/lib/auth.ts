export const customerProfileKey = "iskorder-profile";

export type CustomerRole = "student" | "teacher";

export type CustomerProfile = {
  role?: CustomerRole;
  name?: string;
  email?: string;
  contactNumber?: string;
  courseYear?: string;
  department?: string;
  verificationStatus?: string;
};

export function getCustomerProfile(): CustomerProfile | null {
  if (typeof window === "undefined") {
    return null;
  }

  const savedProfile = window.localStorage.getItem(customerProfileKey);

  if (!savedProfile) {
    return null;
  }

  try {
    const profile = JSON.parse(savedProfile) as CustomerProfile;
    return profile.name && profile.email ? profile : null;
  } catch {
    window.localStorage.removeItem(customerProfileKey);
    return null;
  }
}

export function hasCustomerProfile() {
  return getCustomerProfile() !== null;
}

export function getLoginRedirect(pathname: string, search = "") {
  return `/login?next=${encodeURIComponent(`${pathname}${search}`)}`;
}
