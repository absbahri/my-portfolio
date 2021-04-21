
import fire from '../../config/fire-conf';
export const PushToFirebase = async (title, content, featuredThumbnail, date)  => {
	await 
	fire.firestore()
		.collection('blog')
		.add({
			title : title,
			content : content,
			thumbnail : featuredThumbnail,
			date : date,
		})
}