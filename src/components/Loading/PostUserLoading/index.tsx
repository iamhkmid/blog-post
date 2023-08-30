import * as Separator from "@radix-ui/react-separator";
import Shimmer from "../Shimmer";

const PostUserLoading = () => {
  return (
    <div className="mt-8 flex items-center gap-3">
      <div className="relative flex h-[25px] w-[25px] items-center justify-center overflow-hidden rounded-full bg-slate-100 md:h-[28px] md:w-[28px]">
        <Shimmer />
      </div>
      <div className="relative h-[15px] w-[100px] overflow-hidden rounded-md bg-slate-100 md:h-[17px]">
        <Shimmer />
      </div>
    </div>
  );
};

export default PostUserLoading;
