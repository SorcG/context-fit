const variants = {
  default: "max-w-[480px] lg:max-w-[1100px]",
  narrow: "max-w-[480px] lg:max-w-[720px]",
  wide: "max-w-[480px] lg:max-w-[1200px]",
} as const;

export default function Container({
  children,
  className = "",
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <div
      className={`mx-auto w-full px-5 lg:px-10 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  );
}
