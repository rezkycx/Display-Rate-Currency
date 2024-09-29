import { useState, useEffect } from "react"
import axios from "axios"

const CurrencyTable = () => {
  const [rates, setRates] = useState({});

  const API_URL = 'https://api.currencyfreaks.com/latest'
  const API_KEY = '671becc2a5cc494796bd46c7ae8e00d2';
  const currencies = ['CAD', 'IDR', 'JPY', 'CHF', 'EUR', 'GBP'];

  useEffect(() => {
    const fetchRates = async () => {
      try {
        const response = await axios.get(`${API_URL}?apikey=${API_KEY}&symbols=${currencies.join(',')}`);
        if (response.data && response.data.rates) {
          setRates(response.data.rates);
        } 
      } catch (error) {
          throw new Error(error.message);
      } 
    };

    fetchRates();
  }, []);

  const calculateRate = (rate, type) => {
    if (!rate) return '-';
    const baseRate = parseFloat(rate);
    if (isNaN(baseRate)) return '-';
    if (type === 'buy') {
      return (baseRate * 1.02).toFixed(4); 
    } else {
      return (baseRate * 0.98).toFixed(4); 
    }
  };

  return (
    <div className="container px-2 sm:px-4 mx-auto">
      <div className="overflow-x-auto ">
        <table className="mx-auto min-w-96 w-full max-w-3xl bg-orange-500 text-white">
          <thead>
            <tr>
              <th className="text-left p-2 font-bold"></th>
              <th className="text-left p-2 font-bold">We Buy</th>
              <th className="text-left p-2 font-bold">Exchange Rate</th>
              <th className="text-left p-2 font-bold">We Sell</th>
            </tr>
          </thead>
          <tbody>
            {currencies.map((currency) => (
              <tr key={currency} className="border-b border-orange-200">
                <td className="p-2">{currency}</td>
                <td className="p-2">{calculateRate(rates[currency], 'buy')}</td>
                <td className="p-2">{rates[currency] ? parseFloat(rates[currency]).toFixed(4) : '-'}</td>
                <td className="p-2">{calculateRate(rates[currency], 'sell')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CurrencyTable;
