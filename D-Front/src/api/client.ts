import axios from 'axios'

const api = axios.create({ baseURL: '/api' })

const getErrorMessage = (error: unknown) => {
    if (!axios.isAxiosError(error)) return '요청 처리 중 오류가 발생했습니다.'

    const detail = error.response?.data?.detail
    if (typeof detail === 'string') return detail
    if (Array.isArray(detail))      return detail.map(({ msg }) => msg).join('\n')
    return '요청 처리 중 오류가 발생했습니다.'
}

api.interceptors.response.use(
    ({ data }) => data,
    (error)    => getErrorMessage(error),
)

export default api
