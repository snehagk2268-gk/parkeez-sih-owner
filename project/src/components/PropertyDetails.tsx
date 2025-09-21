import React, { useState } from 'react';
import { MapPin, Camera, FileText, Clock, Shield, Plus, X } from 'lucide-react';

interface PropertyDetailsProps {
  onComplete: () => void;
}

const PropertyDetails: React.FC<PropertyDetailsProps> = ({ onComplete }) => {
  const [formData, setFormData] = useState({
    location: '',
    totalSlots: '',
    workingHours: {
      start: '',
      end: '',
    },
    watchmanAvailable: false,
    slots: [{ dimension: '', image: null }],
    verificationDoc: null,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      setFormData({
        ...formData,
        [name]: (e.target as HTMLInputElement).checked
      });
    } else if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...(formData as any)[parent],
          [child]: value
        }
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const addSlot = () => {
    setFormData({
      ...formData,
      slots: [...formData.slots, { dimension: '', image: null }]
    });
  };

  const removeSlot = (index: number) => {
    setFormData({
      ...formData,
      slots: formData.slots.filter((_, i) => i !== index)
    });
  };

  const handleSlotChange = (index: number, field: string, value: any) => {
    const updatedSlots = formData.slots.map((slot, i) => 
      i === index ? { ...slot, [field]: value } : slot
    );
    setFormData({
      ...formData,
      slots: updatedSlots
    });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="card p-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-royal-blue-800 mb-2">Property Details</h2>
          <p className="text-gray-600">Please provide details about your parking facility</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <MapPin className="h-5 w-5 mr-2 text-royal-blue-600" />
              Basic Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Property Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter complete address"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Total Parking Slots
                </label>
                <input
                  type="number"
                  name="totalSlots"
                  value={formData.totalSlots}
                  onChange={handleChange}
                  className="input-field"
                  placeholder="Enter number of slots"
                  min="1"
                  required
                />
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <Clock className="h-5 w-5 mr-2 text-royal-blue-600" />
              Working Hours
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Opening Time
                </label>
                <input
                  type="time"
                  name="workingHours.start"
                  value={formData.workingHours.start}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Closing Time
                </label>
                <input
                  type="time"
                  name="workingHours.end"
                  value={formData.workingHours.end}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <label className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  name="watchmanAvailable"
                  checked={formData.watchmanAvailable}
                  onChange={handleChange}
                  className="w-5 h-5 text-royal-blue-600 rounded focus:ring-royal-blue-500"
                />
                <span className="text-gray-700 font-medium flex items-center">
                  <Shield className="h-4 w-4 mr-2 text-royal-blue-600" />
                  Watchman Available
                </span>
              </label>
            </div>
          </div>

          {/* Slot Details */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                <Camera className="h-5 w-5 mr-2 text-royal-blue-600" />
                Slot Details
              </h3>
              <button
                type="button"
                onClick={addSlot}
                className="btn-secondary flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Add Slot</span>
              </button>
            </div>

            <div className="space-y-4">
              {formData.slots.map((slot, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-gray-700">Slot {index + 1}</h4>
                    {formData.slots.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeSlot(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Dimensions (L x W in feet)
                      </label>
                      <input
                        type="text"
                        value={slot.dimension}
                        onChange={(e) => handleSlotChange(index, 'dimension', e.target.value)}
                        className="input-field"
                        placeholder="e.g., 20 x 10"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Slot Image
                      </label>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleSlotChange(index, 'image', e.target.files?.[0])}
                        className="input-field"
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Document */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-royal-blue-600" />
              Verification Document
            </h3>
            
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Upload Document (e.g., Last month's electricity bill)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => setFormData({
                  ...formData,
                  verificationDoc: e.target.files?.[0] || null
                })}
                className="input-field"
                required
              />
              <p className="text-sm text-gray-500 mt-2">
                Accepted formats: PDF, JPG, JPEG, PNG (Max 5MB)
              </p>
            </div>
          </div>

          <div className="flex space-x-4">
            <button type="submit" className="btn-primary flex-1">
              Complete Registration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PropertyDetails;