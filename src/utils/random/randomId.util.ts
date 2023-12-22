// the maximum of length is 30
export const GENERATE_RANDOM_ID_DEFAULT_LENGTH = 8
export const generateRandomId: (length?: number) => string = (length = GENERATE_RANDOM_ID_DEFAULT_LENGTH) => {
  const randomId = (new Date().getTime() * (1 + Math.random()) * 100000).toString(16)

  return `${randomId}${randomId}`.slice(0, length)
}
