# 🚀 Production Deployment Guide: Personal Portfolio

This easy-to-follow guide will help you set up your database in **Neon**, host your backend in **Render**, and connect everything to your **Vercel** frontend. By the end of this guide, your portfolio website will be 100% live and ready to show to the world! 🌍

---

## 🏗️ The Big Picture

Here is how your website components talk to each other in production:

```mermaid
graph TD
    A[Vercel Frontend] -->|API Requests| B[Render Backend]
    B -->|Database Queries| C[Neon PostgreSQL Database]
    B -->|Send Email| D[Google SMTP]
```

---

## 📂 Step 1: Set Up Your Database in Neon

**Neon** is a fully-managed serverless PostgreSQL database. It is fast, free, and incredibly easy to set up.

1. **Sign Up / Log In to Neon**:
   - Go to [neon.tech](https://neon.tech/) and sign up for a free account.
2. **Create a New Project**:
   - Click **Create a project**.
   - Name your project (e.g., `personal-portfolio`).
   - Select your preferred database version (PostgreSQL 16 or 15 is great).
   - Choose a region closest to you or your target audience (e.g., `US East (N. Virginia)` or `Europe (Frankfurt)`).
   - Click **Create Project**.
3. **Copy the Connection String**:
   - Neon will show you a connection string that looks like this:
     ```text
     postgres://alex:abcd1234@ep-cool-snowflake-123456.us-east-2.aws.neon.tech/neondb?sslmode=require
     ```
   - Keep this connection string safe! We will refer to this as your **`DATABASE_URL`**.

### 📝 Apply the Database Schema (Tables)
Neon provides an **SQL Editor** right in your browser dashboard.
1. In the Neon sidebar, click on **SQL Editor**.
2. Open the file `server/schema.sql` from your project and copy its entire contents.
3. Paste the contents into Neon's SQL Editor:
   ```sql
   -- Create Projects, Skills, Timeline, Messages, and Admins tables
   CREATE TABLE IF NOT EXISTS projects (...);
   CREATE TABLE IF NOT EXISTS skills (...);
   ...
   ```
4. Click **Run** in Neon. You will see a success message! Your database tables are now created.

---

## ⚡ Step 2: Seed Your Database with Initial Data

Because the Admin password needs to be securely hashed (encrypted) using `bcrypt` before being stored, the easiest way to seed your database is by running the seed script from your local machine.

1. Open your local project directory.
2. Open the `server/.env` file.
3. Temporarily update the `DATABASE_URL` to your new Neon connection string:
   ```env
   DATABASE_URL=your_neon_connection_string_here
   ```
4. Make sure your `ADMIN_USERNAME` and `ADMIN_PASSWORD` are set to whatever you want for your admin dashboard:
   ```env
   ADMIN_USERNAME=your_preferred_username
   ADMIN_PASSWORD=your_secure_password
   ```
5. Open your terminal in the **root** folder and run the seeding command:
   ```bash
   npm run db:seed
   ```
   *You should see output like: `✅ Admin user seeded`, `✅ Skills seeded`, `✅ Projects seeded`, etc., followed by `🎉 Seeding completed successfully!`*
6. **Important**: Restore your local `DATABASE_URL` back to your local database if you want to continue local development later, or keep the Neon one if you prefer to use the live cloud database during development.

---

## 🚀 Step 3: Deploy Your Backend to Render

**Render** is an excellent cloud platform that will host your Express.js API.

1. **Sign Up / Log In to Render**:
   - Go to [render.com](https://render.com/) and log in (signing up using GitHub is recommended!).
2. **Create a New Web Service**:
   - Click **New +** and select **Web Service**.
   - Connect your GitHub repository containing the portfolio project.
3. **Configure Your Web Service**:
   - **Name**: `portfolio-backend` (or similar)
   - **Region**: Select the same region you chose for Neon (for fastest database queries!)
   - **Branch**: `main` (or whichever branch you push to)
   - **Root Directory**: `server` 👈 *Extremely Important! This tells Render that your backend code is inside the `/server` folder.*
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Select the **Free** tier.
4. **Configure Environment Variables**:
   - Click the **Environment** tab on Render and add the following keys:

| Key | Value | Description |
| :--- | :--- | :--- |
| `NODE_ENV` | `production` | Enables production mode and optimization. |
| `DATABASE_URL` | `postgres://...` | Paste your complete Neon connection string. |
| `JWT_SECRET` | `generate-a-long-random-string-here` | A secret key used to secure admin login tokens. |
| `CORS_ORIGIN` | `https://your-portfolio.vercel.app` | **Your Vercel URL** (e.g. `https://sarbajit-portfolio.vercel.app`). This secures your API. |
| `EMAIL_USER` | `your-gmail@gmail.com` | *(Optional)* Your Gmail address for nodemailer notifications. |
| `EMAIL_PASS` | `xxxx xxxx xxxx xxxx` | *(Optional)* 16-character Google App Password. |
| `RECEIVER_EMAIL` | `your-gmail@gmail.com` | *(Optional)* Email where contact forms will be sent. |

5. Click **Deploy Web Service**!
   - Render will build your application and start the server.
   - Once successfully built, Render will provide your public backend URL at the top of the page (e.g., `https://portfolio-backend-1234.onrender.com`).
   - Copy this URL! Let's call it **`BACKEND_URL`**.

---

## 💻 Step 4: Link Your Frontend on Vercel

Now that your backend is running live, you just need to tell your Vercel frontend where to find it.

1. **Log In to Vercel**:
   - Go to [vercel.com](https://vercel.com/) and open your portfolio project dashboard.
2. **Add Environment Variable**:
   - Go to **Settings** > **Environment Variables**.
   - Add a new variable:
     - **Key**: `VITE_API_URL`
     - **Value**: `https://portfolio-backend-1234.onrender.com/api` 👈 *Make sure to append `/api` at the end of your backend URL!*
     - **Target**: Select `Production`, `Preview`, and `Development`.
3. **Re-deploy Your Frontend**:
   - Go to the **Deployments** tab on Vercel.
   - Click on your latest deployment, click the **three dots (...)**, and select **Redeploy** (without cache).
   - This ensures the new environment variable is injected into the build!

### 🔄 Support for Client-Side Routing (Crucial for `/admin` page)
Since this is a Single Page Application (SPA), if you directly visit `/admin` or refresh the page on `/admin`, Vercel will look for a physical `/admin` or `/admin.html` file, which does not exist in the build output, leading to a **`404: NOT_FOUND`** error.

To solve this, we have created a `vercel.json` configuration file in the project's root folder:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```
This instructs Vercel to route all incoming traffic to `index.html`, allowing the client-side router inside React to seamlessly handle the routing logic. Ensure this file is committed and pushed to your GitHub repository so Vercel can apply the config.


---

## ✅ Step 5: Verify & Celebrate!

Your portfolio is now fully live in production! Let's do a quick verification checklist:

1. **Test the Public Website**:
   - Open your Vercel domain (e.g., `https://your-portfolio.vercel.app`).
   - Confirm that your projects, skills, and timeline load perfectly (fetched directly from Neon database via Render backend!).
2. **Test the Contact Form**:
   - Submit a message through the contact form.
   - Log in to your Neon database console, run `SELECT * FROM messages;` in the SQL Editor, and verify that your message is safely stored!
   - If SMTP is configured, check your inbox for the notification email.
3. **Test the Admin Dashboard**:
   - Go to your portfolio's Admin Login path (e.g., `/admin` or `/login`).
   - Log in with the `ADMIN_USERNAME` and `ADMIN_PASSWORD` you configured during seeding.
   - Confirm you can add, edit, or delete items.

---

### 💡 Pro-Tips for Render's Free Tier
* **Spin-up Delay**: Render's free instances spin down after 15 minutes of inactivity. When someone visits your portfolio for the first time in a while, it might take 30–50 seconds for the backend to "wake up" and fetch the data. This is completely normal for free hosting!
* **Warm-up solution**: You can use a free cron service (like UptimeRobot) to ping your backend's health endpoint (`https://your-backend.onrender.com/health`) every 14 minutes to keep it warm and instantly responsive!

---

🎉 **Congratulations! Your beautiful personal portfolio website is now securely settled in production with Neon, Render, and Vercel!**
