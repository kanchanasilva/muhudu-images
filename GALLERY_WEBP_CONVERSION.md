# Gallery WebP conversion report

**Date:** 2026-11-22  
**Source backup:** `backup/muhudu-backup-20261120-1155.sql`  
**Script:** `images/convert-gallery.js`  
**Migration:** `api/migrations/029_gallery_media_path_webp.sql`

## Summary

| Metric | Value |
|---|---|
| Gallery image rows | 101 |
| Converted & source deleted | 101 |
| Failed / missing | 0 |
| Video rows (unchanged) | 1 |
| Source formats | JPG×95, PNG×6 |
| Total source size | 23.57 MB |
| Total WebP size | 11.03 MB |
| Space saved | 12.54 MB (53%) |
| WebP settings | quality=80, effort=6, max width=1600 (no enlarge) |

## What changed

1. Located each of the 101 `gallery.type = 'image'` `media_path` values under `./images`.
2. Converted each JPG/PNG to a sibling `.webp` via Sharp.
3. Deleted the original JPG/PNG full-size sources; icons/thumbnails converted in a follow-up pass.
4. Added migration `029_gallery_media_path_webp.sql` to rewrite `gallery.media_path` extensions to `.webp`.

## Per-site counts

| Site folder | Images | Source | WebP | Saved |
|---|---:|---:|---:|---:|
| `bluedeep-trinco` | 2 | 3347 KB | 181 KB | 3166 KB |
| `british-sergeant-shipwreck` | 3 | 539 KB | 422 KB | 117 KB |
| `bus-wreck` | 8 | 905 KB | 543 KB | 362 KB |
| `butterfly-rock` | 6 | 859 KB | 592 KB | 267 KB |
| `fort-rock` | 5 | 865 KB | 672 KB | 193 KB |
| `gokanna-middle-reef` | 9 | 1487 KB | 1116 KB | 372 KB |
| `kalpitiya-trinco` | 2 | 2032 KB | 92 KB | 1940 KB |
| `kalu-point` | 12 | 1927 KB | 1386 KB | 541 KB |
| `kirala-gala` | 2 | 255 KB | 172 KB | 83 KB |
| `knife-rock` | 5 | 911 KB | 703 KB | 209 KB |
| `mortar-rock` | 10 | 1587 KB | 1147 KB | 440 KB |
| `navy-museum` | 18 | 6271 KB | 1889 KB | 4382 KB |
| `navy-reef` | 4 | 792 KB | 651 KB | 141 KB |
| `sithanane-rock` | 6 | 1012 KB | 762 KB | 249 KB |
| `swami-rock` | 4 | 552 KB | 373 KB | 178 KB |
| `white-rock` | 5 | 793 KB | 591 KB | 203 KB |

## File mapping (gallery id → path)

