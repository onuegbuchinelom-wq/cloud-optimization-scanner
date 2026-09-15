
import { motion, useReducedMotion } from "framer-motion"
import SavingsCard from "./SavingsCard"

function ResourceDetails({ resource, onClose }) {
  const shouldReduceMotion = useReducedMotion()

  // Do not render anything until a resource has been selected.
  if (!resource) {
    return null
  }

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
      }}
      className="mt-6 rounded-2xl border p-5 sm:mt-8 sm:p-6"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-accent) 20%, transparent)",
        backgroundColor:
          "color-mix(in srgb, var(--color-accent) 5%, transparent)",
      }}
      aria-live="polite"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p
            className="text-sm"
            style={{
              color:
                "color-mix(in srgb, var(--color-accent) 75%, white)",
            }}
          >
            Resource analysis
          </p>

          <h3 className="mt-2 break-words text-xl font-semibold text-white sm:text-2xl">
            {resource.name}
          </h3>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="shrink-0 rounded-md px-2 py-1 text-sm outline-none transition hover:text-white focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            color:
              "color-mix(in srgb, var(--color-text) 35%, transparent)",
            "--tw-ring-color": "var(--color-accent)",
            "--tw-ring-offset-color": "var(--color-background)",
          }}
          aria-label={`Close analysis for ${resource.name}`}
        >
          Close
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:mt-8 lg:grid-cols-4">
        <div>
          <p
            className="text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 32%, transparent)",
            }}
          >
            Provider
          </p>

          <p className="mt-1 text-white">
            {resource.provider}
          </p>
        </div>

        <div>
          <p
            className="text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 32%, transparent)",
            }}
          >
            Allocated
          </p>

          <p className="mt-1 text-white">
            {resource.allocated}
          </p>
        </div>

        <div>
          <p
            className="text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 32%, transparent)",
            }}
          >
            Actual usage
          </p>

          <p className="mt-1 text-white">
            {resource.used}
          </p>
        </div>

        <div>
          <p
            className="text-xs"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 32%, transparent)",
            }}
          >
            Current cost
          </p>

          <p className="mt-1 text-white">
            ${resource.currentCost}/mo
          </p>
        </div>
      </div>

      {resource.potentialSavings !== undefined &&
        resource.potentialSavings !== null && (
          <SavingsCard resource={resource} />
        )}
    </motion.div>
  )
}

export default ResourceDetails

