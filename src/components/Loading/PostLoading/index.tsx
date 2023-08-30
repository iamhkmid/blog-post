import Shimmer from "../Shimmer";

export const PostCommentLoading = () => {
  return (
    <div className="relative mt-3 min-h-[20px] w-[70px] overflow-hidden rounded-[20px] bg-slate-100">
      <Shimmer />
    </div>
  );
};

export const PostUserLoading = () => {
  return (
    <div className="flex items-center gap-3">
      <div className="relative flex min-h-[20px] min-w-[20px] items-center justify-center overflow-hidden rounded-full bg-slate-100 md:min-h-[25px] md:min-w-[25px]">
        <Shimmer />
      </div>
      <div className="relative h-[11px] w-[70px] overflow-hidden rounded-md bg-slate-100 md:h-[15px] md:w-[100px]">
        <Shimmer />
      </div>
    </div>
  );
};

const PostLoading = () => {
  const items = Array.from({ length: 10 }, (_, idx) => idx + 1);
  return (
    <div className="flex flex-col gap-6 pointer-events-none">
      {items.map((item) => (
        <div
          key={item}
          className="relative flex flex-col overflow-hidden rounded-md bg-white px-6 py-4 shadow-sm"
        >
          <PostUserLoading />
          <div className="relative mt-3 min-h-[18px] w-full overflow-hidden rounded-md bg-slate-100 md:min-h-[23px]">
            <Shimmer />
          </div>
          <div className="relative mt-3 min-h-[18px] w-1/3 overflow-hidden rounded-md bg-slate-100 md:min-h-[23px]">
            <Shimmer />
          </div>
          <div className="relative mt-3 min-h-[10px] w-full overflow-hidden rounded-md bg-slate-100 md:min-h-[14px]">
            <Shimmer />
          </div>
          <div className="relative mt-2 min-h-[10px] w-full overflow-hidden rounded-md bg-slate-100 md:min-h-[14px]">
            <Shimmer />
          </div>
          <div className="relative mt-2 min-h-[10px] w-2/3 overflow-hidden rounded-md bg-slate-100 md:min-h-[14px]">
            <Shimmer />
          </div>
          <PostCommentLoading />
        </div>
      ))}
    </div>
  );
};

export default PostLoading;
