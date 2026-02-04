import { useState, useEffect } from 'react';
import { offerAPI } from '../services/apiService';

const OfferList = ({ onEdit, refreshKey }) => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, [refreshKey]);

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await offerAPI.getAllAdmin();
      // Extract array from response - handle both direct array and object with data property
      setOffers(Array.isArray(response) ? response : (response.data || []));
      setError(null);
    } catch (err) {
      setError(err.message || 'Failed to load offers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;

    try {
      await offerAPI.delete(id);
      fetchOffers();
    } catch (err) {
      alert(err.message || 'Failed to delete offer');
    }
  };

  const formatDateTime = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  if (loading) return <div className="text-center p-4">Loading offers...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4>Promotional Offers</h4>
        <span className="badge bg-secondary">{offers.length} offers</span>
      </div>

      {offers.length === 0 ? (
        <div className="alert alert-info">No offers created yet</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Title</th>
                <th>Discount</th>
                <th>Valid From</th>
                <th>Valid Until</th>
                <th>Priority</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {offers.map((offer) => (
                <tr key={offer.id}>
                  <td>
                    <strong>{offer.title}</strong>
                    <br />
                    <small className="text-muted">{offer.message.substring(0, 50)}{offer.message.length > 50 ? '...' : ''}</small>
                  </td>
                  <td>
                    {offer.discount_percentage ? (
                      <span className="badge bg-success">{offer.discount_percentage}%</span>
                    ) : (
                      <span className="text-muted">N/A</span>
                    )}
                  </td>
                  <td>{formatDateTime(offer.valid_from)}</td>
                  <td>{formatDateTime(offer.valid_until)}</td>
                  <td>
                    <span className="badge bg-info">{offer.priority}</span>
                  </td>
                  <td>
                    {offer.is_active ? (
                      <span className="badge bg-success">Active</span>
                    ) : (
                      <span className="badge bg-secondary">Inactive</span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => onEdit(offer)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(offer.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OfferList;
