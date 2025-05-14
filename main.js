async function loadData() {
    try {
      const [productsRes, sectionsRes] = await Promise.all([
        fetch('data/products.json'),
        fetch('data/sections.json')
      ]);
  
      if (!productsRes.ok || !sectionsRes.ok) {
        throw new Error('Failed to fetch one or more files.');
      }
  
      const products = await productsRes.json();
      const sections = await sectionsRes.json();
  
      renderProducts(products);
      renderSections(sections);
    } catch (error) {
      console.error(error);
      document.body.innerHTML += `<p style="color: red;">Error loading data. Please try again later.</p>`;
    }
  }
  
  function renderProducts(products) {
    const container = document.getElementById('product-list');
    products.forEach(product => {
      const card = document.createElement('div');
      card.className = 'product-card';
      card.innerHTML = `
        <img src="${product.imageUrl}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>$${product.price}</p>
        <a href="product.html?id=${product.id}">View Details</a>
      `;
      container.appendChild(card);
    });
  }
  
  function renderSections(data) {
    document.getElementById('header-text').textContent = data.headerText;
    document.getElementById('banner').src = data.bannerImage;
  
    const infoContainer = document.getElementById('info-sections');
    data.infoSections.forEach(section => {
      const div = document.createElement('div');
      div.innerHTML = `<h4>${section.title}</h4><p>${section.content}</p>`;
      infoContainer.appendChild(div);
    });
  }
  
  loadData();
  