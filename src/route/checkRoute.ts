import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouteNames, RoutiderRoutes } from '../options/options'
import warning from 'tiny-warning'

export const warnIfIncorrectRoute = <Routes extends RoutiderRoutes>(
  route: RouteLocationNormalizedLoaded,
  name: RouteNames<Routes> | RouteNames<Routes>[] | null
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
