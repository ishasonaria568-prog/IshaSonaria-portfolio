/**
 * Pure calculation logic for portfolio scroll animations, progress mapping, and form formatting.
 */

export function clamp(v: number, min = 0, max = 1): number {
  return Math.min(max, Math.max(min, v));
}

/**
 * Calculates normalized scroll progress within a pinned section.
 */
export function calculatePinProgress(
  containerTop: number,
  containerHeight: number,
  viewportHeight: number
): number {
  const scrollDistance = containerHeight - viewportHeight;
  if (scrollDistance <= 0) return 1;
  return clamp(-containerTop / scrollDistance, 0, 1);
}

/**
 * Calculates word highlight opacity based on scroll progress (0..1).
 */
export function calculateWordOpacity(
  progress: number,
  wordIndex: number,
  totalWords: number
): number {
  if (totalWords <= 0) return 1;
  const scaledProgress = clamp((progress - 0.1) / 0.55, 0, 1) * totalWords;
  const step = clamp(scaledProgress - wordIndex, 0, 1);
  return 0.18 + 0.82 * step;
}

/**
 * Computes horizontal drift for marquee galleries based on distance from top.
 */
export function calculateMarqueeOffset(
  galleryTop: number,
  viewportHeight: number
): { row1: number; row2: number } {
  const g = viewportHeight - galleryTop;
  return {
    row1: -g * 0.45,
    row2: g * 0.45 - 900,
  };
}

/**
 * Duplicates a list of items for seamless infinite marquee scrolling.
 */
export function createMarqueeTrackItems<T>(items: T[], repetitions = 4): T[] {
  if (!items || items.length === 0) return [];
  const count = Math.max(2, repetitions);
  const result: T[] = [];
  for (let i = 0; i < count; i++) {
    result.push(...items);
  }
  return result;
}

export const DEFAULT_CONTACT_EMAIL = 'ishasonaria568@gmail.com';

/**
 * Formats mailto URI for contact form submissions.
 */
export function formatMailtoLink(
  toEmail: string = DEFAULT_CONTACT_EMAIL,
  name: string,
  fromEmail: string,
  message: string
): string {
  const recipient = toEmail || DEFAULT_CONTACT_EMAIL;
  const subject = `Cybersecurity Inquiry from ${name}`;
  const body = `${message}\n\nSender: ${name} (${fromEmail})`;
  return `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Validates standard contact form fields.
 */
export function validateContactForm(
  name: string,
  email: string,
  message: string
): { isValid: boolean; error?: string } {
  if (!name.trim()) {
    return { isValid: false, error: 'Name is required' };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email.trim() || !emailRegex.test(email.trim())) {
    return { isValid: false, error: 'Please enter a valid email address' };
  }
  if (!message.trim()) {
    return { isValid: false, error: 'Message cannot be empty' };
  }
  return { isValid: true };
}

export function filterProjects<T extends { category?: string }>(projects: T[], category: string): T[] {
  if (!category || category === 'All') return projects;
  return projects.filter((p) => p.category === category);
}

export function filterGitHubRepos<T extends { name: string; description: string; language: string; category?: string }>(
  repos: T[],
  category: string,
  query: string
): T[] {
  let filtered = repos;
  if (category && category !== 'All') {
    filtered = filtered.filter((r) => r.category === category);
  }
  if (query.trim()) {
    const q = query.trim().toLowerCase();
    filtered = filtered.filter(
      (r) =>
        r.name.toLowerCase().includes(q) ||
        r.description.toLowerCase().includes(q) ||
        r.language.toLowerCase().includes(q)
    );
  }
  return filtered;
}

/**
 * Calculates smooth scale and brightness for stacked sticky cards as subsequent cards slide over them.
 */
export function calculateCardDeckEffect(
  cardTop: number,
  cardHeight: number,
  nextCardTop?: number
): { scale: number; brightness: number; opacity: number } {
  if (nextCardTop === undefined || cardHeight <= 0) {
    return { scale: 1, brightness: 1, opacity: 1 };
  }
  const distance = nextCardTop - cardTop;
  if (distance >= cardHeight) {
    return { scale: 1, brightness: 1, opacity: 1 };
  }
  const overlap = clamp((cardHeight - distance) / cardHeight, 0, 1);
  const scale = 1 - overlap * 0.05;
  const brightness = 1 - overlap * 0.2;
  const opacity = 1 - overlap * 0.15;
  return { scale, brightness, opacity };
}



