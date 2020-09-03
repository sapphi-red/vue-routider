import { RouteLocationNormalizedLoaded } from 'vue-router'
import { RouteNames, RoutiderRoutes } from '../options/options'
import warning from 'tiny-warning'
import { RouteRecordName } from '../options/name'

export const warnIfIncorrectRoute = <Routes extends RoutiderRoutes>(
  route: RouteLocationNormalizedLoaded,
  name: RouteNames<Routes> | RouteNames<Routes>[] | null
): void => {
  if (name === null) return

  const matchedNames = route.matched.map(m => m.name)
  if (matchedNames.length <= 0) return

  const names: RouteRecordName[] = Array.isArray(name) ? name : [name]
  warning(
    names.some(name => matchedNames.includes(name)),
    `vue-routider: Incorrect useRoute usage. Path is now matched '${String(
      matchedNames.join(',')
    )}' but \`useRoute([${names.join(',')}])\` is used.`
  )
}
