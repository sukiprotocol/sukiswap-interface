import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { useAccountDrawer } from 'components/AccountDrawer'
import Web3Status from 'components/Web3Status'
import { chainIdToBackendName } from 'graphql/data/util'
import { useDisableNFTRoutes } from 'hooks/useDisableNFTRoutes'
import { useIsNftPage } from 'hooks/useIsNftPage'
import { useIsPoolsPage } from 'hooks/useIsPoolsPage'
import { Box } from 'nft/components/Box'
import { Row } from 'nft/components/Flex'
import { AirdropIcon, NftIcon, PoolIcon, SwapIcon, TokenIcon, UniIcon } from 'nft/components/icons'
import { useProfilePageState } from 'nft/hooks'
import { ProfilePageStateType } from 'nft/types'
import { ReactNode, useCallback } from 'react'
import { NavLink, NavLinkProps, useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { BREAKPOINTS, ExternalLink } from 'theme'

import { useIsNavSearchInputVisible } from '../../nft/hooks/useIsNavSearchInputVisible'
import { Bag } from './Bag'
import Blur from './Blur'
import { ChainSelector } from './ChainSelector'
import { MenuDropdown } from './MenuDropdown'
import { SearchBar } from './SearchBar'
import * as styles from './style.css'

const Nav = styled.nav`
  padding: ${({ theme }) => `${theme.navVerticalPad}px 12px`};
  width: 100%;
  height: ${({ theme }) => theme.navHeight}px;
  z-index: 2;
`

const ExternalTextLink = styled(ExternalLink)`
  font-size: 16px;
  line-height: 20px;
  color: none;
  stroke: none;
`

const ButtonFaucet = styled.div`
  padding: 8px 12px;
  border-radius: 16px;
  background: ${({ theme }) => theme.accentAction};
  border: none;
  color: ${({ theme }) => theme.white};
  transition: ${({ theme }) => `all ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};

  &:hover {
    box-shadow: 0px 0px 16px 0px #4c82fb;
  }
