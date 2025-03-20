// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
//   Modal,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import CountryFlag from 'react-native-country-flag'; // Import the flag library

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
// };
// const getCurrencyName = (currencyCode: string): string => {
//   const currencyNames: Record<string, string> = {
//     AED: 'United Arab Emirates Dirham', AFN: 'Afghan Afghani', ALL: 'Albanian Lek',  AMD: 'Armenian Dram',  ANG: 'Netherlands Antillean Guilder', AOA: 'Angolan Kwanza',  ARS: 'Argentine Peso', AUD: 'Australian Dollar',AWG: 'Aruban Florin',AZN: 'Azerbaijani Manat', BAM: 'Bosnia and Herzegovina Convertible Mark', BBD: 'Barbadian Dollar',  BDT: 'Bangladeshi Taka', BGN: 'Bulgarian Lev', BHD: 'Bahraini Dinar',  BIF: 'Burundian Franc', BMD: 'Bermudian Dollar', BND: 'Brunei Dollar', BOB: 'Bolivian Boliviano', BRL: 'Brazilian Real', BSD: 'Bahamian Dollar', BTN: 'Bhutanese Ngultrum', BWP: 'Botswana Pula', BYN: 'Belarusian Ruble', BZD: 'Belize Dollar', CAD: 'Canadian Dollar', CDF: 'Congolese Franc', CHF: 'Swiss Franc', CLP: 'Chilean Peso', CNY: 'Chinese Yuan',  COP: 'Colombian Peso', CRC: 'Costa Rican Colón', CUP: 'Cuban Peso', CVE: 'Cape Verdean Escudo', CZK: 'Czech Koruna',DJF: 'Djiboutian Franc', DKK: 'Danish Krone', DOP: 'Dominican Peso',
//     DZD: 'Algerian Dinar', EGP: 'Egyptian Pound', ERN: 'Eritrean Nakfa', ETB: 'Ethiopian Birr', EUR: 'Euro', FJD: 'Fijian Dollar', FKP: 'Falkland Islands Pound', GBP: 'British Pound', GEL: 'Georgian Lari', GGP: 'Guernsey Pound', GHS: 'Ghanaian Cedi', GIP: 'Gibraltar Pound', GMD: 'Gambian Dalasi', GNF: 'Guinean Franc', GTQ: 'Guatemalan Quetzal', GYD: 'Guyanese Dollar', HKD: 'Hong Kong Dollar', HNL: 'Honduran Lempira', HRK: 'Croatian Kuna', HTG: 'Haitian Gourde', HUF: 'Hungarian Forint', IDR: 'Indonesian Rupiah', ILS: 'Israeli New Shekel', INR: 'Indian Rupee', IQD: 'Iraqi Dinar', IRR: 'Iranian Rial', ISK: 'Icelandic Króna', JMD: 'Jamaican Dollar', JOD: 'Jordanian Dinar',JPY: 'Japanese Yen', KES: 'Kenyan Shilling', KGS: 'Kyrgyzstani Som', KHR: 'Cambodian Riel', KMF: 'Comorian Franc', KRW: 'South Korean Won', KWD: 'Kuwaiti Dinar', KYD: 'Cayman Islands Dollar', KZT: 'Kazakhstani Tenge', LAK: 'Lao Kip', LBP: 'Lebanese Pound', LKR: 'Sri Lankan Rupee', LRD: 'Liberian Dollar', LSL: 'Lesotho Loti', LTL: 'Lithuanian Litas', LVL: 'Latvian Lats', LYD: 'Libyan Dinar', MAD: 'Moroccan Dirham', MDL: 'Moldovan Leu', MGA: 'Malagasy Ariary', MKD: 'Macedonian Denar', MMK: 'Myanmar Kyat', MNT: 'Mongolian Tugrik', MOP: 'Macanese Pataca', MUR: 'Mauritian Rupee', MWK: 'Malawian Kwacha', MXN: 'Mexican Peso', MYR: 'Malaysian Ringgit', MZN: 'Mozambican Metical', NAD: 'Namibian Dollar', NGN: 'Nigerian Naira', NIO: 'Nicaraguan Córdoba', NOK: 'Norwegian Krone', NPR: 'Nepalese Rupee', NZD: 'New Zealand Dollar', OMR: 'Omani Rial', PAB: 'Panamanian Balboa', PEN: 'Peruvian Nuevo Sol', PGK: 'Papua New Guinean Kina', PHP: 'Philippine Peso',PKR: 'Pakistani Rupee',PLN: 'Polish Zloty',PYG: 'Paraguayan Guarani',  QAR: 'Qatari Rial', RON: 'Romanian Leu',
//     RSD: 'Serbian Dinar',RUB: 'Russian Ruble',RWF: 'Rwandan Franc', SAR: 'Saudi Riyal', SBD: 'Solomon Islands Dollar',SCR: 'Seychellois Rupee',SEK: 'Swedish Krona',SGD: 'Singapore Dollar',SHP: 'Saint Helena Pound', SLL: 'Sierra Leonean Leone', SOS: 'Somali Shilling', SRD: 'Surinamese Dollar', SSP: 'South Sudanese Pound', STD: 'São Tomé and Príncipe Dobra', SYP: 'Syrian Pound', SZL: 'Swazi Lilangeni', THB: 'Thai Baht', TJS: 'Tajikistani Somoni', TMT: 'Turkmenistani Manat',TND: 'Tunisian Dinar', TOP: 'Tongan Paʻanga', TRY: 'Turkish Lira', TTD: 'Trinidad and Tobago Dollar', TWD: 'New Taiwan Dollar',TZS: 'Tanzanian Shilling', UAH: 'Ukrainian Hryvnia', UGX: 'Ugandan Shilling', USD: 'United States Dollar', UYU: 'Uruguayan Peso',UZS: 'Uzbekistani Som',VEF: 'Venezuelan Bolívar',VND: 'Vietnamese Đồng',VUV: 'Vanuatu Vatu', WST: 'Samoan Tala',XAF: 'Central African CFA Franc', XCD: 'East Caribbean Dollar',XOF: 'West African CFA Franc',XPF: 'CFP Franc', YER: 'Yemeni Rial',ZAR: 'South African Rand',ZMK: 'Zambian Kwacha',ZWL: 'Zimbabwean Dollar',
//   };

