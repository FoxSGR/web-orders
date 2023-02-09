export interface CustomEqualsConfig {
  ignoredKeys: string[];
}

export const defaultCustomEqualsConfig: CustomEqualsConfig = {
  ignoredKeys: [],
};

/**
 * Checks if two variables are equal according to custom checks.
 * @param a
 * @param b
 * @param config
 */
export const customEquals: (
  a: any,
  b: any,
  config?: CustomEqualsConfig,
) => boolean = (a, b, config = defaultCustomEqualsConfig) => {
  config = {
    ...defaultCustomEqualsConfig,
    ...config,
  };

  return _customEquals(a, b, config);
};

/**
 * Checks if two variables are equal according to custom checks.
 * @param a
 * @param b
 * @param config
 */
const _customEquals = (a, b, config: CustomEqualsConfig) => {
  a = mapValue(a);
  b = mapValue(b);
  if (!a || !b) {
    return !!a === !!b;
  }

  if (
    typeof a !== typeof b ||
    (Array.isArray(a) && !Array.isArray(b)) ||
    (Array.isArray(b) && !Array.isArray(a)) ||
    (Array.isArray(a) && a.length !== b.length)
  ) {
    return false;
  }

  if (typeof a === 'function') {
    return true;
  }

  if (Array.isArray(a)) {
    for (let i = 0; i < a.length; i++) {
      if (!_customEquals(a[i], b[i], config)) {
        return false;
      }
    }

    return true;
  }

  if (typeof a === 'object') {
    const checkedKeys: string[] = [];
    for (const key of Object.keys(a)) {
      if (config.ignoredKeys.includes(key)) {
        continue;
      }

      checkedKeys.push(key);
      if (!_customEquals(a[key], b[key], config)) {
        return false;
      }
    }
    for (const key of Object.keys(b)) {
      if (checkedKeys.includes(key) || config.ignoredKeys.includes(key)) {
        continue;
      }
      if (!_customEquals(b[key], a[key], config)) {
        return false;
      }
    }

    return true;
  }

  return a === b;
};

/**
 * Checks if a value is empty according to {@see customEquals}.
 * @param value
 */
export const customEmpty = (value: any) => customEquals(value, undefined);

/**
 * Maps a value to be compared.
 * @param value
 */
const mapValue = value => {
  if (!value) {
    return undefined;
  }

  if (Array.isArray(value)) {
    value = value.map(v => mapValue(v)).filter(v => !!v);

    if (value.length === 0) {
      return undefined;
    }
  }

  if (typeof value === 'object') {
    value = { ...value };
    delete value['_uid']; // delete internal ui property

    for (const [key, v] of Object.entries(value)) {
      const mapped = mapValue(v);
      if (mapped) {
        value[key] = mapped;
      } else {
        delete value[key];
      }
    }

    if (Object.keys(value).length === 0) {
      return undefined;
    }
  }

  return value;
};
