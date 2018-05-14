import React, { Component } from 'react';

class ErrorBoundary extends Component {
  state = {
    hasError: false,
  };

  componentDidCatch(/* error, info */) {
    // TODO: Should use the caught error to display a more specific message.
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h2 className="error-boundary">Something went wrong.</h2>;
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
