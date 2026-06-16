import fs from 'fs/promises'
import path from 'path'

const apiKey = process.env.GOOGLE_MAPS_API_KEY
const placeQuery = process.env.GOOGLE_MAPS_PLACE_QUERY || 'Wood Wood Restaurant and Hostel Vientiane Laos'
const maxPhotos = Number(process.env.GOOGLE_MAPS_MAX_PHOTOS || 6)
const outputDir = path.resolve('public', 'gmaps-photos')

if (!apiKey) {
  console.error('Missing GOOGLE_MAPS_API_KEY. Set it in the environment before running the script.')
  process.exit(1)
}

async function mkdirp(dir) {
  await fs.mkdir(dir, { recursive: true })
}

async function fetchJson(url) {
  const res = await fetch(url)
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Fetch failed ${res.status} ${res.statusText}: ${body}`)
  }
  return res.json()
}

async function downloadPhoto(photoReference, index) {
  const photoUrl = new URL('https://maps.googleapis.com/maps/api/place/photo')
  photoUrl.searchParams.set('maxwidth', '1600')
  photoUrl.searchParams.set('photoreference', photoReference)
  photoUrl.searchParams.set('key', apiKey)

  const res = await fetch(photoUrl)
  if (!res.ok) {
    throw new Error(`Photo download failed ${res.status} ${res.statusText}`)
  }

  const buffer = Buffer.from(await res.arrayBuffer())
  const fileName = `gmaps-photo-${index + 1}.jpg`
  const filePath = path.join(outputDir, fileName)
  await fs.writeFile(filePath, buffer)
  return fileName
}

async function run() {
  await mkdirp(outputDir)

  console.log('Searching place:', placeQuery)
  const findUrl = new URL('https://maps.googleapis.com/maps/api/place/findplacefromtext/json')
  findUrl.searchParams.set('input', placeQuery)
  findUrl.searchParams.set('inputtype', 'textquery')
  findUrl.searchParams.set('fields', 'place_id,name,formatted_address')
  findUrl.searchParams.set('key', apiKey)

  const findData = await fetchJson(findUrl)
  if (!findData.candidates || findData.candidates.length === 0) {
    throw new Error('No place found for query: ' + placeQuery)
  }

  const place = findData.candidates[0]
  console.log('Found place:', place.name, '-', place.formatted_address)

  const detailsUrl = new URL('https://maps.googleapis.com/maps/api/place/details/json')
  detailsUrl.searchParams.set('place_id', place.place_id)
  detailsUrl.searchParams.set('fields', 'name,formatted_address,photo,website,url')
  detailsUrl.searchParams.set('key', apiKey)

  const detailsData = await fetchJson(detailsUrl)
  const details = detailsData.result
  if (!details) {
    throw new Error('No details returned for place id: ' + place.place_id)
  }

  if (!details.photos || details.photos.length === 0) {
    console.warn('No photos returned by the Places API for this place.')
    return
  }

  const photoRefs = details.photos.slice(0, maxPhotos)
  console.log(`Downloading ${photoRefs.length} photos to ${outputDir}`)
  const downloaded = []
  for (const [index, photo] of photoRefs.entries()) {
    process.stdout.write(`Downloading photo ${index + 1}... `)
    const fileName = await downloadPhoto(photo.photo_reference, index)
    downloaded.push({ fileName, photoReference: photo.photo_reference })
    console.log('done:', fileName)
  }

  const meta = {
    place: {
      name: details.name,
      address: details.formatted_address,
      website: details.website || null,
      mapsUrl: details.url || null,
      query: placeQuery,
      placeId: place.place_id,
    },
    downloaded,
  }

  await fs.writeFile(path.join(outputDir, 'gmaps-photos.json'), JSON.stringify(meta, null, 2), 'utf8')
  console.log('Saved metadata to gmaps-photos.json')
}

run().catch((error) => {
  console.error(error)
  process.exit(1)
})
