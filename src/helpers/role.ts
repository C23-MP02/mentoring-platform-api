/**
 * Retrieves the role name based on the role ID.
 *
 * @param {number} roleId - The ID of the role.
 * @returns {string} - The role name corresponding to the role ID.
 */
export const getRoleNameFromRoleId = (roleId: number): string => {
  switch (roleId) {
    case 1:
      return "admin";
    case 2:
      return "mentor";
    default:
      return "mentee";
  }
};