//   return currencyNames[currencyCode] || currencyCode; // Default to currency code if name is not found
// };

// // Helper function to get country code from currency
// type CurrencyCode = keyof typeof currencySymbols;

// const getCountryCode = (currency: CurrencyCode): string => {
//   const currencyToCountry: { [key in CurrencyCode]: string } = {
//     INR: 'IN', USD: 'US', EUR: 'EU', GBP: 'GB', JPY: 'JP', AUD: 'AU', CAD: 'CA', CHF: 'CH', CNY: 'CN', SEK: 'SE', NZD: 'NZ', SGD: 'SG', ZAR: 'ZA', MXN: 'MX', BRL: 'BR', RUB: 'RU', KRW: 'KR', AED: 'AE', HKD: 'HK', MYR: 'MY',THB: 'TH', IDR: 'ID', PHP: 'PH', VND: 'VN', COP: 'CO', ARS: 'AR', CLP: 'CL', PEN: 'PE', TRY: 'TR', NOK: 'NO',DKK: 'DK', PLN: 'PL', HUF: 'HU', CZK: 'CZ', ILS: 'IL', KES: 'KE', EGP: 'EG', PKR: 'PK', LKR: 'LK', BDT: 'BD',
//     QAR: 'QA', OMR: 'OM', KWD: 'KW', BHD: 'BH', SAR: 'SA', KZT: 'KZ', UAH: 'UA', LBP: 'LB', JOD: 'JO', IQD: 'IQ',TND: 'TN', MAD: 'MA', DZD: 'DZ', TWD: 'TW', MNT: 'MN', RON: 'RO', BGN: 'BG', RSD: 'RS', HRK: 'HR', MKD: 'MK',AZN: 'AZ', GEL: 'GE', AMD: 'AM', BYN: 'BY', TMT: 'TM', UZS: 'UZ', TJS: 'TJ', KGS: 'KG', MZN: 'MZ', ANG: 'AN',PYG: 'PY', GHS: 'GH', NGN: 'NG', KHR: 'KH', LAK: 'LA', MMK: 'MM', BOB: 'BO', CUP: 'CU', MDL: 'MD', RWF: 'RW',
//     UGX: 'UG', AFN: 'AF', AOA: 'AO', AWG: 'AW', BAM: 'BA', BBD: 'BB', BIF: 'BI', BND: 'BN', BSD: 'BS', BTN: 'BT', BWP: 'BW', BZD: 'BZ', CDF: 'CD', CRC: 'CR', CVE: 'CV', DJF: 'DJ', DOP: 'DO', ERN: 'ER', ETB: 'ET', FJD: 'FJ',FKP: 'FK', FOK: 'FO', GGP: 'GG', GIP: 'GI', GNF: 'GN', GTQ: 'GT', GYD: 'GY', HNL: 'HN', HTG: 'HT', IMP: 'IM',IRR: 'IR', ISK: 'IS', JMD: 'JM', KID: 'KI', KMF: 'KM', KYD: 'KY', LRD: 'LR', LSL: 'LS', LYD: 'LY', MGA: 'MG',MOP: 'MO', MRU: 'MR', MUR: 'MU', MVR: 'MV', MWK: 'MW'
//   };

//   return currencyToCountry[currency] || 'US'; // Default to 'US' if not found
// };

// const CurrencyConverter = () => {
//   const [currencies, setCurrencies] = useState<string[]>([]);
//   const [fromCurrency, setFromCurrency] = useState('INR');
//   const [toCurrency, setToCurrency] = useState('USD');
//   const [amount, setAmount] = useState('');
//   const [convertedAmount, setConvertedAmount] = useState('0');
//   const [loading, setLoading] = useState(false);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isFromCurrency, setIsFromCurrency] = useState(true);


//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           'https://api.exchangerate-api.com/v4/latest/USD'
//         );
//         const data = await response.json();
//         const currencyList = Object.keys(data.rates);
//         setCurrencies(currencyList);
//         setFilteredCurrencies(currencyList);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching currency data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   useEffect(() => {
//     const autoConvert = async () => {
//       if (!amount) {
//         setConvertedAmount('0');
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
//         );
//         const data = await response.json();
//         const rate = data.rates[toCurrency];
//         const result = (parseFloat(amount) * rate).toFixed(2);
//         setConvertedAmount(result);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error converting currency:', error);
//         setLoading(false);
//       }
//     };

//     autoConvert();
//   }, [amount, fromCurrency, toCurrency]);

//   const handleSwap = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const handleSearch = (text: string) => {
//     setSearchTerm(text);
//     if (text.trim() === '') {
//       setFilteredCurrencies(currencies);
//     } else {
//       const filtered = currencies.filter((currency) =>
//         currency.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredCurrencies(filtered);
//     }
//   };

//   const selectCurrency = (currency: string) => {
//     if (isFromCurrency) {
//       setFromCurrency(currency);
//     } else {
//       setToCurrency(currency);
//     }
//     setShowModal(false);
//   };

  
//   const [conversionRate, setConversionRate] = useState<number>(1); // Define conversionRate

//   const handleConvert = () => {
//     if (!amount || isNaN(Number(amount))) {
//       console.error('Invalid amount');
//       return;
//     }

//     const numericAmount = parseFloat(amount); // Convert to number
//     const convertedAmountValue = numericAmount * conversionRate;

//     saveConvertedCurrency(fromCurrency, toCurrency, numericAmount, convertedAmountValue);
//     // setConvertedAmount(convertedAmountValue.toString()); // Convert back to string
//   };

//   const saveConvertedCurrency = async (
//     fromCurrency: string,
//     toCurrency: string,
//     amount: number,
//     convertedAmount: number
//   ) => {
//     try {
//       const response = await fetch('http://192.168.52.190:9000/api/convert', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ fromCurrency, toCurrency, amount, convertedAmount }),
//       });

//       const data = await response.json();
//       console.log('Currency saved:', data);
//     } catch (error) {
//       console.error('Error saving currency:', error);
//     }
//   };

    


