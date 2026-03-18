import {describe, it, expect} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import React from 'react';
import CodeRunner from '../../src/components/CodeRunner';

describe('CodeRunner', () => {
  const defaultProps = {
    title: 'Test Exercise',
    code: 'function add(a, b) { return a + b; }',
    testCases: [
      {input: 'add(2, 3)', expected: '5', description: '2 + 3 = 5'},
    ],
  };

  it('renders the title', () => {
    render(<CodeRunner {...defaultProps} />);
    expect(screen.getByText('Test Exercise')).toBeInTheDocument();
  });

  it('renders the code', () => {
    render(<CodeRunner {...defaultProps} />);
    expect(screen.getByText(defaultProps.code)).toBeInTheDocument();
  });

  it('renders the Run Code button', () => {
    render(<CodeRunner {...defaultProps} />);
    expect(screen.getByText('▶️ Run Code')).toBeInTheDocument();
  });

  it('shows default output message', () => {
    render(<CodeRunner {...defaultProps} />);
    expect(screen.getByText('Click "Run Code" to execute the code and see the results.')).toBeInTheDocument();
  });

  it('executes code and shows test results on run', () => {
    render(<CodeRunner {...defaultProps} />);
    fireEvent.click(screen.getByText('▶️ Run Code'));
    expect(screen.getByText(/PASSED/)).toBeInTheDocument();
  });

  it('shows FAILED for incorrect code', () => {
    const props = {
      ...defaultProps,
      code: 'function add(a, b) { return 0; }',
    };
    render(<CodeRunner {...props} />);
    fireEvent.click(screen.getByText('▶️ Run Code'));
    expect(screen.getByText(/FAILED/)).toBeInTheDocument();
  });

  it('handles syntax errors gracefully', () => {
    const props = {
      ...defaultProps,
      code: 'function broken( { }',
    };
    render(<CodeRunner {...props} />);
    fireEvent.click(screen.getByText('▶️ Run Code'));
    expect(screen.getByText(/Error/)).toBeInTheDocument();
  });

  it('renders copy and clear buttons', () => {
    render(<CodeRunner {...defaultProps} />);
    expect(screen.getByTitle('Copy code')).toBeInTheDocument();
    expect(screen.getByTitle('Clear output')).toBeInTheDocument();
  });

  it('clears output when clear button is clicked', () => {
    render(<CodeRunner {...defaultProps} />);
    fireEvent.click(screen.getByText('▶️ Run Code'));
    expect(screen.getByText(/PASSED/)).toBeInTheDocument();
    fireEvent.click(screen.getByTitle('Clear output'));
    expect(screen.getByText('Click "Run Code" to execute the code and see the results.')).toBeInTheDocument();
  });
});
