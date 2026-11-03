import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/Button";
import { authAdapter } from "../../services/authAdapter";

type Mode = "login" | "signup" | "forgot-password";
const copy = { login: ["Welcome back", "Sign in to continue to ARC."], signup: ["Create your ARC", "Start making space for better thinking."], "forgot-password": ["Reset your password", "We’ll send instructions to your email."] };
export function AuthPage({ mode }: { mode: Mode }) {
  const [email, setEmail] = useState(""); const [password, setPassword] = useState(""); const [error, setError] = useState(""); const navigate = useNavigate();
  const submit = (event: FormEvent) => { event.preventDefault(); if (!email.includes("@")) { setError("Enter a valid email address."); return; } if (mode !== "forgot-password" && password.length < 6) { setError("Password must be at least 6 characters."); return; } setError(""); if (mode === "forgot-password") return; authAdapter.setAuthenticated(true); navigate("/app/dashboard"); };
  return <main className="auth-page"><div className="auth-card"><div className="brand"><span className="brand-mark">A</span><span>ARC</span></div><h1>{copy[mode][0]}</h1><p>{copy[mode][1]}</p><form onSubmit={submit}>{error && <div className="error-state" role="alert">{error}</div>}<label>Email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} autoComplete="email" /></label>{mode !== "forgot-password" && <label>Password<input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>}<Button type="submit">{mode === "login" ? "Sign in" : mode === "signup" ? "Create account" : "Send reset link"}</Button></form><div className="auth-links">{mode === "login" && <><Link to="/forgot-password">Forgot password?</Link><Link to="/signup">Create an account</Link></>}{mode !== "login" && <Link to="/login">Back to sign in</Link>}</div></div></main>;
}
