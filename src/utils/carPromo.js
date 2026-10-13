export const CAR_PROMO = {
  discountPercent: 10,
};

export function applyCarDiscount(price) {
  const p = Number(price);
  if (!Number.isFinite(p)) return { original: price, discounted: price };
  const discounted = Math.round(p * (1 - CAR_PROMO.discountPercent / 100));
  return { original: p, discounted };
}
