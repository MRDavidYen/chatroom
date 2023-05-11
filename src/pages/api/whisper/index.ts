import { NextApiResponse } from "next"
import { apiMiddleware, CustomNextApiRequest, MultipleMethodHandler } from "src/server/libs/middleware"
import multer from 'multer'
import { createWhisperTranscription } from "src/server/services/chatgpt"
import { Blob } from "buffer"
import FormData from "form-data"

// disable the body parser of Next.js (for file upload)
export const config = {
    api: {
        bodyParser: false,
    }
}

const upload = multer({
    storage: multer.memoryStorage()
})

const handleFileUpload = (request: CustomNextApiRequest, response: NextApiResponse) => {
    upload.single('file')(request as any, response as any, async (error) => {
        if (error) {
            response.status(500).json({ error: 'Error processing file.' })
            return
        }

        if (!request.file) {
            response.status(400).json({ error: 'No file was provided.' })
            return
        }

        const uploadFile = request.file as Express.Multer.File
        const formData = new FormData()
        formData.append('file', uploadFile.buffer, uploadFile.originalname)
        const whisperResult = await createWhisperTranscription(formData)

        if (whisperResult) {
            return response.status(200).json(whisperResult.data)
        }

        return response.status(500).json({ message: 'failed when create whisper transcription.' })
    })
}

async function POST(request: CustomNextApiRequest, response: NextApiResponse) {
    try {
        handleFileUpload(request, response)
    } catch (error) {
        return response.status(500).json({ message: 'failed when handle file upload.' })
    }
}

const handler: MultipleMethodHandler = {
    "POST": POST
}

export default apiMiddleware(handler)