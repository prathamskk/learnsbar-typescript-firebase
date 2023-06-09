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
        sx={{ height: '25vh' }}
      >
        Browse Scenarios
      </Button>
      <Button
        color='secondary'
        size='large'
        fullWidth={true}
        variant='contained'
        type='submit'
        sx={{ height: '25vh' }}
        onClick={() => navigate('/attempts')}
      >
        All Attempts
      </Button>
      <Button
        color='success'
        size='large'
        fullWidth={true}
        variant='contained'
        type='submit'
        sx={{ height: '25vh' }}
        onClick={() => navigate('/diseaseprediction')}
      >
        Disease Prediction
      </Button>
    </Stack>
  )
}

export default HomePage
