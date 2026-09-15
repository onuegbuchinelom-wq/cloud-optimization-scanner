
import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import ResourceCard from "./ResourceCard"
import ResourceDetails from "./ResourceDetails"

function ResourceList({ resources }) {
  const [selectedResource, setSelectedResource] = useState(null)
  const shouldReduceMotion = useReducedMotion()

  const handleSelect = (resource) => {
    setSelectedResource((currentResource) => {
      if (currentResource?.id === resource.id) {
        return null
      }

      return resource
    })
  }

  const handleClose = () => {
    setSelectedResource(null)
  }

  return (
    <div className="@container grid gap-4">
      {resources.map((resource, index) => {
        const isSelected = selectedResource?.id === resource.id

        return (
          <div key={resource.id}>
            <ResourceCard
              resource={resource}
              index={index}
              onSelect={handleSelect}
            />

            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.div
                  initial={
                    shouldReduceMotion
                      ? false
                      : {
                          opacity: 0,
                          height: 0,
                          y: -8,
                        }
                  }
                  animate={{
                    opacity: 1,
                    height: "auto",
                    y: 0,
                  }}
                  exit={
                    shouldReduceMotion
                      ? {
                          opacity: 0,
                        }
                      : {
                          opacity: 0,
                          height: 0,
                          y: -8,
                        }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.3,
                    ease: "easeOut",
                  }}
                  className="overflow-hidden"
                >
                  <ResourceDetails
                    resource={resource}
                    onClose={handleClose}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}

export default ResourceList
