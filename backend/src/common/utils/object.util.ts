import { ConcatArray } from "../types/array.type";

export const unsetUndefined = <T extends { [key: string]: any }>(obj: T): T => {
  const objCopied = Object.assign({}, obj);
  Object.keys(objCopied).forEach(
    (key: string) => objCopied[key] === undefined && delete objCopied[key],
  );
  return objCopied;
};

export const merge = <T = any, T2 extends any[] = Partial<T>[]>(
  arg: T,
  ...args: T2
): T & ConcatArray<T2> =>
  args.reduce(
    (finalObject, currentObject) => ({
      ...finalObject,
      ...unsetUndefined(currentObject),
    }),
    { ...arg },
  );
