interface IProps {
  count?: number;
}

// Different title widths make the loading state look natural
const titleWidths = ["w-40", "w-32", "w-48", "w-36", "w-44"];

const Skeleton = ({ count = 3 }: IProps) => {
  return (
    <div className="space-y-1" role="status" aria-busy="true">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="flex items-center justify-between rounded-md p-3 even:bg-gray-100 animate-pulse"
        >
          {/* Title */}
          <div className={`h-5 rounded bg-gray-300 ${titleWidths[idx % titleWidths.length]}`} />

          {/* Edit + Remove buttons */}
          <div className="flex items-center justify-end space-x-3">
            <div className="h-9 w-14 rounded-md bg-gray-300" />
            <div className="h-9 w-20 rounded-md bg-gray-300" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading todos...</span>
    </div>
  );
};

export default Skeleton;