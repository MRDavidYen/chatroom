import { IconProperties } from "src/typing/components"

const RecordIcon = ({ ...props }: IconProperties) => {
    return (
        <svg
            className={props.className}
            style={props.style}
            fill="#fff"
            viewBox="-9.5 0 32 32"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d="M2.656 11.25v-2.969c0-1.906 1.719-3.5 3.906-3.5 2.156 0 3.906 1.594 3.906 3.5v2.969h-7.813zM13.188 11.438v5.969c-1.281 3.5-5.063 4.031-5.063 4.031v3.969h4.156v1.781h-11.438v-1.781h4.188v-3.969s-3.75-0.531-5.031-4.031v-5.969l1.531-0.719v5.438s0.469 3.656 5.031 3.656 5.094-3.656 5.094-3.656v-5.438zM10.469 12.281v2.688c0 1.906-1.75 3.5-3.906 3.5-2.188 0-3.906-1.594-3.906-3.5v-2.688h7.813z"></path>
        </svg>
    )
}

export default RecordIcon