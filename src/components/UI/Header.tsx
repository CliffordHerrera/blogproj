import '../../glitch.css';

export default function Header() {
    return (
        <div className="fixed top-0 flex flex-row items-center justify-between bg-gradient-to-br from-blue-500 to-blue-800 w-screen h-20">
            <h1 className="text-3xl text-white font-bold glitch-text m-4" data-text="Assbook">Assbook</h1>
        </div>
    )
}