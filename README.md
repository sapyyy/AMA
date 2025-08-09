# AMA (Ask-Me-Anything) 👀

AMA is a website which is a space to drop your thoughts, questions, or confessions without revealing who you are. No names. No pressure. Just honest questions.

# Link 🔗

Website Link: [AMA](https://ama-virid.vercel.app/)

# Preview 🖼️

![image1](/preview-images/ss1.png)
![image2](/preview-images/ss2.png)
![image3](/preview-images/ss3.png)
![image4](/preview-images/ss4.png)
![image5](/preview-images/ss5.png)

# Walkthrough 🧭

[![AMA walkthrough video](/preview-images/ss1.png)](https://youtu.be/jifupObl15M)

# Features ✨

### Security 🔐

- SignUp/Login using email
- JWT inside **LocalStorage** for faster login
- Hashed password for safety
- Completely anonymous

### Dashboard ⚙️

- One click to copy the link
- See all the **AMAs**
- Delete all the **AMAs**

### UI 💫

- Minimal and easy to navigate
- Responsive for all devices
- Subtle animations with interactions

# Folder Structure 📁

- AMA
  - backend
    - db
      - mongo.js
    - middlewares
      - admin.js
    - routes
      - admin.js
      - user.js
    * .env
    * .gitignore
    * package.json
    * package-lock.json
    * vercel.json
  - frontend
    - components
      - Loading.jsx
    - pages
      - images
        - copy.png
        - doodle.png
      * AdminAmas.jsx
      * CreateAmas.jsx
      * Landing.jsx
      * Login.jsx
      * SignUp.jsx
    - src
      - assests
        - react.svg
      * App.jsx
      * index.css
      * main.jsx
    * .evn
    * .gitignore
    * eslint.config.js
    * index.html
    * package.json
    * package-lock.json
    * README.md
    * vercel.json
    * vite.config.js
  * README.md

# Tech Stack 💻

**Frontend:**
React (Vite), React Router, Tailwind CSS

**Backend:**
Node.js + Express

**Database:**
MongoDB (Atlas) with Mongoose

**Deployment:**
Frontend & Backend: [Vercel](https://vercel.com/)

## Run Locally ⌨️

#### from /backend

```
npm install
nodemon app.js          # nodemon
```

#### from /frontend

```
cd frontend
npm install
npm run dev          # vite
```

# That's it ✅

`Like AMA? Give this repo a ⭐`
