import { Box, Typography } from '@mui/material'

export default function Logo() {
  return (
    <Typography component="span" sx={{ fontWeight: 600, fontSize: 20, letterSpacing: -0.5 }}>
      Disney
      <Box component="span" sx={{ color: 'primary.main' }}>+</Box>
    </Typography>
  )
}
