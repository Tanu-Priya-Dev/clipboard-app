import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch, useSelector } from 'react-redux';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [warning, setWarning] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get('pasteId');
  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '4rem',
    fontFamily: 'Fira Code, monospace',
  };

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
  };

  const inputStyle = {
    padding: '0.6rem 1rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #30363d',
    backgroundColor: '#0d1117',
     color: '#c9d1d9',
    width: '400px',
  };

  const buttonStyle = {
    padding: '0.6rem 1.2rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: 'none',
    backgroundColor: '#238636',
    color: 'white',
    cursor: 'pointer',
  };

  const textareaStyle = {
    width: '600px',
    height: '500px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    backgroundColor: '#0d1117',
    color: '#c9d1d9',
    padding: '1rem',
    fontSize: '1rem',
    resize: 'vertical',
    fontFamily: 'Fira Code, monospace',
  };

  const warningStyle = {
    color: '#ff4d4f',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPastes]);

  function createPaste() {
    if (!title.trim() || !value.trim()) {
      setWarning('⚠️ Paste title and content cannot be empty!');
      return;
    }
    setWarning('');

    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
    } else {
      dispatch(addToPastes(paste));
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div style={containerStyle}>
      {warning && <div style={warningStyle}>{warning}</div>}
      <div style={rowStyle}>
        <input
          type="text"
          placeholder="Enter Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={inputStyle}
        />
        <button onClick={createPaste} style={buttonStyle}>
          {pasteId ? 'Update Paste' : 'Create My Paste'}
        </button>
      </div>
      <textarea
        id="pasteContent"
        name="mainTextArea"
        placeholder="Enter Paste Content"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        rows={20}
        style={textareaStyle}
      />
    </div>
  );
};

export default Home;
