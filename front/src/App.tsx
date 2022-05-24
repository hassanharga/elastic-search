import { useRef, useState } from 'react';
import './App.css';
import { useOutsideAlerter } from './hooks/clickOutSide';
import { useEffectOnce } from './hooks/useEffectOnce';
import { Product } from './types/product';
import { User } from './types/user';

const url = '/api';

const App = () => {
  const [search, setSearch] = useState('');
  const [openList, setOpenList] = useState(false);
  const [user] = useState({ id: 1 });
  const [results, setResults] = useState<Product[]>([]);
  const [searchHistory, setSearchHistory] = useState<User[]>([]);

  const listRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(listRef, () => setOpenList(false));

  useEffectOnce(() => {
    getUserSearchHistory();
  });

  const getUserSearchHistory = async () => {
    const res = await fetch(`${url}/search/userHistory?userId=${user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('getUserSearchHistory', data);
    setSearchHistory(data);
  };

  const searchProductsHandler = async (val: string) => {
    const res = await fetch(`${url}/search?q=${val}&userId=${user.id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('searchProductsHandler', data);
    setResults(data);
  };

  const searchInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setSearch(value);
    searchProductsHandler(value);
    setOpenList(value ? true : false);
  };

  const onProductClick = async (product: Product) => {
    setOpenList(false);
    const res = await fetch(`${url}/search/userHistory`, {
      method: 'post',
      body: JSON.stringify({ userId: user.id, searchText: search, searchResult: product.id }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('onProductClick', data);
    getUserSearchHistory();
  };

  return (
    <div className="App">
      <div className="search-history">
        <h3>recent history:</h3>
        {searchHistory.length > 0 && (
          <ul>
            {searchHistory.map((res) => (
              <li key={res.id}>{res.text}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="search-container">
        <h1>Search Products</h1>
        <div className="search-box">
          <input
            type="text"
            name="search"
            id="search"
            autoComplete="false"
            value={search}
            onChange={searchInputHandler}
            onFocus={() => setOpenList(true)}
          />
          {openList && results.length > 0 && (
            <div className="list" ref={listRef}>
              <ul>
                {results.map((product) => (
                  <li key={product.id} onClick={() => onProductClick(product)}>
                    {product.title}
                    {/* <Highlighted text={product.title} highlight={search} /> */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
