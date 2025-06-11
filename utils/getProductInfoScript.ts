export const getProductInfoScript = `
  (function() {
    const info = document.querySelector('[data-testid="store-availability"]')?.innerText;
    const match = info?.match(/Aisle\\s+(\\d+),\\s+Bay\\s+(\\d+)/);
    const productId = window.location.href.match(/\\/pd\\/(\\d+)/)?.[1];
    const productName = document.querySelector('h1')?.innerText;

    if (match && productId) {
      const data = {
        product_id: productId,
        product_name: productName,
        aisle: match[1],
        bay: match[2],
        url: window.location.href,
        timestamp: new Date().toISOString()
      };
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    }
  })();
  true;
`;