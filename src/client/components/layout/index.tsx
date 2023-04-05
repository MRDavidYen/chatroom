import Link from "next/link"

const Layout = ({ ...props }: LayoutProperties) => {
    return (
        <>
            <header className="h-14 bg-black text-white flex justify-center items-center">
                <div className="container flex items-center">
                    <Link href="/">
                        <h1 className="m-0 font-bold text-2xl mr-4">ChatRoom - ChatGPT</h1>
                    </Link>
                    <div>
                        <Link
                            className="hover:underline"
                            href={"/streaming"}
                        >Streaming Chat</Link>
                    </div>
                </div>
            </header>
            <main className="h-screen bg-gray-100">
                {props.children}
            </main>
        </>
    )
}

type LayoutProperties = {
    children: JSX.Element
}

export default Layout