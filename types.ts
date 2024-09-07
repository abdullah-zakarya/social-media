// 1) user
export interface User {
  userID: string;
  userName: string;
  passWord: string;
  email: string;
  bio: string;
  photo: string;
  name: string;
}
// 2) flows
export interface Follow {
  followerID: string;
  followeeID: string;
}
// 3) posts
export interface Post {
  postID: string;
  createdAt: number;
  likeCount: number;
  commentCount: number;
  userID: string;
  text: string;
}
// 4) comments
export interface Comment {
  commentID: string;
  userID: string;
  postID: string;
}
// 5) like
export interface Like {
  userID: string;
  postID: string;
}
