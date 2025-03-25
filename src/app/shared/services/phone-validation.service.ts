import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhoneValidationService {
 // Map of country codes to maximum digit lengths (excluding country code)
 private countryPhoneLengths: { [key: string]: { min: number, max: number } } = {
  'us': { min: 10, max: 10 }, // USA: 10 digits
  'ca': { min: 10, max: 10 }, // Canada: 10 digits
  'in': { min: 10, max: 12 }, // India: 10 digits
  'gb': { min: 10, max: 10 }, // UK: 10 digits
  'au': { min: 9, max: 9 },   // Australia: 9 digits
  'de': { min: 10, max: 11 }, // Germany: 10-11 digits
  'fr': { min: 9, max: 9 },   // France: 9 digits
  // Add more countries as needed
};

// Default length if country not in our list
private defaultLength = { min: 5, max: 15 };

/**
 * Get the allowed phone number length for a specific country
 */
getPhoneLengthForCountry(countryCode: string): { min: number, max: number } {
  return this.countryPhoneLengths[countryCode.toLowerCase()] || this.defaultLength;
}

/**
 * Validate and potentially format a phone number for a given country
 * Returns the valid number or null if invalid
 */
validatePhoneForCountry(
  phoneNumber: string, 
  countryCode: string, 
  enforceMaxLength = true
): { valid: boolean; formattedNumber?: string; errorMessage?: string } {
  // Strip all non-digit characters to get a clean number
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  
  // Get length rules for this country
  const lengthRules = this.getPhoneLengthForCountry(countryCode);
  
  // Check if the number meets the length requirements
  if (digitsOnly.length < lengthRules.min) {
    return { 
      valid: false, 
      errorMessage: `Phone number must be at least ${lengthRules.min} digits for ${countryCode.toUpperCase()}` 
    };
  }
  
  // If we need to enforce maximum length
  if (enforceMaxLength && digitsOnly.length > lengthRules.max) {
    // Trim to maximum allowed length
    const trimmed = digitsOnly.substring(0, lengthRules.max);
    
    return { 
      valid: true, 
      formattedNumber: trimmed
    };
  }
  
  return { valid: true };
}
}
