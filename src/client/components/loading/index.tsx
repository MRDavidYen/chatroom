import { Player } from "@lottiefiles/react-lottie-player"

const LoadingAnimation = ({ ...props }: ILoadingAnimationProps) => {
    return (
        <div className="flex justify-center">
            <Player
                style={{
                    ...props.style,
                    display: props.isShow ? "block" : "none"
                }}
                className={`${props.className} w-20 h-10`}
                autoplay
                loop
                src={"/lottie/loading.json"}
            />
        </div>
    )
}

export interface ILoadingAnimationProps {
    className?: string
    style?: React.CSSProperties
    isShow?: boolean
}

export default LoadingAnimation