/* ──────────────────────────────────────────────────────────
   Vidyakalp privacy policy content.

   Single source of truth for /products/vidyakalp/privacy-policy —
   the hosted public copy of the policy inside the Vidyakalp app
   (lib/screens/profile/privacy_policy_screen.dart in the app repo).
   Keep the two in sync; Google Play fetches this page.
   ────────────────────────────────────────────────────────── */

import type { PrivacyPolicyContent } from "@/lib/policy";

export const VIDYA_PRIVACY: PrivacyPolicyContent = {
  product: "Vidyakalp",
  effectiveDate: "October 17, 2026",
  intro: "This policy is written for the Vidyakalp Android app.",
  sections: [
    {
      title: "Introduction",
      body: [
        'Welcome to Vidyakalp ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our mobile application. Vidyakalp is an educational platform for Indian school students that combines offline textbook reading with AI-assisted learning tools.',
        "This Privacy Policy explains what information we collect, how we use it, and the choices you have when you use the Vidyakalp app. Please read it carefully. If you are under 18, please review this policy together with a parent or guardian.",
      ],
    },
    {
      title: "What You Can Use Without an Account",
      body: [
        "Core reading and study features work without signing in. When you use Vidyakalp without an account:",
        "• Local Storage Only: Your class selection, board, preferred language, chosen avatar, theme (light/sepia/dark), bookmarks, highlights, notes, timetable, and reading progress are stored entirely on your device.",
        "• Downloaded Books: The textbooks and study materials you download are saved directly to your device for offline viewing.",
        "• No Sign-In Required for Reading: You are not required to provide any identifying information to read books, take notes, or use the offline Learn modules.",
      ],
    },
    {
      title: "Accounts & Google Sign-In",
      body: [
        "To use AI-powered features (such as Learn Assist), you sign in with Google. We use Google Sign-In and Firebase Authentication to verify your identity. When you sign in, we receive and store on our servers:",
        "• Your name and email address from your Google account.",
        "• A unique account identifier (Firebase UID) used to associate your data with your account.",
        "We do not collect or store your Google profile photo. Profile pictures cannot be uploaded in the app — students are represented only by preset illustrated avatars or an initial, by design. We also do not request access to your contacts, Google Drive, or other Google data.",
      ],
    },
    {
      title: "Student Profile Information",
      body: [
        "When you are signed in, you can create a student profile so we can tailor content to your studies. This profile is stored on our servers and may include:",
        "• Your name (you can edit this; it does not have to be your real or full name).",
        "• Your class / grade and education board.",
        "• Your preferred language (a copy is also kept on your device so the app works offline and before you sign in).",
        "• Your school name (optional — you may leave this blank).",
        "You can view and edit this information at any time from the Profile screen. Providing a school name is entirely optional.",
      ],
    },
    {
      title: "AI Learning Features (Learn Assist)",
      body: [
        "When you ask a question using our AI features, the following is sent to our servers and our AI service provider to generate an answer:",
        "• The text of your question or note.",
        "• Any photo you choose to attach (for example, a photo of your notes, an assignment, or a textbook page).",
        "• Your class, board, subject, and language, so answers match your syllabus.",
        "Your conversations are saved to your account so you can return to them. Photos are processed to answer your question and should only show study material — please do not include faces or other personal information in the images you send. AI-generated answers can occasionally be inaccurate, so always check important information against your textbook.",
      ],
    },
    {
      title: "Daily Limits and Activity Records",
      body: [
        "To keep Vidyakalp reliable and fair for everyone, our servers keep a few simple records linked to your account:",
        "• AI limits: how many AI questions you have used today, so we can apply the daily limit and show you how many are left and when the count resets.",
        "• AI request details: for each AI request, when it happened, how long it took, whether it worked, how large it was, and which AI service answered. These records do not contain the text of your questions or answers.",
        "• Activity events (only when you are signed in and online): when you open the app, finish setup, open a book or Explore item, or complete an exercise, along with the feature, board, and class. They contain nothing you type.",
        "We use these records to apply limits, find and fix problems, plan capacity, manage costs, and see which features are useful. We do not use them for advertising.",
      ],
    },
    {
      title: "Requesting Plus",
      body: [
        "Plus gives higher limits, and eligible students can ask for it. When you tap Request Plus (in Profile, or when you reach a daily limit), we record that you asked, which screen you asked from, when, and the outcome. You do not type anything when you ask.",
        "Our team reviews each request by hand. If it is approved, your account shows Plus until its end date. If it is declined, you can ask again after 30 days. We may keep a short internal note with each decision.",
      ],
    },
    {
      title: "Permissions We Request",
      body: [
        "Vidyakalp requests only the permissions needed for its features:",
        "• Internet: To download textbooks, sign in, and use AI features.",
        "• Camera & Photos: Used only when you choose to attach a photo to an AI question. We do not access your camera or gallery in the background, and we do not browse or upload your photo library.",
        "The app does not request or use the Android advertising ID.",
      ],
    },
    {
      title: "How We Use Your Information",
      body: [
        "We use the information described above only to:",
        "• Provide, secure, and operate your account.",
        "• Deliver AI answers tailored to your class and syllabus.",
        "• Save your conversations, profile, and usage so the app works across sessions.",
        "• Apply fair-use limits on AI requests and show you how many questions are left.",
        "• Review requests for Plus.",
        "• Find and fix crashes, keep the service reliable, and manage its running costs.",
        "We do not sell your personal information, and we do not use it for advertising. The app contains no third-party ads.",
      ],
    },
    {
      title: "Third-Party Services",
      body: [
        "We rely on a small number of trusted service providers to operate Vidyakalp:",
        "• Google / Firebase: for sign-in and authentication, and Firebase Crashlytics for crash reports (see Cookies, Tracking and Crash Reports below).",
        "• AI model providers: Google (Gemini) and, for accounts with Plus, OpenRouter, which passes the request on to an AI model. They receive your question (with earlier messages from the same conversation where needed), any photo you attach, and your class, board, subject, and language, only to produce an answer.",
        "• Our own servers: which store your account, profile, conversations, and the records described above.",
        "These providers process data only to deliver these services on our behalf and are subject to their own privacy and security commitments. We do not integrate advertising networks or data brokers.",
      ],
    },
    {
      title: "Cookies, Tracking and Crash Reports",
      body: [
        "Vidyakalp is a native mobile application and does not use cookies, web beacons, or advertising trackers to follow you across apps or websites. The app is ad-free, and we do not use Google Analytics or any other third-party analytics service.",
        "To find and fix crashes, released versions of the app use Firebase Crashlytics, a Google service. When the app crashes, it sends a report with technical details: the error and where it happened in the app, your phone model, Android version, app version, and a random installation identifier created by Firebase. We do not attach your name, email address, account identifier, or anything you have typed, and crash reports are not linked to your account.",
      ],
    },
    {
      title: "Children's Privacy",
      body: [
        "Vidyakalp is intended for school students, and some users may be under the age of 13. We collect only the limited information needed to provide the service, as described above. Because signing in and AI features involve collecting personal information (such as name and email), we ask that a parent or guardian set up and supervise the use of these features for younger children, and provide consent where required by law (including COPPA and applicable Indian data protection rules).",
        "If you believe a child has provided us personal information without appropriate consent, please contact us and we will delete it.",
      ],
    },
    {
      title: "Data Retention & Your Choices",
      body: [
        "We keep your account, profile, conversation history, daily limit counts, activity records, and Plus requests for as long as your account is active. You can:",
        "• Edit your profile details at any time from the Profile screen.",
        "• Sign out to stop syncing data to your account.",
        "• Request deletion of your account and associated data at https://rosmox.com/products/vidyakalp/delete-account (also available from Settings → Delete account in the app), or by contacting us at the email below. We delete your account and all associated data within 30 days of your request.",
        "Crash reports are not linked to your account, so deleting your account does not remove them. Firebase keeps them for a limited period and then deletes them.",
      ],
    },
    {
      title: "Changes to This Policy",
      body: [
        "As Vidyakalp evolves, we may update this Privacy Policy to reflect new features or legal requirements. When we make material changes, we will update the effective date above. You are advised to review this page periodically.",
      ],
    },
    {
      title: "Contact Us",
      body: [
        "If you have any questions, requests, or suggestions about this Privacy Policy or your data, please contact the developer team at rosmoxx@gmail.com.",
      ],
    },
  ],
};
