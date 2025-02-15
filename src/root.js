import React from 'react'
import { hot } from 'react-hot-loader'
import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { BrowserRouter, Route } from 'react-router-dom'
import { CssBaseline, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import { AuthProvider } from 'contexts'
import App from './app'

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  extend: {
    drawerWidth: 280
  }
})

const Root = () => (
  <MuiThemeProvider theme={theme}>
    <ThemeProvider theme={theme}>
      <AuthProvider>
        <CssBaseline />
        <GlobalStyle />
        <BrowserRouter>
          <Route children={<App />} />
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  </MuiThemeProvider>
)

const GlobalStyle = createGlobalStyle`
  #root {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }
`

export default hot(module)(Root)
