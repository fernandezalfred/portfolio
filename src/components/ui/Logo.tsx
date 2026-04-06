export default function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      width="96"
      height="36"
      viewBox="0 0 96 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Alfredo Fernandez logo"
    >
      {/* Badge background */}
      <rect width="36" height="36" rx="8" fill="#0B132A" />

      {/* Green accent bar */}
      <rect x="8" y="28" width="20" height="3" rx="1.5" fill="#0DB760" />

      {/* "A" letter */}
      <text
        x="7"
        y="24"
        fontFamily="Rubik, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#ffffff"
      >
        A
      </text>

      {/* "F" letter — slightly offset and green-tinted */}
      <text
        x="18"
        y="24"
        fontFamily="Rubik, sans-serif"
        fontWeight="700"
        fontSize="17"
        fill="#0DB760"
      >
        F
      </text>

      {/* Wordmark: "fernandez" */}
      <text
        x="44"
        y="15"
        fontFamily="Rubik, sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#0B132A"
        letterSpacing="0.5"
      >
        alfredo
      </text>
      <text
        x="44"
        y="28"
        fontFamily="Rubik, sans-serif"
        fontWeight="400"
        fontSize="11"
        fill="#4F5665"
        letterSpacing="0.5"
      >
        fernandez
      </text>
    </svg>
  );
}
