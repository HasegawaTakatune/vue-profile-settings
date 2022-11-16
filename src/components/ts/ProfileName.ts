import swal from 'sweetalert2';
import BaseAction from "./BaseAction";

export default class ProfileName extends BaseAction {
    public async action(form: Array<any>): Promise<any> {
        await swal.fire({
            input: 'text',
            inputLabel: 'ニックネーム',
            inputValue: '',
        }).then(result => {
            form.push({ id: 'setting-name', label: 'ニックネーム', value: result.value });
        });

        return form;
    }
}