const AdminPage = () => {
  return (
    <div>
      <h2>Admin Page</h2>
      <div>
        <p>Create word</p>
        <select name="languages">
          <option value="eng">English</option>
          <option value="fin">Finnish</option>
        </select>
        <div className="word-original">
          <label>Word</label>
          <input />
        </div>
        <div className="word-translation">
          <label>Trabslation</label>
          <input />
        </div>
        <button>Add</button>
      </div>
    </div>
  );
};

export default AdminPage;
