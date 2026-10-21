// src/pages/SearchPage.jsx
import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ITEM_CATEGORIES, CAMPUS_LOCATIONS } from '../data/mockData';
import { Search, LayoutGrid, List, MapPin, Calendar, Sparkles, ArrowRight, Box } from 'lucide-react';
import { EmptyState } from '../components/common/EmptyState';

export const SearchPage = () => {
  const {
    reports,
    searchQuery,
    setSearchQuery,
    selectedTypeFilter,
    setSelectedTypeFilter,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedLocationFilter,
    setSelectedLocationFilter,
    viewMode,
    setViewMode,
    navigateToDetails,
    openVrInspector,
  } = useApp();

  const [colorFilter, setColorFilter] = useState('all');
  const [sortBy, setSortBy] = useState('newest'); // 'newest', 'relevant'

  // Working real-time filter logic
  const filteredReports = reports.filter((item) => {
    // Type Filter
    if (selectedTypeFilter !== 'all' && item.type !== selectedTypeFilter) return false;

    // Category Filter
    if (selectedCategoryFilter !== 'all' && item.category !== selectedCategoryFilter) return false;

    // Location Filter
    if (selectedLocationFilter !== 'all' && item.location !== selectedLocationFilter) return false;

    // Color Filter
    if (colorFilter !== 'all' && !item.color.toLowerCase().includes(colorFilter.toLowerCase())) return false;

    // Search Query Matching
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = item.title.toLowerCase().includes(q);
      const matchDesc = item.description.toLowerCase().includes(q);
      const matchLoc = item.location.toLowerCase().includes(q);
      const matchSubLoc = item.subLocation?.toLowerCase().includes(q);
      const matchCat = item.categoryLabel.toLowerCase().includes(q);
      const matchId = item.id.toLowerCase().includes(q);
      return matchTitle || matchDesc || matchLoc || matchSubLoc || matchCat || matchId;
    }

    return true;
  });

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Header */}
      <div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: '900', color: 'var(--slate-900)', marginBottom: '0.25rem' }}>
          Find Items
        </h1>
        <p style={{ fontSize: '0.875rem', color: 'var(--slate-500)' }}>
          Search through active campus lost reports and items handed in by fellow students
        </p>
      </div>

      {/* Main Search Input */}
      <div style={{ position: 'relative' }}>
        <Search
          size={22}
          style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--primary-600)' }}
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an item (e.g. 'black wallet', 'ID card', 'Library')..."
          className="form-input"
          style={{
            paddingLeft: '48px',
            paddingRight: '16px',
            height: '52px',
            fontSize: '1rem',
            borderRadius: 'var(--radius-lg)',
            boxShadow: 'var(--shadow-sm)',
          }}
        />
      </div>

      {/* Filter Control Bar */}
      <div
        className="glass-card"
        style={{
          padding: '1rem 1.25rem',
          borderRadius: 'var(--radius-lg)',
          display: 'flex',
          flexWrap: 'wrap',
          gap: '1rem',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', alignItems: 'center' }}>
          {/* Type Filter */}
          <div style={{ display: 'flex', backgroundColor: 'var(--slate-100)', borderRadius: 'var(--radius-md)', padding: '2px' }}>
            {['all', 'lost', 'found'].map((t) => (
              <button
                key={t}
                onClick={() => setSelectedTypeFilter(t)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-sm)',
                  border: 'none',
                  backgroundColor: selectedTypeFilter === t ? 'white' : 'transparent',
                  color: selectedTypeFilter === t ? 'var(--slate-900)' : 'var(--slate-600)',
                  fontWeight: selectedTypeFilter === t ? '700' : '500',
                  fontSize: '0.8125rem',
                  cursor: 'pointer',
                  textTransform: 'capitalize',
                  boxShadow: selectedTypeFilter === t ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {t === 'all' ? 'All Items' : t}
              </button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategoryFilter}
            onChange={(e) => setSelectedCategoryFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', fontSize: '0.8125rem', padding: '4px 10px' }}
          >
            <option value="all">All Categories</option>
            {ITEM_CATEGORIES.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          {/* Location Filter */}
          <select
            value={selectedLocationFilter}
            onChange={(e) => setSelectedLocationFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', fontSize: '0.8125rem', padding: '4px 10px' }}
          >
            <option value="all">All Locations</option>
            {CAMPUS_LOCATIONS.map((l) => (
              <option key={l.id} value={l.name}>
                {l.name}
              </option>
            ))}
          </select>

          {/* Color Filter */}
          <select
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
            className="form-select"
            style={{ width: 'auto', fontSize: '0.8125rem', padding: '4px 10px' }}
          >
            <option value="all">All Colors</option>
            <option value="black">Black</option>
            <option value="blue">Blue</option>
            <option value="white">White</option>
            <option value="silver">Silver</option>
          </select>
        </div>

        {/* View Toggle & Count */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span style={{ fontSize: '0.8125rem', fontWeight: '700', color: 'var(--slate-600)' }}>
            {filteredReports.length} {filteredReports.length === 1 ? 'item' : 'items'} found
          </span>

          <div style={{ display: 'flex', gap: '4px', backgroundColor: 'var(--slate-100)', padding: '2px', borderRadius: 'var(--radius-md)' }}>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'grid' ? 'white' : 'transparent',
                color: viewMode === 'grid' ? 'var(--primary-600)' : 'var(--slate-500)',
                cursor: 'pointer',
              }}
              aria-label="Grid view"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              style={{
                padding: '6px',
                border: 'none',
                borderRadius: 'var(--radius-sm)',
                backgroundColor: viewMode === 'list' ? 'white' : 'transparent',
                color: viewMode === 'list' ? 'var(--primary-600)' : 'var(--slate-500)',
                cursor: 'pointer',
              }}
              aria-label="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Results Display */}
      {filteredReports.length === 0 ? (
        <EmptyState
          icon={Search}
          title="No items found"
          description="Try another search or adjust your filters."
          actionText="Clear Filters"
          onAction={() => {
            setSearchQuery('');
            setSelectedTypeFilter('all');
            setSelectedCategoryFilter('all');
            setSelectedLocationFilter('all');
            setColorFilter('all');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-interactive"
              style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ position: 'relative', marginBottom: '0.75rem' }}>
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
                />
                <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`} style={{ position: 'absolute', top: '8px', left: '8px' }}>
                  {item.type}
                </span>

                {item.status === 'Potential Match' && (
                  <span className="badge badge-match" style={{ position: 'absolute', top: '8px', right: '8px' }}>
                    <Sparkles size={12} /> Potential Match
                  </span>
                )}
              </div>

              <h3 style={{ fontSize: '1rem', fontWeight: '800', color: 'var(--slate-900)', marginBottom: '0.5rem' }}>
                {item.title}
              </h3>

              <div style={{ fontSize: '0.8125rem', color: 'var(--slate-500)', display: 'flex', flexDirection: 'column', gap: '4px', marginBottom: '1rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={14} /> {item.location} ({item.subLocation})
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Calendar size={14} /> {item.date} • {item.time}
                </span>
              </div>

              <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid var(--slate-100)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '6px' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: '600', color: 'var(--slate-600)' }}>#{item.id}</span>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <button
                    onClick={() => openVrInspector(item.id)}
                    style={{
                      background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                      color: 'white',
                      border: 'none',
                    }}
                    className="btn btn-sm"
                  >
                    <Box size={14} /> 3D VR
                  </button>
                  <button onClick={() => navigateToDetails(item.id)} className="btn btn-secondary btn-sm">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="glass-card glass-card-interactive"
              style={{ padding: '1rem', display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}
            >
              <img
                src={item.imageUrl}
                alt={item.title}
                style={{ width: '64px', height: '64px', objectFit: 'cover', borderRadius: 'var(--radius-md)' }}
              />
              <div style={{ flex: 1, minWidth: '200px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className={`badge ${item.type === 'lost' ? 'badge-lost' : 'badge-found'}`}>
                    {item.type}
                  </span>
                  {item.status === 'Potential Match' && (
                    <span className="badge badge-match">
                      <Sparkles size={12} /> Potential Match
                    </span>
                  )}
                  <span style={{ fontSize: '0.75rem', color: 'var(--slate-400)' }}>#{item.id}</span>
                </div>
                <h3 style={{ fontSize: '0.9375rem', fontWeight: '800', color: 'var(--slate-900)' }}>
                  {item.title}
                </h3>
                <div style={{ fontSize: '0.75rem', color: 'var(--slate-500)', marginTop: '2px' }}>
                  {item.location} • {item.date}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  onClick={() => openVrInspector(item.id)}
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #8b5cf6 100%)',
                    color: 'white',
                    border: 'none',
                  }}
                  className="btn btn-sm"
                >
                  <Box size={14} /> 3D VR View
                </button>
                <button onClick={() => navigateToDetails(item.id)} className="btn btn-secondary btn-sm">
                  View Details <ArrowRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
