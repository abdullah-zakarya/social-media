import IComment from "./IComment";
import IFollow from "./IFollow";
import ILike from "./ILike";
import IPost from "./IPost";
import IUser from "./IUser";
export default interface DataModel
  extends IUser,
    IFollow,
    IPost,
    IComment,
    ILike {}
