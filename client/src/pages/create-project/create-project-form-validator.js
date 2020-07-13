import * as yup from 'yup';
import axios from 'axios';

export const schema = (teamId) =>
	yup.object().shape({
		name: yup.string().test('checkDuplicate', 'Project name already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/project/${teamId}`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.sessionStorage.getItem('token')
					},
					data: {
						projectName: value
					}
				})
					.then((resp) => {
						console.log(resp);
						if (resp.data.message === 'Project already exists') {
							resolve(false);
						}

						if (resp.data.message === 'Project not found') {
							resolve(true);
						}

						resolve(true);
					})
					.catch((err) => {
						resolve(true);
					});
			});
		})
	});
