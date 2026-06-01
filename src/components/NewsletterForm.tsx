import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={submit} className="mx-auto flex w-full max-w-xl flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        placeholder="Enter your email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setStatus("idle");
        }}
        className="h-12 min-h-[48px] w-full sm:flex-1 appearance-none rounded-none border border-border bg-background px-4 text-base outline-none transition-colors focus:border-foreground"
      />
      <button type="submit" className="btn-primary w-full sm:w-auto">
        Subscribe
      </button>
      {status === "success" && (
        <p className="basis-full text-sm text-[color:var(--color-success)]">
          Thanks for subscribing — check your inbox for your code.
        </p>
      )}
      {status === "error" && (
        <p className="basis-full text-sm text-destructive">Please enter a valid email.</p>
      )}
    </form>
  );
}
