export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function formatMoney(value, currency = "INR", locale = "en-IN") {
  const amount = Number(value ?? 0);

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function getProductDisplayPrice(product) {
  return (
    product?.specialPrice ||
    product?.minimumPrice ||
    product?.maximumPrice ||
    product?.price ||
    0
  );
}

export function mapConnectionNodes(connection) {
  return connection?.edges?.map((edge) => edge.node) ?? [];
}

export function resolveBagistoAssetUrl(assetUrl) {
  if (!assetUrl) {
    return "";
  }

  const backendOrigin = process.env.NEXT_PUBLIC_BAGISTO_ENDPOINT;

  if (!backendOrigin) {
    return assetUrl;
  }

  try {
    const backendUrl = new URL(backendOrigin);

    if (/^https?:\/\//i.test(assetUrl)) {
      const parsedAssetUrl = new URL(assetUrl);
      const shouldReplaceOrigin =
        !parsedAssetUrl.port &&
        ["localhost", "127.0.0.1"].includes(parsedAssetUrl.hostname);

      if (!shouldReplaceOrigin) {
        return parsedAssetUrl.toString();
      }

      return new URL(
        `${parsedAssetUrl.pathname}${parsedAssetUrl.search}${parsedAssetUrl.hash}`,
        backendUrl
      ).toString();
    }

    return new URL(assetUrl, backendUrl).toString();
  } catch {
    return assetUrl;
  }
}
