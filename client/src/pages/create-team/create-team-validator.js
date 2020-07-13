import * as yup from 'yup';
import axios from 'axios';

export const schema = yup.object().shape({
	name: yup
		.string()
		.test('checkDuplicate', 'Team name already exists', function(value) {
			return new Promise((resolve, reject) => {
				axios({
					method: 'post',
					url: `/api/team/find`,
					headers: {
						'Content-Type': 'application/json',
						Authorization: window.sessionStorage.getItem('token')
					},
					data: {
						name: value
					}
				})
					.then((resp) => {
						if (resp.data.message === 'Team name already exists') {
							resolve(false);
						}

						if (resp.data.message === 'Team not found') {
							resolve(true);
						}

						resolve(true);
					})
					.catch(() => resolve(true));
			});
		})
		.required('Required')
});
