#!/usr/bin/env node
/*
 * SSO Template Scaffolder
 * Copies the sso-index.template.html from sirsluginston-sharedui and replaces tokens.
 * Usage examples:
 *   node scaffold-sso.js --title "SirSluginston Co" --tagline "Single Sign-On" --logo SirSluginston-SharedUI/Assets/Images/SirSluginston_Logo_Original.JPG --color "#4B3A78" --footer "Debonair Gastropod Genius" --copyright "© 2025 SirSluginston"
 *   node scaffold-sso.js --force   (overwrite existing index.html)
 */

const fs = require('fs');
const path = require('path');

// Simple arg parsing
const args = process.argv.slice(2);
const getArg = (name) => {
  const idx = args.indexOf(`--${name}`);
  if (idx !== -1 && idx + 1 < args.length) return args[idx + 1];
  return undefined;
};
const hasFlag = (flag) => args.includes(`--${flag}`);

const projectTitle = getArg('title') || 'Your Project';
const projectTagline = getArg('tagline') || 'Tagline';
const projectLogo = getArg('logo') || 'SirSluginston-SharedUI/Assets/Images/SirSluginston_Logo_Original.JPG';
const projectColor = getArg('color') || '#4B3A78';
const footerNote = getArg('footer') || 'Footer note';
const copyright = getArg('copyright') || `© ${new Date().getFullYear()} ${projectTitle}`;
const force = hasFlag('force');

const templatePath = path.join(process.cwd(), 'node_modules', 'sirsluginston-sharedui', 'templates', 'sso-index.template.html');
const targetPath = path.join(process.cwd(), 'index.html');

if (!fs.existsSync(templatePath)) {
  console.error('[scaffold-sso] Template not found at', templatePath);
  process.exit(1);
}

if (fs.existsSync(targetPath) && !force) {
  console.error('[scaffold-sso] index.html already exists. Use --force to overwrite.');
  process.exit(2);
}

let html = fs.readFileSync(templatePath, 'utf8');
const replacements = {
  '{{PROJECT_LOGO}}': projectLogo,
  '{{PROJECT_TITLE}}': projectTitle,
  '{{PROJECT_TAGLINE}}': projectTagline,
  '{{PROJECT_COLOR}}': projectColor,
  '{{FOOTER_NOTE}}': footerNote,
  '{{COPYRIGHT}}': copyright
};

for (const [token, value] of Object.entries(replacements)) {
  html = html.split(token).join(value);
}

fs.writeFileSync(targetPath, html, 'utf8');
console.log('[scaffold-sso] index.html created with provided values.');
console.log('[scaffold-sso] Tokens applied:', replacements);
console.log('\nNext steps:');
console.log(' - Open index.html and adjust any inline styles or add real project list logic.');
console.log(' - Wire actual auth handler into the login form.');
