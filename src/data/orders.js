const orders = [
  {
    id: 'GB1234567890',
    placedText: 'Placed today',
    placedAt: '09:15 AM',
    itemCount: 3,
    status: 'Out for Delivery',
    statusClass: 'text-bg-success',
    progress: 3,
    total: 419,
    deliveryWindow: 'Today · 10–20 mins',
    deliveryCharge: 45,
    deliveryAddress: {
      name: 'Rahul Sharma',
      line1: 'A-1204, Noida',
      line2: 'Uttar Pradesh · 201301',
    },
    items: [
      { name: 'Amul Gold Milk', unit: '1 L', quantity: 1, price: 56, visual: 'milk', label: 'MILK' },
      { name: 'Aashirvaad Atta', unit: '5 kg', quantity: 1, price: 249, visual: 'atta', label: 'ATTA' },
      { name: 'Fresh Broccoli', unit: '500 g', quantity: 1, price: 69, visual: 'broccoli', label: 'FRESH' },
    ],
  },
  {
    id: 'GB1234567889',
    placedText: 'Placed 10 May',
    placedAt: '10:30 AM',
    itemCount: 5,
    status: 'Delivered',
    statusClass: 'bg-light text-dark border',
    progress: 4,
    total: 632,
    deliveryWindow: 'Delivered on 10 May',
    deliveryCharge: 0,
    deliveryAddress: {
      name: 'Rahul Sharma',
      line1: 'A-1204, Noida',
      line2: 'Uttar Pradesh · 201301',
    },
    items: [
      { name: 'Aashirvaad Atta', unit: '5 kg', quantity: 1, price: 249, visual: 'atta', label: 'ATTA' },
      { name: 'Fortune Sunlite Oil', unit: '1 L', quantity: 1, price: 135, visual: 'oil', label: 'OIL' },
      { name: 'Fresh Red Apples', unit: '1 kg', quantity: 1, price: 129, visual: 'apples', label: 'APPLE' },
      { name: 'Classic Snacks', unit: '120 g', quantity: 1, price: 35, visual: 'snacks', label: 'SNACK' },
      { name: 'Fresh Spinach', unit: '1 bunch', quantity: 1, price: 84, visual: 'broccoli', label: 'FRESH' },
    ],
  },
]

export function getOrderSubtotal(order) {
  return order.items.reduce((total, item) => total + item.price * item.quantity, 0)
}

export default orders
