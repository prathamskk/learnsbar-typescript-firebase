import React, { useEffect } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'
import MicIcon from '@mui/icons-material/Mic'
import { Stack, Box } from '@mui/material'
const Recorder = (props: {
  setRecording: React.Dispatch<React.SetStateAction<Blob | undefined>>
}) => {
  const { startRecording, stopRecording, recordingBlob, isRecording, recordingTime } =
    useAudioRecorder()

  useEffect(() => {
    console.log(recordingBlob)
    props.setRecording(recordingBlob)
  }, [recordingBlob])

  return (
    <>
      <Stack direction='column' justifyContent='center' alignItems='center'>
        <p>{recordingTime}</p>
        <Box
          onClick={() => {
            if (!isRecording) {
              startRecording()
            } else {
              stopRecording()
            }
          }}
        >
          <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <Box
              bgcolor='white'
              border='solid'
              borderColor='#7852e3'
              width={150}
              height={150}
              borderRadius={'100%'}
            />
            <Box
              sx={{
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
                position: 'absolute',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <MicIcon fontSize='large' htmlColor='#7852e3' />
            </Box>
          </Box>
        </Box>
      </Stack>
    </>
  )
}

export default Recorder
