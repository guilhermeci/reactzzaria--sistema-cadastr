import React from 'react'
import t from 'prop-types'
import {
  Grid,
  TextField as MaterialTextField
} from '@material-ui/core'
function TextField ({ xs = 12, autoFocus, ...props }) {
  return (
    <Grid item xs={xs}>
      <MaterialTextField
        fullWidth
        inputProps={{
          autoFocus
        }}
        variant='outlined'
        {...props}
      />
    </Grid>
  )
}
TextField.propTypes = {
  autoFocus: t.bool,
  xs: t.number
}
export default TextField
