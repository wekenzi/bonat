import './App.css';
import ProductsPage from './components/ProductsPage/ProductsPage';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">Bonat Products</a>
        </div>
      </nav>
      <ProductsPage/>
    </div>
  );
}

export default App;
