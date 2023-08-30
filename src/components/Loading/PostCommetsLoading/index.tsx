import * as Separator from "@radix-ui/react-separator";
import Shimmer from "../Shimmer";

const PostCommetsLoading = () => {
  const comments = Array.from({ length: 2 }, (_, idx) => idx + 1);

  return (
    <div className="mt-8 flex flex-col">
      <div className="relative h-[20px] w-[80px] overflow-hidden rounded-md bg-slate-100 md:h-[25px] md:w-[130px]">
        <Shimmer />
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {comments?.map((comment) => (
          <div key={comment} className="flex flex-col">
            <div className="mt-2 flex items-center gap-3">
              <div className="relative flex min-h-[17px] min-w-[17px] items-center justify-center overflow-hidden rounded-full bg-slate-100 md:min-h-[20px] md:min-w-[20px]">
                <Shimmer />
              </div>
              <div className="relative min-h-[10px] w-[200px] overflow-hidden rounded-md bg-slate-100 md:min-h-[13px]">
                <Shimmer />
              </div>
            </div>
            <div className="relative mt-3 h-[13px] w-full overflow-hidden rounded-md bg-slate-100 md:h-[10px]">
              <Shimmer />
            </div>
            <Separator.Root className="mt-5 h-[1px] w-full bg-slate-300" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostCommetsLoading;
