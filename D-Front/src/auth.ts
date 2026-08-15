type CurrentUser = { name: string; token: string }

const CURRENT_USER_KEY = 'd-bench-current-user'

export const startUserSession = (name: string, token: string) =>
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, token }))

export const getCurrentUser = (): CurrentUser | null => {
    const savedUser = sessionStorage.getItem(CURRENT_USER_KEY)
    if (!savedUser) return null

    const user = JSON.parse(savedUser)
    return user.token ? user : null
}

export const signOut = () => sessionStorage.removeItem(CURRENT_USER_KEY)
