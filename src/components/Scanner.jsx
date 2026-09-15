
import ScanProgress from "./ScanProgress"

function Scanner({
  isScanning,
  progress,
  resourcesScanned,
}) {
  const accent = "var(--color-accent)"
  const text = "var(--color-text)"
  const border = "color-mix(in srgb, var(--color-text) 10%, transparent)"
  const surface = "color-mix(in srgb, var(--color-text) 4%, transparent)"

  return (
    <div id="scan" className="relative min-w-0">
      {/* Scanner Glow */}
      <div
        className="absolute -inset-6 rounded-full blur-3xl sm:-inset-10"
        style={{
          backgroundColor:
            "color-mix(in srgb, var(--color-accent) 8%, transparent)",
        }}
      />

      <div
        className="relative overflow-hidden rounded-[24px] border p-4 shadow-2xl backdrop-blur-xl sm:rounded-[28px] sm:p-5"
        style={{
          borderColor: border,
          backgroundColor:
            "color-mix(in srgb, var(--color-surface) 90%, transparent)",
        }}
      >
        {/* Card Header */}
        <div
          className="flex items-start justify-between gap-3 border-b pb-4 sm:pb-5"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-text) 7%, transparent)",
          }}
        >
          <div className="min-w-0">
            <p
              className="text-[10px] uppercase tracking-[0.14em] sm:text-xs sm:tracking-[0.16em]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              Infrastructure scan
            </p>

            <p
              className="mt-1 text-xs font-medium sm:text-sm"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 80%, transparent)",
              }}
            >
              Live resource overview
            </p>
          </div>

          {/* Status */}
          <div
            className="flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1.5 text-[10px] sm:px-3 sm:text-[11px]"
            style={{
              borderColor: isScanning
                ? "color-mix(in srgb, var(--color-success) 15%, transparent)"
                : progress === 100
                  ? "color-mix(in srgb, var(--color-accent) 15%, transparent)"
                  : border,

              backgroundColor: isScanning
                ? "color-mix(in srgb, var(--color-success) 6%, transparent)"
                : progress === 100
                  ? "color-mix(in srgb, var(--color-accent) 6%, transparent)"
                  : surface,

              color: isScanning
                ? "color-mix(in srgb, var(--color-success) 80%, white)"
                : progress === 100
                  ? "color-mix(in srgb, var(--color-accent) 80%, white)"
                  : "color-mix(in srgb, var(--color-text) 50%, transparent)",
            }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                backgroundColor: isScanning
                  ? "var(--color-success)"
                  : progress === 100
                    ? accent
                    : "color-mix(in srgb, var(--color-text) 30%, transparent)",
              }}
            />

            {isScanning
              ? "Scanning"
              : progress === 100
                ? "Complete"
                : "Ready"}
          </div>
        </div>

        {/* Scanner */}
        <div className="relative flex min-h-[260px] items-center justify-center sm:min-h-[300px]">
          {/* Scanner Rings */}
          <div
            className="absolute h-44 w-44 rounded-full border sm:h-56 sm:w-56"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 10%, transparent)",
            }}
          />

          <div
            className="absolute h-36 w-36 rounded-full border sm:h-44 sm:w-44"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 15%, transparent)",
            }}
          />

          <div
            className="absolute h-28 w-28 rounded-full border sm:h-32 sm:w-32"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 20%, transparent)",
            }}
          />

          {/* Scanner Ring */}
          <div
            className={`absolute h-44 w-44 rounded-full border border-transparent sm:h-56 sm:w-56 ${
              isScanning ? "animate-spin" : ""
            }`}
            style={{
              borderTopColor:
                "color-mix(in srgb, var(--color-accent) 70%, transparent)",
            }}
          />

          {/* Scanner Center */}
          <div
            className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full border sm:h-28 sm:w-28"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 20%, transparent)",
              backgroundColor:
                "color-mix(in srgb, var(--color-accent) 7%, transparent)",
              boxShadow:
                "0 0 60px color-mix(in srgb, var(--color-accent) 16%, transparent)",
            }}
          >
            <span
              className="text-2xl font-semibold sm:text-3xl"
              style={{
                color: text,
              }}
            >
              {progress}%
            </span>

            <span
              className="mt-1 text-[9px] uppercase tracking-[0.16em] sm:text-[10px] sm:tracking-[0.18em]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              {isScanning
                ? "analyzing"
                : progress === 100
                  ? "complete"
                  : "ready"}
            </span>
          </div>

          {/* CPU */}
          <div
            className="absolute left-1 top-8 rounded-xl border px-2.5 py-1.5 backdrop-blur sm:left-5 sm:top-12 sm:px-3 sm:py-2"
            style={{
              borderColor: border,
              backgroundColor: surface,
            }}
          >
            <p
              className="text-[9px] sm:text-[10px]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              CPU
            </p>

            <p
              className="mt-1 text-[10px] font-medium sm:text-xs"
              style={{
                color: text,
              }}
            >
              8 cores
            </p>
          </div>

          {/* Memory */}
          <div
            className="absolute right-1 top-10 rounded-xl border px-2.5 py-1.5 backdrop-blur sm:right-5 sm:top-16 sm:px-3 sm:py-2"
            style={{
              borderColor: border,
              backgroundColor: surface,
            }}
          >
            <p
              className="text-[9px] sm:text-[10px]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              MEMORY
            </p>

            <p
              className="mt-1 text-[10px] font-medium sm:text-xs"
              style={{
                color: text,
              }}
            >
              16 GB
            </p>
          </div>

          {/* Storage */}
          <div
            className="absolute bottom-6 left-5 rounded-xl border px-2.5 py-1.5 backdrop-blur sm:bottom-10 sm:left-12 sm:px-3 sm:py-2"
            style={{
              borderColor: border,
              backgroundColor: surface,
            }}
          >
            <p
              className="text-[9px] sm:text-[10px]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              STORAGE
            </p>

            <p
              className="mt-1 text-[10px] font-medium sm:text-xs"
              style={{
                color: text,
              }}
            >
              2.4 TB
            </p>
          </div>

          {/* GPU */}
          <div
            className="absolute bottom-4 right-5 rounded-xl border px-2.5 py-1.5 backdrop-blur sm:bottom-6 sm:right-10 sm:px-3 sm:py-2"
            style={{
              borderColor: border,
              backgroundColor: surface,
            }}
          >
            <p
              className="text-[9px] sm:text-[10px]"
              style={{
                color:
                  "color-mix(in srgb, var(--color-text) 35%, transparent)",
              }}
            >
              GPU
            </p>

            <p
              className="mt-1 text-[10px] font-medium sm:text-xs"
              style={{
                color: text,
              }}
            >
              4 units
            </p>
          </div>
        </div>

        {/* Progress */}
        <ScanProgress
          isScanning={isScanning}
          progress={progress}
          resourcesScanned={resourcesScanned}
        />
      </div>
    </div>
  )
}

export default Scanner

