export function addItem(cart, item) {
  if (!item.sku) throw new Error("item needs a sku");
  return [...cart, item];
}

export function cartTotal(cart) {
  return cart.reduce((sum, item) => sum + item.price * (item.qty ?? 1), 0);
}

export function applyDiscount(total, percent) {
  if (percent < 0 || percent > 100) throw new Error("percent out of range");
  return Math.round(total * (1 - percent / 100) * 100) / 100;
}

/** Merge two carts together, summing quantities for duplicate SKUs. */
export function mergeCarts(a, b) {
  const bySkus = new Map(a.map(item => [item.sku, { ...item }]));
  for (const item of b) {
    const existing = bySkus.get(item.sku);
    if (existing) {
      existing.qty = (existing.qty ?? 1) + (item.qty ?? 1);
    } else {
      bySkus.set(item.sku, { ...item });
    }
  }
  return [...bySkus.values()];
}
