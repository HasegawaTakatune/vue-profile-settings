import Swal from 'sweetalert2';
import BaseMethod from "./BaseMethod";

export default class ProfileGender extends BaseMethod {

    public async action(form: Array<any>): Promise<any> {
        const inputOptions = {
            'man': '男性',
            'woman': '女性',
            'other': 'その他'
        };

        await Swal.fire({
            title: 'Select color',
            input: 'radio',
            inputOptions: inputOptions,
            inputValidator: (value) => {
                if (!value) {
                    return '性別を選択してください';
                }
            }
        }).then(result => {
            form.push({ label: '性別', value: result.value })
        });

        return form;
    }
}