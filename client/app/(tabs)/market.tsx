////////////// actual code //////////////////





// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, RefreshControl, TextInput, StatusBar } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import Header from '../Header';

// // Define a map for currency codes to their symbols
// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr',  PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', 
//   OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', 
//   AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡',  CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK',
// };

// const Market = () => {
//   const [currencyRates, setCurrencyRates] = useState<{ currency: string, rate: number }[]>([]);
//   const [filteredRates, setFilteredRates] = useState<{ currency: string, rate: number }[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState<string>('INR'); // Default base currency is INR
//   const [allCurrencies, setAllCurrencies] = useState<string[]>([]); // To store all available currencies

//   const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR'; // Replace with your chosen API

//   // Fetch the live currency rates and all currencies
//   const fetchCurrencyRates = async (baseCurrency: string) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
//       const rates = response.data.rates;
//       const formattedRates = Object.entries(rates).map(([currency, rate]) => ({
//         currency,
//         rate: parseFloat(rate as string), // Ensure rate is a number
//       }));

//       // Set all currencies, not just top 10
//       setCurrencyRates(formattedRates);
//       setFilteredRates(formattedRates); // Initially set both to show all

//       // Get list of all currencies from the API response and set it
//       const currenciesList = Object.keys(rates);
//       setAllCurrencies(currenciesList);
//     } catch (error) {
//       console.error('Error fetching currency rates:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Trigger API call on page load and refresh
//   useEffect(() => {
//     fetchCurrencyRates(selectedCurrency); // Pass selected base currency to API
//   }, [selectedCurrency]);

//   // Handle pull-to-refresh
//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchCurrencyRates(selectedCurrency).then(() => setRefreshing(false));
//   };

//   // Handle search input change and filter the currencies
//   const handleSearch = (query: string) => {
//     setSearchQuery(query);
//     if (query === '') {
//       setFilteredRates(currencyRates); // If search is cleared, show all
//     } else {
//       const filteredData = currencyRates.filter(item =>
//         item.currency.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredRates(filteredData);
//     }
//   };

//   // Function to get the currency symbol or fallback to empty string
//   const getCurrencySymbol = (currencyCode: string): string => {
//     return currencySymbols[currencyCode] || currencyCode; // If symbol is not found, return the currency code as fallback
//   };

//   return (

//     <View style={{ flex: 1 }}>
//     {/* Full-Width Header */}
//     <View>
//       <Header/>
//     </View>
//     <View style={styles.container}>
      
//       <Text style={styles.title}>Live Currency Market</Text>

//       {/* Base Currency Dropdown */}
      
//       <View style={styles.pickerWrapper}>
//         <Picker
//           selectedValue={selectedCurrency}
//           style={styles.picker}
//           onValueChange={(itemValue: string) => setSelectedCurrency(itemValue)} 
//         >
//           {allCurrencies.map((currency) => (
//             <Picker.Item key={currency} label={currency} value={currency} />
//           ))}
//         </Picker>
//       </View>

//       {/* Search Bar */}
//       <TextInput
//         style={styles.searchBar}
//         placeholder="Search Currency"
//         value={searchQuery}
//         onChangeText={handleSearch}
//       />

//       {isLoading ? (
//         <Text>Loading...</Text>
//       ) : (
//         <FlatList
//           data={filteredRates}
//           keyExtractor={(item) => item.currency}
//           renderItem={({ item }) => {
//             const symbol = getCurrencySymbol(item.currency); // Get the symbol using the function
//             return (
//               <View style={styles.rateItem}>
//                 <Text style={styles.currency}>{item.currency}</Text>
//                 {/* Display rate with symbol */}
//                 <Text style={styles.rate}>{`${symbol} ${item.rate.toFixed(4)}`}</Text>
//               </View>
//             );
//           }}
//           refreshControl={
//             <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
//           }
//         />
//       )}
//     </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     // backgroundColor: '#F8F9FA',
//     backgroundColor:'#ADD8E6',
//     padding: 16,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginTop:15,
//     marginBottom: 16,
//   },
//   pickerWrapper: {
//     // borderColor: '#777777',
//     // borderWidth: 1,
//     borderRadius: 14,
//     overflow: 'hidden', // Ensure borderRadius works properly
//     backgroundColor: '#fff',
//     marginBottom: 14,
//   },
//   picker: {
//     height: 50,
//     width: '100%',
//   },
//   // picker: {
//   //   height: 50,
//   //   width: '100%',
//   //   marginBottom: 14,
//   //   borderColor: '#777777',
//   //   borderWidth: 1,
//   //   borderRadius: 8,
//   //   backgroundColor: '#fff',
//   // },
//   searchBar: {
//     height: 40,
//     backgroundColor:'#fff',
//     // borderColor: '#777777',
//     // borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 8,
//     marginBottom: 16,
//     fontSize: 16,
//   },
//   rateItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 8,
//     borderBottomWidth: 1,
//     borderBottomColor: '#777777',
//   },
//   currency: {
//     fontSize: 14,
//     color: '#333',
//   },
//   rate: {
//     fontSize: 14,
//     color: '#333',
//   },
// });

