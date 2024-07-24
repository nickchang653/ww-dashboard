export function getInitials(name: string) {
    const parts = name.split(' ');
    const initials = parts.map(part => part[0]).join('');
    return initials.toUpperCase();
}

export function formatCurrency(number: number) {
    // Ensure the number is correctly formatted with a dollar sign and commas
    let formattedNumber = '';
  
    if (number < 0) {
      // For negative numbers
      formattedNumber = `-$${Math.abs(number).toLocaleString()}`;
    } else {
      // For positive numbers
      formattedNumber = `$${number.toLocaleString()}`;
    }
  
    return formattedNumber;
  }