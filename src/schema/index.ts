import { z } from "zod"

export const decimalString = z.string().regex(/^\d{1,6}(\.\d{1,2})?$/, "Invalid decimal format (max 8 digits, 2 decimal places)")

export const LoginSchema = z.object({
  email: z.string().email("messages.invalidEmail"),
  password: z.string().min(8, "messages.invalidPassword"),
  rememberMe: z.boolean().optional()
})

export const SendEmailSchema = z.object({
  type: z.string().nonempty("Required"),
  from: z.string().email("Invalid email"),
  subject: z.string().nonempty("Required"),
  message: z.string().nonempty("Required")
})

export const AgentSchema = {
  Create: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    password: z.string().nonempty("Password is required"),
    contact_number: z.string().nonempty("Contact Number is required"),
    address: z.string().nonempty("Address is required"),
    role: z.enum(["admin", "reservation", "finance"]),
    state: z.enum(["pending", "approved"])
  }),
  Update: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    contact_number: z.string().nonempty("Contact Number is required"),
    address: z.string().nonempty("Address is required"),
    role: z.enum(["admin", "reservation", "finance"]),
    state: z.enum(["pending", "approved", "active"])
  })
}

export const ClientSchema = {
  Create: z.object({
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone: z.string().nonempty("Phone is required"),
    nationality: z.string().nonempty("Address is required")
  }),
  Update: z.object({
    name: z.string().nonempty("Name is required").optional(),
    email: z.string().email("Invalid email").nonempty("Email is required").optional(),
    phone: z.string().nonempty("Phone is required").optional(),
    nationality: z.string().nonempty("Address is required").optional()
  })
}

export const CarReservationSchema = {
  Create: z.object({
    driver_id: z.number().min(0, "Driver is required"),
    client_id: z.number().optional(),
    airline: z.string().nonempty("Airline is required"),
    meeting_point: z.string().nonempty("Meeting Point is required"),
    coming_from: z.string().nonempty("Coming from is required"),
    status: z.enum(["pending", "done", "cancelled"], {
      message: "Invalid status, choose: pending, done, or cancelled only"
    }),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    arrival_date: z.coerce.date(),
    arrival_time: z
      .string()
      .regex(/^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9])(?::([0-9]|[0-5][0-9]))?$/, "Invalid time format (HH:mm:ss or H:m)")
      .optional(),
    comments: z.string().optional()
  }),
  Update: z.object({
    driver_id: z.number().min(0, "Driver is required"),
    client_id: z.number().optional(),
    airline: z.string().nonempty("Airline is required"),
    meeting_point: z.string().nonempty("Meeting Point is required"),
    coming_from: z.string().nonempty("Coming from is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    arrival_date: z.coerce.date(),
    status: z.enum(["pending", "done", "cancelled"], {
      message: "Invalid status, choose: pending, done, or cancelled only"
    }),
    arrival_time: z
      .string()
      .regex(/^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9])(?::([0-9]|[0-5][0-9]))?$/, "Invalid time format (HH:mm:ss or H:m)")
      .optional(),
    comments: z.string().optional()
  })
}

export const AirportReservationSchema = {
  Create: z.object({
    client_id: z.number().optional(),
    airport_name: z.string().nonempty("Airport Name is required"),
    airline: z.string().nonempty("Airline is required"),
    runner: z.string().nonempty("Runner is required"),
    flight_number: z.string().nonempty("Flight Number is required"),
    coming_from: z.string().nonempty("Coming from is required"),
    passenger_count: z.number().min(0, "Passenger Count is required"),
    status: z.enum(["pending", "done", "cancelled"], {
      message: "Invalid status, choose: pending, done, or cancelled only"
    }),
    persons_count: z.number().min(0, "Persons Count is required"),
    statment: z.number().min(0, "Statement is required"),
    price: z.coerce.number().min(0, "Price must be a positive number"),
    arrival_date: z.coerce.date(),
    arrival_time: z
      .string()
      .regex(/^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9])(?::([0-9]|[0-5][0-9]))?$/, "Invalid time format (HH:mm:ss or H:m)")
      .optional()
  }),
  Update: z.object({
    client_id: z.number().optional(),
    airport_name: z.string().nonempty("Airport Name is required").optional(),
    coming_from: z.string().nonempty("Coming from is required").optional(),
    airline: z.string().nonempty("Airline is required").optional(),
    runner: z.string().nonempty("Runner is required").optional(),
    flight_number: z.string().nonempty("Flight Number is required").optional(),
    passenger_count: z.number().min(0, "Passenger Count is required").optional(),
    status: z
      .enum(["pending", "done", "cancelled"], {
        message: "Invalid status, choose: pending, done, or cancelled only"
      })
      .optional(),
    persons_count: z.number().min(0, "Persons Count is required").optional(),
    statment: z.number().min(0, "Statement is required").optional(),
    price: z.coerce.number().min(0, "Price must be a positive number").optional(),
    arrival_date: z.coerce.date().optional(),
    arrival_time: z
      .string()
      .regex(/^([0-9]|[01][0-9]|2[0-3]):([0-9]|[0-5][0-9])(?::([0-9]|[0-5][0-9]))?$/, "Invalid time format (HH:mm:ss or H:m)")
      .optional()
  })
}

