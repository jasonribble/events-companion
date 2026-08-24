CREATE TABLE coupons (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(255) NOT NULL UNIQUE,
  discount_rate NUMERIC(5,4) NOT NULL,
  valid_from TIMESTAMPTZ,
  valid_to TIMESTAMPTZ,
  usage_limit INTEGER,
  used_count INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE orders (
  id BIGSERIAL PRIMARY KEY,
  order_number VARCHAR(255) NOT NULL UNIQUE,
  order_timestamp TIMESTAMPTZ NOT NULL,
  country VARCHAR(255) NOT NULL DEFAULT 'US',
  sku VARCHAR(255) NOT NULL,
  quantity INTEGER NOT NULL,
  unit_price NUMERIC(10,2) NOT NULL,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  discount_rate NUMERIC(5,4) NOT NULL DEFAULT 0,
  discount_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  subtotal_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  tax_rate NUMERIC(5,4) NOT NULL DEFAULT 0,
  tax_amount NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_price NUMERIC(10,2) NOT NULL,
  applied_coupon_code VARCHAR(255),
  status VARCHAR(50) NOT NULL
);
