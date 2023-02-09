/**
 * Calls a function if it is a valid function object.
 * @param fn the function.
 * @param params the parameters to pass to the function.
 */
export const safeCall = (fn?: any, ...params: any[]) => {
  if (fn) {
    fn(...params);
  }
};
