import { useCookie, useFetch, useRuntimeConfig, type UseFetchOptions } from 'nuxt/app'

export const useApiFetch = <DataT = unknown>(request: string, options?: UseFetchOptions<DataT>) => {
  const config = useRuntimeConfig()
  const authToken = useCookie('authToken')

  const base = (config.public.apiBase as string | undefined)?.replace(/\/+$/, '')

  if (!base) {
    throw new Error('API_BASE_URL is not set')
  }

  const defaults: UseFetchOptions<DataT> = {
    baseURL: base,
    key: request + JSON.stringify(options?.params), // нужно для кеширования
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken.value ? `Bearer ${authToken.value}` : '',
    },
  }

  const params = { ...defaults, ...options }

  return useFetch(request, params)
}
