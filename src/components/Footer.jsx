import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-8">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left side: Company name */}
        <div className="text-gray-600 text-sm">
          © {new Date().getFullYear()}{" "}
          <span className="font-semibold">CompSearch</span>. All rights
          reserved.
        </div>

        {/* Right side: Social icons */}
        <div className="flex items-center gap-4">
          {/* X (Twitter) */}
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
            className="hover:opacity-80 transition duration-200"
          >
            <img src="/assets/X.avif" alt="X (Twitter)" className="w-5 h-5" />
          </a>

          {/* LinkedIn */}
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:opacity-80 transition duration-200"
          >
            <img
              src="/assets/Linkedin.png"
              alt="LinkedIn"
              className="w-5 h-5"
            />
          </a>

          {/* GitHub */}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="hover:opacity-80 transition duration-200"
          >
            <img src="/assets/GitHub.png" alt="GitHub" className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
