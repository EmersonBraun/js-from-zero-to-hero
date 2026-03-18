import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import AwsCheatsheetCard from '../../src/components/AwsCheatsheetCard';

describe('AwsCheatsheetCard', () => {
  it('renders the title', () => {
    render(<AwsCheatsheetCard />);
    expect(screen.getByText(/Ready to master AWS/)).toBeInTheDocument();
  });

  it('renders a link to the aws cheatsheet', () => {
    render(<AwsCheatsheetCard />);
    const link = screen.getByText('Open AWS Cheatsheet');
    expect(link).toHaveAttribute('href', 'https://emersonbraun.github.io/aws-cheatsheet/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
