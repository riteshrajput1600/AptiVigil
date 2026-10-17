import Link from 'next/link';

export function SiteFooter() {
  return (
    <footer className="siteFooter wrap !grid !min-h-[110px] !grid-cols-[auto_1fr_auto] !items-center !gap-x-[26px] !gap-y-[15px] !py-[15px] !text-[12px] !text-[#869591] max-[800px]:!grid-cols-[1fr_auto] max-[800px]:!py-6 max-[480px]:!grid-cols-1">
      <Link className="wordmark" href="/"><span className="mark">A</span> AptiVigil</Link>
      <p className="!m-0 max-[800px]:!col-span-full max-[800px]:!row-start-2">Assessment operations with clarity, control and human oversight.</p>
      <nav className="!flex !flex-wrap !gap-x-[22px] !gap-y-3 max-[800px]:!col-span-full max-[800px]:!row-start-3 max-[800px]:!gap-4 max-[480px]:!gap-3" aria-label="Footer navigation">
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/services">Services</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/solutions">Solutions</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/packages">Packages</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/pricing">Pricing</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/security">Security</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/about">About</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/faq">FAQ</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/contact">Contact</Link>
        <Link className="transition-colors hover:!text-[#147e71] max-[480px]:!text-[11px]" href="/login">Log in</Link>
      </nav>
      <small className="!col-span-full !border-t !border-[#e7eeea] !py-4 !text-[11px] !text-[#8c9a96] max-[800px]:!row-start-4">© {new Date().getFullYear()} AptiVigil</small>
    </footer>
  );
}
