import { t, Trans } from '@lingui/macro'
// import { InterfaceElementName } from '@uniswap/analytics-events'
// import FeatureFlagModal from 'components/FeatureFlagModal/FeatureFlagModal'
import { PrivacyPolicyModal } from 'components/PrivacyPolicy'
import { useOnClickOutside } from 'hooks/useOnClickOutside'
import { Box } from 'nft/components/Box'
import { Column, Row } from 'nft/components/Flex'
import {
  BarChartIcon,
  BridgeIcon,
  EllipsisIcon,
  GithubIconMenu,
  GovernanceIcon,
  PoolIcon,
  TelegramIconMenu,
  TwitterIconMenu,
} from 'nft/components/icons'
import { body, bodySmall } from 'nft/css/common.css'
import { themeVars } from 'nft/css/sprinkles.css'
import { ReactNode, useReducer, useRef } from 'react'
import { NavLink, NavLinkProps } from 'react-router-dom'
// import { useToggleModal } from 'state/application/hooks'
import styled, { useTheme } from 'styled-components'

// import { isDevelopmentEnv, isStagingEnv } from 'utils/env'
// import { openDownloadApp } from 'utils/openDownloadApp'
// import { ReactComponent as AppleLogo } from '../../assets/svg/apple_logo.svg'
// import { ApplicationModal } from '../../state/application/reducer'
import * as styles from './MenuDropdown.css'
import { NavDropdown } from './NavDropdown'
import { NavIcon } from './NavIcon'

const PrimaryMenuRow = ({
  to,
  href,
  close,
  children,
}: {
  to?: NavLinkProps['to']
  href?: string
  close?: () => void
  children: ReactNode
}) => {
  return (
    <>
      {to ? (
        <NavLink to={to} className={styles.MenuRow}>
          <Row onClick={close}>{children}</Row>
        </NavLink>
      ) : (
        <Row cursor="pointer" as="a" href={href} target="_blank" rel="noopener noreferrer" className={styles.MenuRow}>
          {children}
        </Row>
      )}
    </>
  )
}

const StyledBox = styled(Box)`
  align-items: center;
  display: flex;
  justify-content: center;
`
const PrimaryMenuRowText = ({ children }: { children: ReactNode }) => {
  return <StyledBox className={`${styles.PrimaryText} ${body}`}>{children}</StyledBox>
}

PrimaryMenuRow.Text = PrimaryMenuRowText

const SecondaryLinkedText = ({
  href,
  onClick,
  children,
}: {
  href?: string
  onClick?: () => void
  children: ReactNode
}) => {
  return (
    <Box
      as={href ? 'a' : 'div'}
      href={href ?? undefined}
      target={href ? '_blank' : undefined}
      rel={href ? 'noopener noreferrer' : undefined}
      className={`${styles.SecondaryText} ${bodySmall}`}
      onClick={onClick}
      cursor="pointer"
    >
      {children}
    </Box>
  )
}

const Separator = () => {
  return <Box className={styles.Separator} />
}

const IconRow = ({ children }: { children: ReactNode }) => {
  return <Row className={styles.IconRow}>{children}</Row>
}

const Icon = ({ href, children }: { href?: string; children: ReactNode }) => {
  return (
    <>
      <Box
        as={href ? 'a' : 'div'}
        href={href ?? undefined}
        target={href ? '_blank' : undefined}
        rel={href ? 'noopener noreferrer' : undefined}
        display="flex"
        flexDirection="column"
        color="textPrimary"
        background="none"
        border="none"
        justifyContent="center"
        textAlign="center"
        marginRight="12"
      >
        {children}
      </Box>
    </>
  )
}

