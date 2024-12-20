import { useRouter } from "next/router"

export default function Settings () {
    const rounter = useRouter()
    const handleLogout = ()=>{
        sessionStorage.clear()
        rounter.push('/auth/login')
    }
    return (
        <div className="mt-10 flex flex-col">
            This is settings page
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}