export interface BlockedSitesData {
  blockedSites: string[];
}

export interface ChromeTab {
  id?: number;
  url?: string;
  active?: boolean;
  currentWindow?: boolean;
}