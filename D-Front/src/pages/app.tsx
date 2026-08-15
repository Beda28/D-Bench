import { Navigate, useNavigate }   from 'react-router-dom'
import styled                      from 'styled-components'
import { getCurrentUser, signOut } from '../auth'

const AppPage = () => {
    const navigate = useNavigate()
    const user     = getCurrentUser()

    if (!user) return <Navigate to="/" replace />

    const handleSignOut = () => {
        signOut()
        navigate('/')
    }

    return (
        <AppShell>
            <ServerRail>
                <HomeServer>D</HomeServer>
                <Divider />

                <AddServer title="서버 추가" aria-label="서버 추가">
                    <PlusIcon>+</PlusIcon>
                </AddServer>
            </ServerRail>

            <FriendsSidebar>
                <SearchArea>
                    <SearchButton>대화 찾기 또는 시작하기</SearchButton>
                </SearchArea>

                <Menu>
                    <ActiveMenuItem>
                        <Icon>♟</Icon>
                        친구
                    </ActiveMenuItem>
                </Menu>

                <SectionHeader>
                    <span>다이렉트 메시지</span>
                    <DmAddButton
                        title="다이렉트 메시지 만들기"
                        aria-label="다이렉트 메시지 만들기"
                    >
                        +
                    </DmAddButton>
                </SectionHeader>

                <EmptyDm>아직 시작한 대화가 없습니다.</EmptyDm>

                <ProfileBar>
                    <Avatar>{user.name.slice(0, 1).toUpperCase()}</Avatar>

                    <UserInfo>
                        <strong>{user.name}</strong>
                        <span>온라인</span>
                    </UserInfo>

                    <ProfileAction title="로그아웃" onClick={handleSignOut}>
                        ↪
                    </ProfileAction>
                </ProfileBar>
            </FriendsSidebar>

            <Content>
                <TopBar>
                    <TopTitle>
                        <span>♟</span>
                        친구
                    </TopTitle>
                    <TopDivider />
                    <ActiveTab>온라인</ActiveTab>
                    <Tab>모두</Tab>
                    <Tab>대기 중</Tab>
                    <AddFriend>친구 추가하기</AddFriend>
                </TopBar>

                <FriendsContent>
                    <EmptyIllustration>
                        <Face>•‿•</Face>
                        <Orbit />
                    </EmptyIllustration>

                    <EmptyTitle>아직은 조용하네요</EmptyTitle>
                    <EmptyText>친구를 추가하면 이곳에서 온라인 상태를 확인하고 대화를 시작할 수 있어요.</EmptyText>
                </FriendsContent>
            </Content>
        </AppShell>
    )
}

const AppShell = styled.main`
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-columns: 72px 240px minmax(0, 1fr);
    overflow: hidden;
    background: var(--color-surface-soft);

    @media (max-width: 700px) {
        grid-template-columns: 64px 1fr;
    }
`

const ServerRail = styled.aside`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 12px 0;
    background: var(--color-bg);
`

const ServerButton = styled.button`
    width: 48px;
    height: 48px;
    display: grid;
    place-items: center;
    padding: 0;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    font-size: 22px;
    line-height: 1;
    transition: .18s;

    &:hover {
        border-radius: 16px;
    }
`

const HomeServer = styled(ServerButton)`
    font-weight: 900;
`

const AddServer = styled(ServerButton)`
    background: var(--color-surface-soft);
    color: #23a559;

    &:hover {
        background: #23a559;
        color: white;
    }
`

const PlusIcon = styled.span`
    display: block;
    transform: translateY(-1px);
    font-size: 29px;
    font-weight: 300;
    line-height: 1;
`

const Divider = styled.div`
    width: 32px;
    height: 2px;
    background: var(--color-border);
    border-radius: 2px;
`

const FriendsSidebar = styled.aside`
    position: relative;
    display: flex;
    flex-direction: column;
    background: #2b2d31;

    @media (max-width: 700px) {
        display: none;
    }
`

const SearchArea = styled.div`
    height: 48px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    border-bottom: 1px solid #1e1f22;
    box-shadow: 0 1px 2px #0004;
`

const SearchButton = styled.button`
    width: 100%;
    height: 28px;
    overflow: hidden;
    padding: 0 8px;
    background: #1e1f22;
    color: #949ba4;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    text-align: left;
    white-space: nowrap;

    &:hover {
        background: #191a1d;
        color: var(--color-text-muted);
    }
`

