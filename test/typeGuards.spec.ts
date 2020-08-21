import { ValidTypeLocation } from '#/index'
import {
  isSameType,
  isSubType,
  getSkeletonRouter,
  runInsideComponent
} from '#/test-util'
import { QueryMap } from '#/options/queries'

type NeverRecord = Record<never, never>

describe('typeGuards', () => {
  it('can narrow type correctly with isRouteName', async () => {
    const { routerInstall, useRoute, useRouter } = await getSkeletonRouter()
    runInsideComponent(routerInstall, () => {
      const route = useRoute(null)
      const router = useRouter()

      isSameType<
        Record<string, string | string[] | undefined>,
        typeof route.params
      >(true)
      if (router.isRouteName(route, 'Item')) {
        isSameType<{ id: string | string[] }, typeof route.params>(true)
        isSameType<QueryMap<'order' | 'row'>, typeof route.query>(true)
      }
      if (router.isRouteName(route, 'Index')) {
        isSameType<NeverRecord, typeof route.params>(true)
        isSameType<NeverRecord, typeof route.query>(true)
      }
    })
  })

  it('can get type correctly with getOptionalTypedRoute', async () => {
    const { routerInstall, useRoute, useRouter } = await getSkeletonRouter('/')
    runInsideComponent(routerInstall, () => {
      const route = useRoute('Index')
      const router = useRouter()

      const optionalTypedRoute = router.getOptionalTypedRoute(route)
      isSameType<
        { id?: string | string[]; userId?: string | string[] },
        typeof optionalTypedRoute.params
      >(true)
      isSameType<QueryMap<'order' | 'row'>, typeof optionalTypedRoute.query>(
        true
      )
    })
  })

  it('can get ValidTypeLocation type by ensureLocationType', async () => {
    const { ensureLocationType } = await getSkeletonRouter('/')
    const to = ensureLocationType({ name: 'Index' })

    isSubType<ValidTypeLocation, typeof to>(true)
  })
})