// export default Market;

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, RefreshControl, TextInput } from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';
import Header from '../Header';
import Flag from 'react-native-country-flag';

// Define a map for currency codes to their symbols and country codes
const currencySymbols: { [key: string]: string } = {
    INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق',
    OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz',  
    ALL: "Lek", AWG: "ƒ", BAM: "KM", BBD: "$", BIF: "Fr.", BMD: "$", BND: "$", BSD: "$", BTN: "Nu.", BWP: "P", BZD: "$", CDF: "Fr.", CRC: "₡", CVE: "$", DJF: "Fr.", DOP: "RD$", ERN: "Nkf", ETB: "Br", FJD: "$", FKP: "£", FOK: "kr", GGP: "£", GIP: "£", GMD: "D", GNF: "Fr.", GTQ: "Q", GYD: "$", HNL: "L", HTG: "G", IMP: "£", IRR: "﷼", ISK: "kr", JEP: "£", JMD: "$", KID: "$", KMF: "Fr.", KYD: "$", LRD: "$", LSL: "L", LYD: "ل.د", MGA: "Ar", MOP: "P", MRU: "UM", MUR: "₨", MVR: "Rf",
    MWK: "MK", NAD: "$", NIO: "C$", NPR: "₨", PAB: "B/.", PGK: "K", SBD: "$", SCR: "₨", SDG: "£", SHP: "£", SLE: "Le", SLL: "Le", SOS: "Sh", SRD: "$", SSP: "£", STN: "Db", SYP: "£", SZL: "L", TOP: "$", TTD: "$", TVD: "$", TZS: "Sh", UYU: "$", VES: "Bs.S", VUV: "Vt", WST: "$", XAF: "Fr", XCD: "$", XDR: "SDR", XOF: "Fr", XPF: "Fr", YER: "﷼", ZMW: "K", ZWL: "$",
};

