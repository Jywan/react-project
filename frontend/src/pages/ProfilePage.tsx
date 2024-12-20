import React, { useEffect, useState } from "react";
import Preview from "../components/Preview";
import useRpc from "../hooks/useRpc";
import Loading from "../components/Loading";
import useNavigateWithSearch from "../hooks/useNavigateWithSearch";

export default function ProfilePage(): JSX.Element {
    const rpcReadProfile = useRpc("readProfile", {})
    const rpcReadPreview = useRpc("readPreview", {})
    const rpcUpdateProfile = useRpc("updateProfile")
    const rpcDeleteSession = useRpc("deleteSession")
    const navigate = useNavigateWithSearch()

    const [name, setName] = useState("")

    const user = rpcReadProfile.value?.user
    const preview = rpcReadPreview.value

    useEffect(() => {
        if (user?.name) {
            setName(user.name)
        }
    }, [user?.name])

    useEffect(() => {
        if (rpcUpdateProfile.value) {
            rpcReadPreview.reqeust({})
        }
    }, [rpcUpdateProfile])

    if (!user || !preview) {
        return <Loading />
    }

    const onChangeName = () => {
        rpcUpdateProfile.reqeust({ name })
    }

    const onDetail = (id: number) => {
        navigate("/detail", { id })
    }

    const onLogout = () => {
        rpcDeleteSession.reqeust({})
    }

    return (
        <div className="flex flex-col items-center">
            <input className="text-xl font-bold text-center" value={user.name} onChange={(e) => { setName(e.target.value) }} />
            <button className="text-xs underline" onClick={onChangeName}>이름 변경</button>
            <div className="flex flex-row justify-between w-full max-w-lg">
                <div>
                    <div className="font-bold">내가 쓴 글</div>
                    {preview.posts.map((p) =>
                    (<Preview
                        key={p.id}
                        preview={p}
                        onClick={() => {
                            onDetail(p.id)
                        }} />
                    ))}
                </div>
                <div>
                    <div className="font-bold">내가 쓴 댓글</div>
                    {preview.comments.map((p) => (
                        <Preview key={p.id} preview={p} />)
                    )}
                </div>
            </div>
            <button className="text-gray-500 font-xs" onClick={onLogout}>로그아웃</button>
        </div>
    )
}