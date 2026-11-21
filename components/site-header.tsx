'use client';

import { useEffect, useRef, useState } from 'react';
import { DarkModeToggle } from 'jamstacks';
import { BrandMark } from './art/brand-mark';
import { TrussDivider } from './art/truss-divider';
import { SiteLink } from './site-link';

const NAV_ITEMS = [
  { href: '/roles/', label: 'Roles' },
  { href: '/sectors/', label: 'Sectors' },
  { href: '/candidates/', label: 'Candidates' },
  { href: '/employers/', label: 'Employers' },
  { href: '/team/', label: 'Team' },
] as const;

export function SiteHeader() {
  const menuRef = useRef<HTMLUListElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    const syncPopover = () => {
      const wide = window.matchMedia('(min-width: 900px)').matches;
      if (wide) {
        menu.removeAttribute('popover');
        setMenuOpen(false);
      } else if (!menu.hasAttribute('popover')) {
        menu.setAttribute('popover', 'auto');
      }
    };

    const onToggle = (event: Event) => {
      const state = (event as ToggleEvent).newState;
      setMenuOpen(state === 'open');
    };

    syncPopover();
    window.addEventListener('resize', syncPopover);
    menu.addEventListener('toggle', onToggle);
    return () => {
      window.removeEventListener('resize', syncPopover);
      menu.removeEventListener('toggle', onToggle);
    };
  }, []);

  function closePopoverIfMobile() {
    const menu = menuRef.current;
    if (!menu) return;
    if (menu.hasAttribute('popover') && typeof menu.hidePopover === 'function') {
      try {
        menu.hidePopover();
      } catch {
        // Already closed
      }
    }
  }

  return (
    <header className="site-header-bar">
      <div className="wrap flex min-h-[4.75rem] items-center justify-between gap-4 py-2">
        <SiteLink
          href="/"
          className="no-underline hover:no-underline"
          aria-label="Bridgework Recruitment — Home"
        >
          <BrandMark />
        </SiteLink>

        <nav aria-label="Main" className="flex items-center gap-3">
          <button
            type="button"
            className="mobile-nav-trigger"
            aria-controls="site-menu"
            aria-expanded={menuOpen}
            popoverTarget="site-menu"
            popoverTargetAction="toggle"
          >
            <svg width="16" height="16" viewBox="0 0 18 18" aria-hidden="true" fill="none">
              <path
                d="M2 4.5h14M2 9h14M2 13.5h14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span>Menu</span>
          </button>

          <ul
            ref={menuRef}
            id="site-menu"
            className="site-nav-list"
            popover="auto"
          >
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <SiteLink
                  href={item.href}
                  markCurrent="page"
                  className="nav-link"
                  onClick={closePopoverIfMobile}
                >
                  {item.label}
                </SiteLink>
              </li>
            ))}
            <li className="pt-2 min-[900px]:pt-0">
              <SiteLink
                href="/contact/"
                markCurrent="page"
                className="button min-h-[2.4rem] px-4 py-1.5 text-[0.94rem]"
                onClick={closePopoverIfMobile}
              >
                Contact
              </SiteLink>
            </li>
          </ul>

          <div className="shrink-0">
            <DarkModeToggle />
          </div>
        </nav>
      </div>
      <TrussDivider variant="thin" />
    </header>
  );
}