export const HotelSchema = {
  Create: z.object({
    city_id: z.number().min(0, "City is required"),
    name: z.string().nonempty("Name is required"),
    email: z.string().email("Invalid email").nonempty("Email is required"),
    phone_number: z.string().nonempty("Phone is required")
  }),
  Update: z.object({
    city_id: z.number().optional(),
    name: z.string().nonempty("Name is required").optional(),
    email: z.string().email("Invalid email").nonempty("Email is required").optional(),
    phone_number: z.string().nonempty("Phone is required").optional()
  })
}

export const HotelEmailSchema = z.object({
  email: z.string().email("Invalid email").nonempty("Email is required")
})

export const CategorySchema = z.object({
  name: z.string().nonempty("Name is required"),
  type: z.enum(["revenue", "expense"], { message: "Type is invalid. choose from: revenue, expense" }),
  is_active: z.boolean().optional()
})

export const CurrencySchema = z.object({
  name: z.string().nonempty("Name is required").max(255),
  code: z.string().nonempty("Code is required").max(10),
  value: z
    .string()
    .regex(/^\d+(\.\d+)?$/, "Must be a valid decimal number")
    .transform((val) => parseFloat(val)),
  is_active: z.boolean().optional()
})

export const DriverSchema = {
  Create: z.object({
    name: z.string().nonempty("Name is required"),
    phone: z.string().nonempty("Phone is required")
  }),
  Update: z.object({
    name: z.string().nonempty("Name is required").optional(),
    phone: z.string().nonempty("Phone is required").optional()
  })
}

export const CitySchema = {
  Create: z.object({
    name: z.string().nonempty("Name is required"),
    state: z.enum(["approved", "pending", "rejected"])
  }),
  Update: z.object({
    name: z.string().nonempty("Name is required").optional(),
    state: z.enum(["approved", "pending", "rejected"]).optional()
  })
}

export const MealSchema = {
  Create: z.object({
    meal_type: z.string().nonempty("Meal type is required"),
    state: z.enum(["approved", "pending", "rejected"])
  }),
  Update: z.object({
    meal_type: z.string().nonempty("Meal type is required").optional(),
    state: z.enum(["approved", "pending", "rejected"]).optional()
  })
}

export const RateSchema = {
  Create: z.object({
    name: z.string().nonempty("Name is required"),
    state: z.enum(["approved", "pending", "rejected"])
  }),
  Update: z.object({
    name: z.string().nonempty("Name is required").optional(),
    state: z.enum(["approved", "pending", "rejected"]).optional()
  })
}

export const CompanySchema = {
  Create: z.object({
    name: z.string().nonempty("Company Name is required"),
    state: z.enum(["approved", "pending", "rejected"])
  }),
  Update: z.object({
    name: z.string().nonempty("Company Name is required").optional(),
    state: z.enum(["approved", "pending", "rejected"]).optional()
  })
}

export const PaymentTypeSchema = {
  Create: z.object({
    name: z.string().nonempty("Company Name is required"),
    state: z.enum(["active", "inactive"])
  }),
  Update: z.object({
    name: z.string().nonempty("Company Name is required").optional(),
    state: z.enum(["active", "inactive"]).optional()
  })
}

export const RoomSchema = {
  Create: z.object({
    room_type: z.string().nonempty("Room type is required"),
    hotel_id: z.number().min(0, "Hotel is required")
  }),
  Update: z.object({
    room_type: z.string().nonempty("Room type is required").optional(),
    hotel_id: z.number().min(0, "Hotel is required").optional()
  })
}

