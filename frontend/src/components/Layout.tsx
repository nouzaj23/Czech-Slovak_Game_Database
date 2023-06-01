import { Header } from "./Header"

export const Layout = (props: { children: React.ReactNode }) => {
    return (
        <div className="h-full w-full">
            <Header />
            <div className="flex flex-col w-full h-full pt-16">
                {props.children}
            </div>
        </div>
    )
}