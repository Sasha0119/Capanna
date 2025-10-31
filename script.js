 // =========================
  // MOBILE MENU TOGGLE
  // =========================
  const menuBtn = document.querySelector('.menu-btn');
  const closeBtn = document.querySelector('.close-btn');
  const navigation = document.querySelector('nav');

  menuBtn.addEventListener('click', () => navigation.classList.add('active'));
  closeBtn.addEventListener('click', () => navigation.classList.remove('active'));

  // =========================
  // FORM SUBMISSION TO TELEGRAM BOT (RESERVATION)
  // =========================
  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('reservation-form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const messageDiv = document.getElementById('form-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      // Get values
      const name = document.getElementById('name').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const email = document.getElementById('email').value.trim();
      const persons = document.getElementById('persons').value.trim();
      const date = document.getElementById('date').value.trim();
      const time = document.getElementById('time').value.trim();
      const message = document.getElementById('message').value.trim();

      // Validation
      if (!name || !phone || !email || !persons || !date || !time) {
        showMessage('Please fill in all required fields.', 'error');
        return;
      }

      // Button loading state
      const originalText = submitBtn.textContent;
      submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
      submitBtn.disabled = true;

      // Telegram bot info
      const botToken = '8490496219:AAGY_nNT8VlSnveJUzkJsUxE3s726XizBhw';
      const chatId = '1830045630';

      const telegramMessage = `
🆕 NEW RESERVATION REQUEST

👤 Name: ${name}
📞 Phone: ${phone}
📧 Email: ${email}
👥 Persons: ${persons}
📅 Date: ${date}
⏰ Time: ${time}
💬 Message: ${message || 'No additional message'}

📊 Sent from Capanna Restaurant Website
`;

      try {
        const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ chat_id: chatId, text: telegramMessage, parse_mode: 'HTML' })
        });

        const data = await response.json();
        if (data.ok) {
          form.reset();
          showMessage('✅ Your reservation has been sent successfully!', 'success');
        } else {
          throw new Error(data.description || 'Failed to send message.');
        }
      } catch (error) {
        console.error('Error sending to Telegram:', error);
        showMessage('❌ Failed to send reservation. Please try again or call us directly.', 'error');
      } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
      }
    });

    // Input validation
    document.getElementById('phone').addEventListener('input', function() {
      this.value = this.value.replace(/[^\d+]/g, '');
    });
    document.getElementById('persons').addEventListener('input', function() {
      if (this.value < 1) this.value = 1;
      if (this.value > 20) this.value = 20;
    });

    // Message display
    function showMessage(text, type) {
      messageDiv.textContent = text;
      messageDiv.className = `message ${type}`;
      messageDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
      setTimeout(() => { messageDiv.textContent = ''; messageDiv.className = ''; }, 5000);
    }
  });

  // =========================
  // MENU CATEGORY FILTERING
  // =========================
  const categoryButtons = document.querySelectorAll('.btn-cat');
  const menuItems = document.querySelectorAll('.img_cards');

  categoryButtons.forEach(button => {
    button.addEventListener('click', function() {
      categoryButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
      const category = this.getAttribute('data-id');
      menuItems.forEach(item => {
        item.style.display = (category === 'all' || item.getAttribute('data-category') === category) ? 'block' : 'none';
      });
    });
  });

  // =========================
  // HEADER SCROLL EFFECT
  // =========================
  window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.95)';
      header.style.padding = '10px 0';
    } else {
      header.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      header.style.padding = '15px 0';
    }
  });

  // =========================
  // CLOSE MENU WHEN LINK CLICKED
  // =========================
  document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => navigation.classList.remove('active')));

  // =========================
  // ORDER SECTION FUNCTIONALITY
  // =========================
  document.addEventListener('DOMContentLoaded', initOrderSection);

  function initOrderSection() {
    const orderForm = document.getElementById('order-form');
    const orderSubmit = document.getElementById('order-submit');
    const orderMessageDiv = document.getElementById('order-form-message');
    const mapWrap = document.getElementById('map-wrap');
    const orderAddress = document.getElementById('order-address');
    const useLocBtn = document.getElementById('use-location');
    const clearMarkerBtn = document.getElementById('clear-marker');
    const summaryCount = document.getElementById('summary-count');
    const summaryTotal = document.getElementById('summary-total');

    let map = null;
    let marker = null;
    
    const MIN_ORDER = 50000;
    const DELIVERY_FEE = 10000;
    const FREE_DELIVERY_THRESHOLD = 100000;

    // Expand/collapse categories
    document.querySelectorAll('#order_section .cat-toggle').forEach(btn => {
      btn.addEventListener('click', function() {
        const items = this.nextElementSibling;
        const isOpen = items.style.display === 'block';
        items.style.display = isOpen ? 'none' : 'block';
        this.textContent = isOpen ? this.textContent.replace('▴', '▾') : this.textContent.replace('▾', '▴');
      });
    });

    // Delivery / Pickup change
    document.querySelectorAll('input[name="orderType"]').forEach(r => {
      r.addEventListener('change', function() {
        if (this.value === 'Delivery') {
          mapWrap.classList.remove('hidden');
          if (!map) initMap();
        } else {
          mapWrap.classList.add('hidden');
          if (marker) { map.removeLayer(marker); marker = null; }
          orderAddress.value = '';
        }
        updateSummary();
      });
    });

    // Initialize Leaflet map
    function initMap() {
      const center = [41.2995, 69.2401];
      map = L.map('map').setView(center, 12);
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      map.on('click', e => placeMarkerAndReverse(e.latlng));

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;
          map.setView([lat, lng], 15);
          placeMarkerAndReverse({ lat, lng });
        }, () => console.warn('Geolocation failed'));
      }
    }

    async function placeMarkerAndReverse(latlng) {
      if (!map) return;
      if (marker) { marker.setLatLng(latlng); } 
      else { marker = L.marker(latlng, { draggable: true }).addTo(map); }

      marker.on('dragend', () => {
        const ll = marker.getLatLng();
        orderAddress.value = `Lat:${ll.lat.toFixed(6)},Lng:${ll.lng.toFixed(6)}`;
        reverseGeocode(ll.lat, ll.lng);
      });

      orderAddress.value = `Lat:${latlng.lat.toFixed(6)},Lng:${latlng.lng.toFixed(6)}`;
      await reverseGeocode(latlng.lat, latlng.lng);
    }

    async function reverseGeocode(lat, lon) {
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lon}`);
        const data = await res.json();
        if (data?.display_name) orderAddress.value = data.display_name;
      } catch { orderAddress.value = 'Please type address manually'; }
    }

    useLocBtn.addEventListener('click', () => {
      if (!navigator.geolocation) { showOrderMessage('Geolocation not supported', 'error'); return; }
      useLocBtn.disabled = true; useLocBtn.textContent = 'Locating...';
      navigator.geolocation.getCurrentPosition(pos => {
        const lat = pos.coords.latitude; const lng = pos.coords.longitude;
        if (!map) initMap();
        map.setView([lat, lng], 15);
        placeMarkerAndReverse({ lat, lng });
        useLocBtn.disabled = false; useLocBtn.textContent = 'Use my location';
      }, err => {
        showOrderMessage('Unable to get location: ' + err.message, 'error');
        useLocBtn.disabled = false; useLocBtn.textContent = 'Use my location';
      });
    });

    clearMarkerBtn.addEventListener('click', () => {
      if (marker) { map.removeLayer(marker); marker = null; orderAddress.value = ''; }
    });

    // Summary update
    document.querySelectorAll('#order_section input[name="order-item"], #order_section .item-qty').forEach(el => el.addEventListener('change', updateSummary));

    function updateSummary() {
      const selected = Array.from(document.querySelectorAll('#order_section input[name="order-item"]:checked'));
      let count = 0, total = 0;
      selected.forEach(el => {
        let qty = 1;
        const parent = el.closest('.dish-single');
        if (parent) { const qEl = parent.querySelector('.item-qty'); if (qEl) qty = parseInt(qEl.value) || 1; }
        const price = Number(el.dataset.price) || extractPriceFromValue(el.value) || 0;
        count += qty; total += price * qty;
      });
      const orderType = document.querySelector('input[name="orderType"]:checked').value;
      if (orderType === 'Delivery' && total < FREE_DELIVERY_THRESHOLD && total > 0) total += DELIVERY_FEE;
      summaryCount.textContent = count;
      summaryTotal.textContent = total.toLocaleString('en-US');
    }

    function extractPriceFromValue(val) { const m = val.match(/(\d[\d\s]*)\s*so'm$/); return m ? Number(m[1].replace(/\s+/g, '')) : 0; }

    // Submit order
    orderForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const selectedEls = Array.from(document.querySelectorAll('#order_section input[name="order-item"]:checked'));
      if (!selectedEls.length) { showOrderMessage('Select at least one item.', 'error'); return; }

      const items = []; let total = 0;
      selectedEls.forEach(el => {
        let qty = 1;
        const parent = el.closest('.dish-single');
        if (parent) { const qEl = parent.querySelector('.item-qty'); if (qEl) qty = parseInt(qEl.value)||1; }
        const price = Number(el.dataset.price)||extractPriceFromValue(el.value)||0;
        total += price*qty; items.push({name: el.value, qty, price});
      });

      const orderType = document.querySelector('input[name="orderType"]:checked').value;
      if (orderType==='Delivery' && total < MIN_ORDER) { showOrderMessage(`Minimum delivery: ${MIN_ORDER.toLocaleString('en-US')} so'm.`, 'error'); return; }

      const name = document.getElementById('order-name').value.trim();
      const phone = document.getElementById('order-phone').value.trim();
      const address = orderAddress.value.trim();
      const note = document.getElementById('order-note').value.trim();
      if (!name || !phone) { showOrderMessage('Provide name and phone.', 'error'); return; }
      if (orderType==='Delivery' && !address) { showOrderMessage('Select location or type address.', 'error'); return; }

      if (orderType==='Delivery' && total < FREE_DELIVERY_THRESHOLD) total += DELIVERY_FEE;

      const BOT_TOKEN = '8490496219:AAGY_nNT8VlSnveJUzkJsUxE3s726XizBhw';
      const CHAT_ID = '1830045630';
      
      const itemsText = items.map(it=>`${it.qty} x ${it.name} (${it.price.toLocaleString('en-US')} so'm)`).join('\n');
      const deliveryFeeText = orderType==='Delivery' && total>=FREE_DELIVERY_THRESHOLD?'Free':`${DELIVERY_FEE.toLocaleString('en-US')} so'm`;
      const telegramText = `
🛒 NEW ORDER

👤 Name: ${escapeHtml(name)}
📞 Phone: ${escapeHtml(phone)}
🚚 Type: ${escapeHtml(orderType)}
${orderType==='Delivery'?`📍 Address: ${escapeHtml(address)}\n💸 Delivery Fee: ${deliveryFeeText}`:''}
🧾 Items:
${escapeHtml(itemsText)}

💰 Total: ${total.toLocaleString('en-US')} so'm
📝 Notes: ${escapeHtml(note||'—')}

📊 Sent from Capanna Website
`;

      const orig = orderSubmit.textContent;
      orderSubmit.innerHTML = '<span class="spinner"></span> Sending...';
      orderSubmit.disabled = true;

      try {
        const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
          method:'POST',
          headers:{'Content-Type':'application/json'},
          body: JSON.stringify({ chat_id: CHAT_ID, text: telegramText, parse_mode:'HTML' })
        });
        const data = await res.json();
        if (data.ok) {
          orderForm.reset();
          if(marker){map.removeLayer(marker);marker=null;}
          mapWrap.classList.add('hidden');
          updateSummary();
          showOrderMessage('✅ Order sent! We will contact you shortly.', 'success');
        } else { throw new Error(data.description||'Telegram error'); }
      } catch(err) { console.error('Send error',err); showOrderMessage('❌ Failed to send order. Try again or call us.', 'error'); }
      finally { orderSubmit.innerHTML=orig; orderSubmit.disabled=false; }
    });

    function showOrderMessage(text,type){
      orderMessageDiv.textContent=text;
      orderMessageDiv.className=`form-message message ${type}`;
      if(type==='success'){ setTimeout(()=>{ orderMessageDiv.textContent=''; orderMessageDiv.className='form-message'; },5000);}
    }

    function escapeHtml(str){return String(str).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}

    updateSummary();
  }
