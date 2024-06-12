# Welcome to BookVerse

A bookish web app for readers and authors

---

## Background

As an avid reader, the idea for this web app stems from the personal problem of trying to keep track of book series. Readers are often unsure if a series is a work in progress or already completed. This raises another issue of readers reaching out or hassling authors for info on their current work in progress and upcoming books. Another issue I have faced is the inability to search for books via dedications.

> > **User Story**

> > - As a/an reader/author, I want to register for an account to access app's features.
> > - As a/an reader/author, I want to log in to access personal dashboard.
> > - As a/an reader/author, I want to access my account info/settings where I can update my password.

> > - As an author, I want to be able to manage my booklist and add books to it.

> > - As a reader, I want to be able to search for books by title/author/dedication.
> > - As a reader, I want to be able to view author's status updates.
> > - As a reader, I want to be able to watch a series by addin it to my watchlist.

# Visit it here: https://bookverse-mc11.onrender.com/

[![Screenshot of Landing Page](/screenshots/landingPage.png)](https://bookverse-mc11.onrender.com/)

---

### Role-Based Authentication

App has 2 user roles: Author and Reader
[![Screenshot of Register Prompt](/screenshots/register.png)]
[![Screenshot of User Entity](/screenshots/userDbSchema.png)]

---

### CRUD

**Create**
[![Code Snippet for Create](/screenshots/createSnippet.png)](/book-verse/backend/controllers/booklistController.js)
**Read**
[![Code Snippet for Read](/screenshots/readSnippet.png)](/book-verse/backend/routes/authorDetailsRoutes.js)
**Update**
[![Code Snippet for Update](/screenshots/updateSnippet.png)](/book-verse/backend/controllers/authController.js)
**Delete**
[![Code Snippet for Delete](/screenshots/deleteSnippet.png)](/book-verse/backend/controllers/watchSeriesController.js)

---

### Tech Stack

#### Programming Language

- **Javascript** - For backend
- **Typescript** - For frontend

#### Frontend

- **Vite** - Fast development build tool
- **React** - JavaScript library for building user interfaces
- **Zustand** - State management library
- **TanStack Query** - Data fetching and caching library
- **Tailwind CSS** - Utility-first CSS framework for styling
- **DaisyUI** - Tailwind CSS component library
- **React Hot Toast** - Notification library for React
- **Mantine** - React components and hooks library for building complex applications

#### Backend

- **Node.js** - JavaScript runtime environment
- **Express** - Web application framework for Node.js

#### Database

- **PostgreSQL** - SQL database
- **node-postgres** - PostgreSQL client for Node.js

#### Authentication & Security

- **JSON Web Token (JWT)** - For creating and verifying tokens
- **bcrypt** - Password hashing library
- **passport.js** - Authentication middleware for Node.js

#### Deployment

- **Render** - Cloud platform for deploying web applications

#### Development & Testing Tools

- **Beekeeper Studio** - GUI tool for PostgreSQL
- **Bruno** - API testing tool (for backend validation)
- **VS Code** - Code editor
- **Trello** - Project management tool
- **Figma** - Wireframe tool (for UI/UX design)

---

## Key Takeaways & Challenges

The biggest challenge I faced was figuring out how to implement the new things I was learning. I was a little ambitious about trying something new. It was tough but overcoming the big and small hurdles gave me a sense of achievement.

It was also a huge jump from project 3, given this was a solo project.

---

## Icebox

- Allow authors to update/edit/archive status
- Allow authors to add bio
- Allow readers to follow authors
- Allow readers to add to Bookshelves and add notes
