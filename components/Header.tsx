"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { navLinks, siteConfig } from "@/lib/data";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header
      style={{ viewTransitionName: "site-header" }}
      className="header-scroll sticky top-0 z-50 border-b border-iws-border bg-iws-cream/95 backdrop-blur supports-[backdrop-filter]:bg-iws-cream/80">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/images/logo.png"
            alt="IWS - International Warehouse & Shipping"
            width={52}
            height={52}
            priority
            className="h-12 w-12 rounded-md"
          />
          <span className="hidden flex-col leading-tight sm:flex">
            <span className="text-lg font-bold tracking-tight text-iws-charcoal">
              IWS
            </span>
            <span className="text-[11px] font-medium uppercase tracking-wide text-iws-charcoal/60">
              Warehousing &amp; FTZ Services
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const active =
              link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-iws-green/10 text-iws-green-dark"
                    : "text-iws-charcoal/80 hover:bg-black/[.04] hover:text-iws-charcoal"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 lg:flex">
          <a
            href={siteConfig.phoneHref}
            className="text-sm font-semibold text-iws-charcoal/80 hover:text-iws-charcoal"
          >
            {siteConfig.phone}
          </a>
          <Link
            href="/contact"
            className="rounded-full bg-iws-green px-5 py-2.5 text-sm font-semibold text-white shadow-sm btn-soft hover:bg-iws-green-dark"
          >
            Get a Quote
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-md text-iws-charcoal lg:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            className="h-6 w-6"
          >
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-iws-border bg-iws-cream lg:hidden">
          <nav className="container-page flex flex-col gap-1 py-4">
            {navLinks.map((link) => {
              const active =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-base font-medium ${
                    active
                      ? "bg-iws-green/10 text-iws-green-dark"
                      : "text-iws-charcoal/80"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-3 flex flex-col gap-3 border-t border-iws-border pt-4">
              <a
                href={siteConfig.phoneHref}
                className="text-base font-semibold text-iws-charcoal"
              >
                {siteConfig.phone}
              </a>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="rounded-full bg-iws-green px-5 py-3 text-center text-sm font-semibold text-white"
              >
                Get a Quote
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
