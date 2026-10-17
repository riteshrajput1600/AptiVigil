import Link from 'next/link';

export function SiteHeader({ current }: { current?: string }) {
  return (
    <header className="siteHeader wrap !flex !min-h-[88px] !items-center !justify-between !gap-6 max-[800px]:!min-h-0 max-[800px]:!flex-wrap max-[800px]:!gap-3 max-[800px]:!py-3">
      <Link className="wordmark" href="/" aria-label="AptiVigil home">
        <span className="mark">A</span> AptiVigil
      </Link>
      <nav className="siteNav !flex !items-center !gap-6 max-[800px]:!order-3 max-[800px]:!w-full max-[800px]:!justify-between max-[800px]:!gap-4 max-[800px]:!overflow-x-auto max-[800px]:!py-1" aria-label="Main navigation">
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'platform' ? 'page' : undefined} href="/#platform">Platform</Link>
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'solutions' ? 'page' : undefined} href="/solutions">Solutions</Link>
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'services' ? 'page' : undefined} href="/services">Services</Link>
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'packages' ? 'page' : undefined} href="/packages">Packages</Link>
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'pricing' ? 'page' : undefined} href="/pricing">Pricing</Link>
        <Link className="whitespace-nowrap !text-[14px] !font-semibold !text-[#53696b] transition-colors hover:!text-[#147e71] aria-[current=page]:!text-[#147e71] aria-[current=page]:!underline aria-[current=page]:!underline-offset-[7px] max-[800px]:!text-[13px] max-[480px]:!text-[12px]" aria-current={current === 'contact' ? 'page' : undefined} href="/contact">Contact</Link>
      </nav>
      <div className="siteActions !flex !items-center !gap-4 max-[800px]:!gap-2">
        <Link aria-current={current === 'login' ? 'page' : undefined} className="inline-flex items-center justify-center rounded-[7px] border border-[#cbdad2] bg-white px-[15px] py-[11px] font-[Manrope] text-[13px] font-bold text-[#152d35] transition-colors hover:border-[#8ebba5] hover:bg-[#f1f8f3] hover:text-[#147e71] aria-[current=page]:border-[#8ebba5] aria-[current=page]:bg-[#f1f8f3] aria-[current=page]:text-[#147e71] max-[800px]:px-[10px] max-[800px]:py-[9px] max-[800px]:text-[12px] max-[480px]:px-[9px] max-[480px]:text-[11px]" href="/login">Log in</Link>
        <Link className="button buttonSmall !px-4 !py-3 !text-[13px] max-[800px]:!px-[13px] max-[800px]:!py-[11px] max-[800px]:!text-[12px] max-[480px]:!px-[10px] max-[480px]:!py-[10px] max-[480px]:!text-[11px]" href="/contact">Request a demo <span>↗</span></Link>
      </div>
    </header>
  );
}
