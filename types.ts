// 1) user
export interface User {
  userID: number;
  userName: string;
  passWord: string;
  email: string;
  bio: string;
  photo: string;
  name: string;
}
// 2) flows
export interface Follow {
  followerID: number;
  followeeID: number;
}
// 3) posts
export interface Post {
  postID: number;
  createdAt: number;
  likeCount: number;
  commentCount: number;
  userID: number;
  text: string;
}
// 4) comments
export interface Comment {
  commentID: number;
  userID: number;
  postID: number;
}
// 5) like
export interface Like {
  userID: number;
  postID: number;
}
