export default function EmptyState({ message = "No items found" }) {
  return (
    <div className="flex flex-col items-center justify-center p-12 md:p-20 border border-dashed border-border rounded-[32px] bg-surface/30 text-center">
      <p className="text-secondary text-base lg:text-lg font-medium opacity-80">{message}</p>
    </div>
  );
}
