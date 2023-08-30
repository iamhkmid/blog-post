import Shimmer from "../Shimmer";

const UserCardLoading = () => {
  const users = Array.from({ length: 10 }, (_, idx) => idx + 1);
  return (
    <div className="pointer-events-none flex flex-col gap-4">
      {users.map((user) => (
        <div
          key={user}
          className="relative flex w-full items-center justify-between overflow-hidden rounded-md bg-white px-4 py-3 shadow-sm md:px-6 md:py-4"
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div className="flex items-center">
              <div className="relative flex h-[40px] w-[40px] overflow-hidden rounded-full bg-slate-100 md:h-[50px] md:w-[50px]">
                <Shimmer />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="relative h-fit min-h-[14px] w-[100px] overflow-hidden rounded-[20px] bg-slate-100 md:min-h-[19px] md:w-[200px]">
                <Shimmer />
              </div>
              <div className="relative mt-1 h-fit min-h-[12px] w-[150px] overflow-hidden rounded-[20px] bg-slate-100 md:min-h-[14px] md:w-[250px]">
                <Shimmer />
              </div>
              <div className="relative mt-[7px] h-fit min-h-[13px] w-[40px] overflow-hidden rounded-[20px] bg-slate-100 md:mt-2 md:min-h-[15px] md:w-[50px]">
                <Shimmer />
              </div>
            </div>
          </div>
          <div className="relative h-fit min-h-[22px] w-[50px] overflow-hidden rounded-[20px] bg-slate-100 md:min-h-[25px] md:w-[60px]">
            <Shimmer />
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserCardLoading;
