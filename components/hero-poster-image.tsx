import { asset } from '../lib/paths';

/** Cropped poster size; both modes share the same composition. */
const WIDTH = 2656;
const HEIGHT = 1452;
const SIZES = [960, 1600, 2400] as const;

function srcSet(mode: 'light' | 'dark') {
  return SIZES.map((w) => `${asset(`/hero/granary-wharf-${mode}-${w}.webp`)} ${w}w`).join(', ');
}

/**
 * The home hero poster: Granary Wharf at sunrise (light) or by lamplight (dark).
 * Both images are in the markup and CSS shows the one for the active theme, so the site's own
 * light/dark toggle works as well as the system setting. They are lazy so the hidden one is
 * never downloaded.
 */
export function HeroPosterImage({ alt }: { alt: string }) {
  return (
    <>
      {(['light', 'dark'] as const).map((mode) => (
        <img
          key={mode}
          className={`hero-poster__img hero-poster__img--${mode}`}
          src={asset(`/hero/granary-wharf-${mode}-1600.webp`)}
          srcSet={srcSet(mode)}
          sizes="100vw"
          width={WIDTH}
          height={HEIGHT}
          alt={alt}
          loading="lazy"
          decoding="async"
        />
      ))}
    </>
  );
}
