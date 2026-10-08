import Button from "@/components/ui/Button";
import { IconPlayStore } from "@/components/icons";

export default function GooglePlayDownload({
  name,
  href,
  tone = "dark",
}: {
  name: string;
  href?: string;
  tone?: "dark" | "light";
}) {
  if (href) {
    return (
      <Button href={href} variant={tone === "dark" ? "inverse" : "secondary-light"} arrow="external">
        <IconPlayStore className="h-5 w-5" />
        Get it on Google Play
        <span className="sr-only">: {name} for Android (opens in a new tab)</span>
      </Button>
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <button
        type="button"
        disabled
        aria-label={`Get ${name} on Google Play — download unavailable`}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-sm border px-5 text-sm font-semibold disabled:cursor-not-allowed ${tone === "dark" ? "border-white/15 bg-white/[0.04] text-white/60" : "border-ink/15 bg-paper text-ink/60"}`}
      >
        <IconPlayStore className="h-5 w-5" />
        Get it on Google Play
      </button>
      <span className={`text-sm ${tone === "dark" ? "text-white/50" : "text-ink/55"}`}>
        Download link not available yet
      </span>
    </div>
  );
}
