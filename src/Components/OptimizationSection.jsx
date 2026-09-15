
import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "framer-motion"
import { useResourceData } from "../hooks/useResourceData"
import AnimatedNumber from "./AnimatedNumber"
import ResourceList from "./ResourceList"
import ResourceDetails from "./ResourceDetails"

function OptimizationSection() {
  const [selectedResource, setSelectedResource] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const {
    data: resources = [],
    isLoading,
    isError,
    error,
  } = useResourceData()

  const rankedResources = useMemo(() => {
    return [...resources].sort(
      (a, b) => b.optimizationScore - a.optimizationScore,
    )
  }, [resources])

  const totalSavings = rankedResources.reduce(
    (total, resource) => total + resource.potentialSavings,
    0,
  )

  const sectionAnimation = shouldReduceMotion
    ? {}
    : {
        initial: {
          opacity: 0,
          y: 40,
        },
        whileInView: {
          opacity: 1,
          y: 0,
        },
        viewport: {
          once: true,
          amount: 0.15,
        },
        transition: {
          duration: 0.6,
          ease: "easeOut",
        },
      }

  if (isLoading) {
    return (
      <section
        id="optimization"
        aria-labelledby="optimization-loading-title"
        className="border-t px-4 py-20 sm:px-6 sm:py-24"
        style={{
          borderColor:
            "color-mix(in srgb, var(--color-text) 10%, transparent)",
        }}
      >
        <div className="mx-auto max-w-7xl">
          <p
            className="text-sm uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-accent)",
            }}
          >
            Analyzing resources
          </p>

          <h2
            id="optimization-loading-title"
            className="mt-3 max-w-3xl text-3xl font-semibold sm:text-4xl"
          >
            Loading optimization opportunities...
          </h2>

          <div
            className="mt-10 h-2 overflow-hidden rounded-full"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--color-text) 10%, transparent)",
            }}
            role="status"
            aria-label="Loading resource analysis"
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                backgroundColor: "var(--color-accent)",
              }}
              initial={{
                width: shouldReduceMotion ? "50%" : "0%",
              }}
              animate={{
                width: "50%",
              }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1,
                repeat: shouldReduceMotion ? 0 : Infinity,
                repeatType: "reverse",
              }}
            />
          </div>
        </div>
      </section>
    )
  }

  if (isError) {
    return (
      <section
        id="optimization"
        aria-labelledby="optimization-error-title"
        className="border-t px-4 py-20 sm:px-6 sm:py-24"
        style={{
          borderColor:
            "color-mix(in srgb, var(--color-text) 10%, transparent)",
        }}
      >
        <div
          className="mx-auto max-w-7xl rounded-2xl border p-5 sm:p-8"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-danger) 20%, transparent)",
            backgroundColor:
              "color-mix(in srgb, var(--color-danger) 5%, transparent)",
          }}
          role="alert"
        >
          <p
            className="text-sm uppercase tracking-[0.2em]"
            style={{
              color: "var(--color-danger)",
            }}
          >
            Analysis failed
          </p>

          <h2
            id="optimization-error-title"
            className="mt-3 text-xl font-semibold sm:text-2xl"
          >
            We couldn't load your resource data.
          </h2>

          <p
            className="mt-3 text-sm leading-6"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 40%, transparent)",
            }}
          >
            {error?.message ||
              "Something went wrong while fetching resources."}
          </p>
        </div>
      </section>
    )
  }

  return (
    <motion.section
      id="optimization"
      aria-labelledby="optimization-title"
      className="border-t px-4 py-20 sm:px-6 sm:py-24"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-text) 10%, transparent)",
      }}
      {...sectionAnimation}
    >
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <div className="mb-10 sm:mb-12">
          <p
            className="mb-3 text-xs font-medium uppercase tracking-[0.2em] sm:text-sm"
            style={{
              color: "var(--color-accent)",
            }}
          >
            Scan complete
          </p>

          <h2
            id="optimization-title"
            className="max-w-3xl text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          >
            Optimization opportunities found.
          </h2>

          <p
            className="mt-4 max-w-2xl text-sm leading-6 sm:text-base sm:leading-7"
            style={{
              color:
                "color-mix(in srgb, var(--color-text) 40%, transparent)",
            }}
          >
            Your infrastructure has been analyzed and ranked by potential
            optimization opportunity.
          </p>
        </div>

        {/* Summary cards */}
        <div
          className="mb-8 grid gap-4 md:mb-10 md:grid-cols-3"
          aria-label="Optimization summary"
        >
          <SummaryCard
            label="Resources analyzed"
            value={rankedResources.length}
            delay={0.1}
            shouldReduceMotion={shouldReduceMotion}
          />

          <SummaryCard
            label="Highest opportunity"
            value={rankedResources[0]?.optimizationScore ?? 0}
            valueType="percentage"
            delay={0.18}
            shouldReduceMotion={shouldReduceMotion}
          />

          <SummaryCard
            label="Potential monthly savings"
            value={totalSavings}
            valueType="savings"
            delay={0.26}
            shouldReduceMotion={shouldReduceMotion}
          />
        </div>

        {/* Resource list */}
        <ResourceList
          resources={rankedResources}
          onSelect={setSelectedResource}
        />

        {/* Resource details */}
        <ResourceDetails
          resource={selectedResource}
          onClose={() => setSelectedResource(null)}
        />
      </div>
    </motion.section>
  )
}

function SummaryCard({
  label,
  value,
  delay,
  shouldReduceMotion,
  valueType = "number",
}) {
  const isSavings = valueType === "savings"
  const isPercentage = valueType === "percentage"

  return (
    <motion.article
      initial={
        shouldReduceMotion
          ? false
          : {
              opacity: 0,
              y: 20,
            }
      }
      whileInView={{
        opacity: 1,
        y: 0,
      }}
      viewport={{
        once: true,
        amount: 0.3,
      }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.4,
        delay: shouldReduceMotion ? 0 : delay,
      }}
      className="rounded-2xl border p-5 sm:p-6"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-text) 10%, transparent)",
        backgroundColor:
          "color-mix(in srgb, var(--color-text) 3%, transparent)",
      }}
    >
      <p
        className="text-sm"
        style={{
          color:
            "color-mix(in srgb, var(--color-text) 40%, transparent)",
        }}
      >
        {label}
      </p>

      <p
        className="mt-2 text-3xl font-semibold"
        style={{
          color: isSavings
            ? "var(--color-success)"
            : "var(--color-text)",
        }}
      >
        <AnimatedNumber
          value={value}
          prefix={isSavings ? "$" : ""}
          suffix={isPercentage ? "%" : ""}
        />
      </p>
    </motion.article>
  )
}

export default OptimizationSection

