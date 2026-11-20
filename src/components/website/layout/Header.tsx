'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { Shield, ChevronDown, Menu, X, ArrowUpRight } from 'lucide-react';

export const WebsiteHeader: React.FC = () => {
  const pathname = usePathname();
  const { settings, menus, buttons, isEffectiveMenuVisible, isEffectiveMenuItemVisible } = useCMS();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  if (!settings.header.isVisible) return null;

  // Resolve header menu
  const headerMenu = menus.find((m) => m.id === settings.header.navigationId) || menus[0];
  const isMenuVis = headerMenu ? isEffectiveMenuVisible(headerMenu) : false;

  // Resolve CTA button if configured
  const ctaBtn = buttons.find((b) => b.id === settings.header.ctaButtonId);

  return (
    <header className={`w-full z-40 transition-all ${settings.header.sticky ? 'sticky top-0 shadow-sm' : 'relative'} bg-legal-950 text-white border-b border-legal-800`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded bg-legal-800 border border-gold-500/40 flex items-center justify-center text-gold-500 group-hover:bg-legal-700 transition-colors">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif font-bold text-lg md:text-xl tracking-wider uppercase text-white block leading-none">
                {settings.name}
              </span>
              <span className="text-[10px] text-legal-300 tracking-widest uppercase font-sans mt-1 block">
                Attorneys at Law
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          {isMenuVis && headerMenu && (
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
              {headerMenu.items
                .filter((item) => isEffectiveMenuItemVisible(item, headerMenu))
                .sort((a, b) => a.order - b.order)
                .map((item) => {
                  const hasChildren = item.children && item.children.length > 0;
                  const visibleChildren = hasChildren
                    ? item.children!.filter((child) => isEffectiveMenuItemVisible(child, headerMenu, item.isVisible))
                    : [];
                  const isActive = pathname === item.url;

                  if (item.isButton) {
                    return (
                      <Link
                        key={item.id}
                        href={item.url}
                        target={item.target || '_self'}
                        className="ml-3 px-5 py-2.5 rounded bg-gold-500 hover:bg-gold-600 text-legal-950 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
                      >
                        {item.label}
                      </Link>
                    );
                  }

                  if (visibleChildren.length > 0) {
                    return (
                      <div
                        key={item.id}
                        className="relative group"
                        onMouseEnter={() => setOpenDropdown(item.id)}
                        onMouseLeave={() => setOpenDropdown(null)}
                      >
                        <Link
                          href={item.url}
                          className={`flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors hover:text-gold-500 ${
                            isActive ? 'text-gold-500' : 'text-legal-100'
                          }`}
                        >
                          <span>{item.label}</span>
                          <ChevronDown className="w-4 h-4 text-legal-400 group-hover:rotate-180 transition-transform" />
                        </Link>

                        {/* Dropdown Menu */}
                        <div
                          className={`absolute top-full left-0 w-64 py-2 mt-1 rounded bg-legal-900 border border-legal-700 shadow-xl transition-all duration-200 ${
                            openDropdown === item.id ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible -translate-y-2'
                          }`}
                        >
                          {visibleChildren.map((child) => (
                            <Link
                              key={child.id}
                              href={child.url}
                              target={child.target || '_self'}
                              className="block px-4 py-2.5 text-xs font-medium text-legal-200 hover:text-white hover:bg-legal-800 transition-colors"
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    );
                  }

                  return (
                    <Link
                      key={item.id}
                      href={item.url}
                      target={item.target || '_self'}
                      className={`px-3 py-2 text-sm font-medium transition-colors hover:text-gold-500 ${
                        isActive ? 'text-gold-500' : 'text-legal-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}

              {ctaBtn && ctaBtn.isVisible && (
                <Link
                  href={ctaBtn.destinationValue}
                  target={ctaBtn.target || '_self'}
                  className="ml-4 px-5 py-2.5 rounded bg-legal-700 hover:bg-legal-600 border border-gold-500/40 text-white text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  {ctaBtn.label}
                </Link>
              )}
            </nav>
          )}

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded text-legal-200 hover:text-white hover:bg-legal-800"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-legal-900 border-b border-legal-800 px-4 pt-2 pb-6 space-y-3">
          {headerMenu?.items
            .filter((item) => isEffectiveMenuItemVisible(item, headerMenu))
            .map((item) => {
              const visibleChildren = item.children
                ? item.children.filter((child) => isEffectiveMenuItemVisible(child, headerMenu, item.isVisible))
                : [];

              return (
                <div key={item.id} className="space-y-1">
                  <Link
                    href={item.url}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block py-2 text-base font-serif font-medium text-legal-100 hover:text-gold-500"
                  >
                    {item.label}
                  </Link>
                  {visibleChildren.length > 0 && (
                    <div className="pl-4 space-y-1 border-l border-legal-800">
                      {visibleChildren.map((child) => (
                        <Link
                          key={child.id}
                          href={child.url}
                          onClick={() => setMobileMenuOpen(false)}
                          className="block py-1.5 text-xs text-legal-300 hover:text-white"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

          <div className="pt-4 border-t border-legal-800">
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center py-3 rounded bg-gold-500 text-legal-950 font-semibold text-xs uppercase tracking-wider"
            >
              Contact the Firm
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
