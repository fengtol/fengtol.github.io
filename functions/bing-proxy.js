/**
 * Cloudflare Pages Function - Bing API Proxy
 *
 * Deploy to Cloudflare Pages at: functions/bing-proxy.js
 *
 * Usage:
 * - GET /api/bing-proxy?suggest=关键词
 * - GET /api/bing-proxy?background=1
 */

export async function onRequest(context) {
    if (context.request.method !== 'GET') {
        return new Response('Method not allowed', { status: 405 });
    }

    const url = new URL(context.request.url);
    const suggest = url.searchParams.get('suggest');
    const background = url.searchParams.get('background');

    if (suggest) {
        const targetUrl = `https://api.bing.com/osjson.aspx?query=${encodeURIComponent(suggest)}`;
        const response = await fetch(targetUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const body = await response.text();
        return new Response(body, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store'
            }
        });
    }

    if (background) {
        const targetUrl = 'https://www.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1&mkt=zh-CN';
        const response = await fetch(targetUrl, {
            headers: {
                'Accept': 'application/json'
            }
        });
        const body = await response.text();
        return new Response(body, {
            status: response.status,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'public, max-age=86400' // 缓存24小时
            }
        });
    }

    return new Response(JSON.stringify({
        error: 'missing_parameters',
        error_description: 'Expected suggest or background query parameter'
    }), {
        status: 400,
        headers: {
            'Content-Type': 'application/json'
        }
    });
}
