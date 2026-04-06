export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-6">
      <div className="w-12 h-12 border-4 border-surface border-t-primary rounded-full animate-spin" />
      <p className="text-secondary text-[10px] font-bold uppercase tracking-[0.2em] animate-pulse">
        Loading...
      </p>
    </div>
  );
}