export const HotelReservationSchema = {
  Create: z.object({
    hotel_id: z.number({ message: "Hotel is required" }),
    city_id: z.number({ message: "City is required" }),
    payment_type_id: z.number({ message: "Payment Type is required" }),
    meal_id: z.number({ message: "Meal is required" }),
    company_id: z.number({ message: "Company is required" }),
    rate_id: z.number({ message: "Rate is required" }),
    room_id: z.number({ message: "Room is required" }),
    check_in: z.coerce.date({ message: "Check-in date is required" }),
    check_out: z.coerce.date({ message: "Check-out date is required" }),
    rooms_count: z.number({ message: "Rooms count is required" }).min(1),
    price_type: z.enum(["static", "dynamic"], { message: "Price type is required" }),
    price_list: z.array(z.object({ day_number: z.number({ message: "Day number is required" }), price: z.coerce.number({ message: "Price is required" }).min(0, "Price must be a positive number") }).optional()).optional(),
    view: z.string({
      message: "Room view is required",
      required_error: "Room view is required"
    }),
    pax_count: z
      .number({
        message: "Pax count is required",
        required_error: "Pax count is required"
      })
      .min(1),
    adults: z
      .number({
        message: "Adults count is required",
        required_error: "Adults count is required"
      })
      .min(0),
    children: z
      .number({
        message: "Children count is required",
        required_error: "Children count is required"
      })
      .min(0),
    option_date: z.coerce.date({
      message: "Option date is required",
      required_error: "Option date is required"
    }),
    status: z.enum(["new", "in_revision", "confirmed", "cancelled", "refunded", "guaranteed"], {
      message: "Invalid status, choose: new, in_revision, confirmed, cancelled, refunded, or guaranteed only"
    }),
    confirmation_number: z.string({
      message: "Confirmation number is required",
      required_error: "Confirmation number is required"
    }),
    price: z.coerce
      .number({
        message: "Price is required",
        required_error: "Price is required"
      })
      .min(0, "Price must be a positive number")
  }),
  Update: z.object({
    hotel_id: z.number(),
    city_id: z.number(),
    payment_type_id: z.number(),
    meal_id: z.number(),
    company_id: z.number(),
    rate_id: z.number(),
    room_id: z.number(),
    check_in: z.coerce.date(),
    check_out: z.coerce.date(),
    rooms_count: z.number().min(1),
    view: z.string(),
    pax_count: z.number().min(1),
    adults: z.number().min(0),
    children: z.number().min(0),
    option_date: z.coerce.date(),
    status: z.enum(["new", "in_revision", "confirmed", "cancelled", "refunded", "guaranteed"]),
    confirmation_number: z.string(),
    price: z.coerce.number().min(0, "Price must be a positive number")
  })
}

export const VoucherSchema = {
  Create: z.object({
    hotel_id: z.number(),
    city_id: z.number(),
    meal_id: z.number(),
    company_id: z.number(),
    room_id: z.number(),
    pax: z.number().min(0),
    adults: z.number().min(0),
    children: z.number().min(0),
    view: z.string().nonempty("Required"),
    internal_confirmation: z.string().nonempty("Required"),
    nationality: z.string().nonempty("Required"),
    client_name: z.string().nonempty("Required"),
    hcn: z.string().nonempty("Required"),
    rooms_count: z.number().min(1),
    notes: z.string().nullable(),
    check_in: z.coerce.date(),
    check_out: z.coerce.date()
  }),
  Update: z.object({
    hotel_id: z.number(),
    city_id: z.number(),
    meal_id: z.number(),
    company_id: z.number(),
    room_id: z.number(),
    view: z.string(),
    adults: z.number().min(0),
    children: z.number().min(0),
    internal_confirmation: z.string(),
    nationality: z.string(),
    client_name: z.string(),
    hcn: z.string(),
    pax: z.number().min(0),
    rooms_count: z.number().min(1),
    notes: z.string().nullable(),
    check_in: z.coerce.date(),
    check_out: z.coerce.date()
  })
}

const ReservationClientSchema = z.object({
  client_id: z.number().optional(),
  name: z.string().optional(),
  email: z.string().email("Invalid email").optional(),
  phone: z.string().optional(),
  nationality: z.string().optional()
})

