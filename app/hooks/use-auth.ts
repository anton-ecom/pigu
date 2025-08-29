// hooks/useAuth.ts
import { useState } from "react";
import { useNavigate } from "react-router";

export function useAuth() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission

    setIsLoading(true);
    setError(null);

    try {
      // Submit the form data to the server
      const response = await fetch("/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ email, password }), // Send form data
      });

      if (response.ok) {
        // Redirect to dashboard if successful
        navigate("/dashboard");
      } else {
        const result = await response.json();
        setError(result.error || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    isLoading,
    error,
    login,
  };
}
