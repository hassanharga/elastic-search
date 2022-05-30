import { useEffect, useRef, useState } from 'react';
import './App.css';
import { ProductDetails } from './components';
import { useOutsideAlerter } from './hooks/clickOutSide';
import { Product } from './types/product';

const url = 'http://localhost:3001/api';
// const url = 'http://18.233.168.81:3001/api';

const App = () => {
  const [search, setSearch] = useState('');
  const [searhedFor, setSearchFor] = useState('');
  const [openList, setOpenList] = useState(false);
  const [results, setResults] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  const listRef = useRef<HTMLDivElement>(null);

  useOutsideAlerter(listRef, () => setOpenList(false));

  useEffect(() => {
    searchProductsHandler();
  }, [search]);

  // useEffectOnce(() => {
  //   getUserSearchHistory();
  // });

  // const getUserSearchHistory = async () => {
  //   const res = await fetch(`${url}/search/userHistory`, {
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //   });
  //   const data = await res.json();
  //   console.log('getUserSearchHistory', data);
  //   setSearchHistory(data);
  // };

  const productClick = async (productId: string) => {
    const res = await fetch(`${url}/search/userHistory`, {
      method: 'POST',
      body: JSON.stringify({ searchText: searhedFor, productId }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('setUserSearchHistory', data);
  };

  const searchProductsHandler = async () => {
    const res = await fetch(`${url}/search?q=${search}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('searchProductsHandler', data);
    setResults([...data]);
    if (!data || !data.length) {
      setProducts([]);
      setSearchFor('');
    }
  };

  const searchInputHandler = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const value = ev.target.value;
    setSearch(value);
    setOpenList(value ? true : false);
  };

  const onClickSearchResult = async (product: string) => {
    setOpenList(false);
    setSearchFor(product);
    const res = await fetch(`${url}/search/products?q=${product}`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    console.log('onClickSearchResult', data);
    setProducts([...data]);
    // getUserSearchHistory();
  };

  return (
    <div className="App">
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
                {results.map((res) => (
                  <li key={res} onClick={() => onClickSearchResult(res)}>
                    {res}
                    {/* <Highlighted text={product.title} highlight={search} /> */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {products.length > 0 && (
        <>
          <h4>results for: {searhedFor}</h4>
          {products.map((product) => (
            <ProductDetails key={product.DEVICE_ID} product={product} productClick={productClick} />
          ))}
        </>
      )}
      {/* <div className="search-history">
        <h3>recent history:</h3>
        {searchHistory.length > 0 && (
          <ul>
            {searchHistory.map((res) => (
              <li key={res.id}>{res.text}</li>
            ))}
          </ul>
        )}
      </div> */}
    </div>
  );
};

export default App;
