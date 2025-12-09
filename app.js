/* ============================================
   RentTech - App JavaScript
   ============================================ */

// State
let favorites = new Set();
let currentScreen = 'welcomeScreen';

// Initialize app
document.addEventListener('DOMContentLoaded', function() {
    initPriceOptions();
    initTabs();
    initToggles();
    updateFavCount();
});

// Screen Navigation
function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        currentScreen = screenId;
        window.scrollTo(0, 0);
    }
}

// Tab Navigation
function switchTab(screenId, button) {
    showScreen(screenId);

    // Update nav items in all bottom navs
    document.querySelectorAll('.bottom-nav').forEach(nav => {
        nav.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });
    });

    // Find and activate the correct tab in all navs
    document.querySelectorAll('.bottom-nav').forEach(nav => {
        const tabs = nav.querySelectorAll('.nav-item');
        tabs.forEach(tab => {
            const tabScreen = tab.getAttribute('data-screen');
            if (tabScreen === screenId) {
                tab.classList.add('active');
            }
        });
    });
}

// Item Detail
function showItemDetail(itemId) {
    const detailScreen = document.getElementById('itemDetail');
    if (detailScreen) {
        // Update detail screen content based on itemId
        updateDetailContent(itemId);
        showScreen('itemDetail');
    }
}

function updateDetailContent(itemId) {
    const items = {
        'ps5': {
            name: 'PlayStation 5',
            price: '3000',
            rating: '4.9',
            reviews: '124',
            owner: 'Azamat K.',
            location: 'Kokshetau, Center'
        },
        'xbox': {
            name: 'Xbox Series X',
            price: '2800',
            rating: '4.8',
            reviews: '98',
            owner: 'Daniyar M.',
            location: 'Kokshetau, North'
        },
        'pc': {
            name: 'Gaming PC RTX 4070',
            price: '5000',
            rating: '4.9',
            reviews: '67',
            owner: 'Arman T.',
            location: 'Kokshetau, Center'
        },
        'vr': {
            name: 'Meta Quest 3',
            price: '4000',
            rating: '4.7',
            reviews: '45',
            owner: 'Berik S.',
            location: 'Kokshetau, East'
        }
    };

    const item = items[itemId] || items['ps5'];

    const titleEl = document.querySelector('#itemDetail .detail-title');
    const priceEl = document.querySelector('#itemDetail .price-value');
    const ownerEl = document.querySelector('#itemDetail .owner-name');
    const locationEl = document.querySelector('#itemDetail .owner-location span');

    if (titleEl) titleEl.textContent = item.name;
    if (priceEl) priceEl.textContent = item.price + ' ₸';
    if (ownerEl) ownerEl.textContent = item.owner;
    if (locationEl) locationEl.textContent = item.location;
}

// Favorites
function toggleFavorite(button, itemId) {
    event.stopPropagation();

    if (favorites.has(itemId)) {
        favorites.delete(itemId);
        button.classList.remove('active');
    } else {
        favorites.add(itemId);
        button.classList.add('active');
    }

    updateFavCount();
    updateFavoritesScreen();
}

function updateFavCount() {
    const countEl = document.getElementById('favCount');
    if (countEl) {
        countEl.textContent = favorites.size;
    }
}

function updateFavoritesScreen() {
    const container = document.getElementById('favoritesContainer');
    const emptyState = document.getElementById('favoritesEmpty');

    if (!container || !emptyState) return;

    if (favorites.size === 0) {
        container.style.display = 'none';
        emptyState.style.display = 'block';
    } else {
        container.style.display = 'block';
        emptyState.style.display = 'none';
    }
}

// Price Options
function initPriceOptions() {
    document.querySelectorAll('.price-options').forEach(container => {
        container.querySelectorAll('.price-option').forEach(option => {
            option.addEventListener('click', function() {
                container.querySelectorAll('.price-option').forEach(opt => {
                    opt.classList.remove('active');
                });
                this.classList.add('active');
            });
        });
    });
}

// Rental Tabs
function initTabs() {
    document.querySelectorAll('.rental-tabs').forEach(container => {
        container.querySelectorAll('.rental-tab').forEach(tab => {
            tab.addEventListener('click', function() {
                container.querySelectorAll('.rental-tab').forEach(t => {
                    t.classList.remove('active');
                });
                this.classList.add('active');

                // Filter rentals based on tab
                const filter = this.getAttribute('data-filter');
                filterRentals(filter);
            });
        });
    });
}

