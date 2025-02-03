export default function ContainerGrid({
  children,
  gap = 10,
}: {
  children: React.ReactNode;
  gap?: number;
}) {
  return (
    <section
      className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-${gap}`}
    >
      {children}
    </section>
  );
}
