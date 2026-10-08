/* ──────────────────────────────────────────────────────────
   Vidya AI privacy policy content.

   Single source of truth for /products/vidyakalp/privacy-policy —
   the hosted public copy of the policy inside the Vidya AI app
   (lib/screens/profile/privacy_policy_screen.dart in the app repo).
   Keep the two in sync; Google Play fetches this page.
   ────────────────────────────────────────────────────────── */

import type { PrivacyPolicyContent } from "@/lib/policy";

export const VIDYA_PRIVACY: PrivacyPolicyContent = {
  product: "Vidya AI",
  effectiveDate: "June 17, 2026",
  intro: "This policy is written for the Vidya AI Android app.",
  sections: [
    {
      title: "Introduction",
      body: [
        'Welcome to Vidya AI ("we," "our," or "us"). We are committed to protecting your privacy and ensuring you have a positive experience on our mobile application. Vidya AI is an educational platform for Indian school students that combines offline textbook reading with AI-assisted learning tools.',
        "This Privacy Policy explains what information we collect, how we use it, and the choices you have when you use the Vidya AI app. Please read it carefully. If you are under 18, please review this policy together with a parent or guardian.",
      ],
    },
    {
      title: "What You Can Use Without an Account",
      body: [
        "Core reading and study features work without signing in. When you use Vidya AI without an account:",
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
      title: "Permissions We Request",
      body: [
        "Vidya AI requests only the permissions needed for its features:",
        "• Internet: To download textbooks, sign in, and use AI features.",
        "• Camera & Photos: Used only when you choose to attach a photo to an AI question. We do not access your camera or gallery in the background, and we do not browse or upload your photo library.",
      ],
    },
    {
      title: "How We Use Your Information",
      body: [
        "We use the information described above only to:",
        "• Provide, secure, and operate your account.",
        "• Deliver AI answers tailored to your class and syllabus.",
        "• Save your conversations, profile, and usage so the app works across sessions.",
        "• Apply fair-use limits on AI requests.",
        "We do not sell your personal information, and we do not use it for advertising. The app contains no third-party ads.",
      ],
    },
    {
      title: "Third-Party Services",
      body: [
        "We rely on a small number of trusted service providers to operate Vidya AI:",
        "• Google / Firebase: for sign-in and authentication.",
        "• Our AI backend and AI model provider: to process and answer your questions.",
        "These providers process data only to deliver these services on our behalf and are subject to their own privacy and security commitments. We do not integrate advertising networks or data brokers.",
      ],
    },
    {
      title: "Cookies and Tracking Technologies",
      body: [
        "Vidya AI is a native mobile application and does not use cookies, web beacons, or third-party advertising or analytics trackers to follow you across apps or websites. The app is ad-free.",
      ],
    },
    {
      title: "Children's Privacy",
      body: [
        "Vidya AI is intended for school students, and some users may be under the age of 13. We collect only the limited information needed to provide the service, as described above. Because signing in and AI features involve collecting personal information (such as name and email), we ask that a parent or guardian set up and supervise the use of these features for younger children, and provide consent where required by law (including COPPA and applicable Indian data protection rules).",
        "If you believe a child has provided us personal information without appropriate consent, please contact us and we will delete it.",
      ],
    },
    {
      title: "Data Retention & Your Choices",
      body: [
        "We keep your account, profile, and conversation history for as long as your account is active. You can:",
        "• Edit your profile details at any time from the Profile screen.",
        "• Sign out to stop syncing data to your account.",
        "• Request deletion of your account and associated data at https://rosmox.com/products/vidyakalp/delete-account, or by contacting us at the email below. We delete your account and all associated data within 30 days of your request.",
      ],
    },
    {
      title: "Changes to This Policy",
      body: [
        "As Vidya AI evolves, we may update this Privacy Policy to reflect new features or legal requirements. When we make material changes, we will update the effective date above. You are advised to review this page periodically.",
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
