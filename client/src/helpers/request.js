import axios from 'axios';

module.exports.search = async (path) => {
	const res = await axios.get(`http://localhost:3001/api/${path}`);
	const { data } = res;
	return data;
};
