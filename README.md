# CloudScan

CloudScan is an interactive cloud resource optimization scanner designed to help identify infrastructure resources that may be overallocated, underused, or costing more than necessary.

The experience follows:

**Scan → Analyze → Rank → Investigate → Optimize → Savings**

Users start an infrastructure scan, review discovered resources ranked by optimization opportunity, inspect individual resources, and see estimated potential monthly savings.

> **Note:** CloudScan is a frontend prototype created for demonstration purposes. The scan and infrastructure data are simulated through a public API and do not connect to real AWS, Azure, or Google Cloud accounts.

## The Idea Behind CloudScan

The idea started from something much more familiar than cloud infrastructure: **phone storage cleaners**.

When a phone is running out of storage, a storage-cleaning feature usually scans the device, finds what is taking up space, highlights the biggest items or categories, and helps the user decide where to act first.

I wanted to take that same basic experience and apply it to cloud infrastructure.

Instead of asking:

> **"What is taking up space on my phone?"**

CloudScan asks:

> **"Where is my cloud infrastructure being underused or unnecessarily allocated?"**

That led to the product flow:

| Phone cleaner concept | CloudScan equivalent                      |
| --------------------- | ----------------------------------------- |
| Scan the phone        | Scan cloud infrastructure                 |
| Find storage usage    | Find resource allocation and usage        |
| Identify large items  | Identify large optimization opportunities |
| Investigate an item   | Investigate a cloud resource              |
| Free storage          | Optimize infrastructure                   |
| Show space recovered  | Show potential cost savings               |

The goal was not to copy a phone cleaner visually. It was to take a familiar interaction pattern and translate it into a different problem.

This is why CloudScan starts with a **scan** instead of immediately showing a traditional dashboard. The user begins with discovery, receives results, sees what deserves attention first, and then investigates individual resources.

---

## Product Flow

### 1. Scan

The user starts an infrastructure scan from the main interface.

The scanner provides visual feedback while the scan is running, including animated progress and the number of resources scanned.

The scan can also be stopped and resumed.

In this prototype, the scan progress is simulated.

### 2. Analyze

Once the scan completes, CloudScan displays the discovered resources.

Each resource includes:

* Resource type
* Cloud provider
* Allocated capacity
* Current usage
* Optimization opportunity
* Potential monthly savings

### 3. Rank

Resources are ranked from the highest optimization opportunity to the lowest.

This was an intentional product decision: if a cloud environment contains many resources, the user should not have to inspect everything equally. The highest opportunities should appear first.

### 4. Investigate

Selecting a resource opens its analysis directly beneath that resource.

The user can move between resources without leaving the results list.

This keeps the investigation process within the same context instead of sending the user to a separate page for every resource.

### 5. Optimize

The analysis compares allocated capacity with current usage and identifies potential right-sizing opportunities.

For example, a resource with significantly more capacity allocated than it currently uses may represent an opportunity to reduce unnecessary infrastructure cost.

### 6. Savings

Potential monthly savings are displayed to communicate the possible financial impact of optimization.

---

## Features

* Interactive infrastructure scanning experience
* Start, stop, and resume scan controls
* Animated scan progress
* Resource discovery results
* Resources ranked by optimization opportunity
* Inline resource analysis
* Estimated monthly savings
* Loading, error, and success states
* Animated numerical statistics
* Responsive layouts for mobile, tablet, and desktop
* Reduced-motion support
* Keyboard-accessible interactive elements
* Container queries for adaptive resource cards
* CSS custom properties for shared design tokens
* Cached API data using TanStack Query

---

## Technology Stack

* React
* JavaScript
* Vite
* Tailwind CSS
* Framer Motion
* TanStack Query
* Fetch API
* Git
* GitHub
* Vercel

---

## Animation

Framer Motion is used for meaningful interface motion and interaction feedback.

The application includes:

* Scan progress animation
* Scanner rotation while scanning
* Resource card entrance animations
* Staggered resource list animations
* Hover and press interactions
* Inline analysis expansion and collapse
* Animated numerical statistics
* Reduced-motion support

The `useReducedMotion` hook from Framer Motion is used to reduce or disable non-essential animation when the user's operating system requests reduced motion.

The intention was to make motion communicate state and interaction rather than add animation everywhere.

---

## Design System and Tokens

The interface uses CSS custom properties as shared design tokens rather than defining the main design values independently throughout the UI.

The main tokens include:

* Background colors
* Surface colors
* Border colors
* Text colors
* Accent color
* Success, warning, and danger states
* Border radii
* Responsive spacing
* Responsive typography

Responsive values use CSS `clamp()` where appropriate so elements can scale smoothly between viewport sizes.

For example:

```css
--text-display: clamp(2.5rem, 6vw, 4.75rem);
```

The interface also uses `color-mix()` to create translucent interface states from the shared color tokens.

---

## Responsive Design

CloudScan was designed around the challenge's required viewport sizes:

* **375px** — mobile
* **768px** — tablet
* **1280px+** — desktop

The interface uses:

* Responsive Tailwind utilities
* CSS `clamp()`
* Container queries
* Flexible grid layouts
* Responsive typography
* Adaptive spacing
* Mobile-friendly controls

Resource cards use container queries so their internal layout can respond to the width available to the component rather than relying only on the overall viewport width.

