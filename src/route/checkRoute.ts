import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RoutiderOptions, RouteNames } from '../options/options'
import warning from 'tiny-warning'

export const warnIfIncorrectRoute = <O extends RoutiderOptions>(
  route: RouteLocationNormalizedLoaded,
  name: RouteNames<O> | RouteNames<O>[] | null
): void => {
  if (name === null) return

  const matchedName = route.matched[0]?.name
  if (matchedName === undefined) return

  const names = Array.isArray(name) ? name : [name]
  warning(
    names.includes(matchedName),
    `vue-routider: Incorrect useRoute usage. Path is now matched '${String(
      matchedName
    )}' but \`useRoute([${names.join(',')}])\` is used.`
  )
}
