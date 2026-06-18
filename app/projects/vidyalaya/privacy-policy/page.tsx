import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — Vidyālaya",
  description:
    "Privacy Policy for the Vidyālaya app by ROSMOX — an educational platform combining offline textbook reading with AI-assisted learning for Indian school students.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="privacy-page">
      <nav className="privacy-nav">
        <Link href="/projects/vidyalaya" className="back-link">
          <span className="back-arrow">←</span> Vidyālaya
        </Link>
      </nav>

      <article className="privacy-container">
        <header className="privacy-header">
          <span className="privacy-badge">Vidyālaya</span>
          <h1 className="privacy-title">Privacy Policy</h1>
          <p className="privacy-date">Effective Date: June 17, 2026</p>
        </header>

        <div className="privacy-content">
          <section>
            <h2>1. Introduction</h2>
            <p>
              Welcome to <strong>Vidyālaya</strong> (&ldquo;we,&rdquo;
              &ldquo;our,&rdquo; or &ldquo;us&rdquo;). We are committed to
              protecting your privacy and ensuring you have a positive experience
              on our mobile application. Vidyālaya is an educational platform for
              Indian school students that combines offline textbook reading with
              AI-assisted learning tools.
            </p>
            <p>
              This Privacy Policy explains what information we collect, how we use
              it, and the choices you have when you use the Vidyālaya app. Please
              read it carefully. If you are under 18, please review this policy
              together with a parent or guardian.
            </p>
          </section>

          <section>
            <h2>2. What You Can Use Without an Account</h2>
            <p>
              Core reading and study features work without signing in. When you
              use Vidyālaya without an account:
            </p>
            <ul>
              <li>
                <strong>Local Storage Only:</strong> Your class selection, board,
                theme (light/sepia/dark), bookmarks, highlights, notes, timetable,
                and reading progress are stored entirely on your device.
              </li>
              <li>
                <strong>Downloaded Books:</strong> The textbooks and study
                materials you download are saved directly to your device for
                offline viewing.
              </li>
              <li>
                <strong>No Sign-In Required for Reading:</strong> You are not
                required to provide any identifying information to read books,
                take notes, or use the offline Learn modules.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. Accounts &amp; Google Sign-In</h2>
            <p>
              To use AI-powered features (such as Learn Assist), you sign in with
              Google. We use Google Sign-In and Firebase Authentication to verify
              your identity. When you sign in, we receive and store on our
              servers:
            </p>
            <ul>
              <li>Your name and email address from your Google account.</li>
              <li>
                A unique account identifier (Firebase UID) used to associate your
                data with your account.
              </li>
            </ul>
            <p>
              We do not collect or store your Google profile photo. Profile
              pictures cannot be uploaded in the app — students are represented
              only by preset illustrated avatars or an initial, by design. We also
              do not request access to your contacts, Google Drive, or other
              Google data.
            </p>
          </section>

          <section>
            <h2>4. Student Profile Information</h2>
            <p>
              When you are signed in, you can create a student profile so we can
              tailor content to your studies. This profile is stored on our
              servers and may include:
            </p>
            <ul>
              <li>
                Your name (you can edit this; it does not have to be your real or
                full name).
              </li>
              <li>Your class / grade and education board.</li>
              <li>Your preferred language.</li>
              <li>Your school name (optional — you may leave this blank).</li>
            </ul>
            <p>
              You can view and edit this information at any time from the Profile
              screen. Providing a school name is entirely optional.
            </p>
          </section>

          <section>
            <h2>5. AI Learning Features (Learn Assist)</h2>
            <p>
              When you ask a question using our AI features, the following is sent
              to our servers and our AI service provider to generate an answer:
            </p>
            <ul>
              <li>The text of your question or note.</li>
              <li>
                Any photo you choose to attach (for example, a photo of your
                notes, an assignment, or a textbook page).
              </li>
              <li>
                Your class, board, subject, and language, so answers match your
                syllabus.
              </li>
            </ul>
            <p>
              Your conversations are saved to your account so you can return to
              them. Photos are processed to answer your question and should only
              show study material — please do not include faces or other personal
              information in the images you send. AI-generated answers can
              occasionally be inaccurate, so always check important information
              against your textbook.
            </p>
          </section>

          <section>
            <h2>6. Permissions We Request</h2>
            <p>
              Vidyālaya requests only the permissions needed for its features:
            </p>
            <ul>
              <li>
                <strong>Internet:</strong> To download textbooks, sign in, and use
                AI features.
              </li>
              <li>
                <strong>Camera &amp; Photos:</strong> Used only when you choose to
                attach a photo to an AI question. We do not access your camera or
                gallery in the background, and we do not browse or upload your
                photo library.
              </li>
            </ul>
          </section>

          <section>
            <h2>7. How We Use Your Information</h2>
            <p>We use the information described above only to:</p>
            <ul>
              <li>Provide, secure, and operate your account.</li>
              <li>Deliver AI answers tailored to your class and syllabus.</li>
              <li>
                Save your conversations, profile, and usage so the app works
                across sessions.
              </li>
              <li>Apply fair-use limits on AI requests.</li>
            </ul>
            <p>
              We do not sell your personal information, and we do not use it for
              advertising. The app contains no third-party ads.
            </p>
          </section>

          <section>
            <h2>8. Third-Party Services</h2>
            <p>
              We rely on a small number of trusted service providers to operate
              Vidyālaya:
            </p>
            <ul>
              <li>
                <strong>Google / Firebase:</strong> for sign-in and
                authentication.
              </li>
              <li>
                <strong>Our AI backend and AI model provider:</strong> to process
                and answer your questions.
              </li>
            </ul>
            <p>
              These providers process data only to deliver these services on our
              behalf and are subject to their own privacy and security
              commitments. We do not integrate advertising networks or data
              brokers.
            </p>
          </section>

          <section>
            <h2>9. Cookies and Tracking Technologies</h2>
            <p>
              Vidyālaya is a native mobile application and does not use cookies,
              web beacons, or third-party advertising or analytics trackers to
              follow you across apps or websites. The app is ad-free.
            </p>
          </section>

          <section>
            <h2>10. Children&apos;s Privacy</h2>
            <p>
              Vidyālaya is intended for school students, and some users may be
              under the age of 13. We collect only the limited information needed
              to provide the service, as described above. Because signing in and
              AI features involve collecting personal information (such as name
              and email), we ask that a parent or guardian set up and supervise
              the use of these features for younger children, and provide consent
              where required by law (including COPPA and applicable Indian data
              protection rules).
            </p>
            <p>
              If you believe a child has provided us personal information without
              appropriate consent, please contact us and we will delete it.
            </p>
          </section>

          <section>
            <h2>11. Data Retention &amp; Your Choices</h2>
            <p>
              We keep your account, profile, and conversation history for as long
              as your account is active. You can:
            </p>
            <ul>
              <li>Edit your profile details at any time from the Profile screen.</li>
              <li>Sign out to stop syncing data to your account.</li>
              <li>
                Request deletion of your account and associated data by
                contacting us at the email below, or use our{" "}
                <Link href="/projects/vidyalaya/delete-account" className="privacy-link">
                  account deletion request page
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2>12. Changes to This Policy</h2>
            <p>
              As Vidyālaya evolves, we may update this Privacy Policy to reflect
              new features or legal requirements. When we make material changes,
              we will update the effective date above. You are advised to review
              this page periodically.
            </p>
          </section>

          <section>
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions, requests, or suggestions about this
              Privacy Policy or your data, please contact the developer team at{" "}
              <a href="mailto:rosmoxx@gmail.com" className="privacy-link">
                rosmoxx@gmail.com
              </a>
              .
            </p>
          </section>
        </div>
      </article>

    </div>
  );
}
