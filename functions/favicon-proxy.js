export async function onRequest(context) {
    const { request } = context;
    const url = new URL(request.url);
    const domain = url.searchParams.get('domain');

    if (!domain) {
        return new Response('Missing domain parameter', { status: 400 });
    }

    // 使用Google的favicon服务
    const faviconUrl = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=64`;

    try {
        const response = await fetch(faviconUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (compatible; ChromeHomepage/1.0)'
            }
        });

        if (!response.ok) {
            // 如果Google服务失败，返回默认图标
            return new Response(getDefaultIcon(), {
                status: 200,
                headers: {
                    'Content-Type': 'image/svg+xml',
                    'Cache-Control': 'public, max-age=3600' // 缓存1小时
                }
            });
        }

        // 创建新响应，添加缓存头
        const newResponse = new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            headers: response.headers
        });

        // 设置缓存头以减少函数调用
        newResponse.headers.set('Cache-Control', 'public, max-age=86400'); // 缓存24小时
        newResponse.headers.set('CDN-Cache-Control', 'max-age=86400'); // Cloudflare缓存

        return newResponse;
    } catch (error) {
        console.error('Favicon proxy error:', error);
        // 返回默认图标
        return new Response(getDefaultIcon(), {
            status: 200,
            headers: {
                'Content-Type': 'image/svg+xml',
                'Cache-Control': 'public, max-age=3600'
            }
        });
    }
}

function getDefaultIcon() {
    return `<svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
<rect width="64" height="64" fill="#F3F4F6"/>
<text x="32" y="34" font-family="Arial, sans-serif" font-size="16" fill="#9B9BA4" text-anchor="middle" dy="0.3em">No</text>
</svg>`;
}