import { useState, useEffect } from 'react';

const OfferForm = ({ offer, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    discount_percentage: '',
    valid_from: '',
    valid_until: '',
    priority: 0,
    is_active: true
  });

  useEffect(() => {
    if (offer) {
      setFormData({
        title: offer.title || '',
        message: offer.message || '',
        discount_percentage: offer.discount_percentage || '',
        valid_from: offer.valid_from ? offer.valid_from.slice(0, 16) : '',
        valid_until: offer.valid_until ? offer.valid_until.slice(0, 16) : '',
        priority: offer.priority || 0,
        is_active: offer.is_active !== undefined ? offer.is_active : true
      });
    }
  }, [offer]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Convert datetime-local to ISO format
    const submitData = {
      ...formData,
      valid_from: new Date(formData.valid_from).toISOString(),
      valid_until: new Date(formData.valid_until).toISOString(),
      discount_percentage: formData.discount_percentage ? parseFloat(formData.discount_percentage) : null
    };
    
    onSave(submitData);
  };

  return (
    <form onSubmit={handleSubmit} className="card p-4">
      <h4 className="mb-3">{offer ? 'Edit Offer' : 'Create New Offer'}</h4>
      
      <div className="mb-3">
        <label className="form-label">Title *</label>
        <input
          type="text"
          className="form-control"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          maxLength={200}
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Message *</label>
        <textarea
          className="form-control"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
        />
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Discount Percentage</label>
          <input
            type="number"
            className="form-control"
            name="discount_percentage"
            value={formData.discount_percentage}
            onChange={handleChange}
            min="0"
            max="100"
            step="0.01"
            placeholder="Optional"
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Priority</label>
          <input
            type="number"
            className="form-control"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            min="0"
          />
          <small className="text-muted">Higher numbers appear first</small>
        </div>
      </div>

      <div className="row mb-3">
        <div className="col-md-6">
          <label className="form-label">Valid From *</label>
          <input
            type="datetime-local"
            className="form-control"
            name="valid_from"
            value={formData.valid_from}
            onChange={handleChange}
            required
          />
        </div>
        <div className="col-md-6">
          <label className="form-label">Valid Until *</label>
          <input
            type="datetime-local"
            className="form-control"
            name="valid_until"
            value={formData.valid_until}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="is_active"
          name="is_active"
          checked={formData.is_active}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="is_active">
          Active
        </label>
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          {offer ? 'Update' : 'Create'}
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default OfferForm;
