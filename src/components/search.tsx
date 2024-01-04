import React, { ReactNode, useEffect } from "react";

interface ISearchProps {
  setUsername: (username: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  username: string;
  children?: ReactNode; // ReactNode allows any valid JSX to be passed as children
  isToggled: boolean;
}
const Search: React.FC<ISearchProps> = ({
  setUsername,
  handleSubmit,
  username,
  children,
  isToggled,
}) => {
  useEffect(() => {
    setUsername("");
  }, [isToggled]);

  return (
    <form onSubmit={handleSubmit}>
      {children} {/*Load radio button component here as children */}
      <label htmlFor="username" className="form-label">
        GitHub Username:
      </label>
      <input
        disabled={isToggled}
        type="text"
        id="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="form-input"
        placeholder={
          !isToggled
            ? "Please enter the username"
            : "Registered token will take care of user info"
        }
      />
      <button type="submit" className="form-button">
        Search
      </button>
    </form>
  );
};

export default Search;
