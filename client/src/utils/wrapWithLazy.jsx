// assets/jsx-svg/wrapWithLazy.js
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || null;
    }
    return this.props.children;
  }
}

const wrapWithLazy = (importFunc, componentName) => {
  const LazyComponent = React.lazy(importFunc);

  const WrappedComponent = (props) => (
    <React.Suspense fallback={null}>
      <ErrorBoundary fallback={null}>
        <LazyComponent {...props} />
      </ErrorBoundary>
    </React.Suspense>
  );

  // Set the display name for the component
  WrappedComponent.displayName = componentName || "LazyComponent";

  return WrappedComponent;
};

export default wrapWithLazy;
