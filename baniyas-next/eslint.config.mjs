import nextVitals from 'eslint-config-next/core-web-vitals';

const eslintConfig = [
  ...nextVitals,
  {
    rules: {
      // The public site reproduces the original theme markup 1:1, which uses plain <img> tags.
      '@next/next/no-img-element': 'off',
      // The theme's static stylesheets are linked (not imported) so their relative url()s keep working.
      '@next/next/no-css-tags': 'off',
    },
  },
  {
    ignores: ['.next/**', 'node_modules/**', 'public/**', 'storage/**'],
  },
];

export default eslintConfig;
