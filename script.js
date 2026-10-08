// NovaFlow Landing Page Interactive Script

document.addEventListener('DOMContentLoaded', () => {
  // ==================== MOBILE MENU TOGGLE ====================
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      const isHidden = mobileMenu.classList.contains('hidden');
      if (isHidden) {
        mobileMenu.classList.remove('hidden');
        menuIconOpen.classList.add('hidden');
        menuIconClose.classList.remove('hidden');
      } else {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      }
    });

    // Close menu when clicking links
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        menuIconOpen.classList.remove('hidden');
        menuIconClose.classList.add('hidden');
      });
    });
  }

  // ==================== PRICING TOGGLE ====================
  const billingMonthlyBtn = document.getElementById('billing-monthly');
  const billingAnnualBtn = document.getElementById('billing-annual');
  const priceStarter = document.getElementById('price-starter');
  const pricePro = document.getElementById('price-pro');
  const priceEnterprise = document.getElementById('price-enterprise');
  const cycleStarter = document.getElementById('cycle-starter');
  const cyclePro = document.getElementById('cycle-pro');
  const cycleEnterprise = document.getElementById('cycle-enterprise');

  let isAnnual = false;

  const pricingData = {
    monthly: {
      starter: '$19',
      pro: '$49',
      enterprise: '$199',
      subtext: 'Billed monthly'
    },
    annual: {
      starter: '$15',
      pro: '$39',
      enterprise: '$159',
      subtext: 'Billed annually ($180/yr)'
    }
  };

  function updatePricing(annual) {
    isAnnual = annual;
    const mode = annual ? 'annual' : 'monthly';

    if (annual) {
      billingAnnualBtn.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      billingAnnualBtn.classList.remove('text-slate-600');
      billingMonthlyBtn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      billingMonthlyBtn.classList.add('text-slate-600');
    } else {
      billingMonthlyBtn.classList.add('bg-white', 'text-slate-900', 'shadow-sm');
      billingMonthlyBtn.classList.remove('text-slate-600');
      billingAnnualBtn.classList.remove('bg-white', 'text-slate-900', 'shadow-sm');
      billingAnnualBtn.classList.add('text-slate-600');
    }

    // Animate and update values
    [priceStarter, pricePro, priceEnterprise].forEach(el => {
      el.classList.add('scale-90', 'opacity-50');
    });

    setTimeout(() => {
      priceStarter.textContent = pricingData[mode].starter;
      pricePro.textContent = pricingData[mode].pro;
      priceEnterprise.textContent = pricingData[mode].enterprise;

      cycleStarter.textContent = pricingData[mode].subtext;
      cyclePro.textContent = annual ? 'Billed annually ($468/yr)' : pricingData[mode].subtext;
      cycleEnterprise.textContent = annual ? 'Billed annually ($1,908/yr)' : pricingData[mode].subtext;

      [priceStarter, pricePro, priceEnterprise].forEach(el => {
        el.classList.remove('scale-90', 'opacity-50');
      });
    }, 150);
  }

  if (billingMonthlyBtn && billingAnnualBtn) {
    billingMonthlyBtn.addEventListener('click', () => updatePricing(false));
    billingAnnualBtn.addEventListener('click', () => updatePricing(true));
  }

  // ==================== FAQ ACCORDION ====================
  const faqToggles = document.querySelectorAll('.faq-toggle');

  faqToggles.forEach(button => {
    button.addEventListener('click', () => {
      const parent = button.parentElement;
      const content = button.nextElementSibling;
      const icon = button.querySelector('.faq-icon');
      const isAlreadyOpen = !content.classList.contains('hidden');

      // Close all first for clean accordion behavior
      document.querySelectorAll('.faq-content').forEach(c => c.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));

      // If it wasn't open, open it
      if (!isAlreadyOpen) {
        content.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });

  // Open the first FAQ item by default
  if (faqToggles.length > 0) {
    faqToggles[0].click();
  }

  // ==================== DEMO MODAL ====================
  const demoModal = document.getElementById('demo-modal');
  const openDemoBtn = document.getElementById('open-demo-modal');
  const closeDemoBtn = document.getElementById('close-demo-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');

  function openModal() {
    if (demoModal) {
      demoModal.classList.remove('hidden');
      demoModal.classList.add('flex');
    }
  }

  function closeModal() {
    if (demoModal) {
      demoModal.classList.add('hidden');
      demoModal.classList.remove('flex');
    }
  }

  if (openDemoBtn) openDemoBtn.addEventListener('click', openModal);
  if (closeDemoBtn) closeDemoBtn.addEventListener('click', closeModal);
  if (closeModalBtn) closeModalBtn.addEventListener('click', closeModal);

  if (demoModal) {
    demoModal.addEventListener('click', (e) => {
      if (e.target === demoModal) {
        closeModal();
      }
    });
  }

  // ==================== TOAST NOTIFICATION ====================
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  function showToast(message = 'Action successful!') {
    if (!toast || !toastMessage) return;
    toastMessage.textContent = message;
    toast.classList.remove('translate-y-24', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-24', 'opacity-0');
    }, 4000);
  }

  // CTA Form Submission Handler
  const ctaForm = document.getElementById('cta-form');
  const ctaEmail = document.getElementById('cta-email');

  if (ctaForm) {
    ctaForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const email = ctaEmail ? ctaEmail.value : '';
      if (email) {
        showToast(`🎉 Welcome aboard! Trial invite sent to ${email}`);
        ctaForm.reset();
      }
    });
  }
});

