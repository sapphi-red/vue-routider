declare const params: unique symbol
export type RoutiderPath<T extends string> = string & { [params]: T }

export type ExtractParams<T> = T extends RoutiderPath<infer P> ? P : never

/**
 * Creates typed path.
 *
 * @example createPath`/items/${'id'}`
 */
export function createPath<T extends string | never>(
  literals: TemplateStringsArray
): RoutiderPath<never>
export function createPath<T extends string | never>(
  literals: TemplateStringsArray,
  ...placeholders: T[]
): RoutiderPath<T>
export function createPath<T extends string | never>(
  literals: TemplateStringsArray,
  ...placeholders: T[]
): RoutiderPath<T> {
  let path = ''
  for (let i = 0; i < placeholders.length; i++) {
    path += literals[i] + ':' + placeholders[i]
  }
  path += literals[literals.length - 1]
  return path as RoutiderPath<T>
}
