/**
 * Hero artwork: "Two banks of the Aire" — Granary Wharf, Leeds, drawn as a 1930s railway poster.
 * Screen-printed look: 2px ink outlines with rounded joins, slightly offset flat fills, rivet dots,
 * diagonal hatching for shadow and halftone dots only on the water. A striped poster sun sits behind
 * the Leeds skyline (Town Hall clock tower, Bridgewater Place, the Candle House); at night the same
 * disc becomes a pale moon, stars come out and the river carries the lamp light.
 *
 * The viewBox starts above zero so the sky can tuck under the hero copy. On phones the drawing is
 * widened and shifted so the crop lands on the near (candidate) bank and the bridge.
 */

const STARS = [
  [96, 18], [188, 46], [262, 8], [418, 34], [506, 4], [668, 28], [812, 12], [1004, 40],
  [1088, 6], [1262, 30], [1382, 52], [1180, 64], [340, 70], [36, 72],
] as const;

export function HeroBridgeScene() {
  return (
    <div className="hero-scene-art relative w-full overflow-hidden border-b-2 border-ink">
      <svg
        viewBox="0 -24 1440 454"
        className="relative block h-auto w-[190%] max-w-none -ml-[34%] sm:ml-0 sm:w-full"
        role="img"
        aria-label="Railway-poster illustration of Granary Wharf in Leeds. On the left bank, labelled Candidates, are brick back-to-backs, a canal warehouse with lit windows and a moored narrowboat, with a walker carrying a rucksack heading for the bridge. A green riveted Warren-truss footbridge crosses the River Aire with a lamp-yellow route line running over it. On the right bank, labelled Employers, are a glazed wharf office, a crane, a loading bay and a converted mill with its chimney, where a second figure waits. Leeds Town Hall's clock tower and Bridgewater Place stand on the skyline in front of a striped sun."
      >
        <defs>
          <pattern id="aire-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(38)">
            <line x1="0" y1="0" x2="0" y2="8" stroke="var(--ink)" strokeOpacity="0.2" strokeWidth="1.4" />
          </pattern>
          <pattern id="aire-halftone" width="14" height="10" patternUnits="userSpaceOnUse">
            <circle cx="3" cy="3" r="1.4" fill="var(--water-dot)" fillOpacity="0.34" />
            <circle cx="10" cy="8" r="1.1" fill="var(--water-dot)" fillOpacity="0.26" />
          </pattern>
          <pattern id="aire-brick" width="24" height="12" patternUnits="userSpaceOnUse">
            <path d="M0 0h24M0 6h24M0 0v6M12 0v6M6 6v6M18 6v6" stroke="var(--ink)" strokeOpacity="0.16" strokeWidth="0.9" fill="none" />
          </pattern>
          <clipPath id="aire-sun-clip">
            <circle cx="720" cy="196" r="214" />
          </clipPath>
        </defs>

        {/* ===================== SKY ===================== */}
        {/* No sky fill: the section's paper and grain show through, so copy and scene share one ground. */}

        {/* Stars (night only) */}
        <g fill="var(--flap)" style={{ opacity: 'var(--star-opacity)' }}>
          {STARS.map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r={x % 3 === 0 ? 1.8 : 1.2} />
          ))}
        </g>

        {/* Striped poster sun / night moon behind the skyline */}
        <g clipPath="url(#aire-sun-clip)">
          <rect x="500" y="-24" width="440" height="160" style={{ fill: 'var(--sun-fill)' }} />
          <rect x="500" y="146" width="440" height="22" style={{ fill: 'var(--sun-fill)' }} />
          <rect x="500" y="178" width="440" height="15" style={{ fill: 'var(--sun-fill)' }} />
          <rect x="500" y="202" width="440" height="10" style={{ fill: 'var(--sun-fill)' }} />
          <rect x="500" y="220" width="440" height="6" style={{ fill: 'var(--sun-fill)' }} />
        </g>

        {/* Gulls over the Aire */}
        <g fill="none" stroke="var(--ink)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.55">
          <path d="M432 64q8-8 16 0q8-8 16 0" />
          <path d="M470 92q6-6 12 0q6-6 12 0" />
          <path d="M1010 76q7-7 14 0q7-7 14 0" />
        </g>

        {/* Leeds skyline, printed flat in one pale ink */}
        <g fill="var(--skyline)">
          {/* Low city blocks along the horizon */}
          <path d="M0 246v-58h64v-26h58v26h46v-44h70v102Z" />
          <path d="M392 246v-40h56v-22h50v62Z" />
          <path d="M1036 246v-74h52v-30h64v104Z" />
          <path d="M1370 246v-66h70v66Z" />

          {/* Leeds Town Hall: colonnaded base, clock stage, belfry and dome */}
          <path d="M556 246v-56h4v-10h160v10h4v56Z" />
          <path d="M606 180v-86h68v86Z" />
          <path d="M600 94v-10h80v10Z" />
          <path d="M612 84v-44h56v44Z" />
          <path d="M606 40q34-46 68 0Z" />
          <path d="M637 0h6v-18h-6Z" />

          {/* The Candle House, the round tower on Granary Wharf */}
          <path d="M808 246V96q0-8 18-8t18 8v150Z" />
          {/* Bridgewater Place, its wedge roof and stepped flank */}
          <path d="M876 246V46l58-34v234Z" />
          <path d="M934 246V104h30v142Z" />
        </g>
        {/* Skyline detail lines: town hall columns and clock, office floor bands */}
        <g fill="none" stroke="var(--skyline-detail)" strokeWidth="3">
          {[574, 594, 614, 634, 654, 674, 694, 710].map((x) => (
            <line key={x} x1={x} y1="198" x2={x} y2="240" />
          ))}
          {[66, 86, 106, 126, 146, 166, 186, 206, 226].map((y) => (
            <line key={y} x1="884" y1={y} x2="928" y2={y} />
          ))}
          {[112, 140, 168, 196, 224].map((y) => (
            <line key={y} x1="812" y1={y} x2="840" y2={y} />
          ))}
          <circle cx="640" cy="132" r="15" />
          <path d="M640 132v-9m0 9 6 4" strokeLinecap="round" />
          <path d="M626 60v18M640 60v18M654 60v18" />
        </g>

        {/* ===================== RIVER AIRE ===================== */}
        <rect x="0" y="328" width="1440" height="102" fill="var(--water-fill)" />
        <rect x="0" y="330" width="1440" height="100" fill="url(#aire-halftone)" />
        {/* Bridge reflection: a broken, dimmed copy of the truss under the span */}
        <g stroke="var(--primary)" strokeWidth="5" strokeLinecap="round" opacity="0.32">
          <path d="M486 348 532 384M580 348 626 384M674 348 720 384M766 348 814 384M860 348 908 384" />
          <path d="M470 338h500" strokeDasharray="38 14" />
        </g>
        {/* Lamp glints on the water */}
        <g stroke="var(--flap)" strokeLinecap="round" strokeWidth="2.5" opacity="0.7">
          <line x1="400" y1="350" x2="446" y2="350" />
          <line x1="410" y1="362" x2="436" y2="362" />
          <line x1="414" y1="374" x2="430" y2="374" />
          <line x1="994" y1="350" x2="1040" y2="350" />
          <line x1="1004" y1="362" x2="1030" y2="362" />
          <line x1="1010" y1="374" x2="1024" y2="374" />
          <line x1="690" y1="404" x2="750" y2="404" />
        </g>
        <g stroke="var(--ink)" strokeOpacity="0.28" strokeWidth="1.5" strokeLinecap="round">
          <line x1="560" y1="414" x2="650" y2="414" />
          <line x1="785" y1="396" x2="875" y2="396" />
          <line x1="1100" y1="410" x2="1200" y2="410" />
          <line x1="40" y1="414" x2="120" y2="414" />
        </g>

        {/* ===================== LEFT BANK: CANDIDATES ===================== */}
        <path d="M0 284h416v94H0Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M0 318h416v60H0Z" fill="url(#aire-hatch)" />
        <line x1="0" y1="296" x2="416" y2="296" stroke="var(--ink)" strokeWidth="2" />
        {/* The Dark Arches under the station */}
        <path d="M34 378v-38a34 34 0 0 1 68 0v38M138 378v-38a34 34 0 0 1 68 0v38M242 378v-38a34 34 0 0 1 68 0v38" fill="var(--board)" fillOpacity="0.72" stroke="var(--ink)" strokeWidth="2" />

        {/* Brick back-to-backs */}
        <g>
          <rect x="26" y="168" width="166" height="116" fill="var(--brick)" />
          <rect x="22" y="164" width="166" height="120" fill="url(#aire-brick)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="14,164 105,112 196,164" fill="var(--enamel-plate)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="52" y="106" width="18" height="32" fill="var(--brick)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="142" y="114" width="18" height="28" fill="var(--brick)" stroke="var(--ink)" strokeWidth="2" />
          {[42, 86, 134].map((x) => (
            <g key={x}>
              <rect x={x} y="184" width="24" height="30" fill="var(--window-lit)" stroke="var(--ink)" strokeWidth="1.8" />
              <line x1={x + 12} y1="184" x2={x + 12} y2="214" stroke="var(--ink)" strokeWidth="1.4" />
              <line x1={x} y1="199" x2={x + 24} y2="199" stroke="var(--ink)" strokeWidth="1.4" />
              <rect x={x} y="232" width="24" height="30" fill={x === 86 ? 'var(--surface)' : 'var(--window-lit)'} stroke="var(--ink)" strokeWidth="1.8" />
            </g>
          ))}
        </g>

        {/* Victorian canal warehouse with hoist */}
        <g>
          <rect x="206" y="106" width="168" height="178" fill="var(--brick)" />
          <rect x="202" y="102" width="168" height="182" fill="url(#aire-brick)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="196,102 286,62 376,102" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <line x1="286" y1="74" x2="286" y2="108" stroke="var(--ink)" strokeWidth="2.4" />
          <circle cx="286" cy="84" r="5" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.8" />
          {[122, 174, 224].map((y, row) =>
            [222, 268, 316].map((x, col) => (
              <path
                key={`${row}-${col}`}
                d={`M${x} ${y + 34}V${y + 12}a14 14 0 0 1 28 0v22Z`}
                fill={(row + col) % 2 === 0 ? 'var(--window-lit)' : 'var(--enamel-plate)'}
                stroke="var(--ink)"
                strokeWidth="1.8"
              />
            )),
          )}
        </g>

        {/* Leeds & Liverpool narrowboat moored against the quay */}
        <g transform="translate(14 26)">
          <path d="M22 388h290q22 0 30-14H40q-14 0-18 14Z" fill="var(--board)" fillOpacity="0.28" />
          <path d="M40 360h282q20 0 26 14l-8 10H34q-10-4-10-12t16-12Z" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <line x1="34" y1="372" x2="340" y2="372" stroke="var(--flap)" strokeWidth="3" />
          <rect x="88" y="336" width="196" height="24" fill="var(--brick)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="84" y="330" width="204" height="8" rx="2" fill="var(--flap)" stroke="var(--ink)" strokeWidth="2" />
          {[108, 140, 172, 204, 236].map((x) => (
            <circle key={x} cx={x} cy="348" r="5" fill="var(--window-lit)" stroke="var(--ink)" strokeWidth="1.6" />
          ))}
          <rect x="262" y="341" width="14" height="19" fill="var(--enamel-plate)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M60 330v-10h8v10" fill="var(--board)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M330 362l20-26" stroke="var(--ink)" strokeWidth="2.4" strokeLinecap="round" />
        </g>

        {/* Candidate walking towards the bridge, rucksack on */}
        <g transform="translate(370 222) scale(1.42)">
          <rect x="-11" y="15" width="9" height="14" rx="2" fill="var(--brick)" stroke="var(--ink)" strokeWidth="1.6" />
          <circle cx="2" cy="7" r="5.5" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M2 13v16m0-12 9 6m-9-4-7 6m7 10-5 15m5-15 6 15" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>

        {/* ===================== RIGHT BANK: EMPLOYERS ===================== */}
        <path d="M1024 284h416v94h-416Z" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
        <path d="M1024 318h416v60h-416Z" fill="url(#aire-hatch)" />
        <line x1="1024" y1="296" x2="1440" y2="296" stroke="var(--ink)" strokeWidth="2" />
        <rect x="1062" y="232" width="76" height="52" fill="var(--board)" stroke="var(--ink)" strokeWidth="2" />
        <path d="M1066 244h68M1066 254h68M1066 264h68" stroke="var(--rule)" strokeWidth="1.4" />
        <rect x="1076" y="268" width="22" height="15" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.6" />
        <rect x="1102" y="264" width="22" height="19" fill="var(--brick)" stroke="var(--ink)" strokeWidth="1.6" />

        {/* Glazed wharf office on a concrete grid */}
        <g>
          <rect x="1054" y="100" width="176" height="184" fill="var(--enamel-plate)" />
          <rect x="1050" y="96" width="176" height="188" fill="var(--surface)" fillOpacity="0.14" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          {[116, 152, 188].map((y, row) =>
            [1066, 1106, 1146, 1186].map((x, col) => {
              const lit = (row === 1 && col < 3) || (row === 2 && col > 1) || (row === 0 && col === 0);
              return (
                <rect
                  key={`${row}-${col}`}
                  x={x}
                  y={y}
                  width="28"
                  height="24"
                  fill={lit ? 'var(--window-lit)' : 'var(--paper)'}
                  fillOpacity={lit ? '0.92' : '0.28'}
                  stroke="var(--ink)"
                  strokeWidth="1.5"
                />
              );
            }),
          )}
        </g>

        {/* Converted mill and chimney */}
        <g>
          <polygon points="1352,28 1378,28 1388,150 1342,150" fill="var(--brick)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <rect x="1348" y="24" width="34" height="8" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="1248" y="138" width="176" height="146" fill="var(--brick)" />
          <rect x="1244" y="134" width="176" height="150" fill="url(#aire-brick)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          <polygon points="1244,134 1288,100 1288,134 1332,100 1332,134 1376,100 1376,134 1420,100 1420,134" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round" />
          {[156, 206].map((y) =>
            [1264, 1312, 1360].map((x) => (
              <rect key={`${y}-${x}`} x={x} y={y} width="32" height="32" fill="var(--window-lit)" fillOpacity="0.86" stroke="var(--ink)" strokeWidth="1.7" />
            )),
          )}
        </g>

        {/* Wharf crane */}
        <g stroke="var(--ink)" strokeWidth="2" strokeLinejoin="round">
          <path d="M1234 284V56h12v228" fill="var(--flap)" />
          <path d="M1146 66l94-22 92 22v10l-92-12-94 12Z" fill="var(--flap)" />
          <line x1="1164" y1="74" x2="1164" y2="118" strokeWidth="1.6" />
          <path d="M1164 118v8a5 5 0 1 1-5 5" fill="none" strokeWidth="2" />
        </g>

        {/* Employer waiting at the far end with a clipboard */}
        <g transform="translate(1052 222) scale(1.42)">
          <circle cx="0" cy="7" r="5.5" fill="var(--enamel)" stroke="var(--ink)" strokeWidth="1.6" />
          <path d="M0 13v16m0-12-8 6m8-6 7 8m-7 8-4 15m4-15 4 15" stroke="var(--ink)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="-13" y="20" width="7" height="10" fill="var(--flap)" stroke="var(--ink)" strokeWidth="1.4" />
        </g>

        {/* ===================== CENTRE: RIVETED WARREN-TRUSS FOOTBRIDGE ===================== */}
        <g>
          <rect x="404" y="254" width="38" height="126" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="404" y="276" width="38" height="104" fill="url(#aire-hatch)" />
          <rect x="998" y="254" width="38" height="126" fill="var(--surface)" stroke="var(--ink)" strokeWidth="2" />
          <rect x="998" y="276" width="38" height="104" fill="url(#aire-hatch)" />
          <path d="M423 254v-36m594 36v-36" stroke="var(--ink)" strokeWidth="2.6" strokeLinecap="round" />
          {/* Lamp halos glow at night, stay subtle by day */}
          <circle cx="423" cy="212" r="20" fill="var(--flap)" fillOpacity="0.16" />
          <circle cx="1017" cy="212" r="20" fill="var(--flap)" fillOpacity="0.16" />
          <circle cx="423" cy="212" r="7.5" fill="var(--flap)" stroke="var(--ink)" strokeWidth="2" />
          <circle cx="1017" cy="212" r="7.5" fill="var(--flap)" stroke="var(--ink)" strokeWidth="2" />
        </g>

        <g>
          <rect x="412" y="274" width="620" height="22" fill="var(--primary)" />
          <path d="M424 274 L486 196 H954 L1016 274" fill="none" stroke="var(--primary)" strokeWidth="12" strokeLinejoin="round" />
          <path d="M424 274 L486 196 H954 L1016 274" fill="none" stroke="var(--ink)" strokeWidth="2.2" strokeLinejoin="round" />
          <path
            d="M486 196 L532 274 L580 196 L626 274 L674 196 L720 274 L766 196 L814 274 L860 196 L908 274 L954 196"
            fill="none"
            stroke="var(--primary)"
            strokeWidth="8.5"
            strokeLinejoin="round"
          />
          <path
            d="M486 196 L532 274 L580 196 L626 274 L674 196 L720 274 L766 196 L814 274 L860 196 L908 274 L954 196"
            fill="none"
            stroke="var(--ink)"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          {[486, 580, 674, 766, 860, 954].map((x) => (
            <line key={x} x1={x} y1="196" x2={x} y2="274" stroke="var(--ink)" strokeWidth="1.6" />
          ))}
          <rect x="410" y="270" width="620" height="22" fill="var(--primary)" stroke="var(--ink)" strokeWidth="2.2" />
          {Array.from({ length: 24 }, (_, idx) => 432 + idx * 25).map((rx) => (
            <circle key={rx} cx={rx} cy="281" r="2" fill="var(--flap)" />
          ))}
          {[486, 580, 674, 766, 860, 954].map((gx) => (
            <g key={gx}>
              <circle cx={gx} cy="196" r="5" fill="var(--primary)" stroke="var(--ink)" strokeWidth="1.8" />
              <circle cx={gx} cy="196" r="1.8" fill="var(--flap)" />
            </g>
          ))}
          {/* Builder's plate at mid-span */}
          <g transform="translate(674 204)">
            <rect x="0" y="0" width="92" height="20" rx="10" fill="var(--board)" stroke="var(--flap)" strokeWidth="1.6" />
            <text
              x="46"
              y="14"
              textAnchor="middle"
              fill="var(--flap)"
              fontSize="9.5"
              fontWeight="800"
              letterSpacing="1.6"
              style={{ fontFamily: 'var(--font-mono)' }}
            >
              EST. 2014
            </text>
          </g>
        </g>

        {/* Lamp-yellow route line from bank to bank */}
        <g>
          <path d="M170 284 H420 C520 284 560 250 720 250 C880 250 920 284 1020 284 H1266" fill="none" stroke="var(--ink)" strokeWidth="9" strokeLinecap="round" />
          <path d="M170 284 H420 C520 284 560 250 720 250 C880 250 920 284 1020 284 H1266" fill="none" stroke="var(--flap)" strokeWidth="5" strokeLinecap="round" />
          {[
            { cx: 170, cy: 284, fill: 'var(--primary)' },
            { cx: 423, cy: 284, fill: 'var(--surface)' },
            { cx: 720, cy: 250, fill: 'var(--flap)' },
            { cx: 1017, cy: 284, fill: 'var(--surface)' },
            { cx: 1266, cy: 284, fill: 'var(--enamel-plate)' },
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r={i === 2 ? 10 : 7.5} fill={node.fill} stroke="var(--ink)" strokeWidth="2.5" />
              {i === 2 ? <circle cx={node.cx} cy={node.cy} r="3.2" fill="var(--primary)" /> : null}
            </g>
          ))}
        </g>

        {/* Enamel bank labels */}
        <g transform="translate(262 296)">
          <rect width="154" height="32" rx="6" fill="var(--primary)" stroke="#FBF9F3" strokeWidth="2" />
          <text x="77" y="21" textAnchor="middle" fill="#FBF9F3" fontSize="13" fontWeight="800" letterSpacing="2.2" style={{ fontFamily: 'var(--font-mono)' }}>
            ← CANDIDATES
          </text>
        </g>
        <g transform="translate(1042 296)">
          <rect width="154" height="32" rx="6" fill="var(--enamel-plate)" stroke="#FBF9F3" strokeWidth="2" />
          <text x="77" y="21" textAnchor="middle" fill="#FBF9F3" fontSize="13" fontWeight="800" letterSpacing="2.2" style={{ fontFamily: 'var(--font-mono)' }}>
            EMPLOYERS →
          </text>
        </g>
      </svg>
    </div>
  );
}
