/* 테스트용 가짜 서버 */

import { Comment, IRpc, Post, RpcFunctionRequest, RpcFunctionResponse, User } from "./rpcgen";

const server: {
    [K in keyof IRpc]: (arg: RpcFunctionRequest<K>) => Promise<RpcFunctionResponse<K>>
} = {
    createPost: async (req) => {
        posts.push({
            body: req.body,
            comments: [],
            id: posts.length,
            author: user,
            timestamp: Date.now()
        })
        return {}
    },
    createComment: async (req) => {
        const post = findPost(req.postId)
        post.comments.push({
            id: post.comments.length,
            author: user,
            body: req.body,
            timestamp: Date.now()
        })
        return {}
    },
    readPost: async (req) => {
        return { post: findPost(req.postId) }
    },
    readRandomPost: async (req) => {
        return { post: findPost(Math.floor(Math.random() * posts.length)) }
    },
    readProfile: async (req) => {
        return { user }
    },
    readPreview: async () => {
        const comments: Comment[] = []
        posts.forEach((p) => {
            p.comments.forEach((c) => {
                if (c.author.id === user.id) {
                    comments.push(c)
                }
            })
        })

        return { posts: posts.filter((p) => p.author.id === user.id), comments }
    },
    updateProfile: async (req) => {
        user.name = req.name
        return {}
    },
}

export default server

const user: User = { id: 10, name: "테스트" }
const user2: User = { id: 11, name: "확인용" }
const posts: Post[] = [
    { id: 0, body: "테스트 내용1", author: user, timestamp: Date.now() - 2345432, comments: [] },
    {
        id: 1,
        author: user2,
        body: "테스트 내용2",
        timestamp: Date.now() - 21331231,
        comments: [{
            body: "테스트 댓글1",
            id: 2,
            author: user,
            timestamp: Date.now()
        }]
    }
]

function findPost(postId: number): Post {
    const post = posts.find((p) => p.id === postId)
    if (!post) {
        throw Error("no post")
    }
    return post
}

