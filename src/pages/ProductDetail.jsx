import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import { formatCurrency } from '../utils/currency';

const StarRating = ({ rating }) => {
  const full = Math.floor(rating);
  const partial = rating % 1;
  return (
    <div className="star-rating lg" title={`${rating}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className={`star ${i < full ? 'filled' : i === full && partial >= 0.5 ? 'half' : ''}`}>
          ★
        </span>
      ))}
      <span className="rating-num">{rating} / 5</span>
    </div>
  );
};

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    setLoading(true);
    fetchProductById(id)
      .then(data => { setProduct(data); setActiveImg(0); })
      .catch(() => setError('Product not found or failed to load.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return (
    <div className="page-loading">
      <div className="spinner" />
      <p>Loading product…</p>
    </div>
  );

  if (error) return (
    <div className="page-error">
      <span>⚠</span>
      <p>{error}</p>
      <Link to="/dashboard/products" className="btn-back">← Back to Products</Link>
    </div>
  );

  if (!product) return null;

  const discountedPrice = product.price;
  const originalPrice = product.discountPercentage
    ? (product.price / (1 - product.discountPercentage / 100))
    : null;

  const images = product.images?.length ? product.images : [product.thumbnail];

  return (
    <div className="detail-page">
      <div className="detail-breadcrumb">
        <Link to="/dashboard/products">Products</Link>
        <span> / </span>
        <span className="crumb-category">{product.category}</span>
        <span> / </span>
        <span className="crumb-current">{product.title}</span>
      </div>

      <div className="detail-layout">
        {/* Gallery */}
        <div className="detail-gallery">
          <div className="main-image-wrap">
            <img
              src={images[activeImg]}
              alt={product.title}
              className="main-image"
              onError={(e) => { e.target.src = 'https://via.placeholder.com/600x400?text=No+Image'; }}
            />
            {product.discountPercentage > 0 && (
              <span className="discount-badge lg">-{Math.round(product.discountPercentage)}%</span>
            )}
          </div>
          {images.length > 1 && (
            <div className="thumbnails">
              {images.map((img, i) => (
                <button
                  key={i}
                  className={`thumb-btn ${i === activeImg ? 'active' : ''}`}
                  onClick={() => setActiveImg(i)}
                >
                  <img
                    src={img}
                    alt={`${product.title} ${i + 1}`}
                    onError={(e) => { e.target.src = 'https://via.placeholder.com/80x80?text=?'; }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1 className="detail-title">{product.title}</h1>
          <p className="detail-brand">by <strong>{product.brand || 'Unknown Brand'}</strong></p>

          <StarRating rating={product.rating} />
          <p className="review-count">{product.reviews?.length || 0} reviews</p>

          <div className="detail-price-block">
            <div className="price-stack">
              <span className="detail-price">{formatCurrency(discountedPrice, 'USD')}</span>
              <span className="detail-price-inr">{formatCurrency(discountedPrice, 'INR')}</span>
            </div>
            {originalPrice && (
              <span className="detail-original">{formatCurrency(originalPrice, 'USD')}</span>
            )}
            {product.discountPercentage > 0 && (
              <span className="save-badge">
                Save {formatCurrency(originalPrice - discountedPrice, 'USD')}
              </span>
            )}
          </div>

          <p className="detail-description">{product.description}</p>

          <div className="detail-meta-grid">
            <div className="meta-item">
              <span className="meta-label">Stock</span>
              <span className={`meta-value ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                {product.stock > 0 ? `${product.stock} units` : 'Out of stock'}
              </span>
            </div>
            <div className="meta-item">
              <span className="meta-label">SKU</span>
              <span className="meta-value">{product.sku || '—'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Minimum Order</span>
              <span className="meta-value">{product.minimumOrderQuantity || 1}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Warranty</span>
              <span className="meta-value">{product.warrantyInformation || '—'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Shipping</span>
              <span className="meta-value">{product.shippingInformation || '—'}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Return Policy</span>
              <span className="meta-value">{product.returnPolicy || '—'}</span>
            </div>
          </div>

          {product.tags?.length > 0 && (
            <div className="detail-tags">
              {product.tags.map(tag => (
                <span key={tag} className="tag">#{tag}</span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      {product.reviews?.length > 0 && (
        <section className="reviews-section">
          <h2 className="reviews-title">Customer Reviews</h2>
          <div className="reviews-grid">
            {product.reviews.map((rev, i) => (
              <div key={i} className="review-card">
                <div className="review-header">
                  <div className="reviewer-avatar">{rev.reviewerName?.[0] || '?'}</div>
                  <div>
                    <p className="reviewer-name">{rev.reviewerName}</p>
                    <p className="review-date">{new Date(rev.date).toLocaleDateString()}</p>
                  </div>
                  <div className="review-rating">
                    {'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}
                  </div>
                </div>
                <p className="review-comment">{rev.comment}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="detail-back">
        <Link to="/dashboard/products" className="btn-back">← Back to Products</Link>
      </div>
    </div>
  );
};

export default ProductDetail;