const Menu = styled.div`
    padding: 8px;
`

const MenuItem = styled.button`
    width: 100%;
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 10px 12px;
    background: transparent;
    color: var(--color-text-muted);
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 15px;

    &:hover {
        background: #35373c;
        color: var(--color-text);
    }
`

const ActiveMenuItem = styled(MenuItem)`
    background: #404249;
    color: var(--color-text);
`

const Icon = styled.span`
    width: 20px;
    font-size: 18px;
`

const SectionHeader = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px 18px;
    color: var(--color-text-muted);
    font-size: 11px;
    font-weight: 700;
    text-transform: uppercase;
`

const DmAddButton = styled.button`
    width: 20px;
    height: 20px;
    display: grid;
    place-items: center;
    padding: 0;
    background: transparent;
    color: var(--color-text-muted);
    border: 0;
    border-radius: 4px;
    cursor: pointer;
    font-size: 20px;
    line-height: 1;
    transition: .15s;

    &:hover {
        background: #3a3c42;
        color: var(--color-text);
        transform: scale(1.08);
    }
`

const EmptyDm = styled.p`
    padding: 8px 18px;
    color: #858991;
    font-size: 12px;
    text-align: center;
`

const ProfileBar = styled.div`
    height: 54px;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: auto;
    padding: 7px 8px;
    background: #232428;
    transition: background .15s;

    &:hover {
        background: #292b30;
    }

    &:hover > div:first-child {
        box-shadow: 0 0 0 3px #23a55955;
        transform: scale(1.05);
    }
`

const Avatar = styled.div`
    width: 34px;
    height: 34px;
    display: grid;
    place-items: center;
    flex: 0 0 auto;
    background: var(--color-primary);
    border-radius: 50%;
    font-weight: 800;
    transition: .15s;
`

const UserInfo = styled.div`
    min-width: 0;
    display: flex;
    flex: 1;
    flex-direction: column;
    font-size: 12px;

    strong {
        overflow: hidden;
        text-overflow: ellipsis;
    }

    span {
        color: var(--color-text-muted);
        font-size: 11px;
    }
`

const ProfileAction = styled.button`
    width: 32px;
    height: 32px;
    background: transparent;
    color: var(--color-text-muted);
    border: 0;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #35373c;
        color: var(--color-text);
    }
`

const Content = styled.section`
    min-width: 0;
    display: flex;
    flex-direction: column;
    background: var(--color-surface-soft);
`

const TopBar = styled.header`
    height: 48px;
    display: flex;
    align-items: center;
    gap: 18px;
    padding: 0 16px;
    border-bottom: 1px solid #26272b;
    box-shadow: 0 1px 3px #0004;
`

const TopTitle = styled.strong`
    display: flex;
    align-items: center;
    gap: 8px;
`

const TopDivider = styled.div`
    width: 1px;
    height: 24px;
    background: var(--color-border);
`

const Tab = styled.button`
    padding: 4px 8px;
    background: transparent;
    color: var(--color-text-muted);
    border: 0;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background: #3a3c42;
        color: var(--color-text);
    }
`

const ActiveTab = styled(Tab)`
    background: #404249;
    color: var(--color-text);
`

const AddFriend = styled(Tab)`
    background: #248046;
    color: white;

    &:hover {
        background: #248046;
        color: white;
    }
`

const FriendsContent = styled.div`
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 32px;
    text-align: center;
`

const EmptyIllustration = styled.div`
    position: relative;
    width: 150px;
    height: 110px;
    display: grid;
    place-items: center;
    margin-bottom: 24px;
    background: #2b2d31;
    border-radius: 50%;
`

const Face = styled.span`
    position: relative;
    z-index: 1;
    color: #8b95f7;
    font-size: 35px;
    font-weight: 800;
`

const Orbit = styled.div`
    position: absolute;
    width: 185px;
    height: 70px;
    border: 3px solid #5865f266;
    border-radius: 50%;
    transform: rotate(-12deg);
`

const EmptyTitle = styled.h2`
    margin-bottom: 8px;
    font-size: 20px;
`

const EmptyText = styled.p`
    max-width: 480px;
    color: var(--color-text-muted);
    line-height: 1.6;
`

export default AppPage
