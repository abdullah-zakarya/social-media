// 1) user
export interface User {
  userid?: number;
  username: string;
  password: string;
  email: string;
  bio?: string;
  photo?: string;
  name: string;
}
// 2) flows
export interface Follow {
  followerid: number;
  followeeid: number;
}
// 3) posts
export interface Post {
  postid?: number;
  createdat?: number;
  likecount?: number;
  commentcount?: number;
  userid: number;
  text: string;
}
// 4) comments
export interface Comment {
  commentid?: number;
  userid: number;
  postid: number;
}
// 5) like
export interface Like {
  userid: number;
  postid: number;
}
