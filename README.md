# Tourline

A React/Vite prototype for tour operations and staffing. Use Node 24 and npm.

```sh
npm ci
npm run dev
```

Open the address printed by Vite. The login page offers separate manager and employee signup paths. Create local demo accounts with unique demo passwords. Accounts and data exist only in the current browser; there is no shared backend.

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

1. Sign up as an employee. You are taken directly to profile completion. Name, home location, qualifications / employment history, and availability are required before job and schedule pages unlock. Optional fields include phone, preferred roles, experience, and certifications. Incomplete profiles remain on this step after reload or login; completed profiles open Find jobs.
2. Browse Find jobs and apply for a position. All posted tours are searchable.
3. Log out through the upper-right profile menu, then sign up as a manager in the same browser.
4. Open Jobs & staffing and approve the employee application. Employee profiles can also be preapproved for open shifts.
5. Log out, log in as the employee, open Applications, and confirm the assignment.
6. Open My schedule to see the role, shift times, venue address, contacts, loading / parking notes, and show-day schedule. Tour-wide assignments show every stop.

Local demo accounts store salted PBKDF2 password hashes, not plain passwords. This does not provide server-side authentication or protect local data from browser access. A session lasts in the current tab until logout. Account email is fixed for now so applications remain associated with the same employee.

## Validation

```sh
npm run build
npm run lint
node --test --test-isolation=none --test-reporter=spec tests/auth.test.mjs tests/staffing.test.mjs
```

Four tests cover local account validation and approval / confirmation transitions, capacity reservation, preapproval, qualification matching, and duplicate reservations. Browser validation also exercised application → approval → confirmation, open-shift reservation, persistence after reload, and mobile overflow.

## Prototype boundaries

This is a local demonstration, not a production staffing platform. Local login and access labels do not enforce server-side security. Managers share the sample tour workspace. Data is held in one browser, is editable through browser tools, and is not synchronized across users or devices. Use fictional information during evaluation.

Next production work: user authentication, server-side permissions, shared database with transactional staffing capacity, structured qualification and availability checks, verified worker identity, password recovery, file storage, notifications, and deployment. Availability is currently a free-text statement; open shifts match qualification phrases rather than verified certifications. Documents are references / notes, not uploaded files. Crew directory is shared across the local workspace rather than assigned per tour. VIP guests and sponsors are currently stop notes rather than individual records.
