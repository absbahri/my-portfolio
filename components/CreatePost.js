import React, { useState } from  'react';
import {GrabDate} from './getTodaysDate';
import {PushToFirebase} from '../api/post/PushToFirebase';

const CreatePost = () => {

const [hook, setHook] = useState();

	const [title, setTitle] = useState('');
	const [content, setContent] = useState('');
	const [featuredThumbnail, setFeaturedThumbnail] = useState('');
	const [date, setDate] = useState('');

	const handleSubmit = (event) => {
		// Prevent Default Behaviour
		event.preventDefault();
		// log Captured Data
		console.log({
			"title: ": title,
			"content: ": content,
			"featuredThumbnail: ": featuredThumbnail
		});
		PushToFirebase(title, content, featuredThumbnail, date)
		.then((result) => {
		  console.log('success', result);
		})
		.catch((error) => {
		  console.error(error);
		})
		// Reset Values to default.
		setTitle('');
		setContent('');
		setFeaturedThumbnail('');
		setFeaturedThumbnail(GrabDate());
	};
	return (

		<div className={"submit-post"}>
			<div className={"submit-post__header"}>
				<h1>{"Add to my blog."}</h1>
				<p>
					{""}
				</p>
			</div>
			<form onSubmit={handleSubmit} className={"submit-post__form"}>
				<div className={"submit-post__form__row"}>
					<h2>{"Upload your thumbnail"}</h2>
					<input type="file" onChange={
						({target}) => setFeaturedThumbnail(target.value)
					} />
				</div>
				<div className={"submit-post__form__row"}>
					<h2>{"Enter your blog title"}</h2>
					<input type="text" value={title} onChange={
						({target}) => setTitle(target.value)
					} />
				</div>
				<div className={"submit-post__form__row"}>
					<h2>{"Enter your blog content"}</h2>
					<textarea type="text" value={content} onChange={
						({target}) => setContent(target.value)
					} />
				</div>
				<div className={"submit-post__form__row submit-post__form__row__hidden"}>
					<input type="hidden" value={GrabDate()} onChange={
						({target}) => setDate(target.value)
					} />
				</div>
				<div className={"submit-post__form__submit"}>
					<button type="submit">Submit</button>
				</div>
			</form>
		</div>
	)
}

export default CreatePost;