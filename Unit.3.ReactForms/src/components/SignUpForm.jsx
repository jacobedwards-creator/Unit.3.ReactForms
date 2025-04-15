import { useState } from "react";

export default function SignUpForm({ setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const validate = () => {
    const errors = {};
    if (username.length < 8) {
      errors.username = "Username must be at least 8 characters";
    }
    if (password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  async function handleSubmit(event) {
    event.preventDefault();
    
    if (!validate()) return;

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        }
      );
      const result = await response.json();
      setToken(result.token);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={formErrors.username ? "error-input" : ""}
          />
          {formErrors.username && <span className="error-text">{formErrors.username}</span>}
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={formErrors.password ? "error-input" : ""}
          />
          {formErrors.password && <span className="error-text">{formErrors.password}</span>}
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
}