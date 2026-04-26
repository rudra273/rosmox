/**
 * Storely DBML schema data — kept separate from the page component
 * so schema definitions can be updated independently.
 */

export const STORELY_DBML = `
Table shops {
  id integer [pk, increment]
  uuid text [not null, unique]
  name text [not null]
  phone text
  email text
  gstin text
  address text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table app_settings {
  key text [not null]
  shop_id text [not null, default: 'local-shop']
  value text
  updated_at text [not null]
  deleted_at text
}

Table categories {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  name text [not null, note: 'COLLATE NOCASE']
  gst_percent real
  overhead_cost real
  profit_margin_percent real
  commission_percent real
  direct_price_toggle integer [not null, default: 0]
  manual_price real
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table units {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  name text [not null, note: 'COLLATE NOCASE']
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table suppliers {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  name text [not null, note: 'COLLATE NOCASE']
  phone text
  email text
  gstin text [note: 'optional']
  address text
  notes text
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table products {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  product_code text [note: 'optional user/company code']
  barcode text [note: 'optional scanner code']
  name text [not null, note: 'COLLATE NOCASE']
  category_id integer [ref: > categories.id]
  supplier_id integer [ref: > suppliers.id]
  selling_price real [not null, default: 0]
  purchase_price real [not null, default: 0]
  gst_percent real
  overhead_cost real
  profit_margin_percent real
  direct_price_toggle integer [not null, default: 0]
  manual_price real
  quantity_cache real [not null, default: 0, note: 'derived from stock_movements']
  unit_id integer [ref: > units.id]
  source text [not null, default: 'mobile']
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table customers {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  name text [not null, default: 'Walk-in Customer']
  phone text
  email text
  address text
  notes text
  total_purchase_amount real [not null, default: 0, note: 'cache from bills']
  bill_count integer [not null, default: 0, note: 'cache from bills']
  last_purchase_at text
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table bills {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  bill_number text [not null]
  customer_id integer [ref: > customers.id]
  customer_uuid text [note: 'for sync']
  customer_name text [not null, default: 'Walk-in Customer']
  customer_phone text
  subtotal_amount real [not null, default: 0]
  discount_percent real [not null, default: 0]
  discount_amount real [not null, default: 0]
  profit_commission_percent real [not null, default: 0]
  total_amount real [not null]
  item_count integer [not null]
  is_paid integer [not null, default: 1]
  payment_method text [not null, default: 'cash']
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table bill_items {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null]
  bill_id integer [not null, ref: > bills.id]
  bill_uuid text [not null, note: 'for sync']
  product_id integer [ref: > products.id]
  product_uuid text [note: 'for sync']
  product_name text [not null]
  unit_name text
  purchase_price_snapshot real [not null, default: 0]
  selling_price_snapshot real [not null, default: 0]
  cost_snapshot real [not null, default: 0]
  profit_snapshot real [not null, default: 0]
  commission_snapshot real [not null, default: 0]
  gst_snapshot real [not null, default: 0]
  was_direct_price integer [not null, default: 1]
  quantity real [not null, default: 0]
  subtotal real [not null]
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}

Table stock_movements {
  id integer [pk, increment]
  uuid text [not null, unique]
  shop_id text [not null, ref: > shops.uuid]
  product_id integer [not null, ref: > products.id]
  product_uuid text [not null, note: 'for sync']
  movement_type text [not null, note: 'purchase | sale | adjustment | return']
  quantity_delta real [not null, note: '+in / -out']
  unit_cost real
  source_type text [note: 'bill | purchase | manual | import']
  source_id integer [note: 'bill_id or null']
  source_uuid text [note: 'for sync']
  import_batch_key text
  notes text
  device_id text
  created_at text [not null]
  updated_at text [not null]
  deleted_at text
}
`;
