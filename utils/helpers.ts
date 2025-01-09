export const toDateTime = (secs: number) => {
  const t = new Date('1970-01-01T00:00:00Z'); // Unix epoch start.
  t.setSeconds(secs);
  return t;
};

export const getURL = (path: string = '') => {
  // Check if we're running in production
  const url =
    process?.env?.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL !== ''
      ? process.env.NEXT_PUBLIC_SITE_URL
      : process?.env?.NEXT_PUBLIC_VERCEL_URL && process.env.NEXT_PUBLIC_VERCEL_URL !== ''
        ? process.env.NEXT_PUBLIC_VERCEL_URL
        : 'http://localhost:3000';
  return `${url}${path}`;
};

export const getErrorRedirect = (error: string, path: string = '/') => {
  return `${path}?error=${encodeURIComponent(error)}`;
};

export const calculateTrialEndUnixTimestamp = (trialPeriodDays?: number | null) => {
  if (!trialPeriodDays) return undefined;
  const now = new Date();
  const trialEnd = new Date(now.getTime() + trialPeriodDays * 24 * 60 * 60 * 1000);
  return Math.floor(trialEnd.getTime() / 1000);
};
