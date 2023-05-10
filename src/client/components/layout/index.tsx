import Link from "next/link"

const Layout = ({ ...props }: LayoutProperties) => {
    return (
        <div className="bg-gray-800 h-screen">
            <header className="h-14 bg-black text-white flex justify-center items-center">
                <div className="container flex items-center">
                    <Link href="/">
                        <h1 className="m-0 font-bold text-2xl mr-4">ChatRoom - ChatGPT</h1>
                    </Link>
                </div>
            </header>
            <main className="">
                {props.children}
            </main>
        </div>
    )
}

type LayoutProperties = {
    children: JSX.Element
}

export default Layout