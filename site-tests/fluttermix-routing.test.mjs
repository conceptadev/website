import assert from 'node:assert/strict'
import test from 'node:test'

import nextConfig from '../next.config.mjs'

test('FlutterMix roots temporarily redirect to the canonical Concepta Mix page', async () => {
    const redirects = await nextConfig.redirects()
    const rootRedirects = redirects.filter(
        ({ source, destination }) =>
            source === '/' && destination === 'https://concepta.dev/mix',
    )

    assert.deepEqual(rootRedirects, [
        {
            source: '/',
            has: [{ type: 'host', value: 'fluttermix.com' }],
            destination: 'https://concepta.dev/mix',
            permanent: false,
        },
        {
            source: '/',
            has: [{ type: 'host', value: 'www.fluttermix.com' }],
            destination: 'https://concepta.dev/mix',
            permanent: false,
        },
    ])
})

test('the Concepta root is not redirected', async () => {
    const redirects = await nextConfig.redirects()

    assert.equal(
        redirects.some(
            ({ source, has }) =>
                source === '/' &&
                (!has || has.some(({ type, value }) => type === 'host' && value === 'concepta.dev')),
        ),
        false,
    )
})
