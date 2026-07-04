import Image from "next/image";

export default function PageHeader({
  eyebrow,
  title,
  image,
  alt,
  imagePosition = "object-top",
}: {
  eyebrow: string;
  title: string;
  image: string;
  alt: string;
  imagePosition?: string;
}) {
  return (
    <section className="relative flex h-[46dvh] min-h-[360px] w-full flex-col justify-end overflow-hidden">
      <Image
        src={image}
        alt={alt}
        fill
        priority
        sizes="100vw"
        className={`object-cover ${imagePosition}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/50 to-transparent" />
      <div className="relative flex flex-col gap-2 px-5 pb-8">
        <p className="text-sm font-semibold tracking-wide text-accent">
          {eyebrow}
        </p>
        <h1 className="text-3xl leading-[1.1] text-text">{title}</h1>
      </div>
    </section>
  );
}
