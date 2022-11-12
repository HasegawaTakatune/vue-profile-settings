import swal from 'sweetalert2';
import BaseMethod from "./BaseMethod";

export default class ProfileName extends BaseMethod {
    public async action(form: Array<any>): Promise<any> {
        await swal.fire({
            input: 'text',
            inputLabel: 'ニックネーム',
            inputValue: '',
        }).then(result => {
            form.push({ label: 'ニックネーム', value: result.value });
        });

        return form;
    }
}