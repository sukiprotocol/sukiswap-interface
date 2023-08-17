import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'

import baseLogo from './images/base_logo.svg'
import lineaLogo from './images/linea_logo.svg'
import scrollLogo from './images/scroll_logo.svg'
import shmLogo from './images/shm_logo.svg'

const Banner = styled.div`
  height: 340px;
  width: 100%;
  max-width: 1440px;
  margin: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    height: 140px;
    flex-direction: row;
  }
`

const TextContainer = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
`

const HeaderText = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 36px;

  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    font-size: 36px;
    line-height: 36px;
  }
`

const DescriptionText = styled.div`
  color: ${({ theme }) => theme.textSecondary};
  margin: 10px 10px 0 0;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;

  @media screen and (min-width: ${BREAKPOINTS.xl}px) {
    font-size: 20px;
    line-height: 28px;
  }
`
const LogoIcons = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin: 20px 0 0 0;
`

const LogoIcon = styled.a`
  display: flex;
`

const SupportSection = () => {
  return (
    <Banner>
      <TextContainer>
        <HeaderText>Supported Chain</HeaderText>
        <DescriptionText>EVM Chain: L1, L2</DescriptionText>
      </TextContainer>
      <TextContainer>
        <LogoIcons>
          <LogoIcon>
            <img src={baseLogo} width={64} />
          </LogoIcon>
          <LogoIcon>
            <img src={scrollLogo} width={64} />
          </LogoIcon>
          <LogoIcon>
            <img src={lineaLogo} width={64} />
          </LogoIcon>
          <LogoIcon>
            <img src={shmLogo} width={64} />
          </LogoIcon>
        </LogoIcons>
      </TextContainer>
    </Banner>
  )
}

export default SupportSection
