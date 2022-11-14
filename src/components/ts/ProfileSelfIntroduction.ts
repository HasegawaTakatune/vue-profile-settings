import swal from 'sweetalert2';
import BaseMethod from "./BaseMethod";

export default class ProfileSelfIntroduction extends BaseMethod {
    public async action(form: Array<any>): Promise<any> {
        await swal.fire({
            input: 'textarea',
            inputLabel: '自己紹介',
            inputValue: '',
        }).then(result => {
            form.push({ id: 'setting-self-introduction', label: '自己紹介', value: result.value });
        });

        return form;
    }
}