const currencyCountryCodes: { [key: string]: string } = {
    INR: 'IN', USD: 'US', EUR: 'EU', GBP: 'GB', JPY: 'JP', AUD: 'AU', CAD: 'CA', CHF: 'CH', CNY: 'CN', SEK: 'SE', NZD: 'NZ', SGD: 'SG', ZAR: 'ZA', MXN: 'MX', BRL: 'BR', RUB: 'RU', KRW: 'KR', AED: 'AE', HKD: 'HK', MYR: 'MY', THB: 'TH', IDR: 'ID', PHP: 'PH', VND: 'VN', COP: 'CO', ARS: 'AR', CLP: 'CL', PEN: 'PE', TRY: 'TR', NOK: 'NO', DKK: 'DK', PLN: 'PL', HUF: 'HU', CZK: 'CZ', ILS: 'IL', KES: 'KE', EGP: 'EG', PKR: 'PK', LKR: 'LK', BDT: 'BD', QAR: 'QA', 
    OMR: 'OM', KWD: 'KW', BHD: 'BH', SAR: 'SA', KZT: 'KZ', UAH: 'UA', LBP: 'LB', JOD: 'JO', IQD: 'IQ', TND: 'TN', MAD: 'MA', DZD: 'DZ', TWD: 'TW', MNT: 'MN', RON: 'RO', BGN: 'BG', RSD: 'RS', HRK: 'HR', MKD: 'MK', AZN: 'AZ', GEL: 'GE', AMD: 'AM', BYN: 'BY', TMT: 'TM', UZS: 'UZ', TJS: 'TJ', KGS: 'KG', MZN: 'MZ', ANG: 'AW', PYG: 'PY', GHS: 'GH', NGN: 'NG', KHR: 'KH', LAK: 'LA', MMK: 'MM', BOB: 'BO', CUP: 'CU', MDL: 'MD', RWF: 'RW', UGX: 'UG', AFN: 'AF', AOA: 'AO',
    ALL: "AL", AWG: "AW", BAM: "BA", BBD: "BB", BIF: "BI", BMD: "BM", BND: "BN", BSD: "BS", BTN: "BT", BWP: "BW", BZD: "BZ", CDF: "CD", CRC: "CR", CVE: "CV", DJF: "DJ", DOP: "DO", ERN: "ER", ETB: "ET", FJD: "FJ", FKP: "FK", FOK: "FO", GGP: "GG", GIP: "GI", GMD: "GM", GNF: "GN", GTQ: "GT", GYD: "GY", HNL: "HN", HTG: "HT", IMP: "IM", IRR: "IR", ISK: "IS", JEP: "JE", JMD: "JM", KID: "KI", KMF: "KM", KYD: "KY", LRD: "LR", LSL: "LS", LYD: "LY", MGA: "MG", MOP: "MO", MRU: "MR", 
    MUR: "MU", MVR: "MV", MWK: "MW", NAD: "NA", NIO: "NI", NPR: "NP", PAB: "PA", PGK: "PG", SBD: "SB", SCR: "SC", SDG: "SD", SHP: "SH", SLE: "SL", SLL: "SL", SOS: "SO", SRD: "SR", SSP: "SS", STN: "ST", SYP: "SY", SZL: "SZ", TOP: "TO", TTD: "TT", TVD: "TV", TZS: "TZ", UYU: "UY", VES: "VE", VUV: "VU", WST: "WS", XAF: "XAF", XCD: "XCD", XDR: "XDR", XOF: "XOF", XPF: "XPF", YER: "YE", ZMW: "ZM", ZWL: "ZW",
};

const Market = () => {
  const [currencyRates, setCurrencyRates] = useState<{ currency: string, rate: number }[]>([]);
  const [filteredRates, setFilteredRates] = useState<{ currency: string, rate: number }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');
  const [allCurrencies, setAllCurrencies] = useState<string[]>([]);

  const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR';

  const fetchCurrencyRates = async (baseCurrency: string) => {
    setIsLoading(true);
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const rates = response.data.rates;
      const formattedRates = Object.entries(rates).map(([currency, rate]) => ({
        currency,
        rate: parseFloat(rate as string),
      }));

      setCurrencyRates(formattedRates);
      setFilteredRates(formattedRates);

      const currenciesList = Object.keys(rates);
      setAllCurrencies(currenciesList);
    } catch (error) {
      console.error('Error fetching currency rates:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrencyRates(selectedCurrency);
  }, [selectedCurrency]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCurrencyRates(selectedCurrency).then(() => setRefreshing(false));
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredRates(currencyRates);
    } else {
      const filteredData = currencyRates.filter(item =>
        item.currency.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredRates(filteredData);
    }
  };

  const getCurrencySymbol = (currencyCode: string): string => {
    return currencySymbols[currencyCode] || currencyCode;
  };

  const getCountryFlag = (currencyCode: string) => {
    const countryCode = currencyCountryCodes[currencyCode];
    return countryCode ? (
      <Flag isoCode={countryCode} style={styles.flag} size={20} />
    ) : null;
  };

  return (
    <View style={{ flex: 1 }}>
      <Header />
      <View style={styles.container}>
        <Text style={styles.title}>Live Currency Market</Text>

        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedCurrency}
            style={styles.picker}
            onValueChange={(itemValue: string) => setSelectedCurrency(itemValue)}
          >
            {allCurrencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <TextInput
          style={styles.searchBar}
          placeholder="Search Currency"
          value={searchQuery}
          onChangeText={handleSearch}
        />

        {isLoading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredRates}
            keyExtractor={(item) => item.currency}
            renderItem={({ item }) => {
              const symbol = getCurrencySymbol(item.currency);
              return (
                <View style={styles.rateItem}>
                  {getCountryFlag(item.currency)}
                  <Text style={styles.currency}>{item.currency}</Text>
                  <Text style={styles.rate}>{`${symbol} ${item.rate.toFixed(4)}`}</Text>
                </View>
              );
            }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ADD8E6',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 16,
  },
  pickerWrapper: {
    borderRadius: 8,
    height: 42,
    overflow: 'hidden',
    backgroundColor: '#fff',
    marginBottom: 14,
  },
  picker: { 
    height: 50,
    width: '100%',
  },
  searchBar: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontSize: 16,
  },
  rateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderBottomWidth: 0.2,
    borderBottomColor: '#555',
    paddingBottom: 10,
  },
  flag: {
    width: 25,
    height: 18,
    marginRight: 10,
  },
  currency: {
    flex: 1,
    fontSize: 16,
  },
  rate: {
    fontSize: 16,
  },
});