//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Currency Converter</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#5e5af6" />
//       ) : (
//         <>
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={styles.pickerContainer}
//               onPress={() => {
//                 setIsFromCurrency(true);
//                 setShowModal(true);
//               }}
//             >
//               <View style={styles.currencyRow}>
//                 <View style={styles.flagContainer}>
//                   <CountryFlag isoCode={getCountryCode(fromCurrency)} size={20} />
//                 </View>
//                 <Text style={styles.currencyText}>From:  {fromCurrency}</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.swapButton}
//               onPress={handleSwap}
//             >
//               <Text style={styles.swapText}>⇄</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.pickerContainer}
//               onPress={() => {
//                 setIsFromCurrency(false);
//                 setShowModal(true);
//               }}
//             >
//               <View style={styles.currencyRow}>
//                 <View style={styles.flagContainer}>
//                   <CountryFlag isoCode={getCountryCode(toCurrency)} size={20} />
//                 </View>
//                 <Text style={styles.currencyText}>To:  {toCurrency}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               placeholder="Amount"
//               style={styles.input}
//               keyboardType="numeric"
//               value={amount}
//               onChangeText={(text) => setAmount(text)}
//             />
//           </View>
          
//           <Text style={{ marginBottom: 5 }}>Converted Amount: </Text>
//           <View style={styles.row}> 
//             {/* <TextInput
//               placeholder="Converted Amount"
//               style={styles.input}
//               value={`${currencySymbols[toCurrency]} ${convertedAmount}  `} // Use toCurrency here for the symbol
//               editable={false}
//             /> */}
//             <TextInput
//               placeholder="Converted Amount"
//               style={styles.input}
//               value={convertedAmount ? `${currencySymbols[toCurrency]} ${convertedAmount}` : ""}
//               editable={false}
//             />

//           </View>
//           <View style={styles.rowButtons}>
//             <TouchableOpacity
//               style={[styles.button, styles.shadow]}
//               activeOpacity={0.7}
//               onPress={handleConvert}
//             >
//               <Text style={styles.buttonText}>Convert</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button, styles.shadow]}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.buttonText}>Add Funds</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}

//       <Modal visible={showModal} transparent animationType="slide">
//         <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
//           <View style={styles.modalOverlay} />
//         </TouchableWithoutFeedback>

//         <View style={styles.modalContent}>
//           <TextInput
//             placeholder="Search Currency"
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={handleSearch}
//           />

//           <FlatList
//             data={filteredCurrencies}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.currencyItem}
//                 onPress={() => selectCurrency(item)}
//               >
//                 <View style={styles.currencyRow}>
//                   <View style={styles.flag}>
//                     <CountryFlag isoCode={getCountryCode(item)} size={20} />
//                   </View>
//                   <Text>        {item}
//                     <Text style={{ color: '#808080' }}>         ({getCurrencyName(item)}) </Text>
//                   </Text>

//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 15,
//     padding: 20,
//     justifyContent: 'center',
//     // backgroundColor: '#f9f9f9',
//     backgroundColor:'#E6F2FA',
//     borderRadius: 10,
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 1,
//     borderColor: '#ddd',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     // marginTop:'auto',
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//   },
//   rowButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     // backgroundColor: '#007bff',
//     backgroundColor:'#000000',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   pickerContainer: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   modalContent: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     maxHeight: '50%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   currencyItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   currencyRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagContainer: {
//     width: 20,
//     height: 20,
//     borderRadius: "50%",
//     overflow: 'hidden',
//     marginRight: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flag: {
//     width: 20,
//     height: 15,
//     overflow: 'hidden',
//     marginRight: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   swapButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 3,
//     padding: 10,
//     marginBottom:10,
//   },
//   swapText: {
//     fontSize: 20,
//   },
//   currencyText: {
//     fontSize: 14,
//   },
//   shadow: {
//     boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)', // Equivalent of React Native's shadow styles
//   },
// });

// export default CurrencyConverter;




/////////////////////////////// with backend /////////////////////////////////////////

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  FlatList,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import CountryFlag from 'react-native-country-flag'; // Import the flag library

