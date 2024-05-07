export const convertToIST = (timestamp: string | number | Date) => {
    const date = new Date(timestamp);
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
    const istTime = new Date(date.getTime() + istOffset);
    const istTimeHours = istTime.getHours();
    const istTimeMinutes = istTime.getMinutes().toString().padStart(2, "0"); // Get minutes and pad with leading zero if necessary
    const period = istTimeHours >= 12 ? "PM" : "AM"; // Determine AM/PM
    const formattedHours = istTimeHours % 12 || 12; // Convert hours to 12-hour format
    return `${formattedHours}:${istTimeMinutes} ${period}`; // Return time portion in AM/PM format
  };

  export const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    const monthAbbreviation = new Intl.DateTimeFormat("en-US", {
      month: "short",
    }).format(date);
    const day = date.getDate();
    return `${monthAbbreviation} ${day}`;
  };



export function CurrentDate() {
  // Assuming currentDate is a Date object representing today's date
  const currentDate = new Date();
  // Get the year, month, and day components
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Adding 1 as month index starts from 0
  const day = String(currentDate.getDate()).padStart(2, '0');
  // Format the date in the desired format (YYYY-MM-DD)
  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate

}
