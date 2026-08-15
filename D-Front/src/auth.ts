type CurrentUser = { name: string; isGuest: boolean }

const CURRENT_USER_KEY = 'd-bench-current-user'

export const startUserSession = (name: string) => sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, isGuest: false }))

export const startGuestSession = (name: string) => {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, isGuest: true }))
}

export const getCurrentUser = (): CurrentUser | null => {
    const savedUser = sessionStorage.getItem(CURRENT_USER_KEY)
    return savedUser ? JSON.parse(savedUser) : null
}

export const signOut = () => sessionStorage.removeItem(CURRENT_USER_KEY)