export const MenuDropdown = () => {
  const theme = useTheme()
  const [isOpen, toggleOpen] = useReducer((s) => !s, false)
  // const togglePrivacyPolicy = useToggleModal(ApplicationModal.PRIVACY_POLICY)
  // const openFeatureFlagsModal = useToggleModal(ApplicationModal.FEATURE_FLAGS)
  const ref = useRef<HTMLDivElement>(null)
  useOnClickOutside(ref, isOpen ? toggleOpen : undefined)

  return (
    <>
      <Box position="relative" ref={ref} marginRight="4">
        <NavIcon isActive={isOpen} onClick={toggleOpen} label={isOpen ? t`Show resources` : t`Hide resources`}>
          <EllipsisIcon viewBox="0 0 20 20" width={24} height={24} />
        </NavIcon>

        {isOpen && (
          <NavDropdown top={{ sm: 'unset', lg: '56' }} bottom={{ sm: '50', lg: 'unset' }} right="0">
            <Column gap="16">
              <Column paddingX="8" gap="4">
                <Box display={{ sm: 'none', lg: 'flex', xxl: 'none' }}>
                  <PrimaryMenuRow to="/pool" close={toggleOpen}>
                    <Icon>
                      <PoolIcon width={24} height={24} fill={theme.textPrimary} />
                    </Icon>
                    <PrimaryMenuRow.Text>
                      <Trans>Pool</Trans>
                    </PrimaryMenuRow.Text>
                  </PrimaryMenuRow>
                </Box>
                <Box>
                  <PrimaryMenuRow href="https://opbnb-bridge.bnbchain.org/" close={toggleOpen}>
                    <Icon>
                      <BridgeIcon width="24px" height="24px" fill={theme.textPrimary} />
                    </Icon>
                    <PrimaryMenuRow.Text>
                      <Trans>Bridge</Trans>
                    </PrimaryMenuRow.Text>
                  </PrimaryMenuRow>
                </Box>
                <PrimaryMenuRow to="/vote" close={toggleOpen}>
                  <Icon>
                    <GovernanceIcon width={24} height={24} color={theme.textPrimary} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>Vote</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
                <PrimaryMenuRow href="https://info.sukiswap.com/#/">
                  <Icon>
                    <BarChartIcon width={24} height={24} color={theme.textPrimary} />
                  </Icon>
                  <PrimaryMenuRow.Text>
                    <Trans>Analytics</Trans>
                  </PrimaryMenuRow.Text>
                </PrimaryMenuRow>
              </Column>
              <Separator />
              <Box
                display="flex"
                flexDirection={{ sm: 'row', md: 'column' }}
                flexWrap="wrap"
                alignItems={{ sm: 'center', md: 'flex-start' }}
                paddingX="8"
              >
                <SecondaryLinkedText href="https://t.me/sukiswapcom/">
                  <Trans>Help</Trans> ↗
                </SecondaryLinkedText>
                <SecondaryLinkedText href="https://docs.sukiswap.com/">
                  <Trans>Docs</Trans> ↗
                </SecondaryLinkedText>
                {/* <SecondaryLinkedText
                  onClick={() => {
                    toggleOpen()
                    togglePrivacyPolicy()
                  }}
                >
                  <Trans>Legal & Privacy</Trans> ↗
                </SecondaryLinkedText>
                {(isDevelopmentEnv() || isStagingEnv()) && (
                  <SecondaryLinkedText onClick={openFeatureFlagsModal}>
                    <Trans>Feature Flags</Trans>
                  </SecondaryLinkedText>
                )} */}
              </Box>
              <IconRow>
                <Icon href="https://t.me/sukiswapcom">
                  <TelegramIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://twitter.com/sukiswapcom">
                  <TwitterIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
                <Icon href="https://github.com/sukiswap">
                  <GithubIconMenu
                    className={styles.hover}
                    width={24}
                    height={24}
                    color={themeVars.colors.textSecondary}
                  />
                </Icon>
              </IconRow>
            </Column>
          </NavDropdown>
        )}
      </Box>
      <PrivacyPolicyModal />
      {/*<FeatureFlagModal />*/}
    </>
  )
}
