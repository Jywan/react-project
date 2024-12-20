import { PromiseRpc } from "./rpcgen"
import {
  insertComment,
  insertPost,
  selectCommentsByAuthor,
  selectPost,
  selectPostsByAuthor,
  selectRandomPost,
  selectUser,
  updateUser,
} from "./db/queries"
import { toComments, toPost, toPosts, toUser } from "./db/convert"
import { getAuthUrl } from "./utils/oauth2"

const userId = 1

const rpcImpl: PromiseRpc = {
  createPost: async (req) => {
    await insertPost(req.body, userId)
    return {}
  },
  createComment: async (req) => {
    await insertComment(req.body, userId, req.postId)
    return {}
  },
  readPost: async (req) => {
    return { post: await toPost(await selectPost(req.postId)) }
  },
  readRandomPost: async (req) => {
    return { post: await toPost(await selectRandomPost()) }
  },
  readProfile: async (req) => {
    return { user: await toUser(await selectUser(userId)) }
  },
  readPreview: async (req) => {
    return {
      comments: await toComments(await selectCommentsByAuthor(userId)),
      posts: await toPosts(await selectPostsByAuthor(userId)),
    }
  },
  updateProfile: async (req) => {
    await updateUser(userId, req.name)
    return {}
  },
  readOAuth2Url: async (req) => {
    const url = getAuthUrl(req.provider)
    return { url }
  }
}

export default rpcImpl