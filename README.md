# ChatRoom - ChatGPT

A Chat application with ChatGPT

Features:
* streaming chat like official website of OpenAI (via SSE)
* Whisper API: Able to make conversation with GPT via voice

Feature todo list:
1. Upload audio file and generate a conclusion by ChatGPT
2. Auth: Can sign a new account and create own model
3. Tuning Model: Create fine-tuning model with Davinci

Dreaming:
* Midjourney: Generate parameter for Midjourney use GPT

## File Structure

### /server
Files for server-side:
* services
* thirdparty apis/ services
* utilities

### /client
Files for client-side:
* contexts
* custom hooks
* components
* front-end libraries

## Error Handling

ErrorBoundary is implemented in this project

### ErrorBoundaryContext
ErrorBoundary can handle React rendering errors.
But can not handle side effect errors like API Request.
So It need Context to handle side effect error in whole application

```
const ErrorBoundaryContext = createContext<ErrorBoundaryContextType>({
    error: {
        message: "",
        identifier: ""
    },
    setError: () => { }
})
```