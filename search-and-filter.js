document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const searchInput = document.querySelector('.search-box input');
  const searchBtn = document.querySelector('.search-box button');
  const tutorCards = document.querySelectorAll('.tutor-card');
  const filterGroups = document.querySelectorAll('.filter-group');
  const resetBtn = document.querySelector('.filter-buttons button:first-child');
  const applyBtn = document.querySelector('.filter-buttons button:last-child');

  // Current filters state
  let currentFilters = {
    subjects: [],
    levels: [],
    maxPrice: 500,
    availability: []
  };

  // Initialize
  initFilters();
  setupEventListeners();

  function initFilters() {
    // Set up price range slider
    const priceRange = document.getElementById('priceRange');
    const minPrice = document.getElementById('minPrice');
    const maxPrice = document.getElementById('maxPrice');
    
    priceRange.addEventListener('input', function() {
      minPrice.textContent = this.value;
      currentFilters.maxPrice = parseInt(this.value);
    });
  }

  function setupEventListeners() {
    // Search functionality
    searchBtn.addEventListener('click', filterTutors);
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') filterTutors();
    });

    // Filter checkboxes
    filterGroups.forEach(group => {
      const checkboxes = group.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function() {
          const filterType = this.closest('.filter-group').querySelector('button').textContent.trim().toLowerCase();
          updateFilters(this, filterType);
        });
      });
    });

    // Reset/Apply buttons
    resetBtn.addEventListener('click', resetFilters);
    applyBtn.addEventListener('click', filterTutors);
  }

  function updateFilters(checkbox, filterType) {
    const filterValue = checkbox.id.replace('Check', '').toLowerCase();
    
    switch(filterType) {
      case 'subjects':
        updateFilterArray(currentFilters.subjects, filterValue, checkbox.checked);
        break;
      case 'level':
        updateFilterArray(currentFilters.levels, filterValue, checkbox.checked);
        break;
      case 'availability':
        updateFilterArray(currentFilters.availability, filterValue, checkbox.checked);
        break;
    }
  }

  function updateFilterArray(array, value, isChecked) {
    if (isChecked) {
      if (!array.includes(value)) array.push(value);
    } else {
      const index = array.indexOf(value);
      if (index > -1) array.splice(index, 1);
    }
  }

  function filterTutors() {
    const searchTerm = searchInput.value.toLowerCase();
    
    tutorCards.forEach(card => {
      const tutorName = card.querySelector('h3').textContent.toLowerCase();
      const tutorSubject = card.querySelector('.tutor-subject').textContent.toLowerCase();
      const tutorBio = card.querySelector('.tutor-bio').textContent.toLowerCase();
      const tutorPrice = parseInt(card.querySelector('.price').textContent.replace('P', ''));
      const tutorType = card.querySelector('.session-type').textContent.toLowerCase();
      
      // Search term matching
      const matchesSearch = searchTerm === '' || 
        tutorName.includes(searchTerm) || 
        tutorSubject.includes(searchTerm) || 
        tutorBio.includes(searchTerm);
      
      // Subject filtering
      const matchesSubjects = currentFilters.subjects.length === 0 || 
        currentFilters.subjects.some(subject => tutorSubject.includes(subject));
      
      // Level filtering (would need to add level data to tutor cards)
      const matchesLevels = currentFilters.levels.length === 0; // Implement based on your data
      
      // Price filtering
      const matchesPrice = tutorPrice <= currentFilters.maxPrice;
      
      // Availability filtering
      const matchesAvailability = currentFilters.availability.length === 0 || 
        (currentFilters.availability.includes('weekends') && tutorType.includes('weekend')) ||
        (currentFilters.availability.includes('weekdays') && tutorType.includes('weekday'));
      
      // Show/hide based on all filters
      if (matchesSearch && matchesSubjects && matchesLevels && matchesPrice && matchesAvailability) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function resetFilters() {
    // Reset search
    searchInput.value = '';
    
    // Reset checkboxes
    document.querySelectorAll('.filter-checkboxes input[type="checkbox"]').forEach(checkbox => {
      checkbox.checked = false;
    });
    
    // Reset price range
    const priceRange = document.getElementById('priceRange');
    priceRange.value = priceRange.max;
    document.getElementById('minPrice').textContent = priceRange.max;
    
    // Reset current filters
    currentFilters = {
      subjects: [],
      levels: [],
      maxPrice: 500,
      availability: []
    };
    
    // Show all tutors
    tutorCards.forEach(card => {
      card.style.display = 'block';
    });
  }
});

