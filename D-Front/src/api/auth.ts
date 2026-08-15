import api from './client'

type AuthResponse = { message: string }
type AuthResult   = AuthResponse | string

export const login = (id: string, pw: string) =>
    api.post<AuthResponse, AuthResult>('/login', { id, pw })

export const signup = (id: string, pw: string) =>
    api.post<AuthResponse, AuthResult>('/signup', { id, pw })
