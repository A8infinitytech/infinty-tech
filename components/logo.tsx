interface LogoProps {
  className?: string;
}

export default function Logo({ className = "" }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Icon */}
      <div className="relative w-10 h-10 shrink-0">
        <div className="absolute top-0 left-0 w-3 h-3 rounded-full bg-gradient-to-br from-blue-400 to-blue-700" />

        <div className="absolute top-2 left-4 w-4 h-8 rounded-full rotate-[35deg] bg-gradient-to-br from-blue-400 to-blue-700" />
      </div>

      {/* Text */}
      <div className="flex flex-col leading-none">
        <span className="text-3xl font-light text-[#0b1028]">
          Infinity
        </span>

        <span className="text-[10px] tracking-[0.6em] text-blue-600 ml-1 mt-1">
          TECH
        </span>
      </div>
    </div>
  );
}