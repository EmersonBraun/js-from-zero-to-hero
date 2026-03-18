import {describe, it, expect} from 'vitest';
import {render, screen} from '@testing-library/react';
import React from 'react';
import {EbookCta} from '../../src/components/EbookCta';

describe('EbookCta', () => {
  it('renders the title', () => {
    render(<EbookCta />);
    expect(screen.getByText(/Tired of failing technical interviews/)).toBeInTheDocument();
  });

  it('renders a link to the ebook', () => {
    render(<EbookCta />);
    const link = screen.getByText('Get My Free E-book');
    expect(link).toHaveAttribute('href', 'https://ebook.emersonbraun.dev/');
    expect(link).toHaveAttribute('target', '_blank');
  });
});
