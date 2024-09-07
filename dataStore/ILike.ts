import { Like } from "../types";
export default interface ILike {
  createLike(like: Like): Like | undefined;
  deleteLike(like: Like): Like | undefined;
}
