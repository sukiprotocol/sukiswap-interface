import { BrowserEvent, InterfaceElementName, SharedEventName } from '@uniswap/analytics-events'
import { TraceEvent } from 'analytics'
import { useDisableNFTRoutes } from 'hooks/useDisableNFTRoutes'
import styled from 'styled-components'
import { BREAKPOINTS, ExternalLink, StyledRouterLink } from 'theme'
import { useIsDarkMode } from 'theme/components/ThemeToggle'

import { GithubIcon, TelegramIcon, TwitterIcon } from './Icons'
import darkUnicornImgSrc from './images/suki-logo.png'
import lightUnicornImgSrc from './images/suki-logo.png'

const Footer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  max-width: 1440px;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
`

const LogoSectionLeft = styled(LogoSection)`
  display: none;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: flex;
  }
`

const LogoSectionBottom = styled(LogoSection)`
  display: flex;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: none;
  }
`

const StyledLogo = styled.img`
  width: 72px;
  height: 72px;
  display: none;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    display: block;
  }
`

const SocialLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin: 20px 0 0 0;
`

const SocialLink = styled.a`
  display: flex;
`

const FooterLinks = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 24px;
  }
`

const LinkGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 200px;
  margin: 20px 0 0 0;
  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    margin: 0;
  }
`

const LinkGroupTitle = styled.span`
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
`

const ExternalTextLink = styled(ExternalLink)`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.textSecondary};
`

const TextLink = styled(StyledRouterLink)`
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.textSecondary};
`

const Copyright = styled.span`
  font-size: 16px;
  line-height: 20px;
  margin: 1rem 0 0 0;
  color: ${({ theme }) => theme.textTertiary};
`

const LogoSectionContent = () => {
  const isDarkMode = useIsDarkMode()
  return (
    <>
      <StyledLogo src={isDarkMode ? darkUnicornImgSrc : lightUnicornImgSrc} alt="Sukiswap Logo" />
      <SocialLinks>
        <SocialLink href="https://t.me/sukiswapcom" target="_blank" rel="noopener noreferrer">
          <TelegramIcon size={32} />
        </SocialLink>
        <SocialLink href="https://twitter.com/sukiswapcom" target="_blank" rel="noopener noreferrer">
          <TwitterIcon size={32} />
        </SocialLink>
        <SocialLink href="https://github.com/sukiswap" target="_blank" rel="noopener noreferrer">
          <GithubIcon size={32} />
        </SocialLink>
      </SocialLinks>
      <Copyright>© {new Date().getFullYear()} Sukiswap Labs</Copyright>
    </>
  )
}

export const AboutFooter = () => {
  const shouldDisableNFTRoutes = useDisableNFTRoutes()
  return (
    <Footer>
      <LogoSectionLeft>
        <LogoSectionContent />
      </LogoSectionLeft>

      <FooterLinks>
        <LinkGroup>
          <LinkGroupTitle>App</LinkGroupTitle>
          <TextLink to="/swap">Swap</TextLink>
          <TextLink to="/tokens">Tokens</TextLink>
          {!shouldDisableNFTRoutes && <TextLink to="/nfts">NFTs</TextLink>}
          <TextLink to="/pools">Pools</TextLink>
        </LinkGroup>
        <LinkGroup>
          <LinkGroupTitle>Protocol</LinkGroupTitle>
          <ExternalTextLink href="https://opbnb-bridge.bnbchain.org/">Bridge</ExternalTextLink>
          <ExternalTextLink href="/vote">Governance</ExternalTextLink>
          <ExternalTextLink href="https://github.com/sukiswap">Developers</ExternalTextLink>
        </LinkGroup>
        {/* <LinkGroup>
          <LinkGroupTitle>Company</LinkGroupTitle>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.CAREERS_LINK}
          >
            <ExternalTextLink href="https://boards.greenhouse.io/uniswaplabs">Careers</ExternalTextLink>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.BLOG_LINK}
          >
            <ExternalTextLink href="https://uniswap.org/blog">Blog</ExternalTextLink>
          </TraceEvent>
        </LinkGroup> */}
        <LinkGroup>
          <LinkGroupTitle>Get Help</LinkGroupTitle>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.SUPPORT_LINK}
          >
            <ExternalTextLink href="mailto:info@sukiswap.com" target="_blank" rel="noopener noreferrer">
              Contact Us
            </ExternalTextLink>
          </TraceEvent>
          <TraceEvent
            events={[BrowserEvent.onClick]}
            name={SharedEventName.ELEMENT_CLICKED}
            element={InterfaceElementName.SUPPORT_LINK}
          >
            <ExternalTextLink href="https://t.me/sukiswapcom">Help Center</ExternalTextLink>
          </TraceEvent>
        </LinkGroup>
      </FooterLinks>

      <LogoSectionBottom>
        <LogoSectionContent />
      </LogoSectionBottom>
    </Footer>
  )
}