export default Market;




//////////////// code -1 add filter & sorting feature //////////////////////////////

// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, RefreshControl, TextInput, TouchableOpacity, ActivityIndicator, Modal, StatusBar } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import { MaterialIcons } from '@expo/vector-icons'; // For the 3-dot icon
// import Header from '../Header'; // Assuming Header is a custom component

// interface CurrencyRate {
//   currency: string;
//   rate: number;
// }

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.',
//   // Continue for all currencies...
// };

// const Market = () => {
//   const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
//   const [filteredRates, setFilteredRates] = useState<CurrencyRate[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');
//   const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
//   const [sortOption, setSortOption] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR';

//   const fetchCurrencyRates = async (baseCurrency: string): Promise<void> => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
//       const rates = response.data.rates as { [key: string]: number }; // Assert the correct type here
//       const formattedRates: CurrencyRate[] = Object.entries(rates).map(([currency, rate]) => ({
//         currency,
//         rate: parseFloat(rate.toString()), // Ensure the rate is parsed as a number
//       }));

//       setCurrencyRates(formattedRates);
//       setFilteredRates(formattedRates);
//       setAllCurrencies(Object.keys(rates));
//     } catch (error) {
//       console.error('Error fetching currency rates:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrencyRates(selectedCurrency);
//   }, [selectedCurrency]);

//   const onRefresh = (): void => {
//     setRefreshing(true);
//     fetchCurrencyRates(selectedCurrency).then(() => setRefreshing(false));
//   };

//   const handleSearch = (query: string): void => {
//     setSearchQuery(query);
//     if (query === '') {
//       setFilteredRates(currencyRates);
//     } else {
//       const filteredData = currencyRates.filter(item =>
//         item.currency.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredRates(filteredData);
//     }
//   };

//   const getCurrencySymbol = (currencyCode: string): string => {
//     return currencySymbols[currencyCode] || currencyCode;
//   };

//   const sortedRates = (): CurrencyRate[] => {
//     if (sortOption === 'alphabetical') {
//       return [...filteredRates].sort((a, b) => a.currency.localeCompare(b.currency));
//     } else if (sortOption === 'value') {
//       return [...filteredRates].sort((a, b) => a.rate - b.rate);
//     }
//     return filteredRates;
//   };

//   return (
//     <View style={{flex:1}}>
//         <View>
//             <Header />
//         </View>
//         <View style={styles.container}>
//             <StatusBar barStyle="dark-content" />

//             <Text style={styles.title}>Live Currency Market</Text>

//             <View style={styles.pickerWrapper}>
//                 <Picker
//                     selectedValue={selectedCurrency}
//                     style={styles.picker}
//                     onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
//                 >
//                     {allCurrencies.map((currency) => (
//                     <Picker.Item key={currency} label={currency} value={currency} />
//                     ))}
//                 </Picker>
//             </View>

//             <TextInput
//                 style={styles.searchBar}
//                 placeholder="Search Currency"
//                 value={searchQuery}
//                 onChangeText={handleSearch}
//             />
 
//             <View style={styles.sortingIcon}>
//                 <TouchableOpacity onPress={() => setModalVisible(true)}>
//                     <MaterialIcons name="more-vert" size={30} color="#000" style={styles.moreIcon} />
//                 </TouchableOpacity>
//                 <Text style={styles.sortingText}>Filter & Sorting</Text>
//             </View>

//             {/* Modal for sorting options */}
//             <Modal
//                 visible={modalVisible}
//                 transparent={true}
//                 animationType="slide"
//                 onRequestClose={() => setModalVisible(false)}
//             >
                
//                 <View style={styles.modalBackground}>
//                 <View style={styles.modalContainer}>
//                     <TouchableOpacity onPress={() => { setSortOption('alphabetical'); setModalVisible(false); }}>
//                     <Text style={styles.modalText}>Alphabetical</Text>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={() => { setSortOption('value'); setModalVisible(false); }}>
//                     <Text style={styles.modalText}>By Value</Text>
//                     </TouchableOpacity>
//                 </View>
//                 </View>
//             </Modal>

