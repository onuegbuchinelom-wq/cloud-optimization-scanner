function SavingsCard({ resource }) {
  if (!resource) {
    return null
  }

  return (
    <div
      className="mt-6 rounded-xl border p-4 sm:mt-8 sm:p-5"
      style={{
        borderColor:
          "color-mix(in srgb, var(--color-success) 10%, transparent)",
        backgroundColor:
          "color-mix(in srgb, var(--color-success) 5%, transparent)",
      }}
    >
      <p
        className="text-sm"
        style={{
          color:
            "color-mix(in srgb, var(--color-text) 40%, transparent)",
        }}
      >
        Potential optimization
      </p>

      <p
        className="mt-2 text-xl font-semibold sm:text-2xl"
        style={{
          color: "var(--color-success)",
        }}
      >
        Save ${resource.potentialSavings}/month
      </p>

      <p
        className="mt-2 text-sm leading-6"
        style={{
          color:
            "color-mix(in srgb, var(--color-text) 40%, transparent)",
        }}
      >
        This resource has more capacity allocated than the current
        usage requires. Right-sizing it could reduce unnecessary
        infrastructure cost.
      </p>
    </div>
  )
}

export default SavingsCard