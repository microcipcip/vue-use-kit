import { ref, onMounted, onUnmounted, Ref, isRef } from '@src/api'

export type TUseFetchUrl = RequestInfo | Ref<RequestInfo>

const abortError = 'AbortError'

const isContentTypeJson = (res: Response) => {
  const contentType = res.headers.get('content-type')
  return contentType && contentType.includes('application/json')
}

const getUrl = (url: TUseFetchUrl) => (isRef(url) ? url.value : url)

const fetchWrapper = async (url: TUseFetchUrl, opts: RequestInit) => {
  const res = await fetch(getUrl(url), opts)
  const resData = isContentTypeJson(res) && (await res.json())
  return { resData, res }
}

export function useFetch(
  url: TUseFetchUrl,
  options: RequestInit = {},
  runOnMount = true
) {
  const data: Ref<any> = ref(null)
  const status: Ref<null | number> = ref(null)
  const statusText: Ref<null | string> = ref(null)
  const isLoading = ref(false)
  const isFailed = ref(false)
  const isAborted = ref(false)

  let controller: AbortController

  const start = async () => {
    try {
      controller = new AbortController()
      const signal = controller.signal

      isLoading.value = true
      isFailed.value = false
      isAborted.value = false

      const { resData, res } = await fetchWrapper(getUrl(url), {
        signal,
        ...options
      })
      data.value = resData

      isLoading.value = false
      isFailed.value = !res.ok
      status.value = res.status
      statusText.value = res.statusText
    } catch (err) {
      if (err.name === abortError) isAborted.value = true
      isLoading.value = false
      isFailed.value = true
      status.value = 500
      statusText.value = err.message || err.name
    }
  }

  const stop = () => {
    if (controller) controller.abort()
  }

  onMounted(() => runOnMount && start())
  onUnmounted(stop)

  return {
    data,
    status,
    statusText,
    isLoading,
    isFailed,
    isAborted,
    start,
    stop
  }
}
