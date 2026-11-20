'use client';

import React from 'react';
import Link from 'next/link';
import { useCMS } from '@/lib/cmsStore';
import { Shield, MapPin, Phone, Mail, ArrowUpRight } from 'lucide-react';

export const WebsiteFooter: React.FC = () => {
  const { settings, menus, isEffectiveMenuVisible, isEffectiveMenuItemVisible } = useCMS();

  if (!settings.footer.isVisible) return null;

  const footerMenu = menus.find((m) => m.id === settings.footer.navigationId || m.location === 'footer') || menus[1];
  const isMenuVis = footerMenu ? isEffectiveMenuVisible(footerMenu) : false;

  return (
    <footer className="bg-legal-950 text-legal-200 border-t border-legal-800 pt-16 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-legal-800/80">
          {/* Brand info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded bg-legal-800 border border-gold-500/40 flex items-center justify-center text-gold-500">
                <Shield className="w-4 h-4" />
              </div>
              <span className="font-serif font-bold text-lg tracking-wider uppercase text-white">
                {settings.name}
              </span>
            </div>
            <p className="text-legal-300 text-sm font-light leading-relaxed max-w-sm">
              {settings.footer.description}
            </p>
            <div className="pt-2 text-xs text-gold-500 uppercase tracking-widest font-semibold">
              Counsel of Distinction • Established 1978
            </div>
          </div>

          {/* Quick Navigation links */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Institutional Navigation
            </h4>
            {isMenuVis && footerMenu ? (
              <ul className="space-y-2 text-sm">
                {footerMenu.items
                  .filter((item) => isEffectiveMenuItemVisible(item, footerMenu))
                  .map((item) => (
                    <li key={item.id}>
                      <Link
                        href={item.url}
                        className="text-legal-300 hover:text-gold-500 transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-500">Navigation currently concealed.</p>
            )}
          </div>

          {/* Firm Registry & Contact */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-semibold mb-4">
              Headquarters Registry
            </h4>
            <div className="flex items-start gap-3 text-sm text-legal-300">
              <MapPin className="w-4 h-4 text-gold-500 shrink-0 mt-1" />
              <span>{settings.footer.address}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-legal-300">
              <Phone className="w-4 h-4 text-gold-500 shrink-0" />
              <a href={`tel:${settings.footer.phone}`} className="hover:text-white">
                {settings.footer.phone}
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm text-legal-300">
              <Mail className="w-4 h-4 text-gold-500 shrink-0" />
              <a href={`mailto:${settings.footer.email}`} className="hover:text-white">
                {settings.footer.email}
              </a>
            </div>

            <div className="pt-4">
              <Link
                href="/admin"
                className="inline-flex items-center gap-1.5 text-xs text-legal-400 hover:text-white transition-colors"
              >
                <span>CMS Admin Portal</span>
                <ArrowUpRight className="w-3 h-3" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom copyright and legal advertising disclaimer */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-legal-400">
          <p>{settings.footer.copyrightText}</p>
          <p className="text-[11px] text-legal-500 max-w-xl text-center md:text-right">
            Prior results do not guarantee a similar outcome. The material presented on this site is included for informational purposes only.
          </p>
        </div>
      </div>
    </footer>
  );
};
