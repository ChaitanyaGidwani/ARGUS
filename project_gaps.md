# Project Gaps: Opportunity Radar

Based on the track detailing in `ps.md`, here are the main gaps in the current implementation of the project:

- **Static Dataset**: The opportunity dataset is hard-coded in `src/app/components/data.ts`. There is no actual aggregation from live sources for internships, scholarships, or competitions.
- **Simulated Deadlines**: Deadlines are generated using a fixed timestamp. Nudges and countdowns are deterministic and simulated rather than live or dynamic.
- **Shallow Personalization**: While the onboarding flow captures domain preferences, the feed ranking logic relies mostly on basic domain filtering rather than deep profile matching or recommendation algorithms.
- **Simulated Notifications**: Reminder and notification preferences (Push, Email, SMS) in the UI are just toggles currently. They are not connected to any real delivery infrastructure or background job scheduling.
- **No Persistence**: There is no database, backend, authentication, or state sync. User profile state, saved opportunities, and view histories will disappear upon a page refresh.