# Tourline

A React/Vite prototype for tour operations and staffing. Use Node 24 and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. The Manager / Worker selector lets you try both sides of the same sample workspace.

## Included

- Create tours, artists, date ranges, and stops; switch between tour dashboards.
- Edit venue logistics, contacts, accommodation, catering, transport, equipment, VIP notes, sponsor information, and contract status.
- View a chronological tour calendar and add show-day times and completion tasks.
- Add crew profiles, responsibilities, and intended access labels.
- Post tour-wide or local jobs, including volunteer roles.
- Submit applications, approve or decline as manager, and confirm as worker.
- Reserve open shifts after manager profile preapproval, with qualification matching, duplicate checks, and capacity limits.
- Add tour announcements, document references, and emergency contact notes.
- Save workspace changes in browser localStorage under `tourline-v1`.

## Try the staffing workflow

1. Switch to Worker and edit the profile, including email, qualifications, and availability.
2. Apply for a role. Use the same email as the worker profile.
3. Switch to Manager, open Jobs & staffing, and approve the application.
4. Switch to Worker and confirm the assignment.
5. For the sample volunteer shift, include “Guest services” in qualifications. A manager must preapprove the profile before the worker can reserve that shift. Editing a profile clears preapproval.

## Validation

```sh
npm run build
npm run lint
node --test --test-isolation=none --test-reporter=spec tests/staffing.test.mjs
```

Three tests cover approval / confirmation transitions, capacity reservation, preapproval, qualification matching, and duplicate reservations. Browser validation also exercised application → approval → confirmation, open-shift reservation, persistence after reload, and mobile overflow.

## Prototype boundaries

This is a local demonstration, not a production staffing platform. The role selector and access labels do not enforce security. Data is held in one browser, is editable through browser tools, and is not synchronized across users or devices. Use fictional information during evaluation.

Next production work: user authentication, server-side permissions, shared database with transactional staffing capacity, structured qualification and availability checks, worker identity, file storage, notifications, and deployment. Availability is currently a free-text statement; open shifts match qualification phrases rather than verified certifications. Documents are references / notes, not uploaded files. Crew directory is shared across the local workspace rather than assigned per tour. VIP guests and sponsors are currently stop notes rather than individual records.