const currencySymbols: { [key: string]: string } = {
  INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
  OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
  AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
};
const getCurrencyName = (currencyCode: string): string => {
  const currencyNames: Record<string, string> = {
    AED: 'United Arab Emirates Dirham', AFN: 'Afghan Afghani', ALL: 'Albanian Lek',  AMD: 'Armenian Dram',  ANG: 'Netherlands Antillean Guilder', AOA: 'Angolan Kwanza',  ARS: 'Argentine Peso', AUD: 'Australian Dollar',AWG: 'Aruban Florin',AZN: 'Azerbaijani Manat', BAM: 'Bosnia and Herzegovina Convertible Mark', BBD: 'Barbadian Dollar',  BDT: 'Bangladeshi Taka', BGN: 'Bulgarian Lev', BHD: 'Bahraini Dinar',  BIF: 'Burundian Franc', BMD: 'Bermudian Dollar', BND: 'Brunei Dollar', BOB: 'Bolivian Boliviano', BRL: 'Brazilian Real', BSD: 'Bahamian Dollar', BTN: 'Bhutanese Ngultrum', BWP: 'Botswana Pula', BYN: 'Belarusian Ruble', BZD: 'Belize Dollar', CAD: 'Canadian Dollar', CDF: 'Congolese Franc', CHF: 'Swiss Franc', CLP: 'Chilean Peso', CNY: 'Chinese Yuan',  COP: 'Colombian Peso', CRC: 'Costa Rican Colón', CUP: 'Cuban Peso', CVE: 'Cape Verdean Escudo', CZK: 'Czech Koruna',DJF: 'Djiboutian Franc', DKK: 'Danish Krone', DOP: 'Dominican Peso',
    DZD: 'Algerian Dinar', EGP: 'Egyptian Pound', ERN: 'Eritrean Nakfa', ETB: 'Ethiopian Birr', EUR: 'Euro', FJD: 'Fijian Dollar', FKP: 'Falkland Islands Pound', GBP: 'British Pound', GEL: 'Georgian Lari', GGP: 'Guernsey Pound', GHS: 'Ghanaian Cedi', GIP: 'Gibraltar Pound', GMD: 'Gambian Dalasi', GNF: 'Guinean Franc', GTQ: 'Guatemalan Quetzal', GYD: 'Guyanese Dollar', HKD: 'Hong Kong Dollar', HNL: 'Honduran Lempira', HRK: 'Croatian Kuna', HTG: 'Haitian Gourde', HUF: 'Hungarian Forint', IDR: 'Indonesian Rupiah', ILS: 'Israeli New Shekel', INR: 'Indian Rupee', IQD: 'Iraqi Dinar', IRR: 'Iranian Rial', ISK: 'Icelandic Króna', JMD: 'Jamaican Dollar', JOD: 'Jordanian Dinar',JPY: 'Japanese Yen', KES: 'Kenyan Shilling', KGS: 'Kyrgyzstani Som', KHR: 'Cambodian Riel', KMF: 'Comorian Franc', KRW: 'South Korean Won', KWD: 'Kuwaiti Dinar', KYD: 'Cayman Islands Dollar', KZT: 'Kazakhstani Tenge', LAK: 'Lao Kip', LBP: 'Lebanese Pound', LKR: 'Sri Lankan Rupee', LRD: 'Liberian Dollar', LSL: 'Lesotho Loti', LTL: 'Lithuanian Litas', LVL: 'Latvian Lats', LYD: 'Libyan Dinar', MAD: 'Moroccan Dirham', MDL: 'Moldovan Leu', MGA: 'Malagasy Ariary', MKD: 'Macedonian Denar', MMK: 'Myanmar Kyat', MNT: 'Mongolian Tugrik', MOP: 'Macanese Pataca', MUR: 'Mauritian Rupee', MWK: 'Malawian Kwacha', MXN: 'Mexican Peso', MYR: 'Malaysian Ringgit', MZN: 'Mozambican Metical', NAD: 'Namibian Dollar', NGN: 'Nigerian Naira', NIO: 'Nicaraguan Córdoba', NOK: 'Norwegian Krone', NPR: 'Nepalese Rupee', NZD: 'New Zealand Dollar', OMR: 'Omani Rial', PAB: 'Panamanian Balboa', PEN: 'Peruvian Nuevo Sol', PGK: 'Papua New Guinean Kina', PHP: 'Philippine Peso',PKR: 'Pakistani Rupee',PLN: 'Polish Zloty',PYG: 'Paraguayan Guarani',  QAR: 'Qatari Rial', RON: 'Romanian Leu',
    RSD: 'Serbian Dinar',RUB: 'Russian Ruble',RWF: 'Rwandan Franc', SAR: 'Saudi Riyal', SBD: 'Solomon Islands Dollar',SCR: 'Seychellois Rupee',SEK: 'Swedish Krona',SGD: 'Singapore Dollar',SHP: 'Saint Helena Pound', SLL: 'Sierra Leonean Leone', SOS: 'Somali Shilling', SRD: 'Surinamese Dollar', SSP: 'South Sudanese Pound', STD: 'São Tomé and Príncipe Dobra', SYP: 'Syrian Pound', SZL: 'Swazi Lilangeni', THB: 'Thai Baht', TJS: 'Tajikistani Somoni', TMT: 'Turkmenistani Manat',TND: 'Tunisian Dinar', TOP: 'Tongan Paʻanga', TRY: 'Turkish Lira', TTD: 'Trinidad and Tobago Dollar', TWD: 'New Taiwan Dollar',TZS: 'Tanzanian Shilling', UAH: 'Ukrainian Hryvnia', UGX: 'Ugandan Shilling', USD: 'United States Dollar', UYU: 'Uruguayan Peso',UZS: 'Uzbekistani Som',VEF: 'Venezuelan Bolívar',VND: 'Vietnamese Đồng',VUV: 'Vanuatu Vatu', WST: 'Samoan Tala',XAF: 'Central African CFA Franc', XCD: 'East Caribbean Dollar',XOF: 'West African CFA Franc',XPF: 'CFP Franc', YER: 'Yemeni Rial',ZAR: 'South African Rand',ZMK: 'Zambian Kwacha',ZWL: 'Zimbabwean Dollar',
  };

  return currencyNames[currencyCode] || currencyCode; // Default to currency code if name is not found
};

// Helper function to get country code from currency
type CurrencyCode = keyof typeof currencySymbols;

const getCountryCode = (currency: CurrencyCode): string => {
  const currencyToCountry: { [key in CurrencyCode]: string } = {
    INR: 'IN', USD: 'US', EUR: 'EU', GBP: 'GB', JPY: 'JP', AUD: 'AU', CAD: 'CA', CHF: 'CH', CNY: 'CN', SEK: 'SE', NZD: 'NZ', SGD: 'SG', ZAR: 'ZA', MXN: 'MX', BRL: 'BR', RUB: 'RU', KRW: 'KR', AED: 'AE', HKD: 'HK', MYR: 'MY',THB: 'TH', IDR: 'ID', PHP: 'PH', VND: 'VN', COP: 'CO', ARS: 'AR', CLP: 'CL', PEN: 'PE', TRY: 'TR', NOK: 'NO',DKK: 'DK', PLN: 'PL', HUF: 'HU', CZK: 'CZ', ILS: 'IL', KES: 'KE', EGP: 'EG', PKR: 'PK', LKR: 'LK', BDT: 'BD',
    QAR: 'QA', OMR: 'OM', KWD: 'KW', BHD: 'BH', SAR: 'SA', KZT: 'KZ', UAH: 'UA', LBP: 'LB', JOD: 'JO', IQD: 'IQ',TND: 'TN', MAD: 'MA', DZD: 'DZ', TWD: 'TW', MNT: 'MN', RON: 'RO', BGN: 'BG', RSD: 'RS', HRK: 'HR', MKD: 'MK',AZN: 'AZ', GEL: 'GE', AMD: 'AM', BYN: 'BY', TMT: 'TM', UZS: 'UZ', TJS: 'TJ', KGS: 'KG', MZN: 'MZ', ANG: 'AN',PYG: 'PY', GHS: 'GH', NGN: 'NG', KHR: 'KH', LAK: 'LA', MMK: 'MM', BOB: 'BO', CUP: 'CU', MDL: 'MD', RWF: 'RW',
    UGX: 'UG', AFN: 'AF', AOA: 'AO', AWG: 'AW', BAM: 'BA', BBD: 'BB', BIF: 'BI', BND: 'BN', BSD: 'BS', BTN: 'BT', BWP: 'BW', BZD: 'BZ', CDF: 'CD', CRC: 'CR', CVE: 'CV', DJF: 'DJ', DOP: 'DO', ERN: 'ER', ETB: 'ET', FJD: 'FJ',FKP: 'FK', FOK: 'FO', GGP: 'GG', GIP: 'GI', GNF: 'GN', GTQ: 'GT', GYD: 'GY', HNL: 'HN', HTG: 'HT', IMP: 'IM',IRR: 'IR', ISK: 'IS', JMD: 'JM', KID: 'KI', KMF: 'KM', KYD: 'KY', LRD: 'LR', LSL: 'LS', LYD: 'LY', MGA: 'MG',MOP: 'MO', MRU: 'MR', MUR: 'MU', MVR: 'MV', MWK: 'MW'
  };

  return currencyToCountry[currency] || 'US'; // Default to 'US' if not found
};

