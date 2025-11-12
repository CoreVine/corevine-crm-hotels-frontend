export const routes = {
  home: "/dashboard",
  about: "/about",
  services: "/services",
  faq: "/faq",
  pricing: "/pricing",
  contact: "/contact",
  login: "/login",
  register: "/register",

  settings: "/dashboard/settings",

  clients: {
    index: "/dashboard/clients",
    trashed: "/dashboard/clients/trashed",
    create: "/dashboard/clients/create",
    edit: (id: number) => `/dashboard/clients/${id}/edit`,
    show: (id: number) => `/dashboard/clients/${id}`
  },
  expenses: {
    index: "/dashboard/expenses",
    trashed: "/dashboard/expenses/trashed",
    create: "/dashboard/expenses/create",
    edit: (id: number) => `/dashboard/expenses/${id}/edit`,
    show: (id: number) => `/dashboard/expenses/${id}`
  },

  cars: {
    index: "/dashboard/cars",
    trashed: "/dashboard/cars/trashed",
    create: "/dashboard/cars/create",
    edit: (id: number) => `/dashboard/cars/${id}/edit`,
    show: (id: number) => `/dashboard/cars/${id}`,
    showInternalLogs: (id: number) => `/dashboard/cars/${id}/internal`,
    showExternalLogs: (id: number) => `/dashboard/cars/${id}/external`,
    internalLogs: {
      index: "/dashboard/cars/internal-logs",
      trashed: "/dashboard/cars/internal-logs/trashed",
      create: "/dashboard/cars/internal-logs/create",
      edit: (id: number) => `/dashboard/cars/internal-logs/${id}/edit`,
      show: (id: number) => `/dashboard/cars/internal-logs/${id}`
    },
    externalLogs: {
      index: "/dashboard/cars/external-logs",
      trashed: "/dashboard/cars/external-logs/trashed",
      create: "/dashboard/cars/external-logs/create",
      edit: (id: number) => `/dashboard/cars/external-logs/${id}/edit`,
      show: (id: number) => `/dashboard/cars/external-logs/${id}`
    }
  },

  invoices: {
    index: "/dashboard/invoices",
    trashed: "/dashboard/invoices/trashed",
    create: "/dashboard/invoices/create",
    edit: (id: number) => `/dashboard/invoices/${id}/update`,
    show: (id: number) => `/dashboard/invoices/${id}`
  },
  categories: {
    index: "/dashboard/categories",
    trashed: "/dashboard/categories/trashed",
    create: "/dashboard/categories/create",
    edit: (id: number) => `/dashboard/categories/${id}/edit`,
    show: (id: number) => `/dashboard/categories/${id}`
  },
  currencies: {
    index: "/dashboard/currencies",
    trashed: "/dashboard/currencies/trashed",
    create: "/dashboard/currencies/create",
    edit: (id: number) => `/dashboard/currencies/${id}/edit`,
    show: (id: number) => `/dashboard/currencies/${id}`
  },
  agents: {
    index: "/dashboard/agents",
    trashed: "/dashboard/agents/trashed",
    create: "/dashboard/agents/create",
    edit: (id: number) => `/dashboard/agents/${id}/edit`,
    show: (id: number) => `/dashboard/agents/${id}`
  },

  vouchers: {
    index: "/dashboard/vouchers",
    trashed: "/dashboard/vouchers/trashed",
    create: "/dashboard/vouchers/create",
    edit: (id: number) => `/dashboard/vouchers/${id}/update`,
    show: (id: number) => `/dashboard/vouchers/${id}`
  },
  rooms: {
    index: "/dashboard/rooms",
    trashed: "/dashboard/rooms/trashed",
    create: "/dashboard/rooms/create",
    edit: (id: number) => `/dashboard/rooms/${id}/edit`,
    show: (id: number) => `/dashboard/rooms/${id}`
  },
  drivers: {
    index: "/dashboard/drivers",
    trashed: "/dashboard/drivers/trashed",
    create: "/dashboard/drivers/create",
    edit: (id: number) => `/dashboard/drivers/${id}/edit`,
    show: (id: number) => `/dashboard/drivers/${id}`
  },
  companies: {
    index: "/dashboard/companies",
    trashed: "/dashboard/companies/trashed",
    create: "/dashboard/companies/create",
    edit: (id: number) => `/dashboard/companies/${id}/edit`,
    show: (id: number) => `/dashboard/companies/${id}`
  },
  paymentTypes: {
    index: "/dashboard/payment-types",
    trashed: "/dashboard/payment-types/trashed",
    create: "/dashboard/payment-types/create",
    edit: (id: number) => `/dashboard/payment-types/${id}/edit`,
    show: (id: number) => `/dashboard/payment-types/${id}`
  },
  rates: {
    index: "/dashboard/rates",
    trashed: "/dashboard/rates/trashed",
    create: "/dashboard/rates/create",
    edit: (id: number) => `/dashboard/rates/${id}/edit`,
    show: (id: number) => `/dashboard/rates/${id}`
  },
  hotels: {
    index: "/dashboard/hotels",
    trashed: "/dashboard/hotels/trashed",
    create: "/dashboard/hotels/create",
    edit: (id: number) => `/dashboard/hotels/${id}/update`,
    show: (id: number) => `/dashboard/hotels/${id}`,
    showAging: (id: number) => `/dashboard/hotels/${id}/aging`
  },
  cities: {
    index: "/dashboard/cities",
    trashed: "/dashboard/cities/trashed",
    create: "/dashboard/cities/create",
    edit: (id: number) => `/dashboard/cities/${id}/update`,
    show: (id: number) => `/dashboard/cities/${id}`
  },
  meals: {
    index: "/dashboard/meals",
    trashed: "/dashboard/meals/trashed",
    create: "/dashboard/meals/create",
    edit: (id: number) => `/dashboard/meals/${id}/update`,
    show: (id: number) => `/dashboard/meals/${id}`
  },
  carReservations: {
    index: "/dashboard/car-reservations",
    history: "/dashboard/car-reservations/history",
    historyDetails: (id: number) => `/dashboard/car-reservations/history/${id}`,
    historySingleDetail: (id: number, logId: number) => `/dashboard/car-reservations/history/${id}/${logId}`,
    indexWithStatus: (status: string) => `/dashboard/car-reservations?status=${status}`,
    trashed: "/dashboard/car-reservations/trashed",
    create: "/dashboard/car-reservations/create",
    edit: (id: number) => `/dashboard/car-reservations/${id}/update`,
    show: (id: number) => `/dashboard/car-reservations/${id}`
  },
  airportReservations: {
    index: "/dashboard/airport-reservations",
    history: "/dashboard/airport-reservations/history",
    historyDetails: (id: number) => `/dashboard/airport-reservations/history/${id}`,
    historySingleDetail: (id: number, logId: number) => `/dashboard/airport-reservations/history/${id}/${logId}`,
    indexWithStatus: (status: string) => `/dashboard/airport-reservations?status=${status}`,
    trashed: "/dashboard/airport-reservations/trashed",
    create: "/dashboard/airport-reservations/create",
    edit: (id: number) => `/dashboard/airport-reservations/${id}/update`,
    show: (id: number) => `/dashboard/airport-reservations/${id}`
  },
  hotelReservations: {
    index: "/dashboard/hotel-reservations",
    history: "/dashboard/hotel-reservations/history",
    historyDetails: (id: number) => `/dashboard/hotel-reservations/history/${id}`,
    historySingleDetail: (id: number, logId: number) => `/dashboard/hotel-reservations/history/${id}/${logId}`,
    indexWithStatus: (status: string) => `/dashboard/hotel-reservations?status=${status}`,
    trashed: "/dashboard/hotel-reservations/trashed",
    create: "/dashboard/hotel-reservations/create",
    edit: (id: number) => `/dashboard/hotel-reservations/${id}/update`,
    show: (id: number) => `/dashboard/hotel-reservations/${id}`
  },
  reservations: {
    index: "/dashboard/reservations",
    mine: "/dashboard/reservations/mine",
    optionDate: "/dashboard/reservations-option-date",
    indexWithStatus: (status: string) => `/dashboard/reservations?status=${status}`,
    trashed: "/dashboard/reservations/trashed",
    create: "/dashboard/reservations/create",
    edit: (id: number) => `/dashboard/reservations/${id}/update`,
    show: (id: number) => `/dashboard/reservations/${id}`,
    showPayments: (id: number) => `/dashboard/reservations/${id}/payments`,
    payments: {
      index: "/dashboard/reservations/payments",
      create: "/dashboard/reservations/payments/create",
      edit: (id: number) => `/dashboard/reservations/payments/${id}/edit`,
      show: (id: number) => `/dashboard/reservations/payments/${id}`
    }
  }
}
