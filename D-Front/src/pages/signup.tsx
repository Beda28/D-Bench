import { useState }          from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled                from 'styled-components'
import { signup }            from '../api/auth'
import { startUserSession }  from '../auth'

const SignupPage = () => {
    const navigate = useNavigate()

    const [id,              setId]              = useState('')
    const [password,        setPassword]        = useState('')
    const [error,           setError]           = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const handleSignup = async () => {
        if (password !== passwordConfirm) return setError('비밀번호가 일치하지 않습니다.')

        const response = await signup(id, password)
        if (typeof response === 'string') return setError(response)

        startUserSession(id.trim(), response.token)
        window.alert(response.message)
        navigate('/app')
    }

    return (
        <Page>
            <Panel>
                <Title>계정 만들기</Title>
                <Description>D-Bench에서 새로운 대화를 시작하세요.</Description>

                <Label>아이디</Label>
                <Input
                    type="text"
                    autoComplete="username"
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                />

                <Label>비밀번호</Label>
                <Input
                    type="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />

                <Label>비밀번호 확인</Label>
                <Input
                    type="password"
                    autoComplete="new-password"
                    value={passwordConfirm}
                    onChange={(event) => setPasswordConfirm(event.target.value)}
                />

                {error && <Error role="alert">{error}</Error>}

                <PrimaryButton onClick={handleSignup}>회원가입</PrimaryButton>
                <BottomText>
                    이미 계정이 있나요? <Link to="/signin">로그인</Link>
                </BottomText>
            </Panel>
        </Page>
    )
}

const Page = styled.main`
    min-height: 100vh;
    display: grid;
    place-items: center;
    padding: 24px;
`

const Panel = styled.div`
    width: min(420px, 100%);
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 32px;
    background: var(--color-surface-soft);
    border-radius: 12px;
    box-shadow: 0 18px 50px #0006;
`

const Title = styled.h1`
    font-size: 24px;
    text-align: center;
`

const Description = styled.p`
    margin-bottom: 12px;
    color: var(--color-text-muted);
    text-align: center;
`

const Label = styled.label`
    color: var(--color-text-muted);
    font-size: 12px;
    font-weight: 700;
    text-transform: uppercase;
`

const Input = styled.input`
    width: 100%;
    padding: 12px;
    background: var(--color-bg);
    color: var(--color-text);
    border: 1px solid var(--color-border);
    border-radius: 4px;
    outline: none;

    &:focus {
        border-color: var(--color-focus);
    }
`

const PrimaryButton = styled.button`
    margin-top: 8px;
    padding: 12px;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 700;
`

const Error = styled.p`
    color: #fa777c;
    font-size: 13px;
`

const BottomText = styled.p`
    color: var(--color-text-muted);
    font-size: 14px;

    a {
        color: #00a8fc;
        text-decoration: none;
    }
`

export default SignupPage
