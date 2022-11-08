export function when<T>(
  condition: boolean,
  fn: () => T,
  unmetValue?: T
): T | undefined {
  if (condition) {
    return fn();
  }

  return unmetValue;
}

export function whenDev<T>(fn: () => T, unmetValue?: T): T | undefined {
  return when<T>(process.env.NODE_ENV === 'development', fn, unmetValue);
}

export function whenProd<T>(fn: () => T, unmetValue?: T): T | undefined {
  return when<T>(process.env.NODE_ENV === 'production', fn, unmetValue);
}

export function whenTest<T>(fn: () => T, unmetValue?: T): T | undefined {
  return when<T>(process.env.NODE_ENV === 'test', fn, unmetValue);
}
