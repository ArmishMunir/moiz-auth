export const ROLES = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
};

export const ROLE_BG = {
  [ROLES.SUPER_ADMIN]: {
    bgColor: "bg-green-500",
  },
  [ROLES.ADMIN]: {
    bgColor: "bg-blue-500",
  },
  [ROLES.USER]: {
    bgColor: "bg-orange-300",
  },
};
