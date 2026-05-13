import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts } from '../services/api';
import { formatCurrency } from '../utils/currency';

const LIMIT = 12;

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const partial = rating % 1;
  return (
    <div className="star-rating" title={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < full ? 'filled' : i === full && partial >= 0.5 ? 'half' : ''}`}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating}</span>
    </div>
  );
};

const ProductCard = ({ product }) => (
  <Link to={`/dashboard/products/${product.id}`} className="product-card">
    <div className="card-image-wrap">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="card-image"
        loading="lazy"
        onError={(e) => { e.target.src = 'https://via.placeholder.com/300x200?text=No+Image'; }}
      />
      {product.discountPercentage > 0 && (
        <span className="discount-badge">-{Math.round(product.discountPercentage)}%</span>
      )}
      <span className="stock-badge" data-instock={product.stock > 0}>
        {product.stock > 0 ? 'In Stock' : 'Out'}
      </span>
    </div>
    <div className="card-body">
      <span className="card-category">{product.category}</span>
      <h3 className="card-title">{product.title}</h3>
      <StarRating rating={product.rating} />
      <div className="card-footer">
        <div className="price-group">
          <div className="price-stack">
            <span className="price">{formatCurrency(product.price, 'USD')}</span>
            <span className="price-inr">{formatCurrency(product.price, 'INR')}</span>
          </div>
          {product.discountPercentage > 0 && (
            <span className="original-price">
              {formatCurrency(product.price / (1 - product.discountPercentage / 100), 'USD')}
            </span>
          )}
        </div>
        <span className="card-cta">View →</span>
      </div>
    </div>
  </Link>
);

const Products = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const totalPages = Math.ceil(total / LIMIT);

  const load = useCallback(async (p) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchProducts(LIMIT, (p - 1) * LIMIT);
      setProducts(data.products);
      setTotal(data.total);
    } catch {
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(page); }, [page, load]);

  const goTo = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const pageNumbers = () => {
    const pages = [];
    const delta = 2;
    for (let i = Math.max(1, page - delta); i <= Math.min(totalPages, page + delta); i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <div>
          <h1 className="page-title">Products</h1>
          {!loading && <p className="page-subtitle">{total} items available</p>}
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          <span>⚠</span> {error}
          <button onClick={() => load(page)}>Retry</button>
        </div>
      )}

      {loading ? (
        <div className="products-skeleton">
          {Array.from({ length: LIMIT }).map((_, i) => (
            <div key={i} className="skeleton-card">
              <div className="skeleton-img" />
              <div className="skeleton-lines">
                <div className="sk-line short" />
                <div className="sk-line long" />
                <div className="sk-line medium" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="products-grid">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}

      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button className="page-btn" onClick={() => goTo(1)} disabled={page === 1}>«</button>
          <button className="page-btn" onClick={() => goTo(page - 1)} disabled={page === 1}>‹</button>
          {page > 3 && <span className="page-ellipsis">…</span>}
          {pageNumbers().map(n => (
            <button
              key={n}
              className={`page-btn ${n === page ? 'active' : ''}`}
              onClick={() => goTo(n)}
            >
              {n}
            </button>
          ))}
          {page < totalPages - 2 && <span className="page-ellipsis">…</span>}
          <button className="page-btn" onClick={() => goTo(page + 1)} disabled={page === totalPages}>›</button>
          <button className="page-btn" onClick={() => goTo(totalPages)} disabled={page === totalPages}>»</button>
        </div>
      )}
    </div>
  );
};

export default Products;
