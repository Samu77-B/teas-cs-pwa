// Admin Dashboard Backend Integration
// This script connects the admin dashboard with the backend API

// Load configuration
let API_BASE_URL = 'http://localhost:3001';
let ADMIN_TOKEN = 'admin-token-2024';

// Try to load from config.js if available
if (typeof CONFIG !== 'undefined') {
    API_BASE_URL = CONFIG.API_BASE_URL;
    ADMIN_TOKEN = CONFIG.ADMIN_TOKEN;
}

// API Helper Functions
async function apiRequest(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;
    const defaultOptions = {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${ADMIN_TOKEN}`
        }
    };
    
    const config = { ...defaultOptions, ...options };
    
    try {
        const response = await fetch(url, config);
        const data = await response.json();
        
        if (!response.ok) {
            throw new Error(data.error || 'API request failed');
        }
        
        return data;
    } catch (error) {
        console.error('API request error:', error);
        throw error;
    }
}

// Product Management API
const ProductAPI = {
    async getAll() {
        return await apiRequest('/api/admin/products');
    },
    
    async create(productData) {
        return await apiRequest('/api/admin/products', {
            method: 'POST',
            body: JSON.stringify(productData)
        });
    },
    
    async update(id, productData) {
        return await apiRequest('/api/admin/products', {
            method: 'POST',
            body: JSON.stringify({ id, ...productData })
        });
    },
    
    async delete(id) {
        return await apiRequest(`/api/admin/products/${id}`, {
            method: 'DELETE'
        });
    }
};

// Discount Management API
const DiscountAPI = {
    async getAll() {
        return await apiRequest('/api/admin/discounts');
    },
    
    async create(discountData) {
        return await apiRequest('/api/admin/discounts', {
            method: 'POST',
            body: JSON.stringify(discountData)
        });
    },
    
    async update(id, discountData) {
        return await apiRequest('/api/admin/discounts', {
            method: 'POST',
            body: JSON.stringify({ id, ...discountData })
        });
    },
    
    async delete(id) {
        return await apiRequest(`/api/admin/discounts/${id}`, {
            method: 'DELETE'
        });
    }
};

// Order Management API
const OrderAPI = {
    async getAll() {
        return await apiRequest('/api/admin/orders');
    },
    
    async updateStatus(id, status) {
        return await apiRequest(`/api/admin/orders/${id}/status`, {
            method: 'PUT',
            body: JSON.stringify({ status })
        });
    },
    
    async delete(id) {
        return await apiRequest(`/api/admin/orders/${id}`, {
            method: 'DELETE'
        });
    }
};

// Integration with existing admin dashboard
if (typeof window !== 'undefined') {
    // Override the existing functions to use the backend API
    
    // Override loadData function
    window.loadData = async function() {
        try {
            console.log('Attempting to load data from backend...');
            
            // Load products from backend
            products = await ProductAPI.getAll();
            console.log('Products loaded from backend:', products);
            
            // Load discounts from backend
            discounts = await DiscountAPI.getAll();
            console.log('Discounts loaded from backend:', discounts);
            
            // Load orders from backend
            orders = await OrderAPI.getAll();
            console.log('Orders loaded from backend:', orders);
            
            // Load notification settings from localStorage
            const savedSettings = localStorage.getItem('notificationSettings');
            if (savedSettings) {
                notificationSettings = JSON.parse(savedSettings);
                updateNotificationSettingsUI();
            }
            
            console.log('Data loaded from backend successfully');
        } catch (error) {
            console.error('Error loading data from backend:', error);
            console.log('Falling back to localStorage...');
            // Fallback to localStorage
            loadDataFromLocalStorage();
        }
    };
    
    // Override saveData function
    window.saveData = function() {
        // Only save notification settings to localStorage
        localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    };
    
    // Override product management functions
    window.saveProduct = async function(event) {
        event.preventDefault();
        
        const editId = document.getElementById('productForm').getAttribute('data-edit-id');
        const productData = {
            name: document.getElementById('productName').value,
            category: document.getElementById('productCategory').value,
            regularPrice: parseFloat(document.getElementById('regularPrice').value),
            largePrice: parseFloat(document.getElementById('largePrice').value),
            type: document.getElementById('productType').value,
            description: document.getElementById('productDescription').value
        };

        try {
            if (editId) {
                await ProductAPI.update(parseInt(editId), productData);
                showNotification('Product updated successfully!', 'success');
            } else {
                await ProductAPI.create(productData);
                showNotification('Product added successfully!', 'success');
            }

            await loadData();
            loadProducts();
            hideProductForm();
            updateOverview();
        } catch (error) {
            showNotification('Error saving product: ' + error.message, 'error');
        }
    };
    
    window.deleteProduct = async function(id) {
        if (confirm('Are you sure you want to delete this product?')) {
            try {
                await ProductAPI.delete(id);
                await loadData();
                loadProducts();
                updateOverview();
                showNotification('Product deleted successfully!', 'success');
            } catch (error) {
                showNotification('Error deleting product: ' + error.message, 'error');
            }
        }
    };
    
    // Override discount management functions
    window.saveDiscount = async function(event) {
        event.preventDefault();
        
        const editId = document.getElementById('discountForm').getAttribute('data-edit-id');
        const discountData = {
            name: document.getElementById('discountName').value,
            code: document.getElementById('discountCode').value,
            type: document.getElementById('discountType').value,
            value: parseFloat(document.getElementById('discountValue').value),
            minOrderAmount: parseFloat(document.getElementById('minOrderAmount').value) || 0,
            maxUses: parseInt(document.getElementById('maxUses').value) || null,
            description: document.getElementById('discountDescription').value
        };

        try {
            if (editId) {
                await DiscountAPI.update(parseInt(editId), discountData);
                showNotification('Discount updated successfully!', 'success');
            } else {
                await DiscountAPI.create(discountData);
                showNotification('Discount added successfully!', 'success');
            }

            await loadData();
            loadDiscounts();
            hideDiscountForm();
        } catch (error) {
            showNotification('Error saving discount: ' + error.message, 'error');
        }
    };
    
    window.deleteDiscount = async function(id) {
        if (confirm('Are you sure you want to delete this discount?')) {
            try {
                await DiscountAPI.delete(id);
                await loadData();
                loadDiscounts();
                showNotification('Discount deleted successfully!', 'success');
            } catch (error) {
                showNotification('Error deleting discount: ' + error.message, 'error');
            }
        }
    };
    
    // Override order management functions
    window.completeOrder = async function(id) {
        try {
            await OrderAPI.updateStatus(id, 'completed');
            await loadData();
            loadOrders();
            updateOverview();
            showNotification('Order marked as completed!', 'success');
        } catch (error) {
            showNotification('Error updating order: ' + error.message, 'error');
        }
    };
    
    window.reopenOrder = async function(id) {
        try {
            await OrderAPI.updateStatus(id, 'pending');
            await loadData();
            loadOrders();
            updateOverview();
            showNotification('Order reopened!', 'info');
        } catch (error) {
            showNotification('Error updating order: ' + error.message, 'error');
        }
    };
    
    window.deleteOrder = async function(id) {
        if (confirm('Are you sure you want to delete this order?')) {
            try {
                await OrderAPI.delete(id);
                await loadData();
                loadOrders();
                updateOverview();
                showNotification('Order deleted successfully!', 'success');
            } catch (error) {
                showNotification('Error deleting order: ' + error.message, 'error');
            }
        }
    };
    
    window.refreshOrders = async function() {
        try {
            await loadData();
            loadOrders();
            showNotification('Orders refreshed!', 'info');
        } catch (error) {
            showNotification('Error refreshing orders: ' + error.message, 'error');
        }
    };
    
    window.markAllCompleted = async function() {
        if (confirm('Mark all pending orders as completed?')) {
            try {
                const pendingOrders = orders.filter(order => order.status === 'pending');
                for (const order of pendingOrders) {
                    await OrderAPI.updateStatus(order.id, 'completed');
                }
                await loadData();
                loadOrders();
                updateOverview();
                showNotification('All orders marked as completed!', 'success');
            } catch (error) {
                showNotification('Error updating orders: ' + error.message, 'error');
            }
        }
    };
    
    // Fallback function for localStorage
    function loadDataFromLocalStorage() {
        const savedProducts = localStorage.getItem('adminProducts');
        if (savedProducts) {
            products = JSON.parse(savedProducts);
        }

        const savedDiscounts = localStorage.getItem('adminDiscounts');
        if (savedDiscounts) {
            discounts = JSON.parse(savedDiscounts);
        }

        const savedOrders = localStorage.getItem('adminOrders');
        if (savedOrders) {
            orders = JSON.parse(savedOrders);
        }

        const savedSettings = localStorage.getItem('notificationSettings');
        if (savedSettings) {
            notificationSettings = JSON.parse(savedSettings);
            updateNotificationSettingsUI();
        }
    }
}

// Export for Node.js usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ProductAPI,
        DiscountAPI,
        OrderAPI,
        apiRequest
    };
}
