import { HttpParams } from '@angular/common/http';

export function createParams(...objects: object[]): HttpParams {
  let paramsObject = {};
  objects.forEach(object => {
    paramsObject = {
      ...paramsObject,
      ...object,
    };
  });

  return new HttpParams({
    fromObject: paramsObject,
  });
}
