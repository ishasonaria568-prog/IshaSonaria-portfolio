import test from 'node:test';
import assert from 'node:assert/strict';
import {
  clamp,
  calculatePinProgress,
  calculateWordOpacity,
  calculateMarqueeOffset,
  createMarqueeTrackItems,
  formatMailtoLink,
  validateContactForm,
  filterProjects,
  filterGitHubRepos,
  calculateCardDeckEffect,
} from './portfolioLogic.js';


test('clamp restricts values correctly', () => {
  assert.equal(clamp(0.5, 0, 1), 0.5);
  assert.equal(clamp(-0.2, 0, 1), 0);
  assert.equal(clamp(1.5, 0, 1), 1);
  assert.equal(clamp(10, 5, 20), 10);
});

test('calculatePinProgress computes normalized progress within scroll bounds', () => {
  assert.equal(calculatePinProgress(0, 2000, 1000), 0);
  assert.equal(calculatePinProgress(-500, 2000, 1000), 0.5);
  assert.equal(calculatePinProgress(-1000, 2000, 1000), 1);
  assert.equal(calculatePinProgress(-1500, 2000, 1000), 1);
  assert.equal(calculatePinProgress(200, 2000, 1000), 0);
});

test('calculateWordOpacity highlights sequential words based on progress', () => {
  const total = 50;
  const early = calculateWordOpacity(0, 0, total);
  assert.equal(early, 0.18);
  const late = calculateWordOpacity(1, 0, total);
  assert.equal(late, 1.0);
});

test('calculateMarqueeOffset returns correct row coordinates', () => {
  const res = calculateMarqueeOffset(500, 1000);
  assert.equal(res.row1, -225);
  assert.equal(res.row2, -675);
});

test('createMarqueeTrackItems duplicates items correctly for seamless infinite scrolling', () => {
  const items = ['A', 'B'];
  assert.deepEqual(createMarqueeTrackItems(items, 3), ['A', 'B', 'A', 'B', 'A', 'B']);
  assert.deepEqual(createMarqueeTrackItems([], 4), []);
  assert.equal(createMarqueeTrackItems(items, 1).length, 4);
});

test('validateContactForm checks name, email, and message', () => {
  assert.equal(validateContactForm('', 'test@example.com', 'hi').isValid, false);
  assert.equal(validateContactForm('Gautam', 'invalid-email', 'hi').isValid, false);
  assert.equal(validateContactForm('Gautam', 'test@example.com', '').isValid, false);
  assert.equal(validateContactForm('Gautam', 'test@example.com', 'Valid message').isValid, true);
});

test('formatMailtoLink encodes subject and message correctly', () => {
  const link = formatMailtoLink(
    'ishasonaria568@gmail.com',
    'Alex Smith',
    'alex@test.com',
    'Interested in your SOC Analyst profile'
  );
  assert.ok(link.startsWith('mailto:ishasonaria568@gmail.com'));
  assert.ok(link.includes('Alex%20Smith'));
  assert.ok(link.includes('Cybersecurity%20Inquiry'));
  assert.ok(link.includes('SOC%20Analyst'));
});

test('filterProjects filters by category or returns all', () => {
  const sample = [
    { name: 'P1', category: 'Network & Recon' },
    { name: 'P2', category: 'Threat Defense & Forensics' },
    { name: 'P3', category: 'Web & Security' },
  ];
  assert.equal(filterProjects(sample, 'All').length, 3);
  assert.equal(filterProjects(sample, 'Network & Recon').length, 1);
  assert.equal(filterProjects(sample, 'Threat Defense & Forensics')[0].name, 'P2');
});

test('filterGitHubRepos filters by category and search keyword', () => {
  const repos = [
    { name: 'pingx-cli', description: 'ICMP ping utility', language: 'Python', category: 'Network & Recon' },
    { name: 'websentry', description: 'Nikto scanner', language: 'Python', category: 'Threat Defense & Forensics' },
    { name: 'augur-recon-2.0', description: 'Attack surface tool', language: 'TypeScript', category: 'Network & Recon' },
  ];
  assert.equal(filterGitHubRepos(repos, 'All', '').length, 3);
  assert.equal(filterGitHubRepos(repos, 'Network & Recon', '').length, 2);
  assert.equal(filterGitHubRepos(repos, 'All', 'Nikto').length, 1);
  assert.equal(filterGitHubRepos(repos, 'All', 'TypeScript').length, 1);
  assert.equal(filterGitHubRepos(repos, 'Threat Defense & Forensics', 'ping').length, 0);
});

test('calculateCardDeckEffect computes scale and dimming when overlapping', () => {
  // No next card or far away
  const noOverlap = calculateCardDeckEffect(100, 400, 600);
  assert.equal(noOverlap.scale, 1);
  assert.equal(noOverlap.brightness, 1);

  // Partial overlap (distance = 200, cardHeight = 400 -> overlap = 0.5)
  const partial = calculateCardDeckEffect(100, 400, 300);
  assert.equal(partial.scale, 1 - 0.5 * 0.05); // 0.975
  assert.equal(partial.brightness, 1 - 0.5 * 0.2); // 0.9

  // Full overlap (distance = 0)
  const full = calculateCardDeckEffect(100, 400, 100);
  assert.equal(full.scale, 0.95);
  assert.equal(full.brightness, 0.8);
});

