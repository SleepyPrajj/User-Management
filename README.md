**User Management System with Next.js and NextAuth.js**

**Powerful Features:**

* **Flexible Login:** Sign in effortlessly using Google or your email address and password.
* **Easy Registration:** Create a new account with your name, email, and a secure password.
* **Profile Management:** Keep your information up-to-date by editing your username and password.
* **Enhanced Security:** Change your password easily for added protection.
* **Secure Access Levels:** Different user roles (user, manager, admin) control what features you can see.
* **Tenant Management:** Users can be associated with specific organizations (tenants).
* **Comprehensive Admin Tools:** Admins have the power to create, edit, and delete user accounts, and assign them to tenants (currently exclusive to admins).

**Getting Started:**

1. **Environment Setup:** Create a `.env` file in your project's root directory and add the required variables as instructed:
Create a .env file in the root directory and add the following variables:

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="YOUR_NEXTAUTH_SECRET"
RESEND_API_KEY="MAILING_API_KEY"
GOOGLE_CLIENT_ID="YOUR_GOOGLE_CLIENT_ID"
GOOGLE_CLIENT_SECRET="YOUR_GOOGLE_CLIENT_SECRET"

MONGODB_URI="YOUR_MONGODB_URI"

2. **Development Server:** Run `npm run dev` to launch the development environment. Optionally, use `npm audit fix` to address potential vulnerabilities.
3. **Access the App:** Visit http://localhost:3000 in your browser to start using the User Management System.