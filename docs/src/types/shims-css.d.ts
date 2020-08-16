declare module '*.css' {
  export default undefined
}

declare module '*.module.css' {
  const value: Record<string, string>
  export default value
}
