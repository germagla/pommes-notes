import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function addSpaces(str: string) {
    // Check if the string contains any uppercase letters
    if (/[A-Z]/.test(str)) {
        // Replace uppercase letters with a space followed by the lowercase version of that letter
        return str.replace(/([A-Z])/g, ' $1').toLowerCase();
    }
    // Return the string unchanged if it doesn't contain uppercase letters
    return str;
}
