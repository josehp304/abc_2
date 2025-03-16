import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Utility function to fix grid hover issues by adding necessary classes
 * @param baseClasses - Base classes for the grid
 * @returns Combined classes with fixes for grid hover issues
 */
export function fixGridHover(baseClasses: string) {
  return cn(
    baseClasses,
    "relative z-0 isolation-isolate"
  )
}

/**
 * Utility function to fix grid item hover issues by adding necessary classes
 * @param baseClasses - Base classes for the grid item
 * @returns Combined classes with fixes for grid item hover issues
 */
export function fixGridItemHover(baseClasses: string) {
  return cn(
    baseClasses,
    "relative hover:z-50 transform-gpu backface-hidden will-change-transform"
  )
}
