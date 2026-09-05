const DEFAULT_SITE_URL = 'https://portfolio-i.vercel.app'

function resolveSiteUrl(value: string | undefined) {
  if (!value) {
    return DEFAULT_SITE_URL
  }

  try {
    const url = new URL(value)

    if (url.protocol !== 'http:' && url.protocol !== 'https:') {
      return DEFAULT_SITE_URL
    }

    return url.origin
  } catch {
    return DEFAULT_SITE_URL
  }
}

export const siteUrl = resolveSiteUrl(process.env.NEXT_PUBLIC_SITE_URL)
export const siteUrlObject = new URL(siteUrl)

export function absoluteUrl(pathname = '/') {
  return new URL(pathname, `${siteUrl}/`).toString()
}
