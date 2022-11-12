import swal from 'sweetalert2';
import BaseMethod from "./BaseMethod";

export default class ProfileBirthday extends BaseMethod {

    public async action(form: Array<any>): Promise<any> {
        const date = new Date();
        const now = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate}`.replace(/\n|\r/g, '');

        await swal.fire({
            html: `<input id="birthday" type="date" max="${now}" min="1900/01/01">`,
            inputLabel: '生年月日',
            focusConfirm: false,
            preConfirm: () => {
                const result: any = document.getElementById('birthday');
                return result?.value ?? '';
            }
        }).then(result => {
            form.push({ label: '生年月日', value: result.value });
        });

        return form;
    }
}