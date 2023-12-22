import { useRef } from 'react'
import { generateRandomId } from 'utils/random'

export function useRandomId(length: number): string[]
export function useRandomId(): string
export function useRandomId(length?: number): string | string[] {
  const { current: randomId } = useRef(length ? [...Array(length)].map(() => generateRandomId()) : generateRandomId())

  return randomId
}
