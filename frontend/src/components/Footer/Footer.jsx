import "./Footer.css";

function Footer() {
  return (
    <footer className="page-footer">
      <p className="page-footer__text">© 2026 EasyInvoice</p>
      <span className="page-footer__divider" aria-hidden="true" />
      <p className="page-footer__text">Simple invoice generator for freelancers, routesetters and small businesses</p>
      <span className="page-footer__divider" aria-hidden="true" />
      <p className="page-footer__text page-footer__made-by">
        Made by
        <a
          href="https://github.com/rruev"
          target="_blank"
          rel="noopener noreferrer"
          className="page-footer__github"
          aria-label="Visit rruev on GitHub"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true" className="page-footer__github-icon">
            <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58v-2.03c-3.34.73-4.04-1.61-4.04-1.61-.54-1.38-1.33-1.75-1.33-1.75-1.09-.75.08-.73.08-.73 1.2.08 1.84 1.23 1.84 1.23 1.07 1.83 2.8 1.3 3.48.99.11-.78.42-1.3.76-1.6-2.66-.3-5.46-1.33-5.46-5.92 0-1.31.47-2.38 1.23-3.22-.12-.3-.53-1.52.12-3.17 0 0 1-.32 3.3 1.23a11.4 11.4 0 0 1 6 0c2.29-1.55 3.29-1.23 3.29-1.23.65 1.65.24 2.87.12 3.17.77.84 1.23 1.91 1.23 3.22 0 4.6-2.8 5.61-5.48 5.91.43.37.81 1.1.81 2.22v3.29c0 .32.22.7.83.58A12 12 0 0 0 12 .5Z"/>
          </svg>
          <span>rruev</span>
        </a>
      </p>
    </footer>
  );
}

export default Footer;
