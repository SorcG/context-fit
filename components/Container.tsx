export default function Container({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-[480px] px-5 ${className}`}>
      {children}
    </div>
  );
}
