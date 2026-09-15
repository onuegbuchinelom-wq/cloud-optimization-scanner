import { useEffect, useState } from "react"
import OptimizationSection from "./components/OptimizationSection"
import Scanner from "./components/Scanner"

function App() {
  const [isScanning, setIsScanning] = useState(false)
  const [progress, setProgress] = useState(0)

  const startScan = () => {
    if (isScanning || progress === 100) return

    setIsScanning(true)
  }

  const stopScan = () => {
    setIsScanning(false)
  }

  useEffect(() => {
    if (!isScanning) return

    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        const nextProgress = currentProgress + 5

        if (nextProgress >= 100) {
          clearInterval(interval)
          setIsScanning(false)
          return 100
        }

        return nextProgress
      })
    }, 300)

    return () => clearInterval(interval)
  }, [isScanning])

  const resourcesScanned = Math.round((progress / 100) * 25)

  return (
    <main className="min-h-screen overflow-hidden bg-[var(--color-background)] text-[var(--color-text)]">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute left-1/2 top-[-15%] h-[400px] w-[400px] -translate-x-1/2 rounded-full blur-[120px] sm:h-[500px] sm:w-[500px] lg:top-[-20%] lg:h-[600px] lg:w-[600px]"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-accent) 10%, transparent)",
          }}
        />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-4 py-5 sm:px-6 sm:py-7 lg:px-10">
        <div className="flex items-center gap-3">
          <div
            className="flex h-8 w-8 items-center justify-center rounded-xl border sm:h-9 sm:w-9"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-text) 10%, transparent)",
              backgroundColor:
                "color-mix(in srgb, var(--color-text) 5%, transparent)",
            }}
          >
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 70%, white)",
                boxShadow:
                  "0 0 18px color-mix(in srgb, var(--color-accent) 70%, transparent)",
              }}
            />
          </div>

          <span className="text-xs font-semibold tracking-[0.16em] sm:text-sm sm:tracking-[0.18em]">
            CLOUDSCAN
          </span>
        </div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-white/50 md:flex">
          <a
            href="#overview"
            className="transition hover:text-white"
          >
            Overview
          </a>
        </div>

        <div
          className="rounded-full border px-3 py-1.5 text-[10px] sm:px-4 sm:py-2 sm:text-xs"
          style={{
            borderColor:
              "color-mix(in srgb, var(--color-text) 10%, transparent)",
            backgroundColor:
              "color-mix(in srgb, var(--color-text) 4%, transparent)",
            color:
              "color-mix(in srgb, var(--color-text) 60%, transparent)",
          }}
        >
          SYSTEM ONLINE
        </div>
      </nav>

      {/* Hero */}
      <section
        id="overview"
        className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center gap-12 px-4 pb-16 pt-8 sm:gap-16 sm:px-6 sm:pb-20 sm:pt-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10"
      >
        <div className="min-w-0">
          <div
            className="mb-6 inline-flex max-w-full items-center gap-2 rounded-full border px-3 py-2 text-[10px] font-medium tracking-wide sm:mb-7 sm:px-4 sm:text-xs"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-accent) 20%, transparent)",
              backgroundColor:
                "color-mix(in srgb, var(--color-accent) 7%, transparent)",
              color:
                "color-mix(in srgb, var(--color-accent) 75%, white)",
            }}
          >
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full"
              style={{
                backgroundColor:
                  "color-mix(in srgb, var(--color-accent) 70%, white)",
              }}
            />

            <span>CLOUD RESOURCE INTELLIGENCE</span>
          </div>

          <h1 className="max-w-4xl text-4xl font-semibold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            Know where your
            <span className="block text-white/35">
              infrastructure
            </span>
            is being wasted.
          </h1>

          <p className="mt-6 max-w-xl text-sm leading-6 text-white/50 sm:mt-7 sm:text-lg sm:leading-7">
            Analyze your cloud resources, uncover inefficient usage, and
            identify the opportunities that could reduce unnecessary
            infrastructure cost.
          </p>

          {/* Scan controls */}
          <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            {isScanning ? (
              <button
                type="button"
                onClick={stopScan}
                className="w-full rounded-xl border px-5 py-3.5 text-sm font-semibold transition duration-300 hover:-translate-y-0.5 sm:w-auto sm:px-6"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--color-danger) 30%, transparent)",
                  backgroundColor:
                    "color-mix(in srgb, var(--color-danger) 8%, transparent)",
                  color:
                    "color-mix(in srgb, var(--color-danger) 80%, white)",
                }}
              >
                Stop scanning
              </button>
            ) : (
              <button
                type="button"
                onClick={startScan}
                disabled={progress === 100}
                className="group w-full rounded-xl px-5 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto sm:px-6"
                style={{
                  backgroundColor: "var(--color-text)",
                }}
              >
                {progress === 100
                  ? "Scan complete"
                  : progress > 0
                    ? "Resume scan"
                    : "Start infrastructure scan"}

                {progress < 100 && (
                  <span className="ml-3 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Product flow */}
          <div className="mt-10 grid max-w-xl grid-cols-3 border-y border-white/[0.08] py-5 sm:mt-12 sm:py-6">
            <div className="min-w-0 pr-3">
              <p className="text-xl font-semibold sm:text-2xl">
                Scan
              </p>

              <p className="mt-1 text-[10px] leading-4 text-white/35 sm:text-xs">
                Infrastructure discovery
              </p>
            </div>

            <div className="min-w-0 border-l border-white/[0.08] px-3 sm:pl-5">
              <p className="text-xl font-semibold sm:text-2xl">
                Analyze
              </p>

              <p className="mt-1 text-[10px] leading-4 text-white/35 sm:text-xs">
                Usage vs. allocation
              </p>
            </div>

            <div className="min-w-0 border-l border-white/[0.08] pl-3 sm:pl-5">
              <p className="text-xl font-semibold sm:text-2xl">
                Optimize
              </p>

              <p className="mt-1 text-[10px] leading-4 text-white/35 sm:text-xs">
                Savings opportunities
              </p>
            </div>
          </div>
        </div>

        {/* Scanner */}
        <Scanner
          isScanning={isScanning}
          progress={progress}
          resourcesScanned={resourcesScanned}
        />
      </section>

  
      {progress === 100 && <OptimizationSection />}
    </main>
  )
}

export default App