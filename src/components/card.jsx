function Card({ className = "", children }) {
    return (
      <div
        className={`flex flex-col bg-white/30 border-white/50 border-4 border-solid backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105 ${className}`}
      >
        {children}
      </div>
    );
  }
  
  export default Card;