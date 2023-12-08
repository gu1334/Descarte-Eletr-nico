let cart = [];

document.addEventListener('DOMContentLoaded', function() {
  const checkoutButton = document.getElementById('checkout-button');
  checkoutButton.addEventListener('click', showPaymentOptions);

  const backButton = document.getElementById('back-home');
  backButton.addEventListener('click', backToHome);

  document.getElementById('close-payment-options').addEventListener('click', closePaymentOptions);

  document.getElementById('checkout-button').addEventListener('click', showPaymentOptions);

  document.getElementById('back-home').addEventListener('click', hideModal);

  document.querySelectorAll('.payment-method-button').forEach(button => {
    button.addEventListener('click', function() {
      selectPaymentMethod(this.dataset.method);
    });
  });

  updateCheckoutButton();

  // Aqui você pode adicionar ouvintes de eventos aos seus botões de método de pagamento.
  // Exemplo:
  // document.getElementById('payment-method-debit').addEventListener('click', () => selectPaymentMethod('Débito'));
  // Repita para outros métodos...
});

function searchProducts(searchValue) {
  // Converta o valor de busca para minúsculas para comparação de caso insensível
  const lowerCaseSearchValue = searchValue.toLowerCase();

  // Obtenha todos os elementos de produto
  const products = document.querySelectorAll('.product-item');

  // Itere sobre os produtos e oculte aqueles que não correspondem à pesquisa
  products.forEach(product => {
    const title = product.getAttribute('data-title').toLowerCase();
    if (title.includes(lowerCaseSearchValue)) {
      product.style.display = ''; // Mostra o produto se corresponder
    } else {
      product.style.display = 'none'; // Oculta o produto se não corresponder
    }
  });
}

function addToCart(productName, price) {
  const existingProduct = cart.find(item => item.productName === productName);
  if (existingProduct) {
    existingProduct.quantity++;
  } else {
    cart.push({ productName, price, quantity: 1 });
  }
  updateCartDisplay();
}

function removeFromCart(productName) {
  const productIndex = cart.findIndex(item => item.productName === productName);
  if (productIndex !== -1) {
    const product = cart[productIndex];
    product.quantity--;
    if (product.quantity <= 0) {
      cart.splice(productIndex, 1);
    }
  }
  updateCartDisplay();
}

function updateCartDisplay() {
  const cartButton = document.getElementById('cart-button');
  const cartItemsElement = document.getElementById('cart-items');
  const cartTotalElement = document.getElementById('cart-total');

  cartButton.innerText = `Carrinho (${cart.reduce((acc, item) => acc + item.quantity, 0)})`;
  cartItemsElement.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
    const itemElement = document.createElement('li');
    itemElement.innerText = `${item.productName} - R$ ${item.price.toFixed(2)} x ${item.quantity}`;
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remover';
    removeButton.onclick = () => removeFromCart(item.productName);
    itemElement.appendChild(removeButton);
    cartItemsElement.appendChild(itemElement);
    updateCheckoutButton();
  });

  function updateCheckoutButton() {
    const checkoutButton = document.getElementById('checkout-button');
    if (cart.length > 0) {
      checkoutButton.removeAttribute('disabled');
    } else {
      checkoutButton.setAttribute('disabled', 'disabled');
    }
  }

  cartTotalElement.innerText = `R$ ${total.toFixed(2)}`;
}
function toggleCart() {
  const cartEl = document.getElementById('shopping-cart');
  const overlay = document.getElementById('overlay');
  const isCartDisplayed = cartEl.classList.contains('active');

  // Mostrar ou esconder o carrinho baseado em seu estado atual
  if (isCartDisplayed) {
    cartEl.style.display = 'none';
    overlay.style.display = 'none';
  } else {
    cartEl.style.display = 'block';
    overlay.style.display = 'block';
  }

  // Alternar a classe 'active'
  cartEl.classList.toggle('active');
}

function showPaymentOptions() {
  if (cart.length === 0) {
    // Se o carrinho estiver vazio, não faça nada
    return;
  }
  // Esconde o carrinho e mostra as opções de pagamento
  else{
  document.getElementById('shopping-cart').style.display = 'none';
  document.getElementById('payment-options').style.display = 'block';
  document.getElementById('overlay').style.display = 'block';
  }
}

function selectPaymentMethod(method) {
  // Mostra a mensagem de confirmação com o método de pagamento selecionado
  document.getElementById('confirmation-message').textContent = `Obrigado por sua compra! Seu pagamento via ${method} foi recebido.`;
  document.getElementById('payment-options').style.display = 'none';
  showConfirmationModal();
  emptyCart();
}

function emptyCart() {
  cart = []; // Esvazia o array do carrinho
  updateCartDisplay(); // Atualiza a exibição do carrinho
}

function showConfirmationModal() {
  document.getElementById('confirmation-modal').style.display = 'block';
  // O overlay já está sendo exibido neste ponto
}

function hideModal() {
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('confirmation-modal').style.display = 'none';
  document.getElementById('payment-options').style.display = 'none';
}

function backToHome() {
  // Esconde o overlay e o modal
  document.getElementById('overlay').style.display = 'none';
  document.getElementById('confirmation-modal').style.display = 'none';
  // Adiciona uma ação para voltar ao topo da página
  window.scrollTo(0, 0);
}

function closePaymentOptions() {
  document.getElementById('payment-options').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

window.addEventListener('click', function(event) {
  const overlay = document.getElementById('overlay');
  if (event.target === overlay) {
    overlay.style.display = 'none';
    document.getElementById('shopping-cart').style.display = 'none';
    document.getElementById('confirmation-modal').style.display = 'none';
  }

function mostrarMensagem() {
  alert("Esta é a sua mensagem informativa");
}

document.getElementById('cart-button').addEventListener('click', function(event) {
  event.stopPropagation();
  toggleCart();
});
  
});




 // Função para gerar número ou letra aleatória
 function gerarNumeroOuLetraAleatoria() {
  // Gera um número aleatório entre 1 e 100
  var numeroAleatorio = Math.floor(Math.random() * 100) + 1;

  // Gera uma letra aleatória
  var letraAleatoria = String.fromCharCode(Math.floor(Math.random() * 26) + 65);

  // Concatena o número e a letra
  var resultado = `${numeroAleatorio}${letraAleatoria}`;

  // Exibe o resultado na página
  document.getElementById('numeroOuLetraAleatoria').textContent = `Codigo: ${resultado}`;
}

function enviarDados() {
  // Obter valores dos campos
  var nome = document.querySelectorAll('#nome').value;
  var email = document.querySelectorAll('#email').value;
  // Validar se os campos foram preenchidos
  if (nome && email ) {
    // Exibir os dados na console (em um cenário real, você enviaria esses dados para um servidor seguro)
    console.log('Nome:', nome);
    console.log('E-mail:', email);

    // Limpar os campos do formulário após o envio
    document.getElementById('formulario').reset();
  } else {
    alert('Por favor, preencha todos os campos.');
  }
}