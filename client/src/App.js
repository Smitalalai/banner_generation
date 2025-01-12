import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [brandAssets, setBrandAssets] = useState(null);
  const [text, setText] = useState('');
  const [audience, setAudience] = useState('');
  const [platform, setPlatform] = useState('');
  const [banner, setBanner] = useState(null);

  const handleGenerateBanner = async () => {
    const formData = new FormData();
    formData.append('brandAssets', brandAssets);
    formData.append('text', text);
    formData.append('audience', audience);
    formData.append('platform', platform);

    const response = await axios.post('/generate-banner', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    setBanner(response.data.banner);
  };

  return (
    <div>
      <h1>Banner Generator</h1>
      <input type="file" onChange={(e) => setBrandAssets(e.target.files[0])} />
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Text" />
      <input type="text" value={audience} onChange={(e) => setAudience(e.target.value)} placeholder="Audience" />
      <input type="text" value={platform} onChange={(e) => setPlatform(e.target.value)} placeholder="Platform" />
      <button onClick={handleGenerateBanner}>Generate Banner</button>
      {banner && <img src={banner} alt="Generated Banner" />}
    </div>
  );
}

export default App;