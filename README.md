# Channel Readiness — mockups

**Live:** <https://naveenpras.github.io/channel-readiness-mockups/>
· Source: <https://github.com/naveenpras/channel-readiness-mockups>

Interactive HTML mockups for the Channel Readiness screens in the Cloudinary DAM
console: linking SKUs to assets, checking those assets against per-channel
listing requirements, and generating compliant variations in bulk.

These are design mockups, not production code. They run entirely in the browser
with no build step and no backend.

## Screens

| File | What it covers |
|---|---|
| `Channel Readiness.dc.html` | The main app — readiness dashboard, product table, channel config, the SKU compliance matrix, the asset picker, and the bulk variation flow |
| `SKU Details.dc.html` | One SKU in depth: its originals, the per-channel variations generated from them, and why each one passes or fails |
| `SKU Channel Setup Flow.dc.html` | The three-step wizard for adding a new SKU and linking its assets |
| `Readiness Banner Options.dc.html` | Layout options for the dashboard banner |

## Viewing them

Published at <https://naveenpras.github.io/channel-readiness-mockups/>.

To run them locally instead: the pages load their design system and assets over
relative paths, so serve the directory rather than opening `file://` URLs:

```bash
python3 -m http.server 8000
```

Then open <http://localhost:8000/Channel%20Readiness.dc.html>.

`SKU Details.dc.html` renders whichever SKU it is given via a query parameter,
and falls back to the cordless drill when none is supplied:

```
SKU Details.dc.html?sku=FTW-RUN-60026
```

Channel Readiness links through with that parameter set, so clicking into a
product from the table or the SKU drawer opens that product's details.

## Sample catalogue

Seven products, each with its real capture dimensions. The compliance states in
the mockups are driven off those dimensions rather than invented, so the
failures shown are ones these assets would genuinely hit.

| SKU | Product | Images | Capture size |
|---|---|---|---|
| `CAM-DSLR-10026` | DSLR camera body | 4 | 1200 × 1600 |
| `BEV-NRG-20026` | Energy drink, berry | 4 + video | 2500 × 2500, 1946 × 1946 |
| `APW-SHT-30026` | Women's chambray shirt | 4 | up to 2671 × 3456 |
| `APM-POL-40026` | Men's piqué polo | 5 + video | 2304 × 3456 |
| `TLS-DRL-50026` | Cordless drill/driver | 5 + video | 960–1500 px square |
| `FTW-RUN-60026` | Running shoe | 6 + video | 2880 × 3456 |
| `HHS-WIP-70026` | Disinfecting wipes | 4 | 1000 × 1000 |

Source images come from the `test-master-assets` folder of the
`naveen-syndigo-test` Cloudinary environment, downsized to 800 px for the repo.

## Layout

```
assets/        product photography and channel logos
_ds/           the console design system (CSS, fonts, component bundle)
uploads/       design reference screenshots from the original bundle
support.js     the template runtime the .dc.html files are built on
image-slot.js  the <image-slot> component used for swappable images
sync.sh        stage, commit and push any local edits
index.html     landing page for the published site
.nojekyll      stops Pages running Jekyll, which would skip _ds/
```

## Pushing changes

```bash
./sync.sh "what changed"
```

The message is optional; without one the script writes a summary of which files
moved.
