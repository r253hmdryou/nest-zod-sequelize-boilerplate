import { advanceTo, clear } from 'jest-date-mock';

type DateLike = number | string | Date;
type ScopeFunction<T> = () => T | Promise<T>;

export default async function mockDate<T>(
  dateLike: DateLike,
  scopeFunction: ScopeFunction<T>,
): Promise<T> {
  advanceTo(dateLike);

  try {
    return await scopeFunction();
  } finally {
    clear();
  }
}
