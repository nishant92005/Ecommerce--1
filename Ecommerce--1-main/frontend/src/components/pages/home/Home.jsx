import React, { useEffect, useState } from "react";
import { url } from "../../../environment/environment_url";
import { HashLoader } from "react-spinners";
import styles from "./Home.module.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);
  
  // Filters
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const limit = 20;

  const fetchProducts = async () => {
    setLoading(true);
    setError("");
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: limit.toString(),
      });

      if (selectedCategory !== "all") {
        params.append("category", selectedCategory);
      }
      if (minPrice) {
        params.append("minPrice", minPrice);
      }
      if (maxPrice) {
        params.append("maxPrice", maxPrice);
      }

      const response = await fetch(`${url.product.getProducts}?${params}`);
      const data = await response.json();

      if (data.success) {
        setProducts(data.products || []);
        setTotalPages(data.pagination?.totalPages || 1);
        setTotalProducts(data.pagination?.totalProducts || 0);
        if (data.filters?.categories) {
          setCategories(data.filters.categories);
        }
      } else {
        setError(data.error || "Failed to fetch products");
      }
    } catch (err) {
      console.error("Error fetching products:", err);
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch(url.product.getCategories);
      const data = await response.json();
      if (data.success) {
        setCategories(data.categories || []);
      }
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory, minPrice, maxPrice]);

  const handleFilterChange = () => {
    setCurrentPage(1); // Reset to first page when filters change
  };

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
    handleFilterChange();
  };

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value);
    handleFilterChange();
  };

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value);
    handleFilterChange();
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setMinPrice("");
    setMaxPrice("");
    setCurrentPage(1);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className={styles.container}>
      {loading && (
        <div className={styles.loaderOverlay}>
          <HashLoader color="#6366f1" size={80} />
        </div>
      )}

      {/* Header */}
      <div className={styles.header}>
        <h1 className={styles.title}>Our Products</h1>
        <p className={styles.subtitle}>
          Discover amazing products at great prices
        </p>
      </div>

      {/* Filters */}
      <div className={styles.filters}>
        <div className={styles.filterGroup}>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            className={styles.select}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="minPrice">Min Price (₹):</label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={handleMinPriceChange}
            placeholder="Min"
            className={styles.input}
            min="0"
          />
        </div>

        <div className={styles.filterGroup}>
          <label htmlFor="maxPrice">Max Price (₹):</label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            placeholder="Max"
            className={styles.input}
            min="0"
          />
        </div>

        <button onClick={clearFilters} className={styles.clearBtn}>
          Clear Filters
        </button>
      </div>

      {/* Results Info */}
      <div className={styles.resultsInfo}>
        <p>
          Showing {products.length} of {totalProducts} products
        </p>
      </div>

      {/* Error Message */}
      {error && <div className={styles.error}>{error}</div>}

      {/* Products Grid */}
      {!loading && products.length === 0 && !error && (
        <div className={styles.noProducts}>
          <p>No products found. Try adjusting your filters.</p>
        </div>
      )}

      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product._id} className={styles.productCard}>
            <div className={styles.productImage}>
              <img
                src={product.image || "https://via.placeholder.com/300x300?text=Product"}
                alt={product.name}
                onError={(e) => {
                  e.target.src = "https://via.placeholder.com/300x300?text=Product";
                }}
              />
              {!product.inStock && (
                <div className={styles.outOfStock}>Out of Stock</div>
              )}
            </div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <p className={styles.productCompany}>{product.company}</p>
              {product.description && (
                <p className={styles.productDescription}>
                  {product.description.length > 100
                    ? `${product.description.substring(0, 100)}...`
                    : product.description}
                </p>
              )}
              <div className={styles.productFooter}>
                <span className={styles.productPrice}>
                  {formatPrice(product.price)}
                </span>
                <span className={styles.productCategory}>{product.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className={styles.pagination}>
          <button
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            className={styles.paginationBtn}
          >
            Previous
          </button>
          
          <div className={styles.pageNumbers}>
            {Array.from({ length: totalPages }, (_, i) => i + 1)
              .filter((page) => {
                // Show first page, last page, current page, and pages around current
                return (
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 2 && page <= currentPage + 2)
                );
              })
              .map((page, index, array) => {
                // Add ellipsis
                const prevPage = array[index - 1];
                const showEllipsis = prevPage && page - prevPage > 1;
                
                return (
                  <React.Fragment key={page}>
                    {showEllipsis && <span className={styles.ellipsis}>...</span>}
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={`${styles.pageBtn} ${
                        currentPage === page ? styles.activePage : ""
                      }`}
                    >
                      {page}
                    </button>
                  </React.Fragment>
                );
              })}
          </div>

          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(totalPages, prev + 1))
            }
            disabled={currentPage === totalPages}
            className={styles.paginationBtn}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

