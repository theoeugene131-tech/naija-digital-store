// Add a new product by adding an entry here, and dropping the matching
// file into data/downloads/.
const products = [
  {
    id: 'cv-template-pack',
    name: 'Modern CV Template Pack (5 designs)',
    description: 'Five clean, ATS-friendly CV templates, ready to edit.',
    priceNaira: 2000,
    file: 'cv-template-pack.zip'
  },
  {
    id: 'budget-tracker',
    name: 'Naira Budget Tracker (Excel)',
    description: 'A simple monthly budget spreadsheet with automatic totals.',
    priceNaira: 1500,
    file: 'budget-tracker.xlsx'
  }
];

module.exports = { products };
