
import { useEffect, useState } from "react"
import { useReducedMotion } from "framer-motion"

function AnimatedNumber({
  value,
  prefix = "",
  suffix = "",
  duration = 900,
}) {
  const shouldReduceMotion = useReducedMotion()
  const [displayValue, setDisplayValue] = useState(0)

  const numericValue =
    typeof value === "number"
      ? value
      : Number.parseFloat(value) || 0

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(numericValue)
      return
    }

    let startTime = null
    let animationFrame

    const animate = (timestamp) => {
      if (!startTime) {
        startTime = timestamp
      }

      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / duration, 1)

      // Ease-out: starts quickly and slows down near the final value.
      const easedProgress = 1 - Math.pow(1 - progress, 3)

      setDisplayValue(
        Math.round(numericValue * easedProgress),
      )

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    setDisplayValue(0)
    animationFrame = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [numericValue, duration, shouldReduceMotion])

  return (
    <>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </>
  )
}

export default AnimatedNumber

