import { useRef, useState } from "react"
import RecordIcon from "../icons/record"

const RecordArea = ({ ...props }: RecordAreaProps) => {
    const recorderRef = useRef<MediaRecorder>()
    const mediaBlobRef = useRef<Blob>()
    const audioRef = useRef<string>()

    const [isRecording, setIsRecording] = useState<boolean>(false)

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
            const recorder = new MediaRecorder(stream)

            recorderRef.current = recorder

            recorder.ondataavailable = (event) => {
                mediaBlobRef.current = event.data

                const audioURL = URL.createObjectURL(mediaBlobRef.current)

                audioRef.current = audioURL

                console.log(audioURL)

                if (props.onRecordEnded) props.onRecordEnded(mediaBlobRef.current!)
            }

            setIsRecording(true)
            recorder.start()
        } catch {
            console.log("record audio error")
        }
    }

    const stopRecording = () => {
        if (recorderRef.current) {
            recorderRef.current.stop()
            recorderRef.current.stream.getTracks().forEach(track => track.stop())
            recorderRef.current = undefined

            setIsRecording(false)
        }
    }

    const onRecordClick = () => {
        if (isRecording) {
            stopRecording()
        } else {
            startRecording()
        }
    }

    return (
        <button
            className={`${isRecording ? "bg-red-900 hover:bg-red-800" : "bg-blue-900 hover:bg-blue-800"}
            w-20 flex justify-center ml-2 rounded cursor-pointer`}
            onClick={onRecordClick}
        >
            <RecordIcon
                className="w-10 h-10"
            />
        </button>
    )
}

export type RecordAreaProps = {
    onRecordEnded?: (mediaBlob: Blob) => void
}

export default RecordArea