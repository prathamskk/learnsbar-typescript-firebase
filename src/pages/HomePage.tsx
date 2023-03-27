import { useNavigate } from 'react-router-dom'
import { Button, Stack } from '@mui/material'
const HomePage = () => {
  const navigate = useNavigate()
  return (
    <Stack direction={'column'} m={1} gap={1}>
      <Button
        size='large'
        fullWidth={true}
        variant='contained'
        onClick={() => navigate('/scenarios')}
        sx={{ height: '40vh' }}
      >
        Browse Scenarios
      </Button>
      <Button
        color='secondary'
        size='large'
        fullWidth={true}
        variant='contained'
        type='submit'
        sx={{ height: '40vh' }}
        onClick={() => navigate('/attempts')}
      >
        All Attempts
      </Button>
    </Stack>
  )
}

export default HomePage
