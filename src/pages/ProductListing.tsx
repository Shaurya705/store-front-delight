
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '../services/api';
import ProductCard from '../components/ProductCard';
import { Search, Filter } from 'lucide-react';
import { toast } from 'sonner';

const ProductListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');

  const { 
    data: products, 
    isLoading: productsLoading, 
    error: productsError 
  } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts
  });

  const { 
    data: categories,
    isLoading: categoriesLoading,
    error: categoriesError
  } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  });

  useEffect(() => {
    if (productsError) {
      toast.error('Failed to load products');
      console.error('Products error:', productsError);
    }
    
    if (categoriesError) {
      toast.error('Failed to load categories');
      console.error('Categories error:', categoriesError);
    }
  }, [productsError, categoriesError]);

  // Filter products by category and search term
  const filteredProducts = products?.filter(product => {
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesSearch = !searchTerm || 
      product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-shop-text mb-6">All Product</h1>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Search Bar */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-shop-blue focus:border-shop-blue"
          />
        </div>
        
        {/* Category Filter */}
        <div className="w-full md:w-64">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Filter size={18} className="text-gray-400" />
            </div>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="block w-full pl-10 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-shop-blue focus:border-shop-blue rounded-md shadow-sm appearance-none"
            >
              <option value="">All Categories</option>
              {categories?.map((category) => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>
      
      {productsLoading || categoriesLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-t-shop-blue border-gray-200 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-shop-text">Loading products...</p>
          </div>
        </div>
      ) : productsError ? (
        <div className="text-center py-12">
          <p className="text-red-500">Failed to load products</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 px-4 py-2 bg-shop-blue text-white rounded hover:bg-shop-blue-dark"
          >
            Try Again
          </button>
        </div>
      ) : (
        <>
          {filteredProducts && filteredProducts.length > 0 ? (
            <div className="product-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-shop-text">No products found matching your criteria</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default ProductListing;
