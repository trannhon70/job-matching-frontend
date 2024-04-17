import { SkeletonCardBox } from ".";

export const SkeletonList = () => {
  return (
    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 ">
      {[...new Array(7).fill(null).map((_, i) => <SkeletonCardBox key={i} />)]}
    </div>
  );
};
