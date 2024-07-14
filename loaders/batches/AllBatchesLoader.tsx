import { Skeleton } from "@/components/ui/skeleton";

const AllBatchesLoader = () => {
  return (
    <div className="w-full h-screen items-center justify-center flex flex-col space-y-3 bg-slate-600">
      <Skeleton className="h-[125px] w-[250px] rounded-xl" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
    </div>
  );
};

export default AllBatchesLoader;
