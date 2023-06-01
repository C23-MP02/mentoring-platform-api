export const getRoleNameFromRoleId = (roleId: number) => {
  switch (roleId) {
    case 1:
      return "admin";
    case 2:
      return "mentor";
    default:
      return "mentee";
  }
};
