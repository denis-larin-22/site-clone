import PaintedO from "@/app/components/ui/PaintedO";
import React from "react";
import { BASE_URL } from "../api/apiRequests";

export function getFutureDate(days: number): string {
    const today = new Date();
    today.setDate(today.getDate() + days);

    const day = today.getDate().toString().padStart(2, '0');
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based
    const year = today.getFullYear();

    return `${day}.${month}.${year}`;
}

// Validate input email value
export function validateEmail(email: string): boolean {
    if (!email.length) return false;
    // Regular expression for validating an Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate tel number value
export function validateTelNumber(telNumber: string): boolean {
    if (!telNumber.length) return false;
    // Regular expression for validating a phone number
    const phoneRegex = /^(?:\+?38)?0\d{9}$/;
    return phoneRegex.test(telNumber);
}

// Wraps text highlighted with # in blue
export function wrapInBlueText(text: string) {
    return text.split(/(#.*?#)/g).map((part, index) =>
        part.startsWith('#') && part.endsWith('#') ? (
            <span key={index} className="text-t-blue" >
                {part.slice(1, -1)}
            </span>
        ) : (
            part
        )
    );
};

// Replace all o's in the string with component <PaintedO/>
export function replaceOWithPaintedO(
    text: string,
    paintedOColor?: string,
    paintedOBgColor?: string
): JSX.Element[] {
    const parts = text.split(' ');
    const result: JSX.Element[] = [];

    parts.forEach((part, index) => {
        if (part.includes('о')) {
            const subParts = part.split('о');
            const wordElements: JSX.Element[] = [];

            subParts.forEach((subPart, subIndex) => {
                if (subPart) {
                    wordElements.push(<React.Fragment key={`text-${index}-${subIndex}`}>{subPart}</React.Fragment>);
                }
                if (subIndex < subParts.length - 1) {
                    wordElements.push(
                        <PaintedO
                            key={`painted-o-${index}-${subIndex}`}
                            color={paintedOColor}
                            bgColor={paintedOBgColor}
                        />
                    );
                }
            });

            result.push(
                <span key={`span-${index}`} className="whitespace-nowrap">
                    {wordElements}
                </span>
            );
        } else {
            result.push(<React.Fragment key={`text-${index}`}>{part}</React.Fragment>);
        }

        if (index < parts.length - 1) {
            result.push(<React.Fragment key={`space-${index}`}> </React.Fragment>);
        }
    });

    return result;
}

// Formats url-link of the image coming from the request
export function formatImagePathFromApi(receivedPath: string): string {
    return `${BASE_URL}/storage/${receivedPath}`
}

// Remove duplicates in arrays
export function removeDuplicates(array: (number | string)[]) {
    const result = new Set(array);

    return Array.from(result);
}

// Make to uppercase first letter
export function capitalizeFirstLetter(word: string | null): string | null {
    // Check if the word is not null and not empty
    if (word === null || word.length === 0) {
        return null; // Empty string if input value is null or empty
    }

    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Return true if value equals even number or 0
export function isNumberInArray(number: number, arrayNumber: number[]): boolean {
    return arrayNumber.includes(number);
}

// Sort array (words/numbers)
export function sortArray<T extends string | number>(arr: T[]): T[] {
    return arr.slice().sort((a, b) => {
        if (typeof a === "number" && typeof b === "number") {
            return a - b;
        }
        return String(a).localeCompare(String(b));
    });
}

export function reverseDateValue(inputDate: string) {
    const [year, month, day] = inputDate.split('-');
    return `${day}.${month}.${year}`;
}

// Correct declension of words in category details in the main menu of the catalog
export type DetailsWords = "пропозицій" | "кольорів" | "колекцій";

const declensions = {
    "пропозицій": ["пропозиція", "пропозиції", "пропозицій"],
    "кольорів": ["колір", "кольори", "кольорів"],
    "колекцій": ["колекція", "колекції", "колекцій"]
};

export function getCorrectWordDeclension(numberValue: number, word: DetailsWords): string {
    const declinationNumberOne = numberValue % 10;
    const declinationNumberTwo = numberValue % 100;

    if (declinationNumberTwo >= 11 && declinationNumberTwo <= 19) {
        return declensions[word][2]; // "пропозицій", "кольорів", "колекцій"
    } else if (declinationNumberOne === 1) {
        return declensions[word][0]; // "пропозиція", "колір", "колекція"
    } else if (declinationNumberOne >= 2 && declinationNumberOne <= 4) {
        return declensions[word][1]; // "пропозиції", "кольори", "колекції"
    } else {
        return declensions[word][2]; // "пропозицій", "кольорів", "колекцій"
    }
}


// Correct declension of words in countdown timer
export type TimeWords = "дні" | "години" | "хвилини" | "секунди";

const timeDeclensions = {
    "дні": ["день", "дні", "днів"],
    "години": ["година", "години", "годин"],
    "хвилини": ["хвилина", "хвилини", "хвилин"],
    "секунди": ["секунда", "секунди", "секунд"]
};

export function getCorrectTimeDeclension(numberValue: number, word: TimeWords): string {
    const declinationNumberOne = numberValue % 10;
    const declinationNumberTwo = numberValue % 100;

    if (declinationNumberTwo >= 11 && declinationNumberTwo <= 19) {
        return timeDeclensions[word][2]; // "днів", "годин", "хвилин", "секунд"
    } else if (declinationNumberOne === 1) {
        return timeDeclensions[word][0]; // "день", "година", "хвилина", "секунда"
    } else if (declinationNumberOne >= 2 && declinationNumberOne <= 4) {
        return timeDeclensions[word][1]; // "дні", "години", "хвилини", "секунди"
    } else {
        return timeDeclensions[word][2]; // "днів", "годин", "хвилин", "секунд"
    }
}

