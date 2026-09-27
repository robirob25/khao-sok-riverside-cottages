# Khao Sok Riverside Cottages - Project State & Architecture

## Tech Stack
- **Framework:** Astro 5.x (Static Site Generation, 172 pages)
- **Styling:** Tailwind CSS 3.4+ (Custom typography with Monument Extended, luxury dark jungle aesthetics)
- **Deployment:** GitHub Pages / Coolify VPS static hosting
- **Asset Integrity:** Base path prefixing script (`scripts/prefix-html-links.mjs`), asset checker (`scripts/check-assets.mjs`)

## Design & UI/UX Standards (WCAG 2.1 AA & Luxury Adventure)
- **Typography:**
  - Hero & H1/H2 headings scaled responsively for mobile screens (`text-xl sm:text-2xl md:text-4xl lg:text-5xl`).
  - Elimination of technical/robotic fonts (`font-mono`) across all 172 pages in favor of refined luxury labels (`font-sans uppercase tracking-wider text-xs`).
- **Color Contrast (WCAG AA Compliant):**
  - Replaced medium greens (`#255038`, `#2e5339`, `#2e6b45`) on light backgrounds (`#faf8f5`, `#f4efeb`, `bg-white`) with high-contrast deep jungle green `#183424` (>7:1 contrast ratio).
- **Elevation & Layout:**
  - Standardized cards from disparate `shadow-2xl` / `shadow-xl` to subtle, modern flat borders (`border border-neutral-200` or `border-[#12281b]/10` with `shadow-sm`).
  - Preserved responsive Bento Grids for Packages and Activities.
- **Accessibility & Interactive Modals:**
  - Mobile Menu Overlay (`Header.astro`), Lightbox modals (`ActivitiesBentoGrid.astro`, `PackagesBentoGrid.astro`, `khao-sok-accommodation/index.astro`), and Booking Modals (`BookingChoiceModal.astro`, `BookingSplitExperience.astro`) equipped with:
    - `role="dialog"` & `aria-modal="true"`.
    - Dynamic `aria-expanded` toggle.
    - Full client-side Focus Trap (Tab & Shift-Tab cycling, Escape key to close, and focus restoration to the trigger element).
    - Minimum 44x44px touch targets.

## Verification
- Build status: 172/172 pages built in 3.46s with 0 errors.
- Missing assets: 0. Unprefixed assets: 0.
