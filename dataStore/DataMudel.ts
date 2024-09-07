import IComment from "./Icomment";
import IFollow from "./Ifollow";
import ILike from "./Ilike";
import IPost from "./Ipost";
import IUser from "./Iuser";
export default interface DataModel
  extends IComment,
    IPost,
    ILike,
    IUser,
    IFollow {}
