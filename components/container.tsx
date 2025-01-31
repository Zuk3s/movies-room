import React from "react";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`max-w-7xl px-6 mx-auto ${className || ""}`}>
      {children}
    </section>
  );
}
