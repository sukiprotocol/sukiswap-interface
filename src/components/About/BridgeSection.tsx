import styled from 'styled-components'
import { BREAKPOINTS } from 'theme'

import networkImg from './images/network.svg'

const Banner = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 60px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 32px 48px;

  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    flex-direction: row;
  }
`

const TextContainer = styled.div`
  color: ${({ theme }) => theme.textPrimary};
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  margin: 10px 10px 0 0;
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
  width: 100%;
  height: auto;

  img {
    width: 320px;
    height: auto;
  }
  @media screen and (min-width: ${BREAKPOINTS.lg}px) {
    width: auto;
  }
`

const BridgeSection = () => {
  return (
    <Banner>
      <TextContainer>
        <HeaderText>Suki Bridge</HeaderText>
        <DescriptionText>Suki Bridge is a scalable rollup-to-rollup general token bridge.</DescriptionText>
      </TextContainer>
      <TextContainer>
        <LogoIcons>
          <LogoIcon>
            <img src={networkImg} width={180} />
          </LogoIcon>
        </LogoIcons>
      </TextContainer>
    </Banner>
  )
}

export default BridgeSection
