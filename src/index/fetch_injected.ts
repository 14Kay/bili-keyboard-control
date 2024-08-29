
const originalFetch = window.fetch;

window.fetch = async function (url: RequestInfo | URL, options?: RequestInit) {
    if (typeof url === 'string' && url.split("?")[0] === "https://api.bilibili.com/x/web-interface/wbi/index/top/feed/rcmd") {
        try {
            const response = await originalFetch(url, options);
            if (options?.method?.toUpperCase() === 'GET') {
                const recommendResponse = await response.text();
                const recommend = JSON.parse(recommendResponse);

                // 过滤广告项目
                recommend.data.item = recommend.data.item.filter((item: any) => item.goto !== "ad");

                // 创建包含修改后内容的新响应对象
                return new Response(JSON.stringify(recommend), {
                    status: response.status,
                    statusText: response.statusText,
                    headers: response.headers,
                });
            }

            // 返回原始响应
            return response;
        } catch (error) {
            console.error('Fetch Error:', error);
            return Promise.reject(error);
        }
    }

    // 如果 URL 不匹配或条件不满足，则调用原始的 fetch
    return originalFetch(url, options);
};
