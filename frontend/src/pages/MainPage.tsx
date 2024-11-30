import React, { useEffect } from "react";
import useRpc from "../hooks/useRpc";

export default function MainPage(): JSX.Element {
    const rpcRandomPost = useRpc("readRandomPost")

    useEffect(() => {
        rpcRandomPost.reqeust({})
    }, [])

    const onNext = () =>{
        rpcRandomPost.reqeust({})
    }

    const post = rpcRandomPost.value?.post

    return (
        <div>
            <div>
                <div className="">{post?.body}</div>
                <div className="text-xs">by {post?.author.name}</div>
                <div className="text-xs text-gray-700">{post?.timestamp}</div>
            </div>
            <button className="border border-black p-2 m-1">자세히</button>
            <button className="border border-black p-2 m-1" onClick={onNext}>다음글</button>
        </div>
    )
}