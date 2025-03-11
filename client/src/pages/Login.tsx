import { useState, FormEvent, ChangeEvent } from "react";
import { login } from "../api/authAPI"; // Ensure your login API is correctly set up
import { UserLogin } from "../interfaces/UserLogin";
import Auth from "../utils/auth"; // Assuming you have this utility to handle authentication

const Login = () => {
  const [loginData, setLoginData] = useState<UserLogin>({
    username: "",
    password: "",
  });

  // State for error messages
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Validate form fields
    if (!loginData.username || !loginData.password) {
      setErrorMsg("Both username and password are required.");
      return;
    }

    // Clear any previous error message
    setErrorMsg("");
    setLoading(true);

    try {
      const data = await login(loginData); // Call your API login function
      Auth.login(JSON.stringify(data)); // Save the login token or other data as needed
      // Optionally, you could redirect the user after a successful login
      // For example, use `window.location.href = '/dashboard';`
    } catch (err) {
      console.error("Failed to login", err);
      setErrorMsg(
        err instanceof Error ? err.message : "An unexpected error occurred"
      );
    } finally {
      setLoading(false); // Stop loading after the request completes
    }
  };

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit}>
        <h1>Login</h1>
        
        <label>Username</label>
        <input
          type="text"
          name="username"
          placeholder="Enter your username"
          value={loginData.username || ""}
          onChange={handleChange}
          disabled={loading}  // Disable input while submitting
        />
        
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={loginData.password || ""}
          onChange={handleChange}
          disabled={loading}  // Disable input while submitting
        />

        {errorMsg && <p className="error">{errorMsg}</p>}

        <button type="submit" disabled={loading}>
          {loading ? "Logging in..." : "Submit Form"}
        </button>
      </form>
    </div>
  );
};

export default Login;
