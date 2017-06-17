interface Promise<T> {
   thenForEach<R>(doFn: (item?: any, index?: number, context?: any) => R, context?: any): Promise<R>;
}