| id | before | after | source → webp |
|---:|---|---|---|
| 1 | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-03.JPG` | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-03.webp` | 176.4 → 139.1 KB |
| 2 | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-02.JPG` | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-02.webp` | 173.7 → 130.8 KB |
| 3 | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-01.JPG` | `british-sergeant-shipwreck/00000-british-sergeant-shipwreck-01.webp` | 189.0 → 152.5 KB |
| 28 | `navy-museum/00000-navy-museum-01.JPG` | `navy-museum/00000-navy-museum-01.webp` | 154.9 → 109.0 KB |
| 29 | `navy-museum/00000-navy-museum-02.png` | `navy-museum/00000-navy-museum-02.webp` | 2078.2 → 48.9 KB |
| 30 | `navy-museum/00000-navy-museum-03.JPG` | `navy-museum/00000-navy-museum-03.webp` | 98.8 → 57.1 KB |
| 31 | `navy-museum/00000-navy-museum-04.JPG` | `navy-museum/00000-navy-museum-04.webp` | 106.0 → 62.5 KB |
| 32 | `navy-museum/00000-navy-museum-05.JPG` | `navy-museum/00000-navy-museum-05.webp` | 86.5 → 43.9 KB |
| 33 | `navy-museum/00000-navy-museum-06.JPG` | `navy-museum/00000-navy-museum-06.webp` | 166.7 → 123.7 KB |
| 34 | `navy-museum/00000-navy-museum-07.JPG` | `navy-museum/00000-navy-museum-07.webp` | 190.1 → 145.5 KB |
| 35 | `navy-museum/00000-navy-museum-08.png` | `navy-museum/00000-navy-museum-08.webp` | 1718.1 → 40.4 KB |
| 36 | `navy-museum/00000-navy-museum-09.JPG` | `navy-museum/00000-navy-museum-09.webp` | 194.8 → 157.5 KB |
| 37 | `navy-museum/00000-navy-museum-10.JPG` | `navy-museum/00000-navy-museum-10.webp` | 203.8 → 166.0 KB |
| 38 | `navy-museum/00000-navy-museum-11.JPG` | `navy-museum/00000-navy-museum-11.webp` | 158.6 → 114.7 KB |
| 39 | `navy-museum/00000-navy-museum-12.JPG` | `navy-museum/00000-navy-museum-12.webp` | 163.8 → 122.0 KB |
| 40 | `navy-museum/00000-navy-museum-13.JPG` | `navy-museum/00000-navy-museum-13.webp` | 142.8 → 99.7 KB |
| 41 | `navy-museum/00000-navy-museum-14.JPG` | `navy-museum/00000-navy-museum-14.webp` | 166.6 → 125.3 KB |
| 42 | `navy-museum/00000-navy-museum-15.JPG` | `navy-museum/00000-navy-museum-15.webp` | 130.9 → 87.9 KB |
| 43 | `navy-museum/00000-navy-museum-16.JPG` | `navy-museum/00000-navy-museum-16.webp` | 142.3 → 101.8 KB |
| 44 | `navy-museum/00000-navy-museum-17.JPG` | `navy-museum/00000-navy-museum-17.webp` | 179.7 → 138.5 KB |
| 45 | `navy-museum/00000-navy-museum-18.JPG` | `navy-museum/00000-navy-museum-18.webp` | 188.6 → 145.0 KB |
| 46 | `swami-rock/00000-swami-rock-01.JPG` | `swami-rock/00000-swami-rock-01.webp` | 105.9 → 61.8 KB |
| 47 | `swami-rock/00000-swami-rock-02.JPG` | `swami-rock/00000-swami-rock-02.webp` | 151.8 → 106.6 KB |
| 48 | `swami-rock/00000-swami-rock-03.JPG` | `swami-rock/00000-swami-rock-03.webp` | 147.0 → 105.3 KB |
| 49 | `swami-rock/00000-swami-rock-04.JPG` | `swami-rock/00000-swami-rock-04.webp` | 146.8 → 99.7 KB |
| 50 | `mortar-rock/00000-mortar-rock-01.JPG` | `mortar-rock/00000-mortar-rock-01.webp` | 174.7 → 131.9 KB |
| 51 | `mortar-rock/00000-mortar-rock-02.JPG` | `mortar-rock/00000-mortar-rock-02.webp` | 149.4 → 100.0 KB |
| 52 | `mortar-rock/00000-mortar-rock-03.JPG` | `mortar-rock/00000-mortar-rock-03.webp` | 182.8 → 142.8 KB |
| 53 | `mortar-rock/00000-mortar-rock-04.JPG` | `mortar-rock/00000-mortar-rock-04.webp` | 171.2 → 132.0 KB |
| 54 | `mortar-rock/00000-mortar-rock-05.JPG` | `mortar-rock/00000-mortar-rock-05.webp` | 154.9 → 109.7 KB |
| 55 | `mortar-rock/00000-mortar-rock-06.JPG` | `mortar-rock/00000-mortar-rock-06.webp` | 155.8 → 115.4 KB |
| 56 | `mortar-rock/00000-mortar-rock-07.JPG` | `mortar-rock/00000-mortar-rock-07.webp` | 179.0 → 137.0 KB |
| 57 | `mortar-rock/00000-mortar-rock-08.JPG` | `mortar-rock/00000-mortar-rock-08.webp` | 140.7 → 96.0 KB |
| 58 | `mortar-rock/00000-mortar-rock-09.JPG` | `mortar-rock/00000-mortar-rock-09.webp` | 134.6 → 86.2 KB |
| 59 | `mortar-rock/00000-mortar-rock-10.JPG` | `mortar-rock/00000-mortar-rock-10.webp` | 144.2 → 96.1 KB |
| 60 | `butterfly-rock/00000-butterfly-rock-01.JPG` | `butterfly-rock/00000-butterfly-rock-01.webp` | 130.6 → 85.7 KB |
| 61 | `butterfly-rock/00000-butterfly-rock-02.JPG` | `butterfly-rock/00000-butterfly-rock-02.webp` | 120.2 → 73.5 KB |
| 62 | `butterfly-rock/00000-butterfly-rock-03.JPG` | `butterfly-rock/00000-butterfly-rock-03.webp` | 170.5 → 128.4 KB |
| 63 | `butterfly-rock/00000-butterfly-rock-04.JPG` | `butterfly-rock/00000-butterfly-rock-04.webp` | 136.3 → 94.7 KB |
| 64 | `butterfly-rock/00000-butterfly-rock-05.JPG` | `butterfly-rock/00000-butterfly-rock-05.webp` | 140.5 → 94.7 KB |
| 65 | `butterfly-rock/00000-butterfly-rock-06.JPG` | `butterfly-rock/00000-butterfly-rock-06.webp` | 160.8 → 114.6 KB |
| 66 | `gokanna-middle-reef/00000-gokanna-middle-reef-01.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-01.webp` | 204.0 → 166.5 KB |
| 67 | `gokanna-middle-reef/00000-gokanna-middle-reef-02.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-02.webp` | 173.8 → 133.2 KB |
| 68 | `gokanna-middle-reef/00000-gokanna-middle-reef-03.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-03.webp` | 111.3 → 63.7 KB |
| 69 | `gokanna-middle-reef/00000-gokanna-middle-reef-04.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-04.webp` | 200.4 → 165.6 KB |
| 70 | `gokanna-middle-reef/00000-gokanna-middle-reef-05.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-05.webp` | 196.4 → 161.6 KB |
| 71 | `gokanna-middle-reef/00000-gokanna-middle-reef-06.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-06.webp` | 155.8 → 112.7 KB |
| 72 | `gokanna-middle-reef/00000-gokanna-middle-reef-07.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-07.webp` | 149.1 → 104.1 KB |
| 73 | `gokanna-middle-reef/00000-gokanna-middle-reef-08.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-08.webp` | 171.1 → 129.1 KB |
| 74 | `gokanna-middle-reef/00000-gokanna-middle-reef-09.JPG` | `gokanna-middle-reef/00000-gokanna-middle-reef-09.webp` | 125.5 → 79.1 KB |
| 75 | `kalu-point/00000-kalu-point-01.JPG` | `kalu-point/00000-kalu-point-01.webp` | 202.0 → 168.7 KB |
| 76 | `kalu-point/00000-kalu-point-02.JPG` | `kalu-point/00000-kalu-point-02.webp` | 160.0 → 108.7 KB |
| 77 | `kalu-point/00000-kalu-point-03.JPG` | `kalu-point/00000-kalu-point-03.webp` | 157.9 → 115.7 KB |
| 78 | `kalu-point/00000-kalu-point-04.JPG` | `kalu-point/00000-kalu-point-04.webp` | 191.2 → 155.1 KB |
| 79 | `kalu-point/00000-kalu-point-05.JPG` | `kalu-point/00000-kalu-point-05.webp` | 143.9 → 97.8 KB |
| 80 | `kalu-point/00000-kalu-point-06.JPG` | `kalu-point/00000-kalu-point-06.webp` | 155.5 → 105.3 KB |
| 81 | `kalu-point/00000-kalu-point-07.JPG` | `kalu-point/00000-kalu-point-07.webp` | 208.7 → 168.2 KB |
| 82 | `kalu-point/00000-kalu-point-08.JPG` | `kalu-point/00000-kalu-point-08.webp` | 153.7 → 101.0 KB |
| 83 | `kalu-point/00000-kalu-point-09.JPG` | `kalu-point/00000-kalu-point-09.webp` | 134.4 → 90.0 KB |
| 84 | `kalu-point/00000-kalu-point-10.JPG` | `kalu-point/00000-kalu-point-10.webp` | 125.3 → 74.2 KB |
| 85 | `kalu-point/00000-kalu-point-11.JPG` | `kalu-point/00000-kalu-point-11.webp` | 121.8 → 70.7 KB |
| 86 | `kalu-point/00000-kalu-point-12.JPG` | `kalu-point/00000-kalu-point-12.webp` | 172.1 → 130.1 KB |
| 95 | `kirala-gala/00000-kirala-gala-01.JPG` | `kirala-gala/00000-kirala-gala-01.webp` | 107.3 → 62.0 KB |
| 96 | `kirala-gala/00000-kirala-gala-02.JPG` | `kirala-gala/00000-kirala-gala-02.webp` | 147.3 → 109.5 KB |
| 97 | `white-rock/00000-white-rock-01.JPG` | `white-rock/00000-white-rock-01.webp` | 192.1 → 154.3 KB |
| 98 | `white-rock/00000-white-rock-02.JPG` | `white-rock/00000-white-rock-02.webp` | 164.7 → 123.2 KB |
| 99 | `white-rock/00000-white-rock-03.JPG` | `white-rock/00000-white-rock-03.webp` | 130.0 → 82.3 KB |
| 100 | `white-rock/00000-white-rock-04.JPG` | `white-rock/00000-white-rock-04.webp` | 139.4 → 104.7 KB |
| 101 | `white-rock/00000-white-rock-05.JPG` | `white-rock/00000-white-rock-05.webp` | 167.1 → 126.3 KB |
| 102 | `knife-rock/00000-knife-rock-01.JPG` | `knife-rock/00000-knife-rock-01.webp` | 180.6 → 138.3 KB |
| 103 | `knife-rock/00000-knife-rock-02.JPG` | `knife-rock/00000-knife-rock-02.webp` | 208.0 → 171.9 KB |
| 104 | `knife-rock/00000-knife-rock-03.JPG` | `knife-rock/00000-knife-rock-03.webp` | 211.2 → 174.6 KB |
| 105 | `knife-rock/00000-knife-rock-04.JPG` | `knife-rock/00000-knife-rock-04.webp` | 169.8 → 122.7 KB |
| 106 | `knife-rock/00000-knife-rock-05.JPG` | `knife-rock/00000-knife-rock-05.webp` | 141.5 → 95.1 KB |
| 107 | `fort-rock/00000-fort-rock-01.JPG` | `fort-rock/00000-fort-rock-01.webp` | 154.9 → 119.3 KB |
| 108 | `fort-rock/00000-fort-rock-02.JPG` | `fort-rock/00000-fort-rock-02.webp` | 227.4 → 189.3 KB |
| 109 | `fort-rock/00000-fort-rock-03.JPG` | `fort-rock/00000-fort-rock-03.webp` | 162.7 → 122.1 KB |
| 110 | `fort-rock/00000-fort-rock-04.JPG` | `fort-rock/00000-fort-rock-04.webp` | 171.4 → 130.8 KB |
| 111 | `fort-rock/00000-fort-rock-05.JPG` | `fort-rock/00000-fort-rock-05.webp` | 148.8 → 110.6 KB |
| 112 | `sithanane-rock/00000-sithanane-rock-01.JPG` | `sithanane-rock/00000-sithanane-rock-01.webp` | 109.9 → 70.2 KB |
| 113 | `sithanane-rock/00000-sithanane-rock-02.JPG` | `sithanane-rock/00000-sithanane-rock-02.webp` | 167.3 → 125.7 KB |
| 114 | `sithanane-rock/00000-sithanane-rock-03.JPG` | `sithanane-rock/00000-sithanane-rock-03.webp` | 202.8 → 159.5 KB |
| 115 | `sithanane-rock/00000-sithanane-rock-04.JPG` | `sithanane-rock/00000-sithanane-rock-04.webp` | 171.2 → 127.6 KB |
| 116 | `sithanane-rock/00000-sithanane-rock-05.JPG` | `sithanane-rock/00000-sithanane-rock-05.webp` | 171.7 → 135.8 KB |
| 117 | `sithanane-rock/00000-sithanane-rock-06.JPG` | `sithanane-rock/00000-sithanane-rock-06.webp` | 189.0 → 143.6 KB |
| 118 | `bus-wreck/00000-bus-wreck-01.JPG` | `bus-wreck/00000-bus-wreck-01.webp` | 109.5 → 62.8 KB |
| 119 | `bus-wreck/00000-bus-wreck-02.JPG` | `bus-wreck/00000-bus-wreck-02.webp` | 78.9 → 35.7 KB |
| 120 | `bus-wreck/00000-bus-wreck-03.JPG` | `bus-wreck/00000-bus-wreck-03.webp` | 96.4 → 49.6 KB |
| 121 | `bus-wreck/00000-bus-wreck-04.JPG` | `bus-wreck/00000-bus-wreck-04.webp` | 147.4 → 101.8 KB |
| 122 | `bus-wreck/00000-bus-wreck-05.JPG` | `bus-wreck/00000-bus-wreck-05.webp` | 91.7 → 50.9 KB |
| 123 | `bus-wreck/00000-bus-wreck-06.JPG` | `bus-wreck/00000-bus-wreck-06.webp` | 114.3 → 66.3 KB |
| 124 | `bus-wreck/00000-bus-wreck-07.JPG` | `bus-wreck/00000-bus-wreck-07.webp` | 148.7 → 104.9 KB |
| 125 | `bus-wreck/00000-bus-wreck-08.JPG` | `bus-wreck/00000-bus-wreck-08.webp` | 118.1 → 70.6 KB |
| 142 | `kalpitiya-trinco/00000-kalpitiya-trinco-01.png` | `kalpitiya-trinco/00000-kalpitiya-trinco-01.webp` | 887.5 → 42.8 KB |
| 143 | `kalpitiya-trinco/00000-kalpitiya-trinco-02.png` | `kalpitiya-trinco/00000-kalpitiya-trinco-02.webp` | 1144.4 → 49.3 KB |
| 150 | `navy-reef/00000-navy-reef-01.JPG` | `navy-reef/00000-navy-reef-01.webp` | 253.0 → 228.5 KB |
| 151 | `navy-reef/00000-navy-reef-02.JPG` | `navy-reef/00000-navy-reef-02.webp` | 177.7 → 138.2 KB |
| 152 | `navy-reef/00000-navy-reef-03.JPG` | `navy-reef/00000-navy-reef-03.webp` | 184.7 → 148.3 KB |
| 153 | `navy-reef/00000-navy-reef-04.JPG` | `navy-reef/00000-navy-reef-04.webp` | 176.5 → 135.7 KB |
| 154 | `bluedeep-trinco/00000-bluedeep-trinco-01.png` | `bluedeep-trinco/00000-bluedeep-trinco-01.webp` | 1324.8 → 80.6 KB |
| 155 | `bluedeep-trinco/00000-bluedeep-trinco-02.png` | `bluedeep-trinco/00000-bluedeep-trinco-02.webp` | 2022.6 → 100.5 KB |

## Icons & thumbnails (follow-up)

**No extra migration SQL.** Icons and thumbnails are **not stored in the DB**. The UI derives them from `gallery.media_path` by swapping the `00000-` prefix for `icon-` / `thumbnail-` while keeping the same extension (`ui/src/components/Gallery.jsx`). After `029_gallery_media_path_webp.sql`, the app will request `.webp` variants automatically.

| Metric | Value |
|---|---|
| Icons converted | 101 |
| Thumbnails converted | 101 |
| Total variants | 202 |
| Failed / missing | 0 |
| Source size | 7.17 MB |
| WebP size | 3.78 MB |
| Space saved | 3.39 MB (47%) |
| Typical sizes | icons ~100px wide, thumbnails ~500px wide |

Machine-readable details: `images/gallery-variants-webp-conversion-report.json`.

```bash
cd images
npm run convert-gallery-variants
```

## Apply migration

```bash
# after uploading the new .webp files to muhudu-images / CDN
psql "$DATABASE_URL" -f api/migrations/029_gallery_media_path_webp.sql
```

## Reproduce locally

```bash
cd images
npm run convert-gallery          # uses gallery-convert-list.json
node convert-gallery.js --dry-run
```

Machine-readable details: `images/gallery-webp-conversion-report.json`.
