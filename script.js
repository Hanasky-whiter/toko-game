// Initialize default products if none exist
function initializeDefaultProducts() {
    const existingProducts = JSON.parse(localStorage.getItem('products') || '[]');
    if (existingProducts.length === 0) {
        const defaultProducts = [
            {
                name: 'Akun Mobile Legends',
                description: 'Akun Mobile Legends dengan rank Mythic, skin lengkap.',
                price: 500000,
                category: 'akun-game',
                image: '',
                buttonText: 'Beli'
            },
            {
                name: 'Akun PUBG Mobile',
                description: 'Akun PUBG Mobile dengan UC 1000 dan skin premium.',
                price: 300000,
                category: 'akun-game',
                image: '',
                buttonText: 'Beli'
            },
            {
                name: 'Akun Free Fire',
                description: 'Akun Free Fire dengan diamond 1000 dan outfit lengkap.',
                price: 250000,
                category: 'akun-game',
                image: '',
                buttonText: 'Beli'
            },
            {
                name: 'Joki Rank Mobile Legends',
                description: 'Jasa joki naik rank dari Epic ke Mythic.',
                price: 200000,
                category: 'joki-game',
                image: '',
                buttonText: 'Pesan'
            },
            {
                name: 'Joki Rank PUBG Mobile',
                description: 'Jasa joki naik rank dari Ace ke Conqueror.',
                price: 150000,
                category: 'joki-game',
                image: '',
                buttonText: 'Pesan'
            },
            {
                name: 'Joki Rank Free Fire',
                description: 'Jasa joki naik rank dari Heroic ke Grandmaster.',
                price: 100000,
                category: 'joki-game',
                image: '',
                buttonText: 'Pesan'
            },
            {
                name: 'Top Up Mobile Legends',
                description: 'Top up diamond mulai dari 100 hingga 1000.',
                price: 10000,
                category: 'top-up',
                image: '',
                buttonText: 'Top Up'
            },
            {
                name: 'Top Up PUBG Mobile',
                description: 'Top up UC mulai dari 60 hingga 1000.',
                price: 5000,
                category: 'top-up',
                image: '',
                buttonText: 'Top Up'
            },
            {
                name: 'Top Up Free Fire',
                description: 'Top up diamond mulai dari 100 hingga 1000.',
                price: 10000,
                category: 'top-up',
                image: '',
                buttonText: 'Top Up'
            }
        ];
        localStorage.setItem('products', JSON.stringify(defaultProducts));
    }
}

// Load products dynamically
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products') || '[]');
    const categories = {
        'akun-game': document.getElementById('akun-game-products'),
        'joki-game': document.getElementById('joki-game-products'),
        'top-up': document.getElementById('top-up-products')
    };

    // Clear existing products
    Object.values(categories).forEach(container => {
        container.innerHTML = '';
    });

    // Group products by category
    const productsByCategory = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });

    // Render products
    Object.keys(categories).forEach(category => {
        const container = categories[category];
        const categoryProducts = productsByCategory[category] || [];

        if (categoryProducts.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: #666; padding: 2rem;">Belum ada produk di kategori ini.</p>';
            return;
        }

        categoryProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            productCard.innerHTML = `
                ${product.image ? `<img src="${product.image}" alt="${product.name}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 1rem;">` : ''}
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p class="price">Rp ${product.price.toLocaleString()}</p>
                <button data-name="${product.name}" data-price="Rp ${product.price.toLocaleString()}" onclick="openModalFromButton(this)">${product.buttonText}</button>
            `;

            container.appendChild(productCard);
        });
    });
}

// Modal functionality
function openModal(productName, price) {
    document.getElementById('product-info').textContent = `Produk: ${productName} - Harga: ${price}`;
    document.getElementById('modal').style.display = 'block';
}

function openModalFromButton(button) {
    const productName = button.getAttribute('data-name');
    const price = button.getAttribute('data-price');
    openModal(productName, price);
}

function closeModal() {
    document.getElementById('modal').style.display = 'none';
    document.getElementById('contact-form').reset();
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
        closeModal();
    }
}

// Form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const message = document.getElementById('message').value;
    const productInfo = document.getElementById('product-info').textContent;

    // Save order for admin
    const order = {
        name,
        email,
        phone,
        message,
        product: productInfo,
        date: new Date().toISOString()
    };

    const orders = JSON.parse(localStorage.getItem('customerOrders') || '[]');
    orders.push(order);
    localStorage.setItem('customerOrders', JSON.stringify(orders));

    // Get WhatsApp number from settings
    const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    const whatsappNumber = settings.whatsappNumber || '+6281234567890';

    // Create WhatsApp message
    const whatsappMessage = `Halo, saya ingin memesan:\n\n${productInfo}\n\nNama: ${name}\nEmail: ${email}\nHP: ${phone}\nPesan: ${message}`;
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace('+', '')}?text=${encodeURIComponent(whatsappMessage)}`;

    // Open WhatsApp
    window.open(whatsappUrl, '_blank');

    // Close modal
    closeModal();

    // Show success message
    alert('Pesanan Anda telah dikirim via WhatsApp. Kami akan segera menghubungi Anda!');
});

// Smooth scrolling for navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Load store settings and update display
function loadStoreSettings() {
    const settings = JSON.parse(localStorage.getItem('storeSettings') || '{}');
    const storeName = settings.storeName || 'Toko Digital Game';

    // Update the header title
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        headerTitle.textContent = storeName;
    }

    // Update page title
    document.title = `${storeName} - Akun Game, Joki, Top Up`;

    return settings;
}

// Initialize when page loads
window.onload = function() {
    initializeDefaultProducts();
    loadStoreSettings();
    loadProducts();
};