`

const ButtonCTA = styled.div`
  padding: 8px 12px;
  border-radius: 12px;
  background: linear-gradient(93.06deg, #0bb481 2.66%, #6a83ff 98.99%);
  border: none;
  color: ${({ theme }) => theme.white};
  transition: ${({ theme }) => `all ${theme.transition.duration.medium} ${theme.transition.timing.ease}`};

  &:hover {
    box-shadow: 0px 0px 16px 0px #0bb481;
  }
`

const ButtonCTAText = styled(ExternalLink)`
  color: ${({ theme }) => theme.textPrimary};
  margin: 0px;
  font-size: 16px;
  font-weight: 600;
  white-space: nowrap;

  @media screen and (min-width: ${BREAKPOINTS.sm}px) {
    font-size: 16px;
  }
`

interface MenuItemProps {
  href: string
  id?: NavLinkProps['id']
  isActive?: boolean
  children: ReactNode
  dataTestId?: string
}

const MenuItem = ({ href, dataTestId, id, isActive, children }: MenuItemProps) => {
  return (
    <NavLink
      to={href}
      className={isActive ? styles.activeMenuItem : styles.menuItem}
      id={id}
      style={{ textDecoration: 'none' }}
      data-testid={dataTestId}
    >
      {children}
    </NavLink>
  )
}

export const PageTabs = () => {
  const { pathname } = useLocation()
  const { chainId: connectedChainId } = useWeb3React()
  const chainName = chainIdToBackendName(connectedChainId)

  const isPoolActive = useIsPoolsPage()
  const isNftPage = useIsNftPage()

  const shouldDisableNFTRoutes = useDisableNFTRoutes()

  return (
    <>
      <MenuItem href="/swap" isActive={pathname.startsWith('/swap')}>
        <SwapIcon width={20} height={20} style={{ paddingRight: '2px' }} />
        <Trans>Swap</Trans>
      </MenuItem>
      <MenuItem href={`/tokens/${chainName.toLowerCase()}`} isActive={pathname.startsWith('/tokens')}>
        <TokenIcon width={20} height={20} style={{ paddingRight: '2px' }} />
        <Trans>Tokens</Trans>
      </MenuItem>
      {!shouldDisableNFTRoutes && (
        <MenuItem dataTestId="nft-nav" href="/nfts" isActive={isNftPage}>
          <NftIcon width={20} height={20} style={{ paddingRight: '2px' }} />
          <Trans>NFTs</Trans>
        </MenuItem>
      )}
      <Box display={{ sm: 'flex', lg: 'none', xxl: 'flex' }} width="full">
        <MenuItem href="/pools" dataTestId="pool-nav-link" isActive={isPoolActive}>
          <PoolIcon width={22} height={22} style={{ paddingRight: '2px' }} />
          <Trans>Pools</Trans>
        </MenuItem>
      </Box>
      <Box marginY={{ sm: '4', md: 'unset' }}>
        <MenuDropdown />
      </Box>
    </>
  )
}

const Navbar = ({ blur }: { blur: boolean }) => {
  const isNftPage = useIsNftPage()
  const sellPageState = useProfilePageState((state) => state.state)
  const navigate = useNavigate()
  const isNavSearchInputVisible = useIsNavSearchInputVisible()

  const [accountDrawerOpen, toggleAccountDrawer] = useAccountDrawer()

  const handleUniIconClick = useCallback(() => {
    if (accountDrawerOpen) {
      toggleAccountDrawer()
    }
    navigate({
      pathname: '/',
      search: '?intro=true',
    })
  }, [accountDrawerOpen, navigate, toggleAccountDrawer])

  return (
    <>
      {blur && <Blur />}
      <Nav>
        <Box display="flex" height="full" flexWrap="nowrap">
          <Box className={styles.leftSideContainer}>
            <Box className={styles.logoContainer}>
              <UniIcon
                width="48"
                height="48"
                data-testid="uniswap-logo"
                className={styles.logo}
                onClick={handleUniIconClick}
              />
            </Box>
            {!isNftPage && (
              <Box display={{ sm: 'flex', lg: 'none' }}>
                <ChainSelector leftAlign={true} />
              </Box>
            )}
            <Row display={{ sm: 'none', lg: 'flex' }}>
              <PageTabs />
            </Row>
          </Box>
          <Box
            className={styles.searchContainer}
            {...(isNavSearchInputVisible && {
              display: 'flex',
            })}
          >
            <SearchBar />
          </Box>
          <Box className={styles.rightSideContainer}>
            <Row gap="12">
              <Box
                className={styles.buttonContainer}
                {...(isNavSearchInputVisible && {
                  display: 'flex',
                })}
              >
                <ButtonCTA>
                  <ButtonCTAText href="https://sukiswap.com">
                    <Trans>Reward</Trans>
                  </ButtonCTAText>
                </ButtonCTA>
              </Box>
              <Box
                className={styles.buttonContainer}
                {...(isNavSearchInputVisible && {
                  display: 'flex',
                })}
              >
                <ButtonFaucet>
                  <ButtonCTAText href="https://sukiswap.com">
                    <Trans>Airdrop</Trans>
                  </ButtonCTAText>
                </ButtonFaucet>
              </Box>
              <Box position="relative" display={isNavSearchInputVisible ? 'none' : { sm: 'flex' }}>
                <ButtonCTA>
                  <ButtonCTAText href="https://sukiswap.com">
                    <Trans>Reward</Trans>
                  </ButtonCTAText>
                </ButtonCTA>
              </Box>
              <Box position="relative" display={isNavSearchInputVisible ? 'none' : { sm: 'flex' }}>
                <ExternalTextLink href="https://sukiswap.com">
                  <AirdropIcon width={24} height={24} />
                </ExternalTextLink>
              </Box>
              <Box position="relative" display={isNavSearchInputVisible ? 'none' : { sm: 'flex' }}>
                <SearchBar />
              </Box>
              {isNftPage && sellPageState !== ProfilePageStateType.LISTING && <Bag />}
              {!isNftPage && (
                <Box display={{ sm: 'none', lg: 'flex' }}>
                  <ChainSelector />
                </Box>
              )}

              <Web3Status />
            </Row>
          </Box>
        </Box>
      </Nav>
    </>
  )
}

export default Navbar
