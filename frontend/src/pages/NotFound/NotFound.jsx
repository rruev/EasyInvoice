import { Link } from "react-router-dom";
import "./NotFound.css";

function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-card">
        <p className="not-found-code">404</p>
        <h2 className="not-found-title">Page not found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <Link to="/" className="not-found-link">
          Go home
        </Link>
      </div>
    </main>
  );
}

export default NotFound;
