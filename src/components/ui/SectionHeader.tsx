interface SectionHeaderProps {
  title: string;
}
export default function SectionHeader({ title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-4 rounded-sm bg-red-500"></div>
      <h2 className="font-bold text-red-300">{title}</h2>
    </div>
  );
}