//             {isLoading ? (
//                 <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//             ) : (
//                 <FlatList
//                 data={sortedRates()}
//                 keyExtractor={(item) => item.currency}
//                 renderItem={({ item }) => {
//                     const symbol = getCurrencySymbol(item.currency);
//                     return (
//                     <View style={styles.rateItem}>
//                         <Text style={styles.currency}>{item.currency}</Text>
//                         <Text style={styles.rate}>{`${symbol} ${item.rate.toFixed(4)}`}</Text>
//                     </View>
//                     );
//                 }}
//                 refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//                 />
//             )}
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#ADD8E6',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign:'center',
//   },
//   pickerWrapper: {
//     // borderColor: '#777777',
//     // borderWidth: 1,
//     height:42,
//     borderRadius: 5,
//     overflow: 'hidden', // Ensure borderRadius works properly
//     backgroundColor: '#fff',
//     marginBottom: 14,
//     },
//   picker: {
//     height:50,
//     marginBottom: 20,
//   },
//   searchBar: {
//     height: 40,
//     // borderColor: '#ccc',
//     // borderWidth: 1,
//     backgroundColor:'#fff', 
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 15,
//   },
//   sortingIcon:{
//     flexDirection:'row',
//   },
//   sortingText:{
//     fontSize:14,
//     paddingTop:7,
//   },
//   moreIcon: {
//     // marginBottom: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     // backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 10,
//     width: '80%',
//   },
//   modalText: {
//     fontSize: 14,
//     padding: 8,
//   },
//   rateItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 10,
//     borderBottomWidth: 1,
//     // borderBottomColor: '#eee',
//     borderBottomColor: '#777777',
//   },
//   currency: {
//     fontSize: 16,
//     paddingHorizontal:8,
//   },
//   rate: {
//     fontSize: 15,
//     color: '#444',
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default Market;



//////////////// code-2 add pin/unpin feature with filter/sorting feature /////////////////////

// import React, { useState, useEffect } from 'react';
// import { 
//     View, Text, StyleSheet, FlatList, RefreshControl, TextInput, 
//     TouchableOpacity, ActivityIndicator, Modal, StatusBar 
// } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import { MaterialIcons } from '@expo/vector-icons';
// import { Swipeable,GestureHandlerRootView  } from 'react-native-gesture-handler';
// import Header from '../Header';

// interface CurrencyRate {
//   currency: string;
//   rate: number;
//   pinned: boolean;
// }

// const currencySymbols: { [key: string]: string } = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', 
//   CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$',
//   BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', 
//   IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', 
//   TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪'
// };

// const Market = () => {
//   const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
//   const [filteredRates, setFilteredRates] = useState<CurrencyRate[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [refreshing, setRefreshing] = useState<boolean>(false);
//   const [searchQuery, setSearchQuery] = useState<string>('');
//   const [selectedCurrency, setSelectedCurrency] = useState<string>('INR');
//   const [allCurrencies, setAllCurrencies] = useState<string[]>([]);
//   const [sortOption, setSortOption] = useState<string | null>(null);
//   const [modalVisible, setModalVisible] = useState<boolean>(false);

//   // Typing for baseCurrency
//   const fetchCurrencyRates = async (baseCurrency: string): Promise<void> => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
//       const rates = response.data.rates;

//       const formattedRates: CurrencyRate[] = Object.entries(rates).map(([currency, rate]) => ({
//         currency,
//         rate: Number(rate),
//         pinned: false, // Initially, no currency is pinned
//       }));

//       setCurrencyRates(formattedRates);
//       setFilteredRates(formattedRates);
//       setAllCurrencies(Object.keys(rates));
//     } catch (error) {
//       console.error('Error fetching currency rates:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrencyRates(selectedCurrency);
//   }, [selectedCurrency]);

//   const onRefresh = (): void => {
//     setRefreshing(true);
//     fetchCurrencyRates(selectedCurrency).then(() => setRefreshing(false));
//   };

//   // Typing for the query parameter
//   const handleSearch = (query: string): void => {
//     setSearchQuery(query);
//     if (query === '') {
//       setFilteredRates(currencyRates);
//     } else {
//       const filteredData = currencyRates.filter(item =>
//         item.currency.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredRates(filteredData);
//     }
//   };

