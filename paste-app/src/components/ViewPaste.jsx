import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

const ViewPaste = () => {
  const { id } = useParams();
  const allPastes = useSelector((state) => state.paste.pastes);
  const [paste, setPaste] = useState(null);

  useEffect(() => {
    let foundPaste = allPastes.find((p) => String(p._id) === String(id));

    if (!foundPaste) {
      const savedPastes = JSON.parse(localStorage.getItem("pastes") || "[]");
      foundPaste = savedPastes.find((p) => String(p._id) === String(id));
    }

    setPaste(foundPaste || null);
  }, [id, allPastes]);

  if (!paste) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900">
        <h2 className="text-gray-400 text-lg font-medium">Paste not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 min-h-screen">
      <div className="bg-gray-800 rounded-lg shadow-md border border-gray-700 p-6">
        
        <input
          type="text"
          value={paste.title || ""}
          disabled
          className="w-full mb-4 px-4 py-2 border border-gray-700 rounded-lg bg-gray-900 text-gray-200 font-medium focus:outline-none"
        />

        <textarea
          value={paste.content || ""}
          disabled
          rows={15}
          className="w-full px-4 py-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 resize-none focus:outline-none"
        />

        <div className="text-sm text-gray-500 mt-4">
          Created: {paste.createdAt}
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
