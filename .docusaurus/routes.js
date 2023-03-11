import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/blog',
    component: ComponentCreator('/blog', 'e9d'),
    exact: true
  },
  {
    path: '/blog/archive',
    component: ComponentCreator('/blog/archive', 'b03'),
    exact: true
  },
  {
    path: '/blog/bit-magic',
    component: ComponentCreator('/blog/bit-magic', 'f14'),
    exact: true
  },
  {
    path: '/blog/bit-packing',
    component: ComponentCreator('/blog/bit-packing', '318'),
    exact: true
  },
  {
    path: '/blog/solidity-encodings',
    component: ComponentCreator('/blog/solidity-encodings', '1ef'),
    exact: true
  },
  {
    path: '/blog/tags',
    component: ComponentCreator('/blog/tags', 'ced'),
    exact: true
  },
  {
    path: '/blog/tags/abi',
    component: ComponentCreator('/blog/tags/abi', '550'),
    exact: true
  },
  {
    path: '/blog/tags/bit-magic',
    component: ComponentCreator('/blog/tags/bit-magic', 'e52'),
    exact: true
  },
  {
    path: '/blog/tags/bit-packing',
    component: ComponentCreator('/blog/tags/bit-packing', '4fb'),
    exact: true
  },
  {
    path: '/blog/tags/docusaurus',
    component: ComponentCreator('/blog/tags/docusaurus', '822'),
    exact: true
  },
  {
    path: '/blog/tags/facebook',
    component: ComponentCreator('/blog/tags/facebook', '5f3'),
    exact: true
  },
  {
    path: '/blog/tags/hashing',
    component: ComponentCreator('/blog/tags/hashing', 'f47'),
    exact: true
  },
  {
    path: '/blog/tags/hello',
    component: ComponentCreator('/blog/tags/hello', '067'),
    exact: true
  },
  {
    path: '/blog/tags/intermediate',
    component: ComponentCreator('/blog/tags/intermediate', '79c'),
    exact: true
  },
  {
    path: '/blog/tags/keccak-256',
    component: ComponentCreator('/blog/tags/keccak-256', '076'),
    exact: true
  },
  {
    path: '/blog/tags/language-tricks',
    component: ComponentCreator('/blog/tags/language-tricks', 'c62'),
    exact: true
  },
  {
    path: '/blog/tags/solidity',
    component: ComponentCreator('/blog/tags/solidity', 'd72'),
    exact: true
  },
  {
    path: '/blog/tags/web-3',
    component: ComponentCreator('/blog/tags/web-3', '323'),
    exact: true
  },
  {
    path: '/blog/welcome',
    component: ComponentCreator('/blog/welcome', '375'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '0f3'),
    exact: true
  },
  {
    path: '/testimonials',
    component: ComponentCreator('/testimonials', 'bee'),
    exact: true
  },
  {
    path: '/videos',
    component: ComponentCreator('/videos', 'bb6'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', 'e83'),
    routes: [
      {
        path: '/docs/category/tutorial---basics',
        component: ComponentCreator('/docs/category/tutorial---basics', 'd44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/tutorial---extras',
        component: ComponentCreator('/docs/category/tutorial---extras', 'f09'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/congratulations',
        component: ComponentCreator('/docs/tutorial-basics/congratulations', '793'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-blog-post',
        component: ComponentCreator('/docs/tutorial-basics/create-a-blog-post', '68e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-document',
        component: ComponentCreator('/docs/tutorial-basics/create-a-document', 'c2d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/create-a-page',
        component: ComponentCreator('/docs/tutorial-basics/create-a-page', 'f44'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/deploy-your-site',
        component: ComponentCreator('/docs/tutorial-basics/deploy-your-site', 'e46'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-basics/markdown-features',
        component: ComponentCreator('/docs/tutorial-basics/markdown-features', '4b7'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/manage-docs-versions',
        component: ComponentCreator('/docs/tutorial-extras/manage-docs-versions', 'fdd'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/tutorial-extras/translate-your-site',
        component: ComponentCreator('/docs/tutorial-extras/translate-your-site', '2d7'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'b81'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
