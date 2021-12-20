// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const process: any

export const isDev = process.env.NODE_ENV !== 'production'
