import { HttpParams } from '@angular/common/http';

export function createParams(...objects: object[]): HttpParams {
  const paramsObject = {};
  objects
    .filter(object => !!object)
    .forEach(object => {
      Object.entries(object)
        .filter(([, value]) => value !== undefined)
        .forEach(([key, value]) => (paramsObject[key] = value));
    });

  return new HttpParams({
    fromObject: paramsObject,
  });
}
