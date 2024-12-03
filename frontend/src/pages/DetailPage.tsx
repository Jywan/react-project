import React, { useEffect, useState } from "react";
import Comment from "../components/Comment";
import { useSearchParams } from "react-router-dom";
import useRpc from "../hooks/useRpc";
import Loading from "../components/Loading";
import { formatTimestamp } from "../utils/time";

export default function DetailPage(): JSX.Element {
    const [searcheParams] = useSearchParams()
    const postId = parseInt(searcheParams.get("id") ?? "-1", 32)

    const [commentBody, setCommentBody] = useState("")

    const rpcReadPost = useRpc("readPost", { postId })
    const rpcCreateComment = useRpc("createComment")

    useEffect(() => {
        if(rpcCreateComment.value) {
            rpcReadPost.reqeust({postId})
            setCommentBody("")
        }
    }, [rpcCreateComment.value]) 

    const post = rpcReadPost.value?.post
    if (!post) {
        return <Loading />
    }

    const onWriteComment = () => {
        rpcCreateComment.reqeust({ postId: post.id, body: commentBody })
    }


    return (
        <div className="flex flex-col items-center">
            <div>
                <div className="">{post.body}</div>
                <div className="text-xs">by {post.author.name}</div>
                <div className="text-xs text-gray-700">{formatTimestamp(post.timestamp)}</div>
            </div>
            <div>
                {
                    post.comments.map((c) => (
                        <Comment key={c.id} comment={c} />
                    ))
                }
                <div className="flex flex-row border">
                    <input className="" value={commentBody} onChange={(e) => { setCommentBody(e.target.value) }} />
                    <button onClick={onWriteComment}>댓글쓰기</button>
                </div>
            </div>
        </div>
    )
}

function parseNumber(arg0: string | null) {
    throw new Error("Function not implemented.");
}
