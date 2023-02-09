import * as _ from 'lodash';

export interface UserPermissions {
  users: {
    manage: boolean;
  };
}

export interface Roles {
  admin: UserPermissions;
  normal: UserPermissions;
}

export const roles: Roles = {
  admin: {
    users: {
      manage: true,
    },
  },
  normal: {
    users: {
      manage: false,
    },
  },
} as const;

export type Role = keyof Roles;

export const hasPermission = (userRoles: Role[], key: string) =>
  !!userRoles.find((role) => _.get(roles[role], key));
