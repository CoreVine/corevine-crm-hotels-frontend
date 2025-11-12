import { createLogger, transports, format } from "winston"
import type { TransformableInfo } from "logform"

const isServer = typeof window === "undefined"

interface Logger {
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  debug: (...args: unknown[]) => void
}

let logger: Logger

if (isServer) {
  logger = createLogger({
    level: process.env.NODE_ENV === "production" ? "info" : "debug",
    format: format.combine(
      format.timestamp(),
      format.printf((info: TransformableInfo) => {
        return `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
      })
    ),
    transports: [new transports.Console()]
  })
} else {
  logger = {
    info: (...args: unknown[]) => console.info("[INFO]:", ...args),
    warn: (...args: unknown[]) => console.warn("[WARN]:", ...args),
    error: (...args: unknown[]) => console.error("[ERROR]:", ...args),
    debug: (...args: unknown[]) => {
      if (process.env.NODE_ENV !== "production") {
        console.debug("[DEBUG]:", ...args)
      }
    }
  }
}

export default logger
