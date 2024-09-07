// 1) user
interface User {
  userName: string;
  passWord: string;
  email: string;
  bio: string;
  photo: string;
  name: string;
}
// 2) flows
interface Follow {
  follower: string;
  followee: string;
}
// 3) posts
interface Post {
  id: string;
  createdAt: number;
  likeCount: number;
  commentCount: number;
  user: string;
  text: string;
}
// 4) comments
interface Comment {
  id: string;
  user: string;
  post: string;
}
// 5) like
interface Like {
  user: string;
  post: string;
}
