export const EQUIPMENT_LIST = [
  "Canon m50 mark i",
  "Canon m50 mark ii",
  "Canon 80d",
  "Dji Mini 2 SE",
  "Dji Osmo Pocket",
  "Dji Mic Mini",
  "Kimp Kp Mic",
  "Instax Wide Printer",
  "Canon EF-M 22mm prime lens",
  "Canon EF 50 mm prime lens",
  "Canon EF-M 55 - 200mm zoom lens",
  "Canon EF 75 - 300mm zoom lens",
  "Meingrafie 5000 b tripod",
  "Ulanzi tt53 tripod",
  "Ulanzi mt-16 mini tripod",
  "Smallrig vt20 mini tripod",
  "Smallrig phone holder",
  "Smallrig magic arm"
];

export const UNITS = [
  { unit: "00823", brand: "Canon", model: "80d", type: "DSLR", status: "Available" },
  { unit: "00502", brand: "Canon", model: "m50 mark ii", type: "Mirrorless", status: "Unavailable" },
  { unit: "01876", brand: "Instax", model: "Instax Link", type: "Printer", status: "Available" },
  { unit: "02344", brand: "Canon", model: "m50 mark i", type: "Mirrorless", status: "Unavailable" }
];

export const RECENT_RENTALS = [
  { unit: "00502", model: "m50 mark ii", renter: "G. Elvambuena", status: "Completed", balance: "Paid" },
  { unit: "01876", model: "Instax Link", renter: "R. Rellosa", status: "Completed", balance: "Paid" },
  { unit: "00823", model: "80d", renter: "J. Filomeno", status: "Completed", balance: "Paid" },
  { unit: "02344", model: "m50 mark i", renter: "M. Santos", status: "Ongoing", balance: "Owing" }
];

export const RECENT_TRANSACTIONS = [
  { date: "06/02/2025", name: "John Doe", model:"80D", addOns:"None", daily:"₱500.00", total:"₱500.00", days:1 },
  { date: "06/02/2025", name: "Lorem Ipsum", model:"M50 Mark ii", addOns:"Tripod", daily:"₱700.00", total:"₱700.00", days:1 },
  { date: "06/02/2025", name: "Jane Doe", model:"Mini 2 SE", addOns:"None", daily:"₱550.00", total:"₱550.00", days:1 },
  { date: "06/02/2025", name: "John Doe", model:"80D", addOns:"None", daily:"₱500.00", total:"₱500.00", days:1 }
];