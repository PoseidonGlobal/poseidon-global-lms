export default function Hero({ 
  title = "Poseidon Global Maritime University", 
  subtitle = "Bringing maritime security courses alive",
  backgroundImage = "/images/poseidon-hero.jpg",
  children 
}) {
  return (
    <div 
      className="relative min-h-[500px] flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImage})`
      }}
    >
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 poseidon-text-gradient">
          {title}
        </h1>
        <p className="text-xl md:text-2xl mb-8 font-light">
          {subtitle}
        </p>
        {children}
      </div>
    </div>
  )
}