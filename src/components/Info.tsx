import React, { useState } from 'react';


export default function InfoForm() {
  const [formData, setFormData] = useState({
    age: '',
    medicalIssues: '',
    allergies: '',
    exerciseLevel: '',
    weight: '',
    height: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Process formData here, e.g., send to API or save locally
    console.log('Form submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6 ">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8 ">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Personal Health Information
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="age">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
              placeholder="Enter your age"
              required
            />
          </div>

          {/* Prior Medical Issues */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="medicalIssues">
              Prior Medical Issues
            </label>
            <textarea
              id="medicalIssues"
              name="medicalIssues"
              value={formData.medicalIssues}
              onChange={handleChange}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
              placeholder="Describe any prior medical conditions..."
            />
          </div>

          {/* Allergies */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="allergies">
              Allergies
            </label>
            <textarea
              id="allergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="w-full h-24 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
              placeholder="List any known allergies..."
            />
          </div>

          {/* Level of Exercise */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="exerciseLevel">
              Level of Exercise
            </label>
            <select
              id="exerciseLevel"
              name="exerciseLevel"
              value={formData.exerciseLevel}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
            >
              <option value="">Select your exercise frequency</option>
              <option value="Sedentary">Sedentary (No regular exercise)</option>
              <option value="Light">Light (1-2 times/week)</option>
              <option value="Moderate">Moderate (3-5 times/week)</option>
              <option value="Active">Active (6-7 times/week)</option>
              <option value="Athlete">Athlete (Very intense exercise daily)</option>
            </select>
          </div>

          {/* Weight */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="weight">
              Weight (in kg)
            </label>
            <input
              type="number"
              id="weight"
              name="weight"
              value={formData.weight}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transitio bg-white"
              placeholder="Enter your weight"
              required
            />
          </div>

          {/* Height */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="height">
              Height (in cm)
            </label>
            <input
              type="number"
              id="height"
              name="height"
              value={formData.height}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition bg-white"
              placeholder="Enter your height"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white font-semibold rounded-lg py-2 mt-6 hover:bg-green-700 transition"
          >
            Submit Information
          </button>
        </form>
      </div>
    </div>
  );
}
