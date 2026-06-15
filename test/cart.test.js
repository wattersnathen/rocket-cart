import assert from "node:assert/strict";
import { test } from "node:test";

import { addItem, applyDiscount, cartTotal } from "../src/cart.js";

test("addItem appends and keeps the cart immutable", () => {
  const cart = [];
  const next = addItem(cart, { sku: "ROCKET-1", price: 99.5 });
  assert.equal(next.length, 1);
  assert.equal(cart.length, 0);
});

test("addItem rejects items without a sku", () => {
  assert.throws(() => addItem([], { price: 5 }), /sku/);
});

test("cartTotal sums price times quantity", () => {
  const cart = [
    { sku: "ROCKET-1", price: 100, qty: 2 },
    { sku: "FUEL-9", price: 25 },
  ];
  assert.equal(cartTotal(cart), 225);
});

test("applyDiscount rounds to cents", () => {
  assert.equal(applyDiscount(99.99, 10), 89.99);
});

test("applyDiscount rejects out-of-range percentages", () => {
  assert.throws(() => applyDiscount(100, 150), /range/);
});

import { mergeCarts } from "../src/cart.js";

test("mergeCarts sums duplicate sku quantities", () => {
  const a = [{ sku: "ROCKET-1", price: 99.5, qty: 1 }];
  const b = [{ sku: "ROCKET-1", price: 99.5, qty: 2 }];
  const merged = mergeCarts(a, b);
  assert.equal(merged.length, 1);
  assert.equal(merged[0].qty, 3);
});
