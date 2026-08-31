import nextra from 'nextra'

const withNextra = nextra({
    mdxOptions: {
        rehypePrettyCodeOptions: {
            theme: {
                dark: 'tokyo-night',
                light: 'github-light',
            },
        },
    },
})

export default withNextra({
    async redirects() {
        return [
            {
                source: '/',
                has: [{ type: 'host', value: 'fluttermix.com' }],
                destination: '/mix',
                permanent: false,
            },
            {
                source: '/',
                has: [{ type: 'host', value: 'www.fluttermix.com' }],
                destination: '/mix',
                permanent: false,
            },
            { source: '/docs', destination: '/documentation', permanent: true },
            { source: '/docs/:path*', destination: '/documentation/:path*', permanent: true },
            { source: '/naked_ui', destination: '/naked-ui', permanent: true },
            { source: '/documentation', destination: '/documentation/mix/overview/introduction', permanent: true },
            { source: '/documentation/ack', destination: '/documentation/ack/getting-started/overview', permanent: true },
            { source: '/documentation/ack/getting-started', destination: '/documentation/ack/getting-started/overview', permanent: true },
            { source: '/documentation/ack/essentials', destination: '/documentation/ack/essentials/schemas', permanent: true },
            { source: '/documentation/ack/how-to-guides', destination: '/documentation/ack/how-to-guides/flutter-form-validation', permanent: true },
            { source: '/documentation/ack/advanced', destination: '/documentation/ack/advanced/codecs', permanent: true },
            { source: '/documentation/ack/reference', destination: '/documentation/ack/reference/api-reference', permanent: true },
            { source: '/documentation/overview/:path*', destination: '/documentation/mix/overview/:path*', permanent: true },
            { source: '/documentation/guides/:path*', destination: '/documentation/mix/guides/:path*', permanent: true },
            { source: '/documentation/widgets/:path*', destination: '/documentation/mix/widgets/:path*', permanent: true },
            { source: '/documentation/tutorials/:path*', destination: '/documentation/mix/tutorials/:path*', permanent: true },
            { source: '/documentation/ecosystem/:path*', destination: '/documentation/mix/ecosystem/:path*', permanent: true },
            // The package was renamed from mix_tailwinds to mix_winds; keep the
            // published landing and ecosystem URLs reachable.
            { source: '/mix-tailwinds', destination: '/mix-winds', permanent: true },
            { source: '/documentation/mix/ecosystem/mix-tailwinds', destination: '/documentation/mix/ecosystem/mix-winds', permanent: true },
        ]
    },
})
