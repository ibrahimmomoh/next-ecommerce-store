# Examination Questions — UPSS Transport Fee Manager

Fork this repository and use **Gemini CLI** to complete the following tasks. Push your work to your forked repo when done.

---

## Question 1 — Add a "Dark Mode" Toggle (20 marks)

The app currently only supports a light theme. Add a dark mode toggle button to the header that:
- Switches all colors (background, cards, text, tables) to a dark palette
- Saves the user's preference to `localStorage` so it persists across page reloads
- Uses a sun/moon icon to indicate the current mode

---

## Question 2 — Add a "Print Receipt" Feature for Individual Students (30 marks)

When viewing students on a route tab, add a "Receipt" button next to each student's row. Clicking it should:
- Open a print-friendly modal/page showing the student's name, school, route, service type, fee breakdown (Month 1-3), payments made, and outstanding balance
- Include the school name as a header and today's date
- Use `window.print()` to allow printing, with appropriate `@media print` styling so only the receipt is printed

---

## Question 3 — Add an "Outstanding Students" Filter Tab (30 marks)

Create a new tab called **"Outstanding"** that:
- Lists only students whose payment status is "Not Paid" or "Partial"
- Shows columns: Name, Route, School, Expected Amount, Paid Amount, Balance
- Includes a summary row at the bottom showing total outstanding balance across all filtered students
- Sorts students by balance (highest outstanding first)

---

## Question 4 — Redesign the UI (40 marks)

The current app is functional but uses a basic design. Completely redesign the user interface to make it more modern, visually appealing, and user-friendly. You are free to choose any design direction. Your redesign will be judged on:

- **Visual appeal** — colour scheme, typography, spacing, and overall aesthetics
- **Layout and hierarchy** — clear visual structure, logical grouping of information
- **Micro-interactions** — hover effects, transitions, animations, and feedback states
- **Consistency** — uniform styling across all tabs, modals, buttons, and tables
- **Creativity** — original design choices that go beyond default frameworks

You may use CSS only (no external libraries). All existing functionality must remain intact after the redesign.

---

## Submission

1. Complete all questions using **Gemini CLI**
2. Push your final work to your forked repository
3. Host your completed app on [here.now](https://here.now) and include the live URL in your repo as a file called `LIVE_URL.txt`
