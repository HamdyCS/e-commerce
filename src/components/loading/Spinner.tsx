export default function Spinner({ size = "20" }: { size?: string }) {
  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full bg-black/30 z-20"></div>
      <div className="flex absolute top-0 left-0 w-full h-full items-center justify-center z-30">
        <div
          className={`animate-spin rounded-full border-b-2 border-gray-200`}
          style={{ width: `${size}px`, height: `${size}px` }}
        ></div>
      </div>
    </>
  );
}
