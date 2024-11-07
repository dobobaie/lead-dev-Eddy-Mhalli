export type ConcatArray<T extends any[]> = T extends [infer U, ...infer V]
  ? U & ConcatArray<V>
  : // eslint-disable-next-line @typescript-eslint/ban-types
    {};
