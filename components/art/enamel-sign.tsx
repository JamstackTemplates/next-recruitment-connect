import type { Sector } from '../../content/sectors';
import { SectorIconArt } from './sector-icons';

/**
 * Vitreous-enamel platform sign plate with rounded corners, crisp white inner border,
 * four corner rivet holes, short hanging chains, sector icon and condensed signLabel.
 */
export function EnamelSign({
  sector,
  leadName,
  openCount,
  chainHeight = 22,
  size = 'md',
}: {
  sector: Sector;
  leadName?: string;
  openCount?: number;
  chainHeight?: number;
  size?: 'sm' | 'md' | 'lg';
}) {
  const isLg = size === 'lg';
  const isSm = size === 'sm';

  return (
    <div className="enamel-sign-swing inline-flex w-full flex-col items-center">
      {/* Hanging steel chains */}
      {chainHeight > 0 ? (
        <div
          aria-hidden="true"
          className="flex w-3/4 justify-between px-4"
          style={{ height: `${chainHeight}px` }}
        >
          <span className="h-full w-[3px] bg-ink/80 shadow-[1px_0_0_rgba(255,255,255,0.2)]" />
          <span className="h-full w-[3px] bg-ink/80 shadow-[1px_0_0_rgba(255,255,255,0.2)]" />
        </div>
      ) : null}

      {/* Vitreous enamel plate */}
      <div
        className={`relative w-full rounded-[0.65rem] border-[2.5px] border-[#FBF9F3] bg-enamel-plate text-[#FBF9F3] shadow-[0_0_0_2.5px_#101513,0_6px_0_rgba(10,13,12,0.38)] ${
          isLg ? 'px-7 py-6' : isSm ? 'px-4 py-3' : 'px-5 py-4'
        }`}
      >
        {/* Four corner enamel rivet holes */}
        <span aria-hidden="true" className="absolute top-2 left-2 h-2 w-2 rounded-full border border-[#FBF9F3]/80 bg-board" />
        <span aria-hidden="true" className="absolute top-2 right-2 h-2 w-2 rounded-full border border-[#FBF9F3]/80 bg-board" />
        <span aria-hidden="true" className="absolute bottom-2 left-2 h-2 w-2 rounded-full border border-[#FBF9F3]/80 bg-board" />
        <span aria-hidden="true" className="absolute right-2 bottom-2 h-2 w-2 rounded-full border border-[#FBF9F3]/80 bg-board" />

        <div className={`flex flex-col items-center text-center ${isLg ? 'gap-3' : 'gap-2'}`}>
          <span className="inline-flex items-center justify-center rounded-full border border-[#FBF9F3]/35 bg-[#10243D] p-2 text-flap">
            <SectorIconArt icon={sector.icon} size={isLg ? 38 : isSm ? 22 : 28} />
          </span>

          <span
            className={`font-display-condensed font-extrabold tracking-[0.06em] uppercase text-[#FBF9F3] ${
              isLg ? 'text-2xl sm:text-3xl' : isSm ? 'text-sm' : 'text-lg'
            }`}
          >
            {sector.signLabel}
          </span>

          {leadName || openCount !== undefined ? (
            <div className="mt-0.5 flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1 border-t border-[#FBF9F3]/25 pt-2 font-mono text-[0.72rem] tracking-wider uppercase">
              {leadName ? <span className="text-[#D9E5F4]">{leadName}</span> : null}
              {openCount !== undefined ? (
                <span className="rounded bg-flap px-1.5 py-0.5 font-extrabold text-[#141917]">
                  {openCount} open
                </span>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
