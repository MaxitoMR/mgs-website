import Image from "next/image";

/* The header lockup: the leaf/droplet mark beside a TYPESET wordmark.
 *
 * Why not the logo PNG. That file is the full print lockup, and its tagline
 * only survives at large sizes — at a 44px header height the raster tagline
 * renders about 2.5px tall, which is why the logo had been scaled to 96–128px
 * and why the header had grown to ~234px. Setting the wordmark in Manrope
 * instead means the tagline is real text: legible at 10px, selectable, and
 * it scales with the user's font size rather than blurring.
 *
 * Color follows the artwork rather than inventing something: in the mark,
 * "MGS" and "& SERVICES" are green and "SUPPLY" is grey. Kept here, using the
 * AA-safe green (#54760F via --color-brand-green-text, 5.28:1) rather than
 * the vivid #80B515, which is 2.46:1 and belongs on surfaces, not lettering.
 *
 * The mark is alt="" because the adjacent text already names the company —
 * giving it alt text would make a screen reader announce MGS twice.
 */

type BrandLockupProps = {
  /** CSS length for the mark's height; the text scales alongside it. */
  markHeight: string;
  titleSize: string;
  taglineSize?: string;
  /** Off below ~sm, where a 9px tagline stops being worth the space. */
  showTagline?: boolean;
  priority?: boolean;
};

export function BrandLockup({
  markHeight,
  titleSize,
  taglineSize = "0.625rem",
  showTagline = true,
  priority = false,
}: BrandLockupProps) {
  return (
    <span className="flex items-center" style={{ gap: "0.6em" }}>
      <Image
        src="/images/mgs-mark.png"
        alt=""
        aria-hidden="true"
        width={218}
        height={320}
        priority={priority}
        className="w-auto flex-shrink-0"
        style={{ height: markHeight }}
      />
      <span className="flex flex-col justify-center leading-none">
        <span
          className="font-extrabold text-brand-green-text"
          style={{ fontSize: titleSize, letterSpacing: "-0.015em" }}
        >
          MGS <span className="text-[#666666]">Supply</span> &amp; Services
        </span>
        {showTagline && (
          <span
            className="text-[#666666]"
            style={{
              fontSize: taglineSize,
              letterSpacing: "0.13em",
              marginTop: "0.45em",
              fontWeight: 500,
            }}
          >
            total Janitorial management
          </span>
        )}
      </span>
    </span>
  );
}