export const ReservationSchema = {
  Create: z
    .object({
      hasClient: z.boolean().optional(),
      client: ReservationClientSchema.optional().nullable(),
      hotel: HotelReservationSchema.Create,
      car: CarReservationSchema.Create.nullable().optional(),
      airport: AirportReservationSchema.Create.nullable().optional()
    })
    .superRefine((data, ctx) => {
      if (data.hasClient === false) {
        if (!data.client) {
          ctx.addIssue({
            path: ["client"],
            message: "Client data is required when hasClient is false.",
            code: z.ZodIssueCode.custom
          })
          return
        }

        const requiredFields = ["name", "email", "phone", "nationality"] as const
        for (const field of requiredFields) {
          if (!data.client?.[field]) {
            ctx.addIssue({
              path: ["client", field],
              message: `${field} is required when hasClient is false.`,
              code: z.ZodIssueCode.custom
            })
          }
        }
      }
    }),
  CreateWithoutClient: z.object({
    hasClient: z.boolean().optional(),
    client: z
      .object({
        client_id: z.number().optional()
      })
      .optional()
      .nullable(),
    hotel: HotelReservationSchema.Create,
    car: CarReservationSchema.Create.nullable().optional(),
    airport: AirportReservationSchema.Create.nullable().optional()
  }),
  Update: z.object({
    hasClient: z.boolean().optional(),
    client: z
      .object({
        client_id: z.number().optional(),
        name: z.string().optional(),
        email: z.string().email("Invalid email").optional(),
        phone: z.string().optional(),
        nationality: z.string().optional()
      })
      .optional(),
    hotel: HotelReservationSchema.Create.optional(),
    airport: AirportReservationSchema.Create.optional(),
    car: CarReservationSchema.Create.optional()
  })
}

export const InvoiceSchema = z.object({
  hotel_id: z.number(),
  category_id: z.number(),

  amount: z.string(),
  creation_date: z
    .string()
    .datetime({ offset: true })
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  from1: z
    .string()
    .datetime()
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  to1: z
    .string()
    .datetime()
    .or(z.string().regex(/^\d{4}-\d{2}-\d{2}$/)),
  from2: z.string().nullable().optional(),
  to2: z.string().nullable().optional(),

  customer_name: z.string().max(255),
  proxy_name: z.string().max(255),
  reservation_number: z.string().max(255),
  nights_count: z.number(),

  collection: z.object({
    amount_egp: z.string(),
    amount_sar: z.string(),
    amount_usd: z.string(),
    link: z.string().max(255)
  }),

  payment: z.object({
    amount_egp: z.string(),
    amount_sar: z.string(),
    amount_usd: z.string()
  })
})

export const CarSchema = z.object({
  make: z.string(),
  model: z.string(),
  code: z.string(),
  year: z.number(),
  vin: z.string(),
  seating_capacity: z.number(),
  transmission: z.enum(["automatic", "manual"]),
  type: z.enum(["internal", "external"])
})

export const InternalCarLogSchema = z.object({
  amount_currency_id: z.number(),
  reservation_id: z.number(),
  driver_id: z.number(),
  client_id: z.number(),
  car_id: z.number(),
  price_usd: decimalString,
  amount: decimalString,
  status: z.enum(["pending", "completed", "cancelled"]),
  notes: z.string().nullable(),
  date: z.coerce.date()
})

export const ExternalCarLogSchema = z.object({
  reservation_id: z.number(),
  driver_id: z.number(),
  client_id: z.number(),
  car_id: z.number(),
  cost: decimalString,
  collection: decimalString,
  amount_egp: decimalString,
  notes: z.string().nullable(),
  date: z.coerce.date()
})

export const ReservationPaymentSchema = z.object({
  category_id: z.number(),
  currency_id: z.number(),
  debit: decimalString,
  credit: decimalString,
  company_markup: decimalString,
  agent_commission: decimalString,
  payment: decimalString,
  date: z.coerce.date(),
  statement: z.string().nullable().optional(),
  collection_type: z.enum(["cash", "bank_transfer", "credit_card"]),
  collector_name: z.string().max(255).optional(),
  notes: z.string().nullable().optional()
})

export const ExpenseSchema = z.object({
  date: z.coerce.date(),
  category_id: z.number(),
  currency_id: z.number(),
  amount: decimalString,
  receipt_number: z.string().max(255).optional(),
  statement: z.string().nullable().optional(),
  status: z.string(),
  payment_method: z.string(),
  notes: z.string().nullable().optional()
})

export const HotelAgingSchema = z.object({
  hotel_id: z.number(),
  reservation_id: z.number(),
  currency_id: z.number(),
  category_id: z.number(),
  due_date: z.coerce.date(),
  amount: decimalString,
  notes: z.string().nullable().optional(),
  status: z.string(),
  paid_date: z.coerce.date().nullable().optional(),
  payment_method: z.string()
})