//   // Typing for currencyCode parameter
//   const getCurrencySymbol = (currencyCode: string): string => {
//     return currencySymbols[currencyCode] || currencyCode;
//   };

// //   const togglePinCurrency = (currency: string): void => {
// //     setCurrencyRates(prevRates => {
// //       return prevRates.map(item => 
// //         item.currency === currency ? { ...item, pinned: !item.pinned } : item
// //       );
// //     });
// //   };

// const togglePinCurrency = (currency: string): void => {
//     setCurrencyRates(prevRates => {
//       const updatedRates = prevRates.map(item => 
//         item.currency === currency ? { ...item, pinned: !item.pinned } : item
//       );
//       setFilteredRates(updatedRates); // Filtered list सुद्धा update करतोय
//       return updatedRates;
//     });
//   };

//   const sortedRates = (): CurrencyRate[] => {
//     let sortedList = [...filteredRates];

//     if (sortOption === 'alphabetical') {
//       sortedList.sort((a, b) => a.currency.localeCompare(b.currency));
//     } else if (sortOption === 'value') {
//       sortedList.sort((a, b) => a.rate - b.rate);
//     }

//     // Pinned currencies stay on top
//     return sortedList.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
//   };

//   const renderSwipeable = (item: CurrencyRate): JSX.Element => (
//     <Swipeable
//       renderRightActions={() => (
//         <TouchableOpacity 
//           style={styles.pinButton} 
//           onPress={() => togglePinCurrency(item.currency)}
//         >
//           <Text style={styles.pinText}>{item.pinned ? 'Unpin' : 'Pin'}</Text>
//         </TouchableOpacity>
//       )}
//     >
//       <View style={[styles.rateItem, item.pinned && styles.pinnedItem]}>
//         <Text style={styles.currency}>{item.currency}</Text>
//         <Text style={styles.rate}>{`${getCurrencySymbol(item.currency)} ${item.rate.toFixed(4)}`}</Text>
//       </View>
//     </Swipeable>
//   );

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <Header />
//       <View style={styles.container}>
//         <StatusBar barStyle="dark-content" />

//         <Text style={styles.title}>Live Currency Market</Text>

//         <View style={styles.pickerWrapper}>
//           <Picker
//             selectedValue={selectedCurrency}
//             style={styles.picker}
//             onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
//           >
//             {allCurrencies.map((currency) => (
//               <Picker.Item key={currency} label={currency} value={currency} />
//             ))}
//           </Picker>
//         </View>

//         <TextInput
//           style={styles.searchBar}
//           placeholder="Search Currency"
//           value={searchQuery}
//           onChangeText={handleSearch}
//         />

//         {isLoading ? (
//           <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//         ) : (
//           <FlatList
//             data={sortedRates()}
//             keyExtractor={(item) => item.currency}
//             renderItem={({ item }) => renderSwipeable(item)}
//             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//           />
//         )}
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#ADD8E6',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   pickerWrapper: {
//     height: 42,
//     borderRadius: 5,
//     backgroundColor: '#fff',
//     marginBottom: 14,
//   },
//   picker: {
//     height: 50,
//   },
//   searchBar: {
//     height: 40,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 15,
//   },
//   rateItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     padding: 10,
//     // backgroundColor: '#fff',
//     marginBottom: 5,
//     borderRadius: 5,
//   },
//   pinnedItem: {
//     backgroundColor: '#FFD700',
//   },
//   currency: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   rate: {
//     fontSize: 16,
//   },
//   pinButton: {
//     backgroundColor: '#007AFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     width: 80, 
//     borderRadius: 5,
//   },
//   pinText: {
//     color: '#fff',
//     fontSize: 14,
//     fontWeight: 'bold',
//   },
//   loader: {
//     marginTop: 20,
//   },
// });

// export default Market;




// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, FlatList, RefreshControl, TextInput, StatusBar, TouchableOpacity, ActivityIndicator, Modal } from 'react-native';
// import axios from 'axios';
// import { Picker } from '@react-native-picker/picker';
// import Header from '../Header';
// import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import GestureHandlerRootView
// import Swipeable from 'react-native-gesture-handler/Swipeable'; // For swipe actions
// import { MaterialIcons } from '@expo/vector-icons'; // 3-dot icon

