import React from "react"

interface Props {

}

export default function Comment(props: Props): JSX.Element {
    return (
        <div>댓글
            <div>작성자</div>
            <div>내용</div>
            <div>2024-11-26</div>
            <div>
                댓글 목록
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <input />
                <button>댓글 쓰기</button>
            </div>
        </div>
    )
}