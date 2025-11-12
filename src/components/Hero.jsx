export default function Hero({ imageUrl, title, subtitle }) {
  return (
    <div className="relative w-full h-[50vh] mb-6 overflow-hidden rounded border bg-gray-100">
      <img
        src={imageUrl}
        alt={title || "Hero"}
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative h-full flex items-center justify-center text-center px-4">
        <div>
          <h2 className="text-white text-3xl md:text-5xl font-extrabold tracking-tight">
            {title}
          </h2>
          {subtitle ? (
            <p className="mt-3 text-white/90 text-base md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
