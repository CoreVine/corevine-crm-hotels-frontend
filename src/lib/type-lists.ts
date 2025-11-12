export const cityState = [
  { name: "Approved", value: "approved" },
  { name: "Pending", value: "pending" },
  { name: "Rejected", value: "rejected" }
]

export const mealState = [
  { name: "Approved", value: "approved" },
  { name: "Pending", value: "pending" },
  { name: "Rejected", value: "rejected" }
]

export const categoryType = [
  { name: "Revenue", value: "revenue" },
  { name: "Expense", value: "expense" }
]

export const carState = [
  { name: "Pending", value: "pending" },
  { name: "Done", value: "done" },
  { name: "Cancelled", value: "cancelled" }
]

export const airportState = [
  { name: "Pending", value: "pending" },
  { name: "Done", value: "done" },
  { name: "Cancelled", value: "cancelled" }
]

export const agentState = [
  { name: "Pending", value: "pending" },
  { name: "Approved", value: "approved" }
]

export const agentRoles = [
  { name: "Admin", value: "admin" },
  { name: "Reservation User", value: "reservation" },
  { name: "Finance User", value: "finance" }
]

export const hotelReservationState = [
  { name: "New", value: "new" },
  { name: "In revision", value: "in_revision" },
  { name: "Confirmed", value: "confirmed" },
  { name: "Cancelled", value: "cancelled" },
  { name: "Refunded", value: "refunded" },
  { name: "Guaranteed", value: "guaranteed" }
]

export const emailTypes = [
  { name: "New Request", value: "New Request" },
  { name: "Cut Stay", value: "Cut Stay" },
  { name: "Reinstate", value: "Reinstate" },
  { name: "Cancallation", value: "Cancallation" },
  { name: "Amendment", value: "Amendment" }
]

export const reservationsOrder = ["new", "in_revision", "confirmed", "guaranteed", "refunded", "cancelled"] as const

export const carTransmission = [
  { name: "Automatic", value: "automatic" },
  { name: "Manual", value: "manual" }
]

export const carType = [
  { name: "Internal", value: "internal" },
  { name: "External", value: "external" }
]

export const internalLogStatus = [
  { name: "Pending", value: "pending" },
  { name: "Completed", value: "completed" },
  { name: "Cancelled", value: "cancelled" }
]

export type ReservationStatus = (typeof reservationsOrder)[number]

export const HotelAgingStatus = [
  { name: "Pending", value: "pending" },
  { name: "Paid", value: "paid" },
  { name: "Cancelled", value: "cancelled" }
]

export const PaymentMethods = [
  { name: "Cash", value: "cash" },
  { name: "Bank Transfer", value: "bank_transfer" },
  { name: "Credit Card", value: "credit_card" },
  { name: "Cheque", value: "cheque" }
]
