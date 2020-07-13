import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import {
  IconButton,
  Menu,
  MenuItem,
  Typography
} from '@material-ui/core'
import { HOME } from 'routes'
import { useAuth } from 'hooks'
import { AccountCircle } from '@material-ui/icons'
import Logo from './logo'
function HeaderCommon () {
  const [anchorElement, setAnchorElement] = useState(null)
  const { userInfo, logout } = useAuth()

  const handleOpenMenu = (e) => {
    setAnchorElement(e.target)
  }
  const handleClose = () => {
    setAnchorElement(null)
  }
  return (
    <>
      <LogoContainer>
        <Linklogo to={HOME}>
          <Logo />
        </Linklogo>
      </LogoContainer>
      <Typography color='inherit'>
        Olás {userInfo.user.firstName}
      </Typography>
      <IconButton color='inherit' onClick={handleOpenMenu}>
        <AccountCircle />
      </IconButton>
      <Menu
        open={!!anchorElement}
        onClose={handleClose}
        anchorEl={anchorElement}
      >
        <MenuItem onClick={logout}>Sair</MenuItem>
      </Menu>
    </>
  )
}
const Linklogo = styled(Link)`
  display: inline-block;
`
const LogoContainer = styled.div`
  flex-grow : 1;
`

export default HeaderCommon
