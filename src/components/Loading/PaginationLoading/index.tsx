import Shimmer from "../Shimmer";

const PaginationLoading = () => {
  const pages = Array.from({ length: 7 }, (_, idx) => idx + 1);
  return (
    <div className="flex w-full items-center justify-center md:justify-between">
      <div className="relative hidden h-[20px] w-[80px] items-center justify-center overflow-hidden rounded-full bg-slate-100 md:flex">
        <Shimmer />
      </div>
      <div className="flex gap-[5px]">
        {pages.map((page) => (
          <div
            key={page}
            className="relative h-[25px] w-[25px] overflow-hidden rounded-full bg-slate-100 md:h-[30px] md:w-[30px]"
          >
            <Shimmer />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaginationLoading;
