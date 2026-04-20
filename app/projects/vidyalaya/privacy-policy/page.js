export const metadata = {
  title: "Privacy Policy - Vidyālaya",
  description: "Privacy policy for the Vidyālaya Android app.",
  alternates: {
    canonical: "/projects/vidyalaya/privacy-policy",
  },
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 px-5 py-10 text-slate-900 sm:px-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-bold text-indigo-600 sm:text-5xl">
            Privacy Policy
          </h1>
          <p className="mt-2 text-lg text-slate-500">
            <strong>Vidyālaya</strong>
          </p>
          <p className="mt-1 text-lg text-slate-500">
            Effective Date: April 20, 2026
          </p>
        </header>

        <article className="rounded-xl border border-slate-200 bg-white p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)] sm:p-10">
          <h2 className="mb-4 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            1. Introduction
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            Welcome to <strong>Vidyālaya</strong> (&quot;we,&quot; &quot;our,&quot;
            or &quot;us&quot;). We are committed to protecting your privacy and
            ensuring you have a positive experience on our mobile application.
            Vidyālaya is designed as a book reading tool for Indian school
            students, providing offline access to educational materials.
          </p>
          <p className="mb-4 leading-7 text-slate-500">
            This Privacy Policy explains our practices regarding the collection,
            use, and disclosure of information when you use the Vidyālaya app.
          </p>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            2. No Data Collection
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            Our core principle is simple:{" "}
            <strong>
              We do not collect, transmit, or store your personal data on any
              external servers.
            </strong>
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-500">
            <li>
              <strong>No Account Required:</strong> You can use Vidyālaya without
              creating an account or providing any identifying information (such
              as name, email, or phone number).
            </li>
            <li>
              <strong>Local Storage:</strong> Any customization you make within
              the app (such as providing a nickname, selecting your class,
              choosing light/dark mode themes, or saving bookmarks) is stored
              entirely locally on your device.
            </li>
            <li>
              <strong>Downloaded Books:</strong> The textbooks and study
              materials you download are saved directly onto your device&apos;s
              internal storage for offline viewing.
            </li>
          </ul>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            3. Permissions We Request
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            To function properly, Vidyālaya requires minimal device permissions.
            These are strictly used for the app&apos;s functionality and not for
            data tracking:
          </p>
          <ul className="mb-4 list-disc space-y-2 pl-6 text-slate-500">
            <li>
              <strong>Internet Connectivity:</strong> Used solely to download
              educational PDFs from our servers so you can read them offline. We
              do not use the internet connection to send your personal usage data
              anywhere.
            </li>
          </ul>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            4. Third-Party Services and Analytics
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            Vidyālaya does <strong>not</strong> integrate with any third-party
            analytics trackers, advertising networks, or data brokers. The app
            is completely ad-free and tracking-free.
          </p>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            5. Children&apos;s Privacy (COPPA)
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            Vidyālaya is designed for school students, including children under
            the age of 13. We are fully compliant with the Children&apos;s Online
            Privacy Protection Act (COPPA). Because we do not collect any
            personal information from any of our users, we inherently do not
            collect personal information from children.
          </p>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            6. Changes to This Privacy Policy
          </h2>
          <p className="mb-4 leading-7 text-slate-500">
            We may update our Privacy Policy from time to time. If we decide to
            introduce new features in the future that require data collection
            (such as cloud synchronization or AI-assisted learning), we will
            update this Privacy Policy and obtain the necessary user (and
            parental) consent before collecting any data. You are advised to
            review this page periodically for any changes.
          </p>

          <h2 className="mb-4 mt-8 border-b border-slate-200 pb-2 text-2xl font-semibold text-slate-900">
            7. Contact Us
          </h2>
          <p className="leading-7 text-slate-500">
            If you have any questions or suggestions about our Privacy Policy, do
            not hesitate to contact the developer team.
          </p>
        </article>

        <footer className="mt-10 text-center text-sm text-slate-500">
          <p>&copy; 2026 Vidyālaya. All rights reserved.</p>
        </footer>
      </div>
    </main>
  );
}