function filterRentals(filter) {
    document.querySelectorAll('.rental-card').forEach(card => {
        const status = card.getAttribute('data-status');
        if (filter === 'all' || status === filter) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Toggle Switches
function initToggles() {
    document.querySelectorAll('.toggle-switch').forEach(toggle => {
        toggle.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    });
}

// Password Toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    if (input) {
        input.type = input.type === 'password' ? 'text' : 'password';
    }
}

// Search
function handleSearch(event) {
    const query = event.target.value.toLowerCase();
    document.querySelectorAll('.item-card').forEach(card => {
        const name = card.querySelector('.item-name')?.textContent.toLowerCase() || '';
        if (name.includes(query) || query === '') {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Category Filter
function filterByCategory(category) {
    showScreen('homeScreen');
    // Scroll to items section
    const itemsSection = document.querySelector('#homeScreen .items-grid');
    if (itemsSection) {
        itemsSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Booking
function startBooking(itemId) {
    showScreen('bookingScreen');
}

function confirmBooking() {
    alert('Booking confirmed! You will receive a confirmation message.');
    showScreen('rentalsScreen');
}

// Go Back
function goBack() {
    // Simple back navigation
    const backMap = {
        'loginScreen': 'welcomeScreen',
        'registerScreen': 'welcomeScreen',
        'itemDetail': 'homeScreen',
        'bookingScreen': 'itemDetail',
        'settingsScreen': 'profileScreen',
        'notificationsScreen': 'homeScreen',
        'categoriesScreen': 'homeScreen',
        'paymentMethodsScreen': 'profileScreen',
        'addCardScreen': 'paymentMethodsScreen',
        'kaspiPaymentScreen': 'paymentMethodsScreen'
    };

    const backTo = backMap[currentScreen] || 'homeScreen';
    showScreen(backTo);
}

// Form Submissions
function handleLogin(event) {
    event.preventDefault();
    showScreen('homeScreen');
}

function handleRegister(event) {
    event.preventDefault();
    showScreen('homeScreen');
}

function handleLogout() {
    favorites.clear();
    updateFavCount();
    showScreen('welcomeScreen');
}

// Payment Methods
function selectPayment(card) {
    document.querySelectorAll('.payment-method-card').forEach(c => {
        c.classList.remove('selected');
        const check = c.querySelector('.payment-check');
        if (check) check.innerHTML = '';
    });

    card.classList.add('selected');
    const check = card.querySelector('.payment-check');
    if (check) {
        check.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"/>
        </svg>`;
    }
}

// Card Preview Update
function updateCardPreview() {
    const numberInput = document.getElementById('cardNumberInput');
    const holderInput = document.getElementById('cardHolderInput');
    const expiryInput = document.getElementById('cardExpiryInput');

    const numberPreview = document.getElementById('cardNumberPreview');
    const holderPreview = document.getElementById('cardHolderPreview');
    const expiryPreview = document.getElementById('cardExpiryPreview');

    if (numberInput && numberPreview) {
        let value = numberInput.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
        numberInput.value = value;
        numberPreview.textContent = value || '**** **** **** ****';
    }

    if (holderInput && holderPreview) {
        holderPreview.textContent = holderInput.value.toUpperCase() || 'YOUR NAME';
    }

    if (expiryInput && expiryPreview) {
        let value = expiryInput.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.slice(0, 2) + '/' + value.slice(2, 4);
        }
        expiryInput.value = value;
        expiryPreview.textContent = value || 'MM/YY';
    }
}

// Save Card
function saveCard() {
    const numberInput = document.getElementById('cardNumberInput');
    const holderInput = document.getElementById('cardHolderInput');

    if (!numberInput.value || !holderInput.value) {
        alert('Please fill in all card details');
        return;
    }

    alert('Card added successfully!');
    showScreen('paymentMethodsScreen');
}

// Kaspi Payment Confirmation
function confirmKaspiPayment() {
    alert('Payment received! Your booking is confirmed.');
    showScreen('rentalsScreen');
}