// // Define currency symbols
// const currencySymbols = {
//   INR: '₹', USD: '$', EUR: '€', GBP: '£', JPY: '¥', AUD: 'A$', CAD: 'C$', CHF: 'Fr.', CNY: '¥', SEK: 'kr', NZD: 'NZ$', SGD: 'S$', ZAR: 'R', MXN: '$', BRL: 'R$', RUB: '₽', KRW: '₩', AED: 'د.إ', HKD: 'HK$', MYR: 'RM', THB: '฿', IDR: 'Rp', PHP: '₱', VND: '₫', COP: '$', ARS: '$', CLP: '$', PEN: 'S/', TRY: '₺', NOK: 'kr', DKK: 'kr', PLN: 'zł', HUF: 'Ft', CZK: 'Kč', ILS: '₪', KES: 'KSh', EGP: '£', PKR: '₨', LKR: 'Rs', BDT: '৳', QAR: 'ر.ق', OMR: 'ر.ع.', KWD: 'د.ك', BHD: 'د.ب', SAR: 'ر.س', KZT: '₸', UAH: '₴', LBP: 'ل.ل', JOD: 'د.ا', IQD: 'ع.د', TND: 'د.ت', MAD: 'د.م.', DZD: 'د.ج', TWD: 'NT$', MNT: '₮', RON: 'lei', BGN: 'лв', RSD: 'дин.', HRK: 'kn', MKD: 'ден', AZN: '₼', GEL: 'ლ', AMD: 'դր.', BYN: 'Br', TMT: 'T', UZS: 'лв', TJS: 'SM', KGS: 'сом', MZN: 'MT', ANG: 'ƒ', PYG: '₲', GHS: '₵', NGN: '₦', KHR: '៛', LAK: '₭', MMK: 'Ks', BOB: 'Bs.', CUP: '₱', MDL: 'lei', RWF: 'Fr', UGX: 'USh', AFN: '؋', AOA: 'Kz', AWG: 'Afl.', BAM: 'KM', BBD: '$', BIF: 'Fr', BND: '$', BSD: '$', BTN: 'Nu.', BWP: 'P', BZD: 'BZ$', CDF: 'Fr', CRC: '₡', CVE: '$', DJF: 'Fdj', DOP: '$', ERN: 'Nakfa', ETB: 'ታብ', FJD: '$', FKP: '£', FOK: 'kr', GGP: '£', GIP: '£', GNF: 'Fr', GTQ: 'Q', GYD: '$', HNL: 'L', HTG: 'G', IMP: '£', IRR: '﷼', ISK: 'kr', JMD: '$', KID: '$', KMF: 'Fr', KYD: '$', LRD: '$', LSL: 'M', LYD: 'ل.د', MGA: 'Ar', MOP: 'MOP', MRU: 'MRU', MUR: '₨', MVR: 'Rf', MWK: 'MK', 
// };

// const Market = () => {
//   const [currencyRates, setCurrencyRates] = useState([]);
//   const [filteredRates, setFilteredRates] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [refreshing, setRefreshing] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [selectedCurrency, setSelectedCurrency] = useState('INR');
//   const [allCurrencies, setAllCurrencies] = useState([]);
//   const [favorites, setFavorites] = useState([]);
//   const [sortOption, setSortOption] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);

//   const API_URL = 'https://api.exchangerate-api.com/v4/latest/INR';

//   const fetchCurrencyRates = async (baseCurrency) => {
//     setIsLoading(true);
//     try {
//       const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
//       const rates = response.data.rates;
//       const formattedRates = Object.entries(rates).map(([currency, rate]) => ({
//         currency,
//         rate: parseFloat(rate),
//       }));

//       setCurrencyRates(formattedRates);
//       setFilteredRates(formattedRates);
//       setAllCurrencies(Object.keys(rates));
//     } catch (error) {
//       console.error('Error fetching currency rates:', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchCurrencyRates(selectedCurrency);
//   }, [selectedCurrency]);

//   const onRefresh = () => {
//     setRefreshing(true);
//     fetchCurrencyRates(selectedCurrency).then(() => setRefreshing(false));
//   };

//   const handleSearch = (query) => {
//     setSearchQuery(query);
//     if (query === '') {
//       setFilteredRates(currencyRates);
//     } else {
//       const filteredData = currencyRates.filter(item =>
//         item.currency.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredRates(filteredData);
//     }
//   };

