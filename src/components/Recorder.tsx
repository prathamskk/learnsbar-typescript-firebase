import React, { useEffect } from 'react'
import { useAudioRecorder } from 'react-audio-voice-recorder'

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
      <p>{recordingTime}</p>
      <input
        type='button'
        onClick={() => {
          if (!isRecording) {
            startRecording()
          } else {
            stopRecording()
          }
        }}
        value='Recorder'
      />
    </>
  )
}

export default Recorder