const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [fromCurrency, setFromCurrency] = useState('INR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('0');
  const [loading, setLoading] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isFromCurrency, setIsFromCurrency] = useState(true);


  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          'https://api.exchangerate-api.com/v4/latest/USD'
        );
        const data = await response.json();
        const currencyList = Object.keys(data.rates);
        setCurrencies(currencyList);
        setFilteredCurrencies(currencyList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching currency data:', error);
        setLoading(false);
      }
    };

    fetchCurrencies();
  }, []);

  useEffect(() => {
    const autoConvert = async () => {
      if (!amount) {
        setConvertedAmount('0');
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(
          `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
        );
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = (parseFloat(amount) * rate).toFixed(2);
        setConvertedAmount(result);
        setLoading(false);
      } catch (error) {
        console.error('Error converting currency:', error);
        setLoading(false);
      }
    };

    autoConvert();
  }, [amount, fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const handleSearch = (text: string) => {
    setSearchTerm(text);
    if (text.trim() === '') {
      setFilteredCurrencies(currencies);
    } else {
      const filtered = currencies.filter((currency) =>
        currency.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredCurrencies(filtered);
    }
  };

  const selectCurrency = (currency: string) => {
    if (isFromCurrency) {
      setFromCurrency(currency);
    } else {
      setToCurrency(currency);
    }
    setShowModal(false);
  };

  
  const [conversionRate, setConversionRate] = useState<number>(1); // Define conversionRate

  const handleConvert = () => {
    if (!amount || isNaN(Number(amount))) {
      console.error('Invalid amount');
      return;
    }

    const numericAmount = parseFloat(amount); // Convert to number
    const convertedAmountValue = numericAmount * conversionRate;

    saveConvertedCurrency(fromCurrency, toCurrency, numericAmount, convertedAmountValue);
    // setConvertedAmount(convertedAmountValue.toString()); // Convert back to string  (error is to currency symbol and from currency amount)
  };

  const saveConvertedCurrency = async (
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    convertedAmount: number
  ) => {
    try {
      const response = await fetch('http://192.168.52.190:9000/api/convert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ fromCurrency, toCurrency, amount, convertedAmount }),
      });

      const data = await response.json();
      console.log('Currency saved:', data);
    } catch (error) {
      console.error('Error saving currency:', error);
    }
  };

    


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Currency Converter</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#5e5af6" />
      ) : (
        <>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => {
                setIsFromCurrency(true);
                setShowModal(true);
              }}
            >
              <View style={styles.currencyRow}>
                <View style={styles.flagContainer}>
                  <CountryFlag isoCode={getCountryCode(fromCurrency)} size={20} />
                </View>
                <Text style={styles.currencyText}>From:  {fromCurrency}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.swapButton}
              onPress={handleSwap}
            >
              <Text style={styles.swapText}>⇄</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.pickerContainer}
              onPress={() => {
                setIsFromCurrency(false);
                setShowModal(true);
              }}
            >
              <View style={styles.currencyRow}>
                <View style={styles.flagContainer}>
                  <CountryFlag isoCode={getCountryCode(toCurrency)} size={20} />
                </View>
                <Text style={styles.currencyText}>To:  {toCurrency}</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.row}>
            <TextInput
              placeholder="Amount"
              style={styles.input}
              keyboardType="numeric"
              value={amount}
              onChangeText={(text) => setAmount(text)}
            />
          </View>
          
          <Text style={{ marginBottom: 5 }}>Converted Amount: </Text>
          <View style={styles.row}> 
            <TextInput
              placeholder="Converted Amount"
              style={styles.input}
              value={`${currencySymbols[toCurrency]} ${convertedAmount}  `} // Use toCurrency here for the symbol
              editable={false}
            />
          </View>
          <View style={styles.rowButtons}>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.7}
              onPress={handleConvert}
            >
              <Text style={styles.buttonText}>Convert</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>Add Funds</Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      <Modal visible={showModal} transparent animationType="slide">
        <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>

        <View style={styles.modalContent}>
          <TextInput
            placeholder="Search Currency"
            style={styles.searchInput}
            value={searchTerm}
            onChangeText={handleSearch}
          />

          <FlatList
            data={filteredCurrencies}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.currencyItem}
                onPress={() => selectCurrency(item)}
              >
                <View style={styles.currencyRow}>
                  <View style={styles.flag}>
                    <CountryFlag isoCode={getCountryCode(item)} size={20} />
                  </View>
                  <Text>        {item}
                    <Text style={{ color: '#808080' }}>         ({getCurrencyName(item)}) </Text>
                  </Text>

                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 15,
    padding: 20,
    justifyContent: 'center',
    // backgroundColor: '#f9f9f9',
    backgroundColor:'#E6F2FA',
    borderRadius: 10,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 1,
    borderColor: '#ddd',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    // marginTop:'auto',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  rowButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    flex: 1,
    // backgroundColor: '#007bff',
    backgroundColor:'#000000',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pickerContainer: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    maxHeight: '50%',
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  currencyItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  currencyRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagContainer: {
    width: 20,
    height: 20,
    borderRadius: "50%",
    overflow: 'hidden',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flag: {
    width: 20,
    height: 15,
    overflow: 'hidden',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swapButton: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 3,
    padding: 10,
    marginBottom:10,
  },
  swapText: {
    fontSize: 20,
  },
  currencyText: {
    fontSize: 14,
  },
  shadow: {
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)', // Equivalent of React Native's shadow styles
  },
});

export default CurrencyConverter;





  ///////////////////////// without backend ///////////////////////////////////////


// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   ActivityIndicator,
//   FlatList,
//   Modal,
//   TouchableWithoutFeedback,
// } from 'react-native';
// import CountryFlag from 'react-native-country-flag'; // Import the flag library

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
// };
// const getCurrencyName = (currencyCode: string): string => {
//   const currencyNames: Record<string, string> = {
//     AED: 'United Arab Emirates Dirham', AFN: 'Afghan Afghani', ALL: 'Albanian Lek',  AMD: 'Armenian Dram',  ANG: 'Netherlands Antillean Guilder', AOA: 'Angolan Kwanza',  ARS: 'Argentine Peso', AUD: 'Australian Dollar',AWG: 'Aruban Florin',AZN: 'Azerbaijani Manat', BAM: 'Bosnia and Herzegovina Convertible Mark', BBD: 'Barbadian Dollar',  BDT: 'Bangladeshi Taka', BGN: 'Bulgarian Lev', BHD: 'Bahraini Dinar',  BIF: 'Burundian Franc', BMD: 'Bermudian Dollar', BND: 'Brunei Dollar', BOB: 'Bolivian Boliviano', BRL: 'Brazilian Real', BSD: 'Bahamian Dollar', BTN: 'Bhutanese Ngultrum', BWP: 'Botswana Pula', BYN: 'Belarusian Ruble', BZD: 'Belize Dollar', CAD: 'Canadian Dollar', CDF: 'Congolese Franc', CHF: 'Swiss Franc', CLP: 'Chilean Peso', CNY: 'Chinese Yuan',  COP: 'Colombian Peso', CRC: 'Costa Rican Colón', CUP: 'Cuban Peso', CVE: 'Cape Verdean Escudo', CZK: 'Czech Koruna',DJF: 'Djiboutian Franc', DKK: 'Danish Krone', DOP: 'Dominican Peso',
//     DZD: 'Algerian Dinar', EGP: 'Egyptian Pound', ERN: 'Eritrean Nakfa', ETB: 'Ethiopian Birr', EUR: 'Euro', FJD: 'Fijian Dollar', FKP: 'Falkland Islands Pound', GBP: 'British Pound', GEL: 'Georgian Lari', GGP: 'Guernsey Pound', GHS: 'Ghanaian Cedi', GIP: 'Gibraltar Pound', GMD: 'Gambian Dalasi', GNF: 'Guinean Franc', GTQ: 'Guatemalan Quetzal', GYD: 'Guyanese Dollar', HKD: 'Hong Kong Dollar', HNL: 'Honduran Lempira', HRK: 'Croatian Kuna', HTG: 'Haitian Gourde', HUF: 'Hungarian Forint', IDR: 'Indonesian Rupiah', ILS: 'Israeli New Shekel', INR: 'Indian Rupee', IQD: 'Iraqi Dinar', IRR: 'Iranian Rial', ISK: 'Icelandic Króna', JMD: 'Jamaican Dollar', JOD: 'Jordanian Dinar',JPY: 'Japanese Yen', KES: 'Kenyan Shilling', KGS: 'Kyrgyzstani Som', KHR: 'Cambodian Riel', KMF: 'Comorian Franc', KRW: 'South Korean Won', KWD: 'Kuwaiti Dinar', KYD: 'Cayman Islands Dollar', KZT: 'Kazakhstani Tenge', LAK: 'Lao Kip', LBP: 'Lebanese Pound', LKR: 'Sri Lankan Rupee', LRD: 'Liberian Dollar', LSL: 'Lesotho Loti', LTL: 'Lithuanian Litas', LVL: 'Latvian Lats', LYD: 'Libyan Dinar', MAD: 'Moroccan Dirham', MDL: 'Moldovan Leu', MGA: 'Malagasy Ariary', MKD: 'Macedonian Denar', MMK: 'Myanmar Kyat', MNT: 'Mongolian Tugrik', MOP: 'Macanese Pataca', MUR: 'Mauritian Rupee', MWK: 'Malawian Kwacha', MXN: 'Mexican Peso', MYR: 'Malaysian Ringgit', MZN: 'Mozambican Metical', NAD: 'Namibian Dollar', NGN: 'Nigerian Naira', NIO: 'Nicaraguan Córdoba', NOK: 'Norwegian Krone', NPR: 'Nepalese Rupee', NZD: 'New Zealand Dollar', OMR: 'Omani Rial', PAB: 'Panamanian Balboa', PEN: 'Peruvian Nuevo Sol', PGK: 'Papua New Guinean Kina', PHP: 'Philippine Peso',PKR: 'Pakistani Rupee',PLN: 'Polish Zloty',PYG: 'Paraguayan Guarani',  QAR: 'Qatari Rial', RON: 'Romanian Leu',
//     RSD: 'Serbian Dinar',RUB: 'Russian Ruble',RWF: 'Rwandan Franc', SAR: 'Saudi Riyal', SBD: 'Solomon Islands Dollar',SCR: 'Seychellois Rupee',SEK: 'Swedish Krona',SGD: 'Singapore Dollar',SHP: 'Saint Helena Pound', SLL: 'Sierra Leonean Leone', SOS: 'Somali Shilling', SRD: 'Surinamese Dollar', SSP: 'South Sudanese Pound', STD: 'São Tomé and Príncipe Dobra', SYP: 'Syrian Pound', SZL: 'Swazi Lilangeni', THB: 'Thai Baht', TJS: 'Tajikistani Somoni', TMT: 'Turkmenistani Manat',TND: 'Tunisian Dinar', TOP: 'Tongan Paʻanga', TRY: 'Turkish Lira', TTD: 'Trinidad and Tobago Dollar', TWD: 'New Taiwan Dollar',TZS: 'Tanzanian Shilling', UAH: 'Ukrainian Hryvnia', UGX: 'Ugandan Shilling', USD: 'United States Dollar', UYU: 'Uruguayan Peso',UZS: 'Uzbekistani Som',VEF: 'Venezuelan Bolívar',VND: 'Vietnamese Đồng',VUV: 'Vanuatu Vatu', WST: 'Samoan Tala',XAF: 'Central African CFA Franc', XCD: 'East Caribbean Dollar',XOF: 'West African CFA Franc',XPF: 'CFP Franc', YER: 'Yemeni Rial',ZAR: 'South African Rand',ZMK: 'Zambian Kwacha',ZWL: 'Zimbabwean Dollar',
//   };

//   return currencyNames[currencyCode] || currencyCode; // Default to currency code if name is not found
// };


// const CurrencyConverter = () => {
//   const [currencies, setCurrencies] = useState<string[]>([]);
//   const [fromCurrency, setFromCurrency] = useState('INR');
//   const [toCurrency, setToCurrency] = useState('USD');
//   const [amount, setAmount] = useState('');
//   const [convertedAmount, setConvertedAmount] = useState('0');
//   const [loading, setLoading] = useState(false);

//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredCurrencies, setFilteredCurrencies] = useState<string[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [isFromCurrency, setIsFromCurrency] = useState(true);


//   useEffect(() => {
//     const fetchCurrencies = async () => {
//       try {
//         setLoading(true);
//         const response = await fetch(
//           'https://api.exchangerate-api.com/v4/latest/USD'
//         );
//         const data = await response.json();
//         const currencyList = Object.keys(data.rates);
//         setCurrencies(currencyList);
//         setFilteredCurrencies(currencyList);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching currency data:', error);
//         setLoading(false);
//       }
//     };

//     fetchCurrencies();
//   }, []);

//   useEffect(() => {
//     const autoConvert = async () => {
//       if (!amount) {
//         setConvertedAmount('0');
//         return;
//       }

//       try {
//         setLoading(true);
//         const response = await fetch(
//           `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
//         );
//         const data = await response.json();
//         const rate = data.rates[toCurrency];
//         const result = (parseFloat(amount) * rate).toFixed(2);
//         setConvertedAmount(result);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error converting currency:', error);
//         setLoading(false);
//       }
//     };

//     autoConvert();
//   }, [amount, fromCurrency, toCurrency]);

//   const handleSwap = () => {
//     setFromCurrency(toCurrency);
//     setToCurrency(fromCurrency);
//   };

//   const handleSearch = (text: string) => {
//     setSearchTerm(text);
//     if (text.trim() === '') {
//       setFilteredCurrencies(currencies);
//     } else {
//       const filtered = currencies.filter((currency) =>
//         currency.toLowerCase().includes(text.toLowerCase())
//       );
//       setFilteredCurrencies(filtered);
//     }
//   };

//   const selectCurrency = (currency: string) => {
//     if (isFromCurrency) {
//       setFromCurrency(currency);
//     } else {
//       setToCurrency(currency);
//     }
//     setShowModal(false);
//   };

//   // Helper function to get country code from currency
//   type CurrencyCode = keyof typeof currencySymbols;

//   const getCountryCode = (currency: CurrencyCode): string => {
//     const currencyToCountry: { [key in CurrencyCode]: string } = {
//       INR: 'IN', USD: 'US', EUR: 'EU', GBP: 'GB', JPY: 'JP', AUD: 'AU', CAD: 'CA', CHF: 'CH', CNY: 'CN', SEK: 'SE', NZD: 'NZ', SGD: 'SG', ZAR: 'ZA', MXN: 'MX', BRL: 'BR', RUB: 'RU', KRW: 'KR', AED: 'AE', HKD: 'HK', MYR: 'MY',THB: 'TH', IDR: 'ID', PHP: 'PH', VND: 'VN', COP: 'CO', ARS: 'AR', CLP: 'CL', PEN: 'PE', TRY: 'TR', NOK: 'NO',DKK: 'DK', PLN: 'PL', HUF: 'HU', CZK: 'CZ', ILS: 'IL', KES: 'KE', EGP: 'EG', PKR: 'PK', LKR: 'LK', BDT: 'BD',
//       QAR: 'QA', OMR: 'OM', KWD: 'KW', BHD: 'BH', SAR: 'SA', KZT: 'KZ', UAH: 'UA', LBP: 'LB', JOD: 'JO', IQD: 'IQ',TND: 'TN', MAD: 'MA', DZD: 'DZ', TWD: 'TW', MNT: 'MN', RON: 'RO', BGN: 'BG', RSD: 'RS', HRK: 'HR', MKD: 'MK',AZN: 'AZ', GEL: 'GE', AMD: 'AM', BYN: 'BY', TMT: 'TM', UZS: 'UZ', TJS: 'TJ', KGS: 'KG', MZN: 'MZ', ANG: 'AN',PYG: 'PY', GHS: 'GH', NGN: 'NG', KHR: 'KH', LAK: 'LA', MMK: 'MM', BOB: 'BO', CUP: 'CU', MDL: 'MD', RWF: 'RW',
//       UGX: 'UG', AFN: 'AF', AOA: 'AO', AWG: 'AW', BAM: 'BA', BBD: 'BB', BIF: 'BI', BND: 'BN', BSD: 'BS', BTN: 'BT', BWP: 'BW', BZD: 'BZ', CDF: 'CD', CRC: 'CR', CVE: 'CV', DJF: 'DJ', DOP: 'DO', ERN: 'ER', ETB: 'ET', FJD: 'FJ',FKP: 'FK', FOK: 'FO', GGP: 'GG', GIP: 'GI', GNF: 'GN', GTQ: 'GT', GYD: 'GY', HNL: 'HN', HTG: 'HT', IMP: 'IM',IRR: 'IR', ISK: 'IS', JMD: 'JM', KID: 'KI', KMF: 'KM', KYD: 'KY', LRD: 'LR', LSL: 'LS', LYD: 'LY', MGA: 'MG',MOP: 'MO', MRU: 'MR', MUR: 'MU', MVR: 'MV', MWK: 'MW'
//     };
  
//     return currencyToCountry[currency] || 'US'; // Default to 'US' if not found
//   };
  

//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Currency Converter</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#5e5af6" />
//       ) : (
//         <>
//           <View style={styles.row}>
//             <TouchableOpacity
//               style={styles.pickerContainer}
//               onPress={() => {
//                 setIsFromCurrency(true);
//                 setShowModal(true);
//               }}
//             >
//               <View style={styles.currencyRow}>
//                 <View style={styles.flagContainer}>
//                   <CountryFlag isoCode={getCountryCode(fromCurrency)} size={20} />
//                 </View>
//                 <Text style={styles.currencyText}>From:  {fromCurrency}</Text>
//               </View>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.swapButton}
//               onPress={handleSwap}
//             >
//               <Text style={styles.swapText}>⇄</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               style={styles.pickerContainer}
//               onPress={() => {
//                 setIsFromCurrency(false);
//                 setShowModal(true);
//               }}
//             >
//               <View style={styles.currencyRow}>
//                 <View style={styles.flagContainer}>
//                   <CountryFlag isoCode={getCountryCode(toCurrency)} size={20} />
//                 </View>
//                 <Text style={styles.currencyText}>To:  {toCurrency}</Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={styles.row}>
//             <TextInput
//               placeholder="Amount"
//               style={styles.input}
//               keyboardType="numeric"
//               value={amount}
//               onChangeText={(text) => setAmount(text)}
//             />
//           </View>
          
//           <Text style={{ marginBottom: 5 }}>Converted Amount: </Text>
//           <View style={styles.row}> 
//           {/* <Text style={{ marginBottom: 5 }}>Converted Amount: </Text> */}
//           <TextInput
//             placeholder="Converted Amount"
//             style={styles.input}
//             value={`${currencySymbols[toCurrency]} ${convertedAmount}  `} // Use toCurrency here for the symbol
//             editable={false}
//           />
//           </View>
//           <View style={styles.rowButtons}>
//             <TouchableOpacity
//               style={[styles.button, styles.shadow]}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.buttonText}>Convert</Text>
//             </TouchableOpacity>
//             <TouchableOpacity
//               style={[styles.button, styles.shadow]}
//               activeOpacity={0.7}
//             >
//               <Text style={styles.buttonText}>Add Funds</Text>
//             </TouchableOpacity>
//           </View>
//         </>
//       )}

//       <Modal visible={showModal} transparent animationType="slide">
//         <TouchableWithoutFeedback onPress={() => setShowModal(false)}>
//           <View style={styles.modalOverlay} />
//         </TouchableWithoutFeedback>

//         <View style={styles.modalContent}>
//           <TextInput
//             placeholder="Search Currency"
//             style={styles.searchInput}
//             value={searchTerm}
//             onChangeText={handleSearch}
//           />

//           <FlatList
//             data={filteredCurrencies}
//             keyExtractor={(item) => item}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.currencyItem}
//                 onPress={() => selectCurrency(item)}
//               >
//                 <View style={styles.currencyRow}>
//                   <View style={styles.flag}>
//                     <CountryFlag isoCode={getCountryCode(item)} size={20} />
//                   </View>
//                   <Text>        {item}
//                     <Text style={{ color: '#808080' }}>         ({getCurrencyName(item)}) </Text>
//                   </Text>

//                 </View>
//               </TouchableOpacity>
//             )}
//           />
//         </View>
//       </Modal>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     marginBottom: 15,
//     padding: 20,
//     justifyContent: 'center',
//     // backgroundColor: '#f9f9f9',
//     backgroundColor:'#E6F2FA',
//     borderRadius: 10,
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 1,
//     borderColor: '#ddd',
//   },
//   header: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 30,
//     // marginTop:'auto',
//   },
//   row: {
//     flexDirection: 'row',
//     marginBottom: 15,
//   },
//   input: {
//     flex: 1,
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     paddingHorizontal: 10,
//   },
//   rowButtons: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginTop: 20,
//   },
//   button: {
//     flex: 1,
//     // backgroundColor: '#007bff',
//     backgroundColor:'#000000',
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginHorizontal: 8,
//   },
//   buttonText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   pickerContainer: {
//     flex: 1,
//     padding: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 10,
//   },
//   modalOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0,0,0,0.3)',
//   },
//   modalContent: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     maxHeight: '50%',
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   searchInput: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     marginBottom: 10,
//   },
//   currencyItem: {
//     padding: 10,
//     borderBottomWidth: 1,
//     borderColor: '#ddd',
//   },
//   currencyRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   flagContainer: {
//     width: 20,
//     height: 20,
//     borderRadius: "50%",
//     overflow: 'hidden',
//     marginRight: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   flag: {
//     width: 20,
//     height: 15,
//     overflow: 'hidden',
//     marginRight: 5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   swapButton: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginHorizontal: 3,
//     padding: 10,
//     marginBottom:10,
//   },
//   swapText: {
//     fontSize: 20,
//   },
//   currencyText: {
//     fontSize: 14,
//   },
//   // shadow: {
//   //   shadowColor: 'rgba(0,0,0,0.5)',
//   //   shadowOffset: { width: 1, height: 1 },
//   //   shadowOpacity: 0.1,
//   //   shadowRadius: 10,
//   //   elevation: 3,
//   // },

//   shadow: {
//     boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)', // Equivalent of React Native's shadow styles
//   },
  
//   // shadow: {
//   //   shadowColor: '#000',
//   //   shadowOffset: { width: 0, height: 4 },
//   //   shadowOpacity: 0.2,
//   //   shadowRadius: 10,
//   //   elevation: 5,
//   // },
// });

// export default CurrencyConverter;
