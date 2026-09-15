
import { motion, useReducedMotion } from "framer-motion"

function ScanProgress({
  isScanning,
  progress,
  resourcesScanned,
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div
      className="border-t pt-4 sm:pt-5"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-text) 7%, transparent)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-3 text-[10px] sm:text-xs">
        <span
          className="min-w-0 truncate"
          style={{
            color:
              "color-mix(in srgb, var(--color-text) 40%, transparent)",
          }}
        >
          {isScanning
            ? "Scanning resources"
            : progress === 100
              ? "Scan complete"
              : "Ready to scan resources"}
        </span>

        <span
          className="shrink-0"
          style={{
            color:
              "color-mix(in srgb, var(--color-text) 70%, transparent)",
          }}
        >
          {resourcesScanned} / 25
        </span>
      </div>

      <div
        className="h-1.5 overflow-hidden rounded-full"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-text) 7%, transparent)",
        }}
        role="progressbar"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
        aria-label="Infrastructure scan progress"
      >
        <motion.div
          className="h-full rounded-full"
          style={{
            backgroundColor: "var(--color-accent)",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.3,
            ease: "easeOut",
          }}
        />
      </div>
    </div>
  )
}

export default ScanProgress

