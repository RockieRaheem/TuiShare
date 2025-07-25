# TuiShare Platform Documentation

## Overview
TuiShare is a modern, role-based education funding and management platform. It enables students, supporters, and schools to interact seamlessly, manage tuition payments, and track educational progress. The system is built with Next.js (App Router), React, TypeScript, Tailwind CSS, and MongoDB, with optional integration to the Bitnob API for testnet Bitcoin payments.

---

## Table of Contents
1. [Features](#features)
2. [Architecture](#architecture)
3. [User Roles & Dashboards](#user-roles--dashboards)
4. [Authentication & Authorization](#authentication--authorization)
5. [API Routes](#api-routes)
6. [Environment Variables](#environment-variables)
7. [Frontend Structure](#frontend-structure)
8. [Bitnob Integration](#bitnob-integration)
9. [Development & Deployment](#development--deployment)
10. [Demo & Pitch Tips](#demo--pitch-tips)

---

## Features
- Role-based dashboards: Student, Supporter, School
- Secure authentication and protected routes
- Tuition payment tracking (NGN & crypto equivalent)
- Virtual card and transaction history (student)
- School admin: student management, revenue, reports
- Supporter: live Bitnob testnet wallet, send BTC (when API is available)
- Modern, responsive UI with Tailwind CSS
- Demo-ready with mock data for pitching

---

## Architecture
- **Frontend:** Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4
- **Backend:** Next.js API routes, MongoDB (Mongoose)
- **Crypto Integration:** Bitnob API (testnet/sandbox)
- **State Management:** React Context for authentication
- **Directory Structure:**
  - `/app/` - Next.js app directory (pages, routes, layouts)
  - `/components/` - Reusable UI components
  - `/lib/` - Utility libraries (auth, Bitnob, DB)
  - `/database/` - SQL schema (for reference)

---

## User Roles & Dashboards
### Student
- View profile, tuition progress, payment history
- Request funds, download receipts
- Virtual card and recent transactions
- Achievements and goals

### Supporter
- View Bitnob testnet wallet balance
- Send BTC to testnet addresses
- View transaction history

### School
- View school info, admin, and student list
- Track payments, outstanding balances
- Admin actions: verify payments, approve/reject registration, download reports
- Revenue and paid/unpaid stats

---

## Authentication & Authorization
- Custom authentication using MongoDB for all roles
- Role-based redirects after login
- ProtectedRoute component ensures only authorized users access dashboards
- User session stored in localStorage

---

## API Routes
- `/api/student/login` - Student login
- `/api/supporter/login` - Supporter login
- `/api/school/login` - School login
- `/api/supporter/wallet` - Get Bitnob wallet & transactions (testnet)
- `/api/supporter/send` - Send BTC via Bitnob (testnet)

All login APIs return a user object with a `type` property for role-based routing.

---

## Environment Variables
Set these in `.env.local`:
```
BITNOB_SECRET_KEY=sk.3a846ff0dfb8.7e7ddae08f05636a83433470b
BITNOB_BASE_URL=https://sandboxapi.bitnob.com/api/v1
MONGODB_URI=your_mongodb_connection_string
```

---

## Frontend Structure
- `/app/student/dashboard/page.tsx` - Student dashboard (mock/demo data)
- `/app/supporter/dashboard/page.tsx` - Supporter dashboard (Bitnob integration)
- `/app/school/dashboard/page.tsx` - School dashboard (mock/demo data)
- `/components/ProtectedRoute.tsx` - Route protection and role-based redirects
- `/lib/auth.tsx` - Auth context and helpers
- `/lib/bitnob.ts` - Bitnob API utility

---

## Bitnob Integration
- Uses Bitnob sandbox API for testnet BTC operations
- Requires a funded Bitnob testnet wallet
- All API calls use the `BITNOB_SECRET_KEY` in the Authorization header
- If Bitnob sandbox is down, the dashboard will show error messages but the UI remains functional for demo

---

## Development & Deployment
- Install dependencies: `npm install`
- Start dev server: `npm run dev`
- Update `.env.local` with your keys
- All dashboards work with mock/demo data for pitching
- For production, secure all secrets and use production MongoDB

---

## Demo & Pitch Tips
- All dashboards are demo-ready with professional UI and mock data
- No backend or Bitnob API is required for a smooth pitch
- You can show login, navigation, and dashboard features for all roles
- If Bitnob is down, explain that live crypto integration is ready and just needs the API to be online

---

## References
- [Bitnob API Docs](https://docs.bitnob.com)
- [Bitnob API Workshops](https://github.com/bitnob/api-workshops)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

For any questions or further customization, contact the TuiShare dev team.
This documentation guides developers to create an AI-powered chatbot for the TuiShare platform. The chatbot will help users navigate the system, answer questions, and explain features and workflows for schools, students, and supporters.

2. Chatbot Features

- **Navigation Guidance:** Explains how to register, login, and access dashboards.
- **Contextual Help:** Answers questions about forms, errors, and user flows.
- **System Explanation:** Describes the purpose and structure of TuiShare.
- **User-Specific Assistance:** Guides users based on their role (school, student, supporter).
- **Error Handling:** Provides troubleshooting steps for common issues (e.g., database connection, authentication).

---

## 3. Example Chatbot Conversation Flows



### Registration & Login

**User:** How do I register as a school?
**Bot:** Go to School Registration and fill in your school details, contact person, email, and password. Submit the form to create your account.

**User:** How do I register as a student?
**Bot:** Go to Student Registration and fill in your full name, email, school ID, school name, and password. Submit the form to create your account.

**User:** How do I register as a supporter?
**Bot:** Go to Supporter Registration and fill in your name, email, country, and password. Submit the form to create your account.

**User:** How do I login?
**Bot:** Go to the login page for your user type (School, Student, Supporter), enter your email and password, and submit.

**User:** I forgot my password, what should I do?
**Bot:** Currently, password reset is not implemented. Contact support for help.

### Dashboard & Profile

**User:** What can I do on my dashboard?
**Bot:** Your dashboard shows your profile and relevant data:

Schools: Manage tuition payments, confirm receipts, view student records.
Students: View tuition payments, manage profile, access resources.
Supporters: Track contributions, view supported students, manage profile.

**User:** How do I update my profile details?
**Bot:** Go to your dashboard and click "Edit Profile." Update your details and save.

**User:** How do I view my contributions?
**Bot:** Supporters can view recent contributions in the "Recent Contributions" section of their dashboard.

**User:** How do I sign out?
**Bot:** Click the "Sign Out" button on your dashboard.

### Troubleshooting

**User:** What should I do if I get a network error when registering?
**Bot:** Check your internet connection and try again. If the problem persists, contact support.

**User:** What should I do if I have a database connection error?
**Bot:** Ensure your IP is whitelisted in MongoDB Atlas. See MongoDB Atlas IP Whitelist.

**User:** How do I ensure my IP is whitelisted in MongoDB Atlas?
**Bot:** Go to your Atlas dashboard, "Network Access," and add your current IP address.

### About TuiShare

**User:** What is TuiShare?
**Bot:** TuiShare is a platform for secure, accountable tuition payments connecting schools, students, and supporters.

**User:** What is the purpose of TuiShare?
**Bot:** To empower African students by simplifying tuition payments and tracking contributions.

**User:** How does TuiShare work for schools?
**Bot:** Schools register, receive payments, confirm tuition, and manage student records.

**User:** How does TuiShare work for students?
**Bot:** Students register, receive tuition support, view payments, and access resources.

**User:** How does TuiShare work for supporters?
**Bot:** Supporters register, contribute to students’ tuition, and track their impact.

### Help & Support

**User:** How do I get help with registration or login?
**Bot:** Contact support via the provided contact page or email.

**User:** How do I contact support?
**Bot:** Use the contact form on the website or email the support address listed.

### Best Practices

**User:** What are the best practices for using TuiShare?
**Bot:**
  - Use strong, unique passwords.
  - Keep your profile information up to date.
  - Ensure your IP is whitelisted for database access.
  - Contact support for any issues.


### Security

**User:** How do I keep my account secure?
**Bot:** Use a strong, unique password and never share your login details. Always log out after using the platform, especially on shared devices.

**User:** How do I change my password?
**Bot:** Currently, password change is not available. Please contact support for assistance.

### Payments

**User:** How do I make a tuition payment (for supporters)?
**Bot:** After logging in as a supporter, go to the student’s profile and follow the instructions to make a payment.

**User:** How do I confirm a payment (for schools)?
**Bot:** Schools can confirm tuition payments from their dashboard by reviewing and approving received payments.

**User:** How do I view my payment history?
**Bot:** Go to your dashboard and select the payment history or transactions section.

### Account Management

**User:** How do I delete my account?
**Bot:** Please contact support to request account deletion.

**User:** Can I have multiple accounts?
**Bot:** Each user should have only one account per role (school, student, supporter) for security and accountability.

### Platform Features

**User:** What resources are available for students?
**Bot:** Students can access educational resources and view their virtual card from their dashboard.

**User:** How do I invite others to join TuiShare?
**Bot:** Share the registration link with friends, schools, or supporters who want to join the platform.


**User:** What information is shown on my dashboard?
**Bot:** Your dashboard displays your profile and relevant data (payments, contributions, student records).

**User:** How do I manage my student records (for schools)?
**Bot:** Schools can view and update student records from their dashboard.

**User:** How do I view my virtual card (for students)?
**Bot:** Students can view their virtual card and payment history on their dashboard.

**User:** How do I track my impact (for supporters)?
**Bot:** Supporters can view their contributions and supported students on their dashboard.

### Login

**User:** I forgot my password.  
**Bot:** Currently, password reset is not available. Please contact support or register a new account.

### Dashboard Navigation

**User:** What can I do on my dashboard?  
**Bot:** Your dashboard displays your profile information and recent activity. You can view your contributions, update your details, and sign out.

### Troubleshooting

**User:** I get a network error when registering.  
**Bot:** Please check your internet connection. If the problem persists, ensure your IP is whitelisted in MongoDB Atlas and your `.env.local` file has the correct database URI.

---

## 4. System Explanation for Users

- **Schools:** Register to manage student records and receive tuition payments.
- **Students:** Register to receive support, view your virtual card, and manage your profile.
- **Supporters:** Register to support students, track your impact, and view your contributions.

---

## 5. Developer Guidance for Building the Chatbot

- **Use Natural Language Understanding:** Integrate an NLP engine (e.g., Azure OpenAI, Dialogflow) to interpret user queries.
- **Context Awareness:** Store user session data to provide personalized responses.
- **API Integration:** Connect the chatbot to backend endpoints to fetch real-time user data.
- **Error Handling:** Detect and explain errors, guiding users to resolve issues.
- **Role-Based Responses:** Tailor answers based on whether the user is a school, student, or supporter.

---

## 6. Example Bot Response Templates

- **Welcome:** "Welcome to TuiShare! How can I help you today?"
- **Navigation:** "To access your dashboard, please login and click the dashboard link for your role."
- **Explanation:** "TuiShare connects students, supporters, and schools for secure tuition payments using modern web technology."
- **Help:** "If you need help with registration or login, just ask!"

---

## 7. Best Practices

- **Keep responses clear and concise.**
- **Always check user context before answering.**
- **Provide links to relevant pages when possible.**
- **Log user questions for continuous improvement.**
