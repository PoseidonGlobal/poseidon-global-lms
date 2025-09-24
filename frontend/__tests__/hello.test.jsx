import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

function Hello() {
  return <div>Welcome</div>;
}

describe('Hello', () => {
  it('renders', () => {
    render(<Hello />);
    expect(screen.getByText('Welcome')).toBeInTheDocument();
  });
});
