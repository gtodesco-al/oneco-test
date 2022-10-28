import {UserContextState} from '../../src/models';

export const userHasResource = (
  userContextState: UserContextState | null,
  service: string,
  method: string,
) => {
  if (userContextState?.resources) {
    const arrResources = Object.values(userContextState?.resources);
    const found = arrResources.findIndex(item => {
      return item.resource_name === `v2.${service}.${method}`;
    });

    return found !== -1;
  }
  return false;
};
