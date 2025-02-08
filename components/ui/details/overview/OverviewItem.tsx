export default function OverviewItem({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`${className} flex space-x-2`}>
      <h2 className="text-default-500">{title}:</h2>
      <p>{children}</p>
    </div>
  );
}
