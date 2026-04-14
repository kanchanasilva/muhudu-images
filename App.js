import React, { useState, useEffect } from 'react';

function App() {
  const [availableImages, setAvailableImages] = useState([]);
  const [selectedData, setSelectedData] = useState({}); // Stores properties by filename
  const [folderName, setFolderName] = useState('');

  useEffect(() => {
    fetch('http://localhost:8091/list-images')
      .then(res => res.json())
      .then(data => setAvailableImages(data));
  }, []);

  const handlePropertyChange = (fileName, field, value) => {
    setSelectedData(prev => ({
      ...prev,
      [fileName]: { ...prev[fileName], [field]: value, fileName }
    }));
  };

  const handleConvert = async () => {
    const payload = {
      name: folderName,
      selectedImages: Object.values(selectedData).sort((a, b) => a.order - b.order)
    };

    const response = await fetch('http://localhost:8091/convert', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    const result = await response.json();
    console.log("Output JSON:", result.data);
    alert('Conversion Complete! Check console for JSON.');
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Image Processor</h1>
      <input 
        placeholder="Enter Project Name (e.g. navy-reef)" 
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        style={{ padding: '10px', width: '300px', marginBottom: '20px' }}
      />
      <button onClick={handleConvert} style={{ padding: '10px 20px', marginLeft: '10px', cursor: 'pointer' }}>
        Convert
      </button>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {availableImages.map(img => (
          <div key={img} style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <img src={`http://localhost:8091/images/${img}`} alt={img} style={{ width: '100%', height: '150px', objectFit: 'cover' }} />
            <p style={{ fontSize: '12px', margin: '5px 0' }}>{img}</p>
            
            <input type="number" placeholder="Order" 
              onChange={(e) => handlePropertyChange(img, 'order', e.target.value)} 
              style={{ width: '100%', marginBottom: '5px' }} />
            
            <input type="text" placeholder="Description" 
              onChange={(e) => handlePropertyChange(img, 'description', e.target.value)} 
              style={{ width: '100%', marginBottom: '5px' }} />
            
            <input type="month" 
              onChange={(e) => handlePropertyChange(img, 'time', e.target.value)} 
              style={{ width: '100%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;