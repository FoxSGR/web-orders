import * as _ from 'lodash';

import { Role, roles } from '@web-orders/api-interfaces';

export const hasPermission = (userRoles: Role[], key: string) =>
  !!userRoles.find(role => _.get(roles[role], key));
