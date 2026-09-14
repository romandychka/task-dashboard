import React from 'react';
import { expect, vi, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// Add custom jest-dom matchers
expect.extend(matchers);

// Clean up after each test
afterEach(() => {
  cleanup();
});

// Mock framer-motion to avoid animation-related test issues
vi.mock('framer-motion', () => {
  const MotionElement = ({ as, children, ...props }) => {
    const domProps = { ...props };
    ['initial', 'animate', 'exit', 'transition', 'whileHover', 'whileTap', 'layout']
      .forEach((prop) => delete domProps[prop]);

    return React.createElement(as, domProps, children);
  };

  return {
    motion: {
      div: (props) => React.createElement(MotionElement, { ...props, as: 'div' }),
      button: (props) => React.createElement(MotionElement, { ...props, as: 'button' }),
      p: (props) => React.createElement(MotionElement, { ...props, as: 'p' })
    },
    AnimatePresence: ({ children }) => children,
  };
});
