// Export useState
import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

// Export Post tamplate
const Post = () => {
  // New state called content which we will dynamically poplate with input fields.
  // These states will be set on button click
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
  })

  // Hooks into on change, spread existing variables, then selects name e.g. title and updates respective value
  const onChange = (e) => {

    // Grab value and name from target?
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  // 
  const onSubmit = async () => {
    const { title, body } = content;

    // POST call to api/entry folder, will add a timestamp and a randomly generated ID
    await axios.post('/api/entry', { title, slug: dashify(title), body });
  }
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <label htmlFor="body">Title</label>
      <textarea
        name="body"
        value={content.body}
        onChange={onChange}
      />
      <button onClick={onSubmit}>POST</button>
    </div>
  );
};

export default Post;