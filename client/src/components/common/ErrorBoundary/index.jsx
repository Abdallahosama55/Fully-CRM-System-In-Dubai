import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service here
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Render fallback UI
      return <div className="error_page_body">
        <div className="error-container">
          <div className="error-icon">🧳</div>
          <h1>Oops! Lost Your Way?</h1>
          <p>Something went wrong on your journey. Don't worry, we'll help you get back on track.</p>
          <div className="signpost">← Home | Help | Previous Page →</div>
          <div className="btn-container">
            <a href="/" className="btn">Back to Safety</a>
            <a href="/help" className="btn">Get Help</a>
          </div>
        </div>
      </div>;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
