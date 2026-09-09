type IconProps = { className?: string };

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" className={className} aria-hidden="true">
      <path d="M13.5 21v-8.2h2.8l.42-3.26H13.5V7.46c0-.94.26-1.58 1.61-1.58h1.72V2.96c-.3-.04-1.32-.13-2.5-.13-2.48 0-4.18 1.51-4.18 4.29v2.42H7.33v3.26h2.82V21h3.35Z" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3.2" y="3.2" width="17.6" height="17.6" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.1" cy="6.9" r="1.15" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M21.6 7.9c-.23-1.24-.94-2.05-2.2-2.24C17.5 5.35 14.9 5.3 12 5.3s-5.5.05-7.4.36c-1.26.19-1.97 1-2.2 2.24C2.17 9.2 2.1 10.6 2.1 12s.07 2.8.3 4.1c.23 1.24.94 2.05 2.2 2.24 1.9.31 4.5.36 7.4.36s5.5-.05 7.4-.36c1.26-.19 1.97-1 2.2-2.24.23-1.3.3-2.7.3-4.1s-.07-2.8-.3-4.1ZM10.2 15.3V8.7L15.9 12l-5.7 3.3Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="19"
      height="19"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2.6" y="5" width="18.8" height="14" rx="2.4" />
      <path d="M3.2 7.2 12 13.4l8.8-6.2" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12.04 2.4c-5.28 0-9.56 4.28-9.56 9.56 0 1.68.44 3.32 1.28 4.76L2.4 21.6l4.99-1.3a9.52 9.52 0 0 0 4.65 1.2c5.28 0 9.56-4.28 9.56-9.56S17.32 2.4 12.04 2.4Zm0 17.06c-1.5 0-2.96-.4-4.24-1.16l-.3-.18-3.02.79.8-2.94-.19-.31a7.86 7.86 0 0 1-1.2-4.2 7.9 7.9 0 1 1 8.15 7.99Zm4.4-5.75c-.24-.12-1.42-.7-1.64-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1.02-.38-1.94-1.2-.72-.64-1.2-1.42-1.34-1.66-.14-.24-.02-.38.1-.5.12-.12.26-.3.38-.46.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.46-.4-.4-.54-.4h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.66 4.1 3.64 2.02.82 2.42.66 2.86.62.44-.04 1.42-.58 1.62-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28Z" />
    </svg>
  );
}
