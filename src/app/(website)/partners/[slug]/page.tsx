'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useCMS } from '@/lib/cmsStore';
import { ArrowLeft, Mail, Phone, GraduationCap, Award, ShieldCheck } from 'lucide-react';

export default function PartnerDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const { pages } = useCMS();

  // Find partner from sections across pages
  let partner: any = null;
  for (const page of pages) {
    const sec = page.sections.find((s) => s.type === 'partners');
    if (sec && sec.content?.items) {
      const found = sec.content.items.find((p: any) => p.slug === slug);
      if (found) {
        partner = found;
        break;
      }
    }
  }

  if (!partner) {
    partner = {
      name: slug ? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) : 'Partner Profile',
      role: 'Senior Partner',
      bio: 'Senior partner admitted to practice before state and federal benches with extensive trial and corporate counseling experience.',
      email: 'partner@vanguardsterling.com',
      phone: '+1 (212) 555-0100',
      imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80',
      admissions: ['New York Bar', 'Supreme Court of the United States', 'Second Circuit Court of Appeals'],
      education: ['Harvard Law School, J.D.', 'Yale University, B.A.'],
    };
  }

  return (
    <div className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          href="/partners"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-legal-700 hover:text-legal-950 mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Partner Directory</span>
        </Link>

        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-5">
            <div className="rounded-lg border border-stone-200 overflow-hidden shadow-lg aspect-[4/5] bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={partner.imageUrl}
                alt={partner.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="mt-6 p-6 rounded-lg bg-[#fbfbfa] border border-stone-200 space-y-3">
              <h4 className="text-xs uppercase tracking-widest text-legal-950 font-semibold mb-3">
                Direct Contact
              </h4>
              {partner.email && (
                <a
                  href={`mailto:${partner.email}`}
                  className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-legal-800 transition-colors"
                >
                  <Mail className="w-4 h-4 text-legal-700" />
                  <span className="truncate">{partner.email}</span>
                </a>
              )}
              {partner.phone && (
                <a
                  href={`tel:${partner.phone}`}
                  className="flex items-center gap-2.5 text-xs text-gray-700 hover:text-legal-800 transition-colors"
                >
                  <Phone className="w-4 h-4 text-legal-700" />
                  <span>{partner.phone}</span>
                </a>
              )}
            </div>
          </div>

          <div className="md:col-span-7">
            <span className="text-xs font-semibold tracking-widest text-legal-700 uppercase font-sans mb-2 block">
              {partner.role}
            </span>
            <h1 className="text-4xl font-serif font-bold text-legal-950 mb-6">
              {partner.name}
            </h1>

            <div className="prose prose-neutral max-w-none text-gray-700 leading-relaxed space-y-4 mb-8">
              <p className="text-lg font-light leading-relaxed text-gray-800">
                {partner.bio}
              </p>
              <p>
                Throughout their tenure at Vanguard & Sterling, {partner.name} has represented sovereign institutions, multinational corporations, and private equity syndicates in multi-billion dollar transactions and high-stakes federal appeals.
              </p>
            </div>

            {partner.admissions && (
              <div className="mb-6 pt-6 border-t border-stone-200">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-legal-950 mb-3 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-legal-700" />
                  <span>Bar Admissions</span>
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {partner.admissions.map((adm: string, idx: number) => (
                    <li key={idx}>{adm}</li>
                  ))}
                </ul>
              </div>
            )}

            {partner.education && (
              <div className="mb-8 pt-6 border-t border-stone-200">
                <h3 className="text-sm uppercase tracking-wider font-semibold text-legal-950 mb-3 flex items-center gap-2">
                  <GraduationCap className="w-4 h-4 text-legal-700" />
                  <span>Education & Clerkships</span>
                </h3>
                <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                  {partner.education.map((edu: string, idx: number) => (
                    <li key={idx}>{edu}</li>
                  ))}
                </ul>
              </div>
            )}

            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded bg-legal-800 hover:bg-legal-700 text-white font-medium text-xs uppercase tracking-wider transition-colors shadow-sm"
            >
              Request Consultation with {partner.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
