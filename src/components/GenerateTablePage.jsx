import React, { useState } from 'react';
import AxiosInstance from './AxiosInstance';


function GenerateTablePage() {
  const [inputText, setInputText] = useState('');
  const [tableHtml, setTableHtml] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await AxiosInstance.post('/api/table/', {
        prompt: inputText,
      });
      setTableHtml(response.data.table_html);
    } catch (error) {
      console.error('Error generating table:', error);
    }
    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          className="w-full p-2 border rounded mb-2"
          rows="4"
          placeholder="Ask something"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? 'Wating...' : 'Submit'}
        </button>
      </form>
      <div dangerouslySetInnerHTML={{ __html: tableHtml }} />
    </div>
  );
}

export default GenerateTablePage;
