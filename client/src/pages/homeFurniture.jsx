import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FilterSidebar from '../components/FilterSidebar';

const HomeFurniture = () => {
    // State to store products
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Function to fetch products filtered by Home & Furniture category
    const fetchFilteredProducts = async () => {
        try {
            console.log('Fetching home furniture products...');
            const response = await axios.get('http://localhost:3000/api/products/filter-product', {
                params: {
                    category: 'home-furniture', // Filter by home furniture category
                },
            });
            console.log('API Response:', response.data);
            if (response.data && response.data.products) {
                setProducts(response.data.products);
            } else {
                console.warn('No products found in the response.');
            }
        } catch (error) {
            console.error('Error fetching home furniture products:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    // UseEffect to fetch products on component mount
    useEffect(() => {
        fetchFilteredProducts();
    }, []);

    // Debugging: Log the products state
    useEffect(() => {
        console.log('Home Furniture Products State:', products);
    }, [products]);

    return (
        <div>
            {/* Header Component */}
            <Header />

            {/* Home Furniture Heading */}
            <h1 className="text-4xl font-bold text-center text-white bg-black bg-opacity-50 py-4 mb-8">
                Home Furniture
            </h1>

            {/* Main Container with Background Image */}
            <div
                className="min-h-screen flex"
                style={{
                    backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/008/017/236/original/luxury-modern-living-room-interior-design-with-white-furniture-and-beautiful-decor-on-the-wall-3d-rendering-free-photo.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Filter Sidebar */}
                <FilterSidebar />

                {/* Products Grid */}
                <div className="flex-1 p-4 sm:p-8 lg:p-16">
                    {loading ? (
                        <p>Loading products...</p>
                    ) : error ? (
                        <p className="text-red-500">Error loading products.</p>
                    ) : products.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {products.map(product => (
                                <div
                                    key={product._id}
                                    className="bg-white bg-opacity-90 shadow-xl rounded-xl border-2 border-gray-200 p-4 hover:shadow-2xl transform hover:scale-105 transition-transform duration-300"
                                >
                                    <Link to={`/products/${product._id}`}>
                                        <img
                                            src={product.image[0]}
                                            alt={product.title}
                                            className="w-full h-40 object-cover rounded-md mb-4"
                                        />
                                        <h2 className="font-semibold text-lg text-gray-800">{product.title}</h2>
                                        <p className="text-gray-500 mb-2">₹{product.salePrice}</p>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No home furniture products found.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomeFurniture;


