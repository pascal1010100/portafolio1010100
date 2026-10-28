import { cn } from "@/lib/utils"

type PascalMarkProps = {
  className?: string
  compact?: boolean
}

export function PascalMark({ className, compact = false }: PascalMarkProps) {
  return (
    <span
      className={cn(
        "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-white/15 bg-[#05090b]",
        compact ? "h-9 w-9 rounded-xl" : "h-12 w-12 rounded-[1rem]",
        className,
      )}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 64 64"
        className={compact ? "h-7 w-7" : "h-9 w-9"}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M32 7 52 18.5 32 30 12 18.5 32 7Z" stroke="#ECFEFF" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M12 18.5 32 30v23L12 41.5v-23Z" stroke="#ECFEFF" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M52 18.5 32 30v23l20-11.5v-23Z" stroke="#42D9FF" strokeWidth="2.25" strokeLinejoin="round" />
        <path d="M32 30v23" stroke="#B8F5FF" strokeWidth="2.25" strokeLinecap="round" />
      </svg>
    </span>
  )
}
