import { motion, useReducedMotion } from "framer-motion"

function ResourceCard({
  resource,
  index,
  onSelect,
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(resource)}
      aria-label={`View analysis for ${resource.name}`}
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
        delay: shouldReduceMotion ? 0 : 0.35 + index * 0.08,
      }}
      whileHover={
        shouldReduceMotion
          ? undefined
          : {
              y: -3,
            }
      }
      whileTap={
        shouldReduceMotion
          ? undefined
          : {
              scale: 0.99,
            }
      }
      className="group w-full rounded-2xl border p-4 text-left outline-none transition focus-visible:ring-2 focus-visible:ring-offset-2 sm:p-5"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-text) 10%, transparent)",
        backgroundColor:
          "color-mix(in srgb, var(--color-text) 3%, transparent)",
        "--tw-ring-color": "var(--color-accent)",
        "--tw-ring-offset-color": "var(--color-background)",
      }}
    >
      <div className="@container/card">
        <div className="flex flex-col gap-5 @[700px]/card:flex-row @[700px]/card:items-center @[700px]/card:justify-between">
          {/* Resource information */}
          <div className="flex min-w-0 items-start gap-4">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-semibold"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 10%, transparent)",
                color:
                  "color-mix(in srgb, var(--color-accent) 80%, white)",
              }}
            >
              {index + 1}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="break-words font-medium text-white">
                  {resource.name}
                </h3>

                <span
                  className="rounded-full border px-2 py-1 text-xs"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-text) 10%, transparent)",
                    color:
                      "color-mix(in srgb, var(--color-text) 40%, transparent)",
                  }}
                >
                  {resource.type}
                </span>

                <span
                  className="rounded-full border px-2 py-1 text-xs"
                  style={{
                    borderColor:
                      "color-mix(in srgb, var(--color-text) 10%, transparent)",
                    color:
                      "color-mix(in srgb, var(--color-text) 40%, transparent)",
                  }}
                >
                  {resource.provider}
                </span>
              </div>

              <p
                className="mt-1 text-sm leading-6"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-text) 32%, transparent)",
                }}
              >
                {resource.allocated} allocated · {resource.used} used
              </p>
            </div>
          </div>

          {/* Resource metrics */}
          <div className="flex flex-wrap items-center gap-5 @[700px]/card:gap-8">
            <div>
              <p
                className="text-xs"
                style={{
                  color:
                    "color-mix(in srgb, var(--color-text) 32%, transparent)",
                }}
              >
                Opportunity
              </p>

              <p className="mt-1 font-semibold text-white">
                {resource.optimizationScore}%
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
                Potential savings
              </p>

              <p
                className="mt-1 font-semibold"
                style={{
                  color: "var(--color-success)",
                }}
              >
                ${resource.potentialSavings}/mo
              </p>
            </div>

            <span
              className="hidden transition lg:block lg:group-hover:translate-x-1"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 32%, transparent)",
              }}
              aria-hidden="true"
            >
              →
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default ResourceCard