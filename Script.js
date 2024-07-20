document.addEventListener('DOMContentLoaded', function () {
    let products = JSON.parse(localStorage.getItem('products')) || [];
    const productForm = document.getElementById('productForm');
    const productList = document.getElementById('productList');
    const productIdField = document.getElementById('productId');
    const productNameField = document.getElementById('productName');
    const productPriceField = document.getElementById('productPrice');

    productForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const id = productIdField.value;
        const name = productNameField.value;
        const price = productPriceField.value;

        if (id) {
            // Edit product
            const product = products.find(p => p.id == id);
            product.name = name;
            product.price = price;
        } else {
            // Add new product
            const product = { id: Date.now(), name, price };
            products.push(product);
        }

        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
        productForm.reset();
        productIdField.value = '';
    });

    function renderProducts() {
        productList.innerHTML = products.map(product => `
            <tr>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>
                    <button class="edit" onclick="editProduct(${product.id})">Edit</button>
                    <button class="delete" onclick="deleteProduct(${product.id})">Delete</button>
                </td>
            </tr>
        `).join('');
    }

    window.editProduct = function (id) {
        const product = products.find(p => p.id == id);
        productIdField.value = product.id;
        productNameField.value = product.name;
        productPriceField.value = product.price;
    }

    window.deleteProduct = function (id) {
        products = products.filter(p => p.id != id);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts();
    }

    // Initial render
    renderProducts();
});