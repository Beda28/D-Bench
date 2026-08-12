export type CurrentUser = { name: string; isGuest: boolean }
type Account = { id: string; password: string }

const ACCOUNTS_KEY = 'd-bench-accounts'
const CURRENT_USER_KEY = 'd-bench-current-user'

const getAccounts = (): Account[] => JSON.parse(localStorage.getItem(ACCOUNTS_KEY) ?? '[]')

export const createAccount = (id: string, password: string) => {
    const accounts = getAccounts()
    if (accounts.some((account) => account.id === id)) return false
    localStorage.setItem(ACCOUNTS_KEY, JSON.stringify([...accounts, { id, password }]))
    return true
}

export const signIn = (id: string, password: string) => {
    const account = getAccounts().find((item) => item.id === id && item.password === password)
    if (!account) return false
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name: account.id, isGuest: false }))
    return true
}

export const startGuestSession = (name: string) => {
    sessionStorage.setItem(CURRENT_USER_KEY, JSON.stringify({ name, isGuest: true }))
}

export const getCurrentUser = (): CurrentUser | null => {
    const savedUser = sessionStorage.getItem(CURRENT_USER_KEY)
    return savedUser ? JSON.parse(savedUser) : null
}

export const signOut = () => sessionStorage.removeItem(CURRENT_USER_KEY)
