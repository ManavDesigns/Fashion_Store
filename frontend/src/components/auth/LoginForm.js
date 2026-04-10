"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { customerApi } from "../../lib/bagisto";
import Button from "../common/Button";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    if (!email.trim()) return "Email is required.";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Enter a valid email address.";
    if (!password.trim()) return "Password is required.";
    return "";
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setMessage("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      await customerApi.login({ email, password });
      setMessage("Login successful. Accessing your profile...");
      setTimeout(() => {
        router.push("/account");
        router.refresh();
      }, 1000);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "We couldn't sign you in with those credentials.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <label className="flex flex-col gap-2">
        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary ml-1">Email Address</span>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="input-field bg-surface border-transparent focus:bg-white"
        />
      </label>

      <label className="flex flex-col gap-2">
        <div className="flex justify-between items-center ml-1">
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-secondary">Password</span>
          <a href="#" className="text-[9px] font-bold uppercase tracking-widest text-secondary hover:text-primary transition-colors underline underline-offset-4">Forgot?</a>
        </div>
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="input-field bg-surface border-transparent focus:bg-white"
        />
      </label>

      {error && <p className="text-[11px] font-black uppercase tracking-[0.1em] text-error p-3 bg-error/5 border border-error/20 mt-2">{error}</p>}
      {message && <p className="text-[11px] font-black uppercase tracking-[0.1em] text-primary p-3 bg-primary/5 border border-primary/20 mt-2">{message}</p>}

      <Button
        type="submit"
        disabled={isSubmitting}
        className="h-14 mt-4 shadow-xl shadow-black/5"
      >
        {isSubmitting ? "Authenticating..." : "Sign In"}
      </Button>
    </form>
  );
}
