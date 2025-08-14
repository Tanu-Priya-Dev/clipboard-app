import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';
import { FiEdit, FiEye, FiTrash2, FiCopy, FiShare2 } from 'react-icons/fi';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
    const savedPastes = JSON.parse(localStorage.getItem("pastes") || "[]");
    const updatedPastes = savedPastes.filter((p) => p._id !== pasteId);
    localStorage.setItem("pastes", JSON.stringify(updatedPastes));
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 bg-[#0d1117] min-h-screen">
      
      <input
        className="w-full p-2 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-gray-500 bg-[#161b22] text-white"
        type="search"
        placeholder="Search your pastes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="flex flex-col gap-5 mt-6">
        {filteredData.length === 0 ? (
          <p className="text-gray-400 text-center">No pastes found</p>
        ) : (
          filteredData.map((paste) => (
            <div
              className="relative bg-[#161b22] shadow-sm rounded-lg border border-gray-800 p-4 hover:shadow-md transition-shadow"
              key={paste._id}
            >
              
              <div className="absolute top-3 right-3 flex gap-3 text-gray-400">
                <a href={`/?pasteId=${paste._id}`} title="Edit" className="hover:text-white">
                  <FiEdit size={18} />
                </a>
                <a href={`/pastes/${paste._id}`} title="View" className="hover:text-white">
                  <FiEye size={18} />
                </a>
                <button onClick={() => handleDelete(paste._id)} title="Delete" className="hover:text-white">
                  <FiTrash2 size={18} />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(paste.content);
                    toast.success('Copied to clipboard');
                  }}
                  title="Copy"
                  className="hover:text-white"
                >
                  <FiCopy size={18} />
                </button>
                <button
                  onClick={() => {
                    if (navigator.share) {
                      navigator
                        .share({
                          title: paste.title,
                          text: paste.content,
                          url: window.location.href,
                        })
                        .then(() => {
                          toast.success("Shared successfully!");
                        })
                        .catch((error) => {
                          console.error("Error sharing:", error);
                          toast.error("Share failed!");
                        });
                    } else {
                      navigator.clipboard.writeText(paste.content);
                      toast.success("Copied to clipboard (Share not supported)");
                    }
                  }}
                  title="Share"
                  className="hover:text-white"
                >
                  <FiShare2 size={18} />
                </button>
              </div>
              <p className="font-semibold text-lg text-white pr-28">{paste.title}</p>
              <p className="text-gray-300 mt-1 whitespace-pre-wrap break-words">
                {paste.content}
              </p>
              <div className="text-xs text-gray-500 mt-3">
                {paste.createdAt}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Paste;
