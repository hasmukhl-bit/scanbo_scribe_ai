export function logInfo(message: string, meta?: unknown) {
  if (process.env.NODE_ENV !== "production") {
    console.info(message, meta);
  }
}

export function logError(message: string, meta?: unknown) {
  console.error(message, meta);
}
