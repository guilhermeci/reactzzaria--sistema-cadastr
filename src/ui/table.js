import styled from 'styled-components'
import {
  Button as MaterialButton,
  Grid,
  Paper,
  TableHead,
  TableCell,
  TableContainer as MaterialTableContainer,
  Typography
} from '@material-ui/core'
export const TableContainer = styled(MaterialTableContainer).attrs({
  component: Paper
})`
  && {
    margin-bottom: ${({ theme }) => theme.spacing(3)}px;
  }
`
export const TableTitle = styled(Typography).attrs({
  variant: 'h6'
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
  }
`
export const THead = styled(TableHead)`
  && {
    background: ${({ theme }) => theme.palette.common.black};
  }
`
export const Th = styled(TableCell)`
  && {
    color: ${({ theme }) => theme.palette.common.white}
  }
`
export const TableButton = styled(MaterialButton)`
  && {
    margin-left: ${({ theme }) => theme.spacing(2)}px;
  }
`
export const TableTitleContainer = styled(Grid).attrs({
  container: true,
  justify: 'space-between',
  alignItems: 'center'
})`
  && {
    padding: ${({ theme }) => theme.spacing(3)}px;
    ${TableTitle} {
      padding: 0;
    }
  }
`
