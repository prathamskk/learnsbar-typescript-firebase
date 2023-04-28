import React from 'react'
import {
    getDocs,
    limit,
    orderBy,
    query,
    QueryDocumentSnapshot,
    startAfter,
    Timestamp,
} from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { useUser } from '../components/AuthRoute'
import { Attempt, createSubCollection } from '../models/collections'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import { CircularProgress, Stack } from '@mui/material'
import Button from '@mui/material/Button'
import selfAssessmentQuestions from '../models/selfAssessmentQuestions.json'
import selfReflectiveQuestions from '../models/selfReflectiveQuestions.json'
import Checkbox from '@mui/material/Checkbox'

const AttemptCard = (props: {
    attempt: Attempt
}) => {
    const [grade, setGrade] = useState<number>()
    async function postData(url = "", data = {}) {
        // Default options are marked with *
        const response = await fetch(url, {
            method: "POST", // *GET, POST, PUT, DELETE, etc.
            mode: "cors", // no-cors, *cors, same-origin
            cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            headers: {
                "Content-Type": "application/json",
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: "follow", // manual, *follow, error
            referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });
        return response.json(); // parses JSON response into native JavaScript objects
    }


    const submissionTimestamp = props.attempt.submissionTimestamp as Timestamp
    return (
        <Card sx={{ width: '100%' }} key={props.attempt.id}>
            <CardContent>
                <Typography variant='overline'>
                    Submitted On: {submissionTimestamp.toDate().toLocaleString()}
                </Typography>
                <Stack direction='column' justifyContent='center' alignItems='center' m={4}>
                    {!grade && (<Button onClick={() => {
                        postData("https://apilearnsbar.uptwocat.com/grading", { recordingLink: props.attempt.afterAssessmentRecordingLink }).then((data) => {
                            console.log(data);
                            setGrade(data)
                        });
                    }}>GET SCORE</Button>
                    )}
                    {grade && <Box>
                        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                            <CircularProgress variant='determinate' value={grade} size={160} />
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
                                <Typography
                                    variant='h5'
                                    component='div'
                                    color='text.secondary'
                                >{`${Math.round(grade)}%`}</Typography>
                            </Box>
                        </Box>
                    </Box>}

                </Stack>

                <Stack direction='column' justifyContent='center' alignItems='flex-start' spacing={2}>
                    <Box>
                        <Typography variant='subtitle2'>Before Assessment Recording</Typography>
                        <audio controls>
                            <source src={props.attempt.beforeAssessmentRecordingLink} type='audio/mpeg' />
                            Your browser does not support the audio tag.
                        </audio>
                    </Box>
                    <Box width={'100%'}>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel1a-content'
                                id='panel1a-header'
                            >
                                <Typography variant='h5'>Self Assessment Answers</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant='h6'>Identify</Typography>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question1} />
                                    <Typography>{selfAssessmentQuestions.question1}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question2} />
                                    <Typography>{selfAssessmentQuestions.question2}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question3} />
                                    <Typography>{selfAssessmentQuestions.question3}</Typography>
                                </Stack>
                                <Typography variant='h6'>Situation</Typography>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question4} />
                                    <Typography>{selfAssessmentQuestions.question4}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question5} />
                                    <Typography>{selfAssessmentQuestions.question5}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question6} />
                                    <Typography>{selfAssessmentQuestions.question6}</Typography>
                                </Stack>
                                <Typography variant='h6'>Background & Assessment</Typography>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question7} />
                                    <Typography>{selfAssessmentQuestions.question7}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question8} />
                                    <Typography>{selfAssessmentQuestions.question8}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question9} />
                                    <Typography>{selfAssessmentQuestions.question9}</Typography>
                                </Stack>
                                <Typography variant='h6'>Recommendation & Repeat</Typography>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question10} />
                                    <Typography>{selfAssessmentQuestions.question10}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question11} />
                                    <Typography>{selfAssessmentQuestions.question11}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question12} />
                                    <Typography>{selfAssessmentQuestions.question12}</Typography>
                                </Stack>
                                <Typography variant='h6'>Order & Accuracy</Typography>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question13} />
                                    <Typography>{selfAssessmentQuestions.question13}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question14} />
                                    <Typography>{selfAssessmentQuestions.question14}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfAssessmentAnswers.question15} />
                                    <Typography>{selfAssessmentQuestions.question15}</Typography>
                                </Stack>
                            </AccordionDetails>
                        </Accordion>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls='panel2a-content'
                                id='panel2a-header'
                            >
                                <Typography variant='h5'>Self Reflective Answers</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography variant='h6'>What you did well?</Typography>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfReflectiveAnswers.question1} />
                                    <Typography>{selfReflectiveQuestions.question1}</Typography>
                                </Stack>

                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfReflectiveAnswers.question2} />
                                    <Typography>{selfReflectiveQuestions.question2}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfReflectiveAnswers.question3} />
                                    <Typography>{selfReflectiveQuestions.question3}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfReflectiveAnswers.question4} />
                                    <Typography>{selfReflectiveQuestions.question4}</Typography>
                                </Stack>
                                <Stack direction='row' justifyContent='flex-start' alignItems='center'>
                                    <Checkbox checked={props.attempt.selfReflectiveAnswers.question5} />
                                    <Typography>{selfReflectiveQuestions.question5}</Typography>
                                </Stack>
                                <Typography variant='h6'>What you thought could be improved?</Typography>

                                <Typography>{props.attempt.selfReflectiveAnswers.question6}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    <Box>
                        <Typography variant='subtitle2'>After Assessment Recording</Typography>
                        <audio controls>
                            <source src={props.attempt.afterAssessmentRecordingLink} type='audio/mpeg' />
                            Your browser does not support the audio tag.
                        </audio>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default AttemptCard