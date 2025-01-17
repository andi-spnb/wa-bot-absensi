// WhatsApp Connection Status
function updateWhatsAppStatus() {
    fetch('/api/status')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const statusElement = document.getElementById('whatsapp-status');
            if (statusElement) {
                statusElement.className = `badge badge-${data.connected ? 'success' : 'danger'}`;
                statusElement.textContent = data.connected ? 'Connected' : 'Disconnected';
            }
        })
        .catch(error => {
            console.error('Error fetching WhatsApp status:', error);
            const statusElement = document.getElementById('whatsapp-status');
            if (statusElement) {
                statusElement.className = 'badge badge-danger';
                statusElement.textContent = 'Error';
            }
        });
}
// API Key Management
function copyApiKey(apiKey) {
    navigator.clipboard.writeText(apiKey)
        .then(() => {
            showToast('API key copied to clipboard');
        })
        .catch(console.error);
}

function deactivateApiKey(id) {
    if (!confirm('Are you sure you want to deactivate this API key?')) return;

    fetch(`/api-keys/${id}/deactivate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(console.error);
}

// Toast notifications
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// Form validation
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return true;

    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
            
            const errorMessage = field.dataset.error || 'This field is required';
            let errorElement = field.nextElementSibling;
            
            if (!errorElement || !errorElement.classList.contains('error-message')) {
                errorElement = document.createElement('div');
                errorElement.className = 'error-message';
                field.parentNode.insertBefore(errorElement, field.nextSibling);
            }
            
            errorElement.textContent = errorMessage;
        } else {
            field.classList.remove('error');
            const errorElement = field.nextElementSibling;
            if (errorElement?.classList.contains('error-message')) {
                errorElement.remove();
            }
        }
    });

    return isValid;
}

// Update stats in real-time
function updateStats() {
    fetch('/api/stats')
        .then(response => response.json())
        .then(data => {
            Object.keys(data).forEach(key => {
                const element = document.getElementById(`stat-${key}`);
                if (element) {
                    element.textContent = data[key];
                }
            });
        })
        .catch(console.error);
}
// Copy API Key
function copyApiKey(apiKey) {
    navigator.clipboard.writeText(apiKey)
        .then(() => {
            showToast('API key copied to clipboard');
        })
        .catch(error => {
            console.error('Error copying API key:', error);
            showToast('Failed to copy API key', 'error');
        });
}

// Deactivate API Key
function deactivateApiKey(id) {
    if (!confirm('Are you sure you want to deactivate this API key?')) return;

    fetch(`/api-keys/${id}/deactivate`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            location.reload();
        } else {
            showToast(data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error deactivating API key:', error);
        showToast('Failed to deactivate API key', 'error');
    });
}

// Toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);

    // Show toast
    setTimeout(() => {
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }, 100);
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Check WhatsApp status every 30 seconds
    updateWhatsAppStatus();
    setInterval(updateWhatsAppStatus, 30000);

    // Update stats every minute if on dashboard
    if (document.getElementById('dashboard')) {
        updateStats();
        setInterval(updateStats, 60000);
    }

    // Setup form validation
    const forms = document.querySelectorAll('form[data-validate]');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form.id)) {
                e.preventDefault();
            }
        });
    });
});
