import { MetadataRoute } from 'next'
import { projects } from '@/data/projects'
import { absoluteUrl, siteUrl } from '@/lib/site'

const publicPagesUpdatedAt = new Date('2026-08-22T00:00:00Z')

export default function sitemap(): MetadataRoute.Sitemap {
    const projectEntries: MetadataRoute.Sitemap = projects.map((project) => ({
        url: absoluteUrl(`/projects/${project.slug}`),
        lastModified: new Date(project.verifiedAt),
        changeFrequency: 'monthly',
        priority: project.featured ? 0.9 : 0.7,
    }))

    return [
        {
            url: siteUrl,
            lastModified: publicPagesUpdatedAt,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: absoluteUrl('/projects'),
            lastModified: publicPagesUpdatedAt,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: absoluteUrl('/hiring'),
            lastModified: publicPagesUpdatedAt,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        ...projectEntries,
    ]
}
