/** Toggle icon for the home page right-side slide-curtain (three horizontal lines). */
export function SidebarMenuIcon({ className }: { className?: string }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path
        d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
        fill="currentColor"
      />
    </svg>
  );
}
