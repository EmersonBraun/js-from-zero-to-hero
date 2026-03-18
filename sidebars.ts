import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  tutorialSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Beginner',
      collapsed: false,
      items: [
        'beginner/introduction',
        'beginner/variables-types',
        'beginner/operators-conditionals',
        'beginner/loops',
        'beginner/functions',
        'beginner/dom-basics',
      ],
    },
    {
      type: 'category',
      label: 'Intermediate',
      items: [
        'intermediate/arrays-objects',
        'intermediate/callbacks-hof',
        'intermediate/timers-animations',
        'intermediate/forms-validation',
        'intermediate/canvas',
        'intermediate/local-storage',
        'intermediate/browser-apis',
      ],
    },
    {
      type: 'category',
      label: 'Advanced',
      items: [
        'advanced/closures',
        'advanced/this-prototypes',
        'advanced/async-javascript',
        'advanced/es-modules-tooling',
        'advanced/symbols-metaprogramming',
        'advanced/security-best-practices',
      ],
    },
  ],
};

export default sidebars;
