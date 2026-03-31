# ReK AI Ek Kaynaklar

Bu klasor, ReK AI icin otomatik ingest edilen ek kaynak dosyalarini barindirir.

## Desteklenen dosya tipleri

- `.md`
- `.txt`

## Calistirma

Asagidaki komut `index.html`, `portfolio.html` ve bu klasordeki kaynaklardan
`js/res-ai/knowledge-generated.js` dosyasini yeniden uretir:

```bash
node "tools/build-rek-knowledge.mjs"
```

Ardindan deploy klasorune yansitmak icin:

```bash
./sync-deploy.sh
```

## Not

PDF dosyalari bu klasorde dogrudan parse edilmez. PDF metinlerinden ozet cikarmak
istersen ilgili notu `.md` veya `.txt` olarak bu klasore eklemen yeterlidir.
