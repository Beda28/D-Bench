import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { startGuestSession } from '../auth'

const MainPage = () => {
    const navigate                   = useNavigate()
    const [guestName, setGuestName] = useState('')
    const [error, setError]         = useState('')

    const startAsGuest = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const name = guestName.trim()
        if (!name) return setError('사용할 이름을 입력해 주세요.')
        startGuestSession(name)
        navigate('/app')
    }

    return (
        <Landing>
            <Navigation><Brand><Logo>D</Logo>D-Bench</Brand><NavLinks><NavLink to="/signin">로그인</NavLink><SignupLink to="/signup">회원가입</SignupLink></NavLinks></Navigation>
            <Hero>
                <Copy><Eyebrow>어디서든 이어지는 대화</Eyebrow><Headline>친구들과 함께할<br />당신만의 공간</Headline><Intro>서버를 만들고, 친구를 만나고, 편안하게 이야기를 시작하세요. 계정 없이도 바로 둘러볼 수 있습니다.</Intro></Copy>
                <GuestPanel onSubmit={startAsGuest}>
                    <PanelTitle>게스트로 바로 시작</PanelTitle>
                    <PanelText>표시할 이름 하나만 입력하면 됩니다.</PanelText>
                    <GuestInput type="text" maxLength={20} placeholder="이름 입력" value={guestName} onChange={(event) => setGuestName(event.target.value)} />
                    {error && <Error role="alert">{error}</Error>}
                    <GuestButton type="submit">게스트로 시작하기</GuestButton>
                    <Notice>게스트로 로그인하면 로그아웃 시 정보가 모두 삭제됩니다.</Notice>
                </GuestPanel>
            </Hero>
            <Glow />
        </Landing>
    )
}

const Landing     = styled.main`position: relative; min-height: 100vh; overflow: hidden; padding: 0 7%; background: radial-gradient(circle at 75% 35%, #5865f244, transparent 30%), linear-gradient(145deg, #17181b, #25272c);`
const Navigation  = styled.nav`height: 80px; display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 1;`
const Brand       = styled.div`display: flex; align-items: center; gap: 10px; font-size: 20px; font-weight: 800;`
const Logo        = styled.span`display: grid; place-items: center; width: 36px; height: 36px; border-radius: 12px; background: var(--color-primary);`
const NavLinks    = styled.div`display: flex; align-items: center; gap: 12px;`
const NavLink     = styled(Link)`padding: 10px 14px; color: var(--color-text); text-decoration: none;`
const SignupLink  = styled(NavLink)`background: var(--color-text); color: var(--color-bg); border-radius: 20px;`
const Hero        = styled.section`min-height: calc(100vh - 80px); display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(320px, 430px); align-items: center; gap: 8%; position: relative; z-index: 1; @media (max-width: 800px) { grid-template-columns: 1fr; padding: 56px 0; }`
const Copy        = styled.div`max-width: 650px;`
const Eyebrow     = styled.p`margin-bottom: 18px; color: #aeb5ff; font-weight: 700; letter-spacing: .08em;`
const Headline    = styled.h1`font-size: clamp(44px, 6vw, 78px); line-height: .98; letter-spacing: -.05em;`
const Intro       = styled.p`max-width: 590px; margin-top: 28px; color: var(--color-text-muted); font-size: 18px; line-height: 1.7;`
const GuestPanel  = styled.form`display: flex; flex-direction: column; gap: 12px; padding: 30px; background: #2b2d31dd; border: 1px solid #ffffff12; border-radius: 18px; box-shadow: 0 24px 70px #0008; backdrop-filter: blur(12px);`
const PanelTitle  = styled.h2`font-size: 24px;`
const PanelText   = styled.p`margin-bottom: 8px; color: var(--color-text-muted);`
const GuestInput  = styled.input`width: 100%; padding: 14px; background: var(--color-bg); color: var(--color-text); border: 1px solid var(--color-border); border-radius: 7px; outline: none; &:focus { border-color: var(--color-focus); }`
const GuestButton = styled.button`padding: 14px; border: 0; border-radius: 7px; cursor: pointer; font-weight: 700;`
const Notice      = styled.p`color: #aeb1b7; font-size: 12px; line-height: 1.5; text-align: center;`
const Error       = styled.p`color: #fa777c; font-size: 13px;`
const Glow        = styled.div`position: absolute; right: -15%; bottom: -35%; width: 700px; height: 700px; border-radius: 50%; background: #5865f21c; filter: blur(20px);`

export default MainPage