---

## Data Fetching and Caching

Resource data is retrieved from a public API endpoint using the native Fetch API.

TanStack Query manages the server state and caching.

The query configuration includes:

* Loading state
* Error handling
* Retry behavior
* Cached results
* Five-minute stale time
* Ten-minute garbage-collection time
* Disabled refetch on window focus

After the data is retrieved, resources are sorted client-side by optimization score.

---

## API

CloudScan currently uses a public DummyJSON custom endpoint for demonstration data.

The dataset represents example cloud resources such as:

* CPU
* Memory
* Storage
* GPU
* Network

Each resource contains example allocation, usage, cost, optimization score, and potential savings values.

The API layer is separated from the UI through:

```text
src/
├── services/
│   └── api.js
└── hooks/
    └── useResourceData.js
```

This keeps data fetching separate from the presentation components and makes it easier to replace the demo data source with a production infrastructure API later.

---

## Component Structure

The application is divided into reusable components rather than putting the entire interface into one large component.

```text
src/
├── components/
│   ├── AnimatedNumber.jsx
│   ├── OptimizationSection.jsx
│   ├── ResourceCard.jsx
│   ├── ResourceDetails.jsx
│   ├── ResourceList.jsx
│   ├── SavingsCard.jsx
│   ├── ScanProgress.jsx
│   └── Scanner.jsx
│
├── hooks/
│   └── useResourceData.js
│
├── services/
│   └── api.js
│
├── tokens/
│   └── tokens.js
│
├── App.jsx
├── index.css
└── main.jsx
```

---

## Accessibility

Accessibility was considered throughout the interface.

The application includes:

* Semantic buttons and links
* Keyboard-focusable interactive elements
* Visible focus states
* Accessible button labels
* ARIA progress information
* `aria-live` for resource analysis content
* Reduced-motion support
* Responsive text sizing
* Contrast-conscious interface elements

---

## Key Design Decisions

### Why start with a scanner?

The scanner is the connection between the original phone-cleaner inspiration and the cloud optimization problem.

A traditional cloud dashboard could show charts and resource tables immediately, but I wanted the user to experience the process of **discovering the problem first**.

The scan creates that entry point:

**Start scan → discover resources → identify opportunities → investigate → optimize.**

### Why rank resources?

The purpose of the scan is not just to display data. It should help the user decide what deserves attention first.

Ranking resources by optimization opportunity makes the highest-value opportunities immediately visible.

### Why inline resource details?

I chose inline analysis so that selecting a resource does not take the user away from the list.

The user can investigate one resource, close it, and move to another while keeping the overall ranking visible.

### Why start, stop, and resume?

A scan represents an ongoing process, so I wanted the interaction to feel more realistic than a button that instantly changes from "Start" to "Complete."

The stop and resume controls also give the user control over the scanning process.

In the current prototype, the scan itself is simulated.

### Why simulated infrastructure data?

The challenge focuses on frontend implementation, interaction design, responsiveness, animation, and data handling.

Using a simulated dataset allowed me to demonstrate the complete product experience without requiring access to real cloud accounts or credentials.

The data layer is separated from the UI so that a real infrastructure API could be introduced later.

---

## Tradeoffs

### Simulated scan

The scan progress is currently simulated on the frontend.

A production implementation would replace this with real infrastructure discovery and asynchronous job status updates.

### Public demo API

The current API provides demonstration resource data rather than real cloud metrics.

A production version could integrate with cloud provider APIs or a dedicated infrastructure monitoring backend.

### Static savings estimates

Potential savings are example values from the demo dataset.

A production system would calculate recommendations using real usage history, cloud pricing information, resource configuration, and optimization rules.

### No real optimization action

CloudScan currently identifies opportunities but does not automatically modify infrastructure.

This is intentional for the prototype. A production implementation would require authentication, permissions, safety checks, approval workflows, and provider-specific APIs before applying changes.

---

## What I Would Improve Next

If I continued developing CloudScan beyond the challenge, I would focus on:

* AWS, Azure, and Google Cloud integrations
* Real infrastructure discovery
* Authentication
* Historical resource usage
* Cost trend visualization
* Automated right-sizing recommendations
* Infrastructure recommendation actions
* User dashboards
* Saved optimization reports
* Light mode
* More detailed resource health information
* Real cloud pricing calculations

The biggest change would be moving from simulated resource data to real infrastructure data and building the recommendation logic around actual usage history and cloud pricing.

---

## Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/onuegbuchinelom-wq/cloud-optimization-scanner.git
```

### 2. Navigate to the project

```bash
cd cloud-optimization-scanner
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

### 5. Create a production build

```bash
npm run build
```

### 6. Preview the production build

```bash
npm run preview
```

---

## Live Demo

[View CloudScan Live](https://cloud-optimization-scanner.vercel.app/)

## GitHub Repository

[View Source Code](https://github.com/onuegbuchinelom-wq/cloud-optimization-scanner)

---

## Project Status

CloudScan is a frontend prototype created as part of a technical challenge.

The current implementation focuses on:

* Product thinking
* Interaction design
* Motion design
* Responsive UI
* Component architecture
* Modern CSS
* API data fetching
* Client-side caching
* Accessibility
* Cloud optimization visualization

The project is publicly deployed and available for demonstration.
