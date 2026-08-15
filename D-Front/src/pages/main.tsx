import { Link } from 'react-router-dom'
import styled    from 'styled-components'

const MainPage = () => {
    return (
        <Landing>
            <Navigation>
                <Brand>
                    <Logo>D</Logo>
                    D-Bench
                </Brand>

                <NavLinks>
                    <NavLink to="/signin">로그인</NavLink>
                    <SignupLink to="/signup">회원가입</SignupLink>
                </NavLinks>
            </Navigation>

            <Hero>
                <Copy>
                    <Eyebrow>어디서든 이어지는 대화</Eyebrow>
                    <Headline>
                        친구들과 함께할
                        <br />
                        당신만의 공간
                    </Headline>
                    <Intro>
                        서버를 만들고, 친구를 만나고, 편안하게 이야기를 시작하세요.
                        계정을 만들면 어디서든 대화를 이어갈 수 있습니다.
                    </Intro>
                </Copy>

                <AccountPanel>
                    <PanelTitle>D-Bench 시작하기</PanelTitle>
                    <PanelText>계정에 로그인하거나 새 계정을 만들어 주세요.</PanelText>
                    <AccountLink to="/signin">로그인</AccountLink>
                    <SignupButton to="/signup">회원가입</SignupButton>
                </AccountPanel>
            </Hero>

            <Glow />
        </Landing>
    )
}

const Landing = styled.main`
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    padding: 0 7%;
    background:
        radial-gradient(circle at 75% 35%, #5865f244, transparent 30%),
        linear-gradient(145deg, #17181b, #25272c);
`

const Navigation = styled.nav`
    position: relative;
    z-index: 1;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Brand = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 20px;
    font-weight: 800;
`

const Logo = styled.span`
    width: 36px;
    height: 36px;
    display: grid;
    place-items: center;
    background: var(--color-primary);
    border-radius: 12px;
`

const NavLinks = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`

const NavLink = styled(Link)`
    padding: 10px 14px;
    color: var(--color-text);
    text-decoration: none;
`

const SignupLink = styled(NavLink)`
    background: var(--color-text);
    color: var(--color-bg);
    border-radius: 20px;
`

const Hero = styled.section`
    position: relative;
    z-index: 1;
    min-height: calc(100vh - 80px);
    display: grid;
    grid-template-columns: minmax(0, 1.2fr) minmax(320px, 430px);
    align-items: center;
    gap: 8%;

    @media (max-width: 800px) {
        grid-template-columns: 1fr;
        padding: 56px 0;
    }
`

const Copy = styled.div`
    max-width: 650px;
`

const Eyebrow = styled.p`
    margin-bottom: 18px;
    color: #aeb5ff;
    font-weight: 700;
    letter-spacing: .08em;
`

const Headline = styled.h1`
    font-size: clamp(44px, 6vw, 78px);
    line-height: .98;
    letter-spacing: -.05em;
`

const Intro = styled.p`
    max-width: 590px;
    margin-top: 28px;
    color: var(--color-text-muted);
    font-size: 18px;
    line-height: 1.7;
`

const AccountPanel = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 30px;
    background: #2b2d31dd;
    border: 1px solid #ffffff12;
    border-radius: 18px;
    box-shadow: 0 24px 70px #0008;
    backdrop-filter: blur(12px);
`

const PanelTitle = styled.h2`
    font-size: 24px;
`

const PanelText = styled.p`
    margin-bottom: 8px;
    color: var(--color-text-muted);
`

const AccountLink = styled(Link)`
    padding: 14px;
    background: var(--color-primary);
    color: white;
    border-radius: 7px;
    font-weight: 700;
    text-align: center;
    text-decoration: none;
`

const SignupButton = styled(AccountLink)`
    background: var(--color-text);
    color: var(--color-bg);
`

const Glow = styled.div`
    position: absolute;
    right: -15%;
    bottom: -35%;
    width: 700px;
    height: 700px;
    background: #5865f21c;
    border-radius: 50%;
    filter: blur(20px);
`

export default MainPage
