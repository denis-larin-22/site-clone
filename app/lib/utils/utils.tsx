import PaintedO from "@/app/components/ui/PaintedO";
import React from "react";

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
    return `https://piramidspace.com/admin/storage/${receivedPath}`
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
