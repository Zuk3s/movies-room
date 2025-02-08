import React from "react";

export default function Container({
  className,
  children,
  hasMaxWidth = true,
}: {
  className?: string;
  children: React.ReactNode;
  hasMaxWidth?: boolean;
}) {
  return (
    <section
      className={`${hasMaxWidth && "max-w-7xl px-6 mx-auto"} ${className}`}
    >
      {children}
    </section>
  );
}