//   const getCurrencySymbol = (currencyCode) => {
//     return currencySymbols[currencyCode] || currencyCode;
//   };

//   const handlePinCurrency = (currencyCode) => {
//     setFavorites((prevFavorites) =>
//       prevFavorites.includes(currencyCode)
//         ? prevFavorites.filter((fav) => fav !== currencyCode)
//         : [...prevFavorites, currencyCode]
//     );
//   };

//   const sortedRates = () => {
//     if (sortOption === 'alphabetical') {
//       return [...filteredRates].sort((a, b) => a.currency.localeCompare(b.currency));
//     } else if (sortOption === 'value') {
//       return [...filteredRates].sort((a, b) => a.rate - b.rate);
//     }
//     return filteredRates;
//   };

//   return (
//     <GestureHandlerRootView style={{ flex: 1 }}>
//       <View style={{ flex: 1 }}>
//         <Header />
//         <View style={styles.container}>
//           <Text style={styles.title}>Live Currency Market</Text>

//           <View style={styles.pickerWrapper}>
//             <Picker
//               selectedValue={selectedCurrency}
//               style={styles.picker}
//               onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
//             >
//               {allCurrencies.map((currency) => (
//                 <Picker.Item key={currency} label={currency} value={currency} />
//               ))}
//             </Picker>
//           </View>

//           <TextInput
//             style={styles.searchBar}
//             placeholder="Search Currency"
//             value={searchQuery}
//             onChangeText={handleSearch}
//           />

//           {/* 3-dot icon and modal for sort options */}
//           <TouchableOpacity onPress={() => setModalVisible(true)}>
//             <MaterialIcons name="more-vert" size={30} color="#000" style={styles.moreIcon} />
//           </TouchableOpacity>

//           {/* Modal for sorting options */}
//           <Modal
//             visible={modalVisible}
//             transparent={true}
//             animationType="slide"
//             onRequestClose={() => setModalVisible(false)}
//           >
//             <View style={styles.modalBackground}>
//               <View style={styles.modalContainer}>
//                 <TouchableOpacity onPress={() => { setSortOption('alphabetical'); setModalVisible(false); }}>
//                   <Text style={styles.modalText}>Alphabetical</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => { setSortOption('value'); setModalVisible(false); }}>
//                   <Text style={styles.modalText}>By Value</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </Modal>

//           {isLoading ? (
//             <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
//           ) : (
//             <FlatList
//               data={sortedRates()}
//               keyExtractor={(item) => item.currency}
//               renderItem={({ item }) => {
//                 const symbol = getCurrencySymbol(item.currency);
//                 const isFavorite = favorites.includes(item.currency);
//                 return (
//                   <Swipeable
//                     renderRightActions={() => (
//                       <TouchableOpacity
//                         style={styles.pinButton}
//                         onPress={() => handlePinCurrency(item.currency)}
//                       >
//                         <Text style={styles.pinText}>
//                           {isFavorite ? 'Unpin' : 'Pin'}
//                         </Text>
//                       </TouchableOpacity>
//                     )}
//                   >
//                     <View style={[styles.rateItem, isFavorite && styles.favoriteItem]}>
//                       <Text style={styles.currency}>{item.currency}</Text>
//                       <Text style={styles.rate}>{`${symbol} ${item.rate.toFixed(4)}`}</Text>
//                     </View>
//                   </Swipeable>
//                 );
//               }}
//               refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
//             />
//           )}
//         </View>
//       </View>
//     </GestureHandlerRootView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   pickerWrapper: {
//     marginBottom: 20,
//   },
//   picker: {
//     height: 50,
//   },
//   searchBar: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 5,
//     paddingLeft: 10,
//     marginBottom: 15,
//   },
//   moreIcon: {
//     marginBottom: 10,
//   },
//   modalBackground: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContainer: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderRadius: 5,
//   },
//   modalText: {
//     fontSize: 18,
//     paddingVertical: 10,
//   },
//   loader: {
//     marginTop: 20,
//   },
//   rateItem: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   favoriteItem: {
//     backgroundColor: '#f0f8ff',
//   },
//   currency: {
//     fontSize: 18,
//   },
//   rate: {
//     fontSize: 16,
//     color: '#555',
//   },
//   pinButton: {
//     backgroundColor: '#007bff',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 10,
//     borderRadius: 5,
//   },
//   pinText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
// });

// export default Market;
