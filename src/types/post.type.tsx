export type postType = {
          _id: string,
  body: string,
  image?: string, // Optional, since not all posts might have an image
  user: {
    _id: string,
    name: string,
    photo?: string | undefined, // Optional, as not all users might have a profile photo
  },
  createdAt: string, // ISO 8601 timestamp
  comments: commentType[],
  id:string
}
export type commentType = {
    _id: string, // Unique identifier for the comment
    content: string, // The text content of the comment
    commentCreator: {
      _id: string, // Unique identifier for the user who created the comment
      name: string, // Name of the user who created the comment
      photo?: string, // Optional photo URL for the user's profile
    },
    post: string, // The ID of the associated post
    createdAt: string, // ISO 8601 timestamp representing when the comment was created